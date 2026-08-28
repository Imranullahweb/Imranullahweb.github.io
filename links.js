const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const shareButton = document.getElementById("share-button");
const themeIcon = themeToggle?.querySelector("i");

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("links-theme", theme);
    const dark = theme === "dark";
    themeToggle?.setAttribute("aria-pressed", String(dark));
    if (themeIcon) themeIcon.className = dark ? "bx bx-moon" : "bx bx-sun";
}

const savedTheme = localStorage.getItem("links-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

shareButton?.addEventListener("click", async () => {
    const shareData = { title: document.title, text: "Connect with Imran Ullah", url: window.location.href };
    if (navigator.share) {
        await navigator.share(shareData).catch(() => {});
        return;
    }
    await navigator.clipboard?.writeText(window.location.href);
    shareButton.setAttribute("aria-label", "Profile link copied");
    shareButton.querySelector("i").className = "bx bx-check";
    setTimeout(() => {
        shareButton.setAttribute("aria-label", "Share this profile");
        shareButton.querySelector("i").className = "bx bx-share-alt";
    }, 1800);
});
