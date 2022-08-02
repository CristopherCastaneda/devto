// Var declarations
let moreMenu = document.querySelector("#article-show-more-dropdown");
let btnCopy = document.querySelector("#copy-url-button");

//Side reactions
document.querySelector(".btn-reaction-more").addEventListener("click", () => {
    toggle(moreMenu, "d-none");
    document.querySelector("#article-copy-link-announcer").classList.add("d-none");
});

btnCopy.addEventListener("click", (event) => {    
    navigator.clipboard.writeText(btnCopy.dataset.posturl);
    document.querySelector("#article-copy-link-announcer").classList.remove("d-none");
});

