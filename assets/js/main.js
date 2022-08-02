let userMenu = document.querySelector(".user-menu");

//! Functions

/**
 * Toggle Class
 */
 const toggle = (selector, toggleClass ) => {
    if (selector.classList.contains(toggleClass)) {
        selector.classList.remove(toggleClass);
      } else {
        selector.classList.add(toggleClass);
      }
}


if(userMenu != null){
  userMenu.addEventListener("click", (event) => {
    event.preventDefault();
    toggle(document.querySelector(".user-menu-popover"), "d-none");    
  });
}
