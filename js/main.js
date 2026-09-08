/* =========================================
   NOVA — JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

const cartCount = document.querySelector(".cart-count");
const toast = document.querySelector("[data-toast]");

const searchButton = document.querySelector("[data-search]");
const newsletter = document.querySelector("[data-newsletter]");

let cart = 0;
let toastTimer;


/* =========================================
   MENU MOBILE
========================================= */

menuToggle?.addEventListener("click", () => {

    const isOpen = mobileNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* Fecha o menu ao clicar em um link */

document
    .querySelectorAll(".mobile-nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("open");

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


/* =========================================
   CARRINHO
========================================= */

document
    .querySelectorAll("[data-add]")
    .forEach(button => {

        button.addEventListener("click", () => {

            cart++;

            if (cartCount) {
                cartCount.textContent = cart;
            }

            const productName =
                button.dataset.add;

            showToast(
                `${productName} adicionado ao carrinho.`
            );

        });

    });


/* =========================================
   FAVORITOS
========================================= */

document
    .querySelectorAll(".heart")
    .forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const isFavorite =
                button.classList.toggle("active");

            button.textContent =
                isFavorite ? "♥" : "♡";

        });

    });


/* =========================================
   BUSCA
========================================= */

searchButton?.addEventListener("click", () => {

    const query = window.prompt(
        "O que você está procurando?"
    );

    if (!query || !query.trim()) {
        return;
    }

    showToast(
        `Buscando por: ${query.trim()}`
    );

});


/* =========================================
   NEWSLETTER
========================================= */

newsletter?.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const input =
            newsletter.querySelector("input");

        const email =
            input?.value.trim();

        if (!email) {
            return;
        }

        showToast(
            "Cadastro realizado. Obrigado!"
        );

        newsletter.reset();

    }
);


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    if (!toast) {
        return;
    }

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================
   TECLA ESC
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        mobileNav?.classList.remove("open");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    }
);

/* =========================================
   DARK MODE
========================================= */

const themeToggle =
    document.querySelector("[data-theme-toggle]");


/* Recupera o tema salvo */

const savedTheme =
    localStorage.getItem("nova-theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeToggle) {

        themeToggle.textContent = "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Ativar modo claro"
        );

        themeToggle.setAttribute(
            "title",
            "Modo claro"
        );

    }

}


/* Alternar tema */

themeToggle?.addEventListener("click", () => {

    const isDark =
        document.body.classList.toggle("dark-mode");


    if (isDark) {

        localStorage.setItem(
            "nova-theme",
            "dark"
        );

        themeToggle.textContent = "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Ativar modo claro"
        );

        themeToggle.setAttribute(
            "title",
            "Modo claro"
        );

    } else {

        localStorage.setItem(
            "nova-theme",
            "light"
        );

        themeToggle.textContent = "☾";

        themeToggle.setAttribute(
            "aria-label",
            "Ativar modo escuro"
        );

        themeToggle.setAttribute(
            "title",
            "Modo escuro"
        );

    }

});