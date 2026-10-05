(() => {
    const gallery = document.getElementById("pro-aspect-gallery");
    if (!gallery) return;

    const categoryButtons = [...gallery.querySelectorAll("[data-gallery-category]")];
    const tracks = [...gallery.querySelectorAll("[data-gallery-track]")];

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const activeCategory = button.dataset.galleryCategory;

            categoryButtons.forEach(category => {
                category.setAttribute("aria-pressed", String(category === button));
            });

            tracks.forEach(track => {
                track.hidden = track.dataset.galleryTrack !== activeCategory;
                if (!track.hidden) track.scrollLeft = 0;
            });
        });
    });
})();
