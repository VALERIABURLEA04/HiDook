
    const slides = document.querySelectorAll('.event-slide');
    const prevButton = document.getElementById('prevEvent');
    const nextButton = document.getElementById('nextEvent');
    const counter = document.getElementById('eventCounter');
    const progress = document.getElementById('eventProgress');

    let currentEvent = 0;

    function showEvent(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('hidden', i !== index);
        });

        counter.textContent =
            `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;

        progress.style.width =
            `${((index + 1) / slides.length) * 100}%`;
    }

    nextButton.addEventListener('click', () => {
        currentEvent = (currentEvent + 1) % slides.length;
        showEvent(currentEvent);
    });

    prevButton.addEventListener('click', () => {
        currentEvent =
            (currentEvent - 1 + slides.length) % slides.length;

        showEvent(currentEvent);
    });

    showEvent(currentEvent);
