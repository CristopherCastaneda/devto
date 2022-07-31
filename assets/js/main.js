let userMenu = document.querySelector(".user-menu");

//! Funciones

/**
 * Funcion para toggle de clases
 */
 const toggle = (selector, toggleClass ) => {
    if (selector.classList.contains(toggleClass)) {
        selector.classList.remove(toggleClass);
      } else {
        selector.classList.add(toggleClass);
      }
}

userMenu.addEventListener("click", (event) => {
  event.preventDefault();
  toggle(document.querySelector(".user-menu-popover"), "d-none");
});

