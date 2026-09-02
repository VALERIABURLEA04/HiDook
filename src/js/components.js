async function loadComponent(id, path) {
    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Nu pot încărca ${path}`);
        }

        const html = await response.text();
        document.getElementById(id).innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}

loadComponent("navbar", "./src/components/navbar.html");
loadComponent("footer", "./src/components/footer.html");