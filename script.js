const root = document.documentElement;
const yearNode = document.getElementById("year");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("site-nav");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle?.querySelector("i");
const header = document.getElementById("site-header");
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

const projectData = [
    {
        title: "GCMS Pro Website",
        description: "Institution website redesign focused on content hierarchy and responsive experience.",
        tags: ["Responsive", "UI/UX", "Performance"],
        image: "GCms pro.png",
        demo: "https://gcmsmardan.edu.pk",
        github: "https://github.com/Imranullahweb"
    },
    {
        title: "Imran Study AI",
        description: "Study assistant app with streamlined learner workflows and clear interface design.",
        tags: ["JavaScript", "AI", "Product"],
        image: "ai agent.png",
        demo: "https://imranstudyai.streamlit.app/",
        github: "https://github.com/Imranullahweb"
    },
    {
        title: "Hotel Management Demo",
        description: "React + Vite demo for booking and management workflows with clean components.",
        tags: ["React", "Vite", "Frontend"],
        image: "download.jpg",
        demo: "https://github.com/Imranullahweb/Hotel-Managment-Demo-version-in-react",
        github: "https://github.com/Imranullahweb/Hotel-Managment-Demo-version-in-react"
    }
];

const artworkData = [
    {
        title: "Portrait Composition",
        image: "dp.png",
        caption: "Character-focused composition for personal brand visual style."
    },
    {
        title: "AI Visual Concept",
        image: "ai agent.png",
        caption: "Experimental visual direction for product storytelling."
    },
    {
        title: "Project Showcase Still",
        image: "download.jpg",
        caption: "Mockup style visual for product presentation."
    }
    // TODO: Replace/add dedicated 3D render assets when final files are ready.
];

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const dark = theme === "dark";
    themeToggle?.setAttribute("aria-pressed", String(dark));
    if (themeIcon) {
        themeIcon.className = dark ? "bx bx-sun" : "bx bx-moon";
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(savedTheme || (prefersDark ? "dark" : "light"));
}

function renderProjects() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    grid.innerHTML = projectData.map((project) => `
        <article class="card reveal">
            <img class="project-cover" src="${project.image}" alt="${project.title} preview" loading="lazy" decoding="async" width="640" height="400">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tags">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
            <div class="project-links">
                ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener">Live Demo</a>` : "<span>Demo pending</span>"}
                ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener">GitHub</a>` : "<span>Code private</span>"}
            </div>
        </article>
    `).join("");
}

function renderArtwork() {
    const grid = document.getElementById("artwork-grid");
    if (!grid) return;

    grid.innerHTML = artworkData.map((piece) => `
        <figure class="card reveal">
            <img class="art-cover" src="${piece.image}" alt="${piece.title}" loading="lazy" decoding="async" width="640" height="400">
            <figcaption>
                <strong>${piece.title}</strong>
                <p>${piece.caption}</p>
            </figcaption>
        </figure>
    `).join("");
}

function setupReveal() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = document.querySelectorAll(".reveal");
    if (reducedMotion) {
        nodes.forEach((node) => node.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    nodes.forEach((node) => observer.observe(node));
}

function setupActiveNav() {
    const links = [...document.querySelectorAll(".nav-link")];
    const map = new Map(links.map((link) => [link.getAttribute("href")?.slice(1), link]));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((link) => link.classList.remove("active"));
            map.get(entry.target.id)?.classList.add("active");
        });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });

    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}

function initHeaderBehavior() {
    const onScroll = () => {
        header?.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
}

function initMenu() {
    menuToggle?.addEventListener("click", () => {
        const open = nav?.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(Boolean(open)));
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            nav?.classList.remove("open");
            menuToggle?.setAttribute("aria-expanded", "false");
        });
    });
}

function initForm() {
    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const extractFields = (fields) => Object.fromEntries(
            fields.map((field) => [field, String(data.get(field) || "").trim()])
        );
        const { name, email, message } = extractFields(["name", "email", "message"]);

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill in all fields.";
            return;
        }

        const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:imranwebtech1@gmail.com?subject=${subject}&body=${body}`;
        formStatus.textContent = "Opening your email app to send the message.";
        form.reset();
    });
}

yearNode.textContent = String(new Date().getFullYear());
initTheme();
renderProjects();
renderArtwork();
setupReveal();
setupActiveNav();
initHeaderBehavior();
initMenu();
initForm();

themeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(current);
});
