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
        image: "download.png",
        demo: "https://github.com/Imranullahweb/Hotel-Managment-Demo-version-in-react",
        github: "https://github.com/Imranullahweb/Hotel-Managment-Demo-version-in-react"
    }
];

const clientData = [
    {
        name: "GCMS Mardan",
        category: "Education & Govt Portal",
        description: "Official institutional website redesign focused on responsive UX & course hierarchy.",
        image: "GCms pro.png",
        tags: ["Government", "Web Portal", "UI/UX"],
        link: "https://gcmsmardan.edu.pk"
    },
    {
        name: "Imran Study AI",
        category: "EdTech & AI SaaS",
        description: "AI study assistant platform designed to streamline student workflows and learning.",
        image: "ai agent.png",
        tags: ["AI Agent", "Python", "Streamlit"],
        link: "https://imranstudyai.streamlit.app/"
    },
    {
        name: "Madina Colony Admin",
        category: "Enterprise System",
        description: "Full-stack PHP/MySQL portal for notice boards, resident logs, and admin analytics.",
        image: "dp.png",
        tags: ["PHP", "MySQL", "Admin Panel"],
        link: ""
    },
    {
        name: "Hotel Management SaaS",
        category: "Hospitality & Web Apps",
        description: "React-powered room reservation system and real-time management dashboard.",
        image: "download.png",
        tags: ["React", "Vite", "Dashboard"],
        link: "https://github.com/Imranullahweb/Hotel-Managment-Demo-version-in-react"
    }
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
        <article class="card project-card reveal">
            <div class="project-media-wrap">
                <img class="project-cover" src="${project.image}" alt="${project.title} preview" loading="lazy" decoding="async">
                ${project.demo ? `
                    <a href="${project.demo}" target="_blank" rel="noopener" class="project-url-badge">
                        <i class="bx bx-lock-alt"></i> ${project.demo.replace(/^https?:\/\//, '')}
                    </a>
                ` : ''}
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tags">
                    ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                </div>
            </div>
        </article>
    `).join("");
}

function renderClients() {
    const grid = document.getElementById("clients-grid");
    if (!grid) return;

    grid.innerHTML = clientData.map((client) => `
        <article class="card project-card reveal">
            <div class="project-media-wrap">
                <img class="project-cover" src="${client.image}" alt="${client.name} preview" loading="lazy" decoding="async">
                ${client.link ? `
                    <a href="${client.link}" target="_blank" rel="noopener" class="project-url-badge">
                        <i class="bx bx-lock-alt"></i> ${client.link.replace(/^https?:\/\//, '')}
                    </a>
                ` : ''}
            </div>
            <div class="project-content">
                <h3>${client.name}</h3>
                <p>${client.description}</p>
                <div class="tags">
                    ${client.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                </div>
            </div>
        </article>
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

function initAzadiCanvas() {
    const canvas = document.getElementById("azadi-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    });

    const particles = Array.from({ length: 25 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3 + 1.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: -Math.random() * 0.6 - 0.2,
        color: Math.random() > 0.4 ? "#006827" : "#ffffff",
        alpha: Math.random() * 0.6 + 0.2
    }));

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            p.x += p.dx;
            p.y += p.dy;

            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }
            if (p.x < 0 || p.x > width) {
                p.dx *= -1;
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function triggerAzadiCelebration() {
    const burstCount = 60;
    const container = document.body;

    for (let i = 0; i < burstCount; i++) {
        const p = document.createElement("div");
        const isGreen = Math.random() > 0.4;
        const isStar = Math.random() > 0.5;

        p.textContent = isStar ? "⭐" : "🌙";
        p.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: -20px;
            font-size: ${Math.random() * 1.5 + 1}rem;
            color: ${isGreen ? "#00c853" : "#ffffff"};
            z-index: 9999;
            pointer-events: none;
            transition: transform 3s cubic-bezier(0.25, 1, 0.5, 1), opacity 3s ease;
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        `;
        container.appendChild(p);

        requestAnimationFrame(() => {
            p.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`;
            p.style.opacity = "0";
        });

        setTimeout(() => p.remove(), 3200);
    }

    const toast = document.createElement("div");
    toast.textContent = "🇵🇰 Pakistan Zindabad! Happy 14th August!";
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: linear-gradient(135deg, #006827, #004d1c);
        color: #ffffff;
        padding: .8rem 1.6rem;
        border-radius: 999px;
        font-weight: 800;
        font-size: 1rem;
        box-shadow: 0 10px 30px rgba(0, 104, 39, 0.4);
        z-index: 10000;
        transition: all .3s ease;
        opacity: 0;
    `;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = "translateX(-50%) translateY(0)";
        toast.style.opacity = "1";
    });

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(20px)";
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

yearNode.textContent = String(new Date().getFullYear());
initTheme();
renderProjects();
renderClients();
setupReveal();
setupActiveNav();
initHeaderBehavior();
initMenu();
initForm();
initAzadiCanvas();

document.getElementById("celebrate-btn")?.addEventListener("click", triggerAzadiCelebration);
document.getElementById("hero-azadi-btn")?.addEventListener("click", triggerAzadiCelebration);

themeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(current);
});
