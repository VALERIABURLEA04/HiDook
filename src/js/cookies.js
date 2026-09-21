// Consimțământ cookies: banner, setări și buton de redeschidere.
// Alegerea se salvează în localStorage (cheia hidook-cookie-consent).
// Scripturile opționale (analiză/marketing), dacă vor fi adăugate, ascultă evenimentul
// "hidook:consent" sau verifică window.hidookConsent înainte să se încarce.
(() => {
    const STORAGE_KEY = 'hidook-cookie-consent';
    const VERSION = 1;

    const root = document.querySelector('[data-cookie-consent]');
    if (!root) return;

    const banner = root.querySelector('[data-cookie-banner]');
    const dialog = root.querySelector('[data-cookie-dialog]');
    const reopen = root.querySelector('[data-cookie-reopen]');
    const toggles = [...root.querySelectorAll('[data-cookie-category]')];

    const read = () => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return saved && saved.version === VERSION ? saved : null;
        } catch {
            return null;
        }
    };

    const apply = consent => {
        window.hidookConsent = consent;
        document.dispatchEvent(new CustomEvent('hidook:consent', { detail: consent }));
    };

    const save = choices => {
        const consent = {
            version: VERSION,
            necessary: true,
            analytics: !!choices.analytics,
            marketing: !!choices.marketing,
            date: new Date().toISOString()
        };

        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(consent)); } catch { /* storage indisponibil */ }

        apply(consent);
        hideBanner();
        closeDialog();
    };

    const showBanner = () => {
        banner.hidden = false;
        reopen.hidden = true;
    };

    const hideBanner = () => {
        banner.hidden = true;
        reopen.hidden = false;
    };

    const openDialog = () => {
        const current = read() || { analytics: false, marketing: false };
        toggles.forEach(input => { input.checked = !!current[input.dataset.cookieCategory]; });
        dialog.hidden = false;
        dialog.querySelector('[data-cookie-close]').focus();
    };

    const closeDialog = () => {
        dialog.hidden = true;
    };

    root.addEventListener('click', event => {
        const action = event.target.closest('[data-cookie-action]')?.dataset.cookieAction;
        if (!action) return;

        if (action === 'accept-all') save({ analytics: true, marketing: true });
        if (action === 'necessary') save({ analytics: false, marketing: false });
        if (action === 'settings') openDialog();
        if (action === 'close') closeDialog();
        if (action === 'save') {
            save(Object.fromEntries(toggles.map(input => [input.dataset.cookieCategory, input.checked])));
        }
    });

    dialog.addEventListener('click', event => {
        if (event.target === dialog) closeDialog();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !dialog.hidden) closeDialog();
    });

    // Orice link/buton cu data-cookie-open (ex. în footer sau pe pagina de cookies) deschide setările
    document.querySelectorAll('[data-cookie-open]').forEach(el => {
        el.addEventListener('click', event => {
            event.preventDefault();
            openDialog();
        });
    });

    const existing = read();
    if (existing) {
        apply(existing);
        hideBanner();
    } else {
        showBanner();
    }
})();

// Linkuri externe: deschide explicit în tab nou (unele browsere mobile ignoră target="_blank" fără asta).
// Dacă browserul blochează fereastra nouă, lăsăm linkul să funcționeze normal.
document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[target="_blank"][href^="http"]');
    if (!link) return;

    const opened = window.open(link.href, '_blank');
    if (opened) {
        opened.opener = null;
        event.preventDefault();
    }
});
