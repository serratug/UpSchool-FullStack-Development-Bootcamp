window.toggleMenu = function (showMenu) {
    if (showMenu) {
        document.body.classList.add("menu-open");
    } else {
        document.body.classList.remove("menu-open");
    }
};