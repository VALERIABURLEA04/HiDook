async function loadComponent(id, path) {
    const target = document.getElementById(id);
    if (!target) return;

    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Nu pot încărca ${path}`);
        }

        const html = await response.text();
        target.innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}

loadComponent("navbar", "./src/components/navbar.html");
loadComponent("footer", "./src/components/footer.html");