function renderCompanyHighlights(sectionId, highlights) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const list = section.querySelector("#company-highlights-list");
    if (!list) return;

    const styles = {
        promo: {
            surface: "border-[#F1D36A] bg-[#FFF9E8] hover:bg-[#FFF5D8]",
            icon: "bg-[#FFEAB2] text-[#8A5A00]",
            svg: '<path d="M3 10h18v10H3zM2 7h20v3H2zM12 7v13M12 7C9 7 6 6 6 4a2 2 0 0 1 2-2c2 0 4 3 4 5Zm0 0c3 0 6-1 6-3a2 2 0 0 0-2-2c-2 0-4 3-4 5Z"/>'
        },
        jobs: {
            surface: "border-[#C9DFF8] bg-[#F3F8FF] hover:bg-[#EAF3FF]",
            icon: "bg-[#DDEBFF] text-[#064FC4]",
            svg: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12c2.5 2 5.5 3 9 3s6.5-1 9-3M10 14v2h4v-2"/>'
        }
    };

    ["promo", "jobs"].forEach(type => {
        const item = highlights[type];
        if (!item || !item.title || !item.href) return;

        const style = styles[type];
        const card = document.createElement("a");
        card.href = item.href;
        card.className = `group flex min-w-0 items-center gap-4 rounded-2xl border px-4 py-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#064FC4] sm:px-5 ${style.surface}`;

        const icon = document.createElement("span");
        icon.className = `flex size-11 shrink-0 items-center justify-center rounded-full ${style.icon}`;
        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="size-5">${style.svg}</svg>`;

        const content = document.createElement("span");
        content.className = "min-w-0";

        const title = document.createElement("span");
        title.className = "block text-base font-bold leading-snug text-[#334E68] sm:text-lg";
        title.textContent = item.title;

        const description = document.createElement("span");
        description.className = "mt-1 block text-sm leading-snug text-[#46546A]";
        description.textContent = item.description || "";

        const action = document.createElement("span");
        action.className = "mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#064FC4] underline-offset-4 group-hover:underline";
        action.textContent = `${item.action || "Află mai multe"} →`;

        content.append(title, description, action);
        card.append(icon, content);
        list.append(card);
    });

    if (list.children.length > 0) section.classList.remove("hidden");
}
