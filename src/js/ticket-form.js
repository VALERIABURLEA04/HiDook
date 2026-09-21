// Business Diagnostic Live: preț Early Bird + formularul „Cumpără bilet”.
// Formularul trimite datele în Google Sheet (Apps Script, foaia „Inscrieri”, la fel ca newsletterul),
// apoi duce la linkul de plată din data-payment-url-early / data-payment-url.
(() => {
    // Early Bird: £29 până pe 30.09.2026 23:59 (ora Londrei), apoi £49
    const EARLY_BIRD_END = new Date('2026-09-30T23:59:59+01:00');
    const isEarlyBird = () => new Date() <= EARLY_BIRD_END;

    const ticket = () => (isEarlyBird()
        ? { label: 'Early Bird £29', early: true }
        : { label: 'Standard £49', early: false });

    // ----- Preț afișat pe pagină -----
    if (!isEarlyBird()) {
        document.querySelectorAll('[data-early-bird]').forEach(el => { el.hidden = true; });
        document.querySelectorAll('[data-regular-price]').forEach(el => { el.hidden = false; });
    } else {
        const days = Math.ceil((EARLY_BIRD_END - new Date()) / 86400000);
        const text = days <= 1 ? 'Ultima zi la preț Early Bird!' : `Mai sunt ${days} zile la preț Early Bird`;
        document.querySelectorAll('[data-early-bird-countdown]').forEach(el => { el.textContent = text; });
    }

    // ----- Fereastra cu formularul -----
    const dialog = document.getElementById('ticket-dialog');
    const form = document.getElementById('ticket-form');
    if (!dialog || !form) return;

    const status = form.querySelector('.event-form-status');
    const submit = form.querySelector('[type="submit"]');
    const submitLabel = form.querySelector('[data-submit-label]');

    const paymentUrl = () => (ticket().early ? form.dataset.paymentUrlEarly : form.dataset.paymentUrl) || '';

    if (paymentUrl()) submitLabel.textContent = 'Continuă spre plată';

    const setStatus = (text, state) => {
        status.textContent = text;
        status.dataset.state = state;
    };

    const open = event => {
        event.preventDefault();
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

        if (contacts.every(input => !input.value.trim())) {
            contacts.forEach(input => input.setAttribute('aria-invalid', 'true'));
            return fail(contacts[0], 'Completează emailul sau numărul de telefon (cel puțin unul).');
        }

        const consent = required.find(input => input.type === 'checkbox' && !input.checked);
        if (consent) return fail(consent, consent.dataset.error || 'Bifează acordul.');

        // Boții completează câmpul invizibil; oamenii nu îl văd
        if (form.website.value) return;

        if (!navigator.onLine) {
            setStatus('Nu ești conectat la internet. Verifică conexiunea și încearcă din nou.', 'error');
            return;
        }

        form.bilet.value = ticket().label;

        const data = new URLSearchParams(new FormData(form));
        data.delete('website');
        data.append('pagina', window.location.href);

        // Apps Script nu permite citirea răspunsului (CORS): trimitem în fundal.
        // sendBeacon continuă chiar dacă pagina pleacă spre plată.
        const endpoint = form.dataset.endpoint;
        const queued = navigator.sendBeacon?.(endpoint, data);
        if (!queued) {
            fetch(endpoint, { method: 'POST', mode: 'no-cors', body: data, keepalive: true })
                .catch(() => console.warn('Formular bilet: trimiterea în fundal a eșuat.'));
        }

        fields.forEach(input => input.removeAttribute('aria-invalid'));

        const url = paymentUrl();
        if (url) {
            submit.disabled = true;
            setStatus('Datele au fost salvate. Te ducem la plată…', 'ok');
            setTimeout(() => { window.location.href = url; }, 700);
            return;
        }

        form.reset();
        setStatus('Mulțumim! Ți-am rezervat biletul. Îți trimitem pe email detaliile de plată.', 'ok');
    });
})();
