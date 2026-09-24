// Business Diagnostic Live: formularul „Cumpără bilet”.
// Formularul trimite datele în Google Sheet (Apps Script, foaia „Inscrieri”, la fel ca newsletterul),
// apoi duce la linkul de plată Revolut al regiunii vizitatorului:
//   Canada → CA$49 (data-payment-url-ca), Europa → €49 (data-payment-url-eu), restul → £49 (data-payment-url).
// workshop.hidook.com/lidia arată mereu varianta Canada. Test: ?regiune=ca | eu | uk
(() => {
    const REGIONS = {
        uk: { symbol: '£', price: '£49', ticket: 'Bilet £49 (UK)', url: 'paymentUrl' },
        eu: { symbol: '€', price: '€49', ticket: 'Bilet €49 (Europa)', url: 'paymentUrlEu' },
        ca: { symbol: 'CA$', price: 'CA$49', ticket: 'Bilet CA$49 (Canada)', url: 'paymentUrlCa' },
    };

    // Europa (fără Marea Britanie și insulele ei, care rămân pe £)
    const EUROPE = ('AD AL AT BA BE BG BY CH CY CZ DE DK EE ES FI FO FR GR HR HU IE IS IT LI LT LU LV MC MD ME MK MT '
        + 'NL NO PL PT RO RS RU SE SI SK SM UA VA XK').split(' ');

    const regionForCountry = country => {
        if (country === 'CA') return 'ca';
        if (EUROPE.includes(country)) return 'eu';
        return 'uk';
    };

    // fără Cloudflare (ex. local): după fusul orar al browserului
    const regionFromTimeZone = () => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        if (/^America\/(Toronto|Vancouver|Montreal|Edmonton|Winnipeg|Halifax|Regina|St_Johns|Moncton|Whitehorse|Yellowknife|Iqaluit|Glace_Bay|Goose_Bay|Swift_Current|Dawson_Creek|Creston|Fort_Nelson|Rankin_Inlet|Resolute|Cambridge_Bay|Inuvik|Atikokan|Blanc-Sablon)$/.test(tz)) return 'ca';
        if (/^Europe\/(London|Guernsey|Jersey|Isle_of_Man)$/.test(tz)) return 'uk';
        if (tz.startsWith('Europe/') || tz === 'Atlantic/Canary' || tz === 'Atlantic/Madeira' || tz === 'Atlantic/Azores') return 'eu';
        return 'uk';
    };

    let region = 'uk';

    const applyRegion = r => {
        region = REGIONS[r] ? r : 'uk';
        const R = REGIONS[region];
        document.querySelectorAll('[data-currency]').forEach(el => { el.textContent = R.symbol; });
        document.querySelectorAll('[data-price]').forEach(el => { el.textContent = R.price; });
        document.documentElement.dataset.region = region;
    };

    const detectRegion = async () => {
        const forced = new URLSearchParams(location.search).get('regiune');
        if (forced) return forced.toLowerCase();
        if (/^\/lidia\/?$/i.test(location.pathname)) return 'ca';
        try {
            const res = await fetch('/cdn-cgi/trace', { cache: 'no-store' });
            if (res.ok) {
                const loc = (await res.text()).match(/^loc=([A-Z]{2})$/m);
                if (loc) return regionForCountry(loc[1]);
            }
        } catch { /* fără Cloudflare */ }
        return regionFromTimeZone();
    };

    detectRegion().then(applyRegion);

    // ----- Fereastra cu formularul -----
    const dialog = document.getElementById('ticket-dialog');
    const form = document.getElementById('ticket-form');
    if (!dialog || !form) return;

    const status = form.querySelector('.event-form-status');
    const submit = form.querySelector('[type="submit"]');
    const submitLabel = form.querySelector('[data-submit-label]');

    const paymentUrl = () => form.dataset[REGIONS[region].url] || form.dataset.paymentUrl || '';

    if (paymentUrl()) submitLabel.textContent = 'Continuă spre plată';

    const setStatus = (text, state) => {
        status.textContent = text;
        status.dataset.state = state;
    };

    let openedAt = 0;

    const open = event => {
        event.preventDefault();
        openedAt = Date.now();
        setStatus('', '');
        dialog.showModal();
        form.querySelector('input:not([type="hidden"]):not([tabindex="-1"])').focus();
    };

    document.querySelectorAll('[data-ticket-open]').forEach(el => el.addEventListener('click', open));
    dialog.querySelector('[data-ticket-close]').addEventListener('click', () => dialog.close());

    // click pe fundalul întunecat închide fereastra
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });

    // ----- Trimitere (aceleași reguli ca formularul din newsletter) -----
    const fail = (input, message) => {
        setStatus(message, 'error');
        input.focus();
    };

    form.addEventListener('submit', event => {
        event.preventDefault();

        const required = [...form.querySelectorAll('input[required]')];
        const contacts = [...form.querySelectorAll('input[data-contact]')];
        const fields = [...required, ...contacts];

        const isValid = input => {
            if (input.type === 'checkbox') return input.checkValidity();
            const value = input.value.trim();
            if (input.required && !value) return false;
            return input.checkValidity();
        };

        fields.forEach(input => input.setAttribute('aria-invalid', String(!isValid(input))));

        const firstInvalid = fields.find(input => input.type !== 'checkbox' && !isValid(input));
        if (firstInvalid) return fail(firstInvalid, firstInvalid.dataset.error || 'Completează corect toate câmpurile.');

        if (contacts.length && contacts.every(input => !input.value.trim())) {
            contacts.forEach(input => input.setAttribute('aria-invalid', 'true'));
            return fail(contacts[0], 'Completează emailul sau numărul de telefon (cel puțin unul).');
        }

        const consent = required.find(input => input.type === 'checkbox' && !input.checked);
        if (consent) return fail(consent, consent.dataset.error || 'Bifează acordul.');

        // Boții completează câmpul invizibil și trimit instant. Autofill-ul poate completa și el
        // câmpul, așa că îl considerăm bot doar dacă trimiterea vine sub 3 secunde de la deschidere.
        if (form.hp_check.value && Date.now() - openedAt < 3000) return;

        if (!navigator.onLine) {
            setStatus('Nu ești conectat la internet. Verifică conexiunea și încearcă din nou.', 'error');
            return;
        }

        form.bilet.value = REGIONS[region].ticket;

        const data = new URLSearchParams(new FormData(form));
        data.delete('hp_check');
        data.append('pagina', window.location.href);

        fields.forEach(input => input.removeAttribute('aria-invalid'));
        submit.disabled = true;
        setStatus('Se trimit datele…', 'ok');

        send(form.dataset.endpoint, data).then(() => {
            const url = paymentUrl();
            if (url) {
                setStatus('Datele au fost salvate. Te ducem la plată…', 'ok');
                window.location.href = url;
                return;
            }

            submit.disabled = false;
            form.reset();
            setStatus('Mulțumim! Ți-am rezervat biletul. Îți trimitem pe email detaliile de plată.', 'ok');
        });
    });

    // Apps Script nu permite citirea răspunsului (CORS), dar așteptăm ca cererea să plece
    // înainte să părăsim pagina. keepalive o ține vie și dacă pagina se schimbă;
    // după 4 secunde mergem mai departe oricum.
    function send(endpoint, data) {
        const request = fetch(endpoint, { method: 'POST', mode: 'no-cors', body: data, keepalive: true })
            .catch(() => {
                if (!navigator.sendBeacon?.(endpoint, data)) console.warn('Formular bilet: trimiterea a eșuat.');
            });
        const timeout = new Promise(resolve => setTimeout(resolve, 4000));
        return Promise.race([request, timeout]);
    }
})();
