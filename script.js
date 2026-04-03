const year = document.getElementById("year");
const langButtons = document.querySelectorAll(".lang-btn");
const translatable = document.querySelectorAll("[data-i18n]");

const nodes = {
  certificateCount: document.getElementById("certificate-count"),
  educationCount: document.getElementById("education-count"),
  certificatesList: document.getElementById("certificates-list"),
  heroEyebrow: document.querySelector(".hero-copy .eyebrow"),
  heroTitle: document.querySelector(".hero-copy h1"),
  heroSubtitle: document.querySelector(".name-subtitle"),
  heroLead: document.querySelector(".hero-copy .lead"),
  heroFocusLabel: document.querySelector(".panel-card-main .panel-label"),
  heroFocusTitle: document.querySelector(".panel-card-main h2"),
  heroFocusText: document.querySelector(".panel-card-main p:last-of-type"),
  heroRoleLabel: document.querySelector(".panel-grid .panel-card:first-child .panel-label"),
  heroRoleValue1: document.querySelector(".panel-grid .panel-card:first-child p:nth-of-type(2)"),
  heroRoleValue2: document.querySelector(".panel-grid .panel-card:first-child p:nth-of-type(3)"),
  heroWorkplaceLabel: document.querySelector(".panel-grid .panel-card:last-child .panel-label"),
  heroWorkplaceCompany: document.querySelector(".panel-grid .panel-card:last-child p:nth-of-type(2)"),
  heroWorkplaceLocation: document.querySelector(".panel-grid .panel-card:last-child p:nth-of-type(3)"),
  aboutTitle: document.querySelector("#about .section-title h2"),
  aboutList: document.querySelector("#about .resume-list"),
  aboutText: document.querySelector("#about .content-card > p"),
  experienceTitle: document.querySelector("#experience .section-title h2"),
  experienceTimeline: document.querySelector("#experience .timeline"),
  stackTitle: document.querySelector("#stack .section-title h2"),
  stackGrid: document.querySelector("#stack .stack-grid"),
  projectsTitle: document.querySelector("#projects .section-title h2"),
  projectsGrid: document.querySelector("#projects .projects"),
  educationTitle: document.querySelector("#education .section-title h2"),
  educationLabel: document.querySelector("#education .panel-label"),
  educationText: document.querySelector("#education .education-text"),
  contactTitle: document.querySelector("#contact h2"),
  contactEyebrow: document.querySelector("#contact .eyebrow"),
  contactText: document.querySelector("#contact .contact-card > p"),
  contactGithub: document.querySelector("#contact .hero-actions .button"),
};

const labels = {
  ru: {
    "nav.about": "Обо мне",
    "nav.experience": "Опыт",
    "nav.projects": "Проекты",
    "nav.stack": "Стек",
    "nav.education": "Сертификаты",
    "nav.contact": "Контакты",
    "hero.github": "GitHub",
    "hero.gitlab": "GitLab",
    "hero.projects": "Смотреть проекты",
    "experience.eyebrow": "Опыт",
    "experience.title": "Ключевые роли, страны и годы",
    "stack.eyebrow": "Стек",
    "stack.title": "Стек, сгруппированный по слоям",
    "projects.eyebrow": "Проекты",
    "projects.title": "Выбранные репозитории и инженерные кейсы",
    "projects.open": "Открыть",
    "edu.eyebrow": "Сертификаты",
    "edu.title": "Сертификаты и курсы",
    "edu.summary.label": "Всего",
    "edu.summary.text": "Курсы, сертификации и хакатоны собраны в отдельную секцию.",
    "contact.eyebrow": "Контакты",
    "contact.title": "Связаться со мной",
    "contact.github": "Профиль GitHub",
  },
  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.stack": "Stack",
    "nav.education": "Certificates",
    "nav.contact": "Contact",
    "hero.github": "GitHub",
    "hero.gitlab": "GitLab",
    "hero.projects": "View projects",
    "experience.eyebrow": "Experience",
    "experience.title": "Key roles, countries and years",
    "stack.eyebrow": "Stack",
    "stack.title": "Stack grouped by layers",
    "projects.eyebrow": "Projects",
    "projects.title": "Selected repositories and engineering cases",
    "projects.open": "Open",
    "edu.eyebrow": "Certificates",
    "edu.title": "Certificates and courses",
    "edu.summary.label": "Total",
    "edu.summary.text": "Courses, certifications and hackathons are grouped into a dedicated section.",
    "contact.eyebrow": "Contact",
    "contact.title": "Get in touch",
    "contact.github": "GitHub profile",
  },
};

let currentLanguage = window.localStorage.getItem("portfolio-lang") || "ru";
const state = {
  profile: null,
  experience: [],
  stack: [],
  projects: [],
  certificates: [],
};

function localized(value) {
  if (value == null) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return value[currentLanguage] || value.ru || value.en || "";
}

function setText(node, value) {
  if (node) {
    node.textContent = value;
  }
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }

  return response.json();
}

async function loadData() {
  const [profile, experience, stack, projects, certificates] = await Promise.all([
    loadJson("data/profile.json"),
    loadJson("data/experience.json"),
    loadJson("data/stack.json"),
    loadJson("data/projects.json"),
    loadJson("data/certificates.json"),
  ]);

  state.profile = profile;
  state.experience = Array.isArray(experience.items) ? experience.items : [];
  state.stack = Array.isArray(stack.groups) ? stack.groups : [];
  state.projects = Array.isArray(projects.items) ? projects.items : [];
  state.certificates = Array.isArray(certificates.certificates)
    ? certificates.certificates
    : Array.isArray(certificates.items)
      ? certificates.items
      : [];
}

function renderTranslations() {
  const dictionary = labels[currentLanguage];

  translatable.forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value) {
      element.innerHTML = value;
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLanguage);
  });

  setText(year, String(new Date().getFullYear()));
  document.documentElement.lang = currentLanguage;
}

function renderHero() {
  const profile = state.profile;
  if (!profile) {
    return;
  }

  setText(nodes.heroEyebrow, localized(profile.hero.eyebrow));
  setText(nodes.heroTitle, localized(profile.hero.title));
  setText(nodes.heroSubtitle, localized(profile.hero.subtitle));
  setText(nodes.heroLead, localized(profile.hero.lead));
  setText(nodes.heroFocusLabel, localized(profile.panel.focus.label));
  setText(nodes.heroFocusTitle, localized(profile.panel.focus.title));
  setText(nodes.heroFocusText, localized(profile.panel.focus.text));
  setText(nodes.heroRoleLabel, localized(profile.panel.role.label));
  setText(nodes.heroRoleValue1, localized(profile.panel.role.values[0]));
  setText(nodes.heroRoleValue2, localized(profile.panel.role.values[1]));
  setText(nodes.heroWorkplaceLabel, localized(profile.panel.workplace.label));
  setText(nodes.heroWorkplaceCompany, profile.panel.workplace.company);
  setText(nodes.heroWorkplaceLocation, localized(profile.panel.workplace.location));

  setText(nodes.contactGithub, labels[currentLanguage]["contact.github"]);

  if (nodes.certificateCount) {
    nodes.certificateCount.textContent = String(state.certificates.length);
  }
}

function renderAbout() {
  const profile = state.profile;
  if (!profile) {
    return;
  }

  setText(nodes.aboutTitle, localized(profile.about.title));
  setText(nodes.aboutText, localized(profile.about.text));

  if (nodes.aboutList) {
    nodes.aboutList.innerHTML = profile.about.points
      .map((point) => `<li>${localized(point)}</li>`)
      .join("");
  }
}

function renderExperience() {
  if (nodes.experienceTitle) {
    setText(nodes.experienceTitle, labels[currentLanguage]["experience.title"]);
  }

  if (!nodes.experienceTimeline) {
    return;
  }

  nodes.experienceTimeline.innerHTML = state.experience
    .map((item) => {
      const title = item.company;
      const period = localized(item.period);
      const role = localized(item.role);
      const highlights = (item.highlights || [])
        .map((highlight) => `<li>${localized(highlight)}</li>`)
        .join("");

      return `
        <div>
          <h3>${title}</h3>
          <ul>
            <li>${item.country}, ${period}</li>
            <li>${role}</li>
            ${highlights}
          </ul>
        </div>
      `;
    })
    .join("");
}

function renderStack() {
  if (nodes.stackTitle) {
    setText(nodes.stackTitle, labels[currentLanguage]["stack.title"]);
  }

  if (!nodes.stackGrid) {
    return;
  }

  nodes.stackGrid.innerHTML = state.stack
    .map(
      (group) => `
        <article class="stack-card">
          <h3>${localized(group.title)}</h3>
          <div class="chips">
            ${group.items.map((item) => `<span>${item}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderProjects() {
  if (nodes.projectsTitle) {
    setText(nodes.projectsTitle, labels[currentLanguage]["projects.title"]);
  }

  if (!nodes.projectsGrid) {
    return;
  }

  nodes.projectsGrid.innerHTML = state.projects
    .map(
      (project) => `
        <article class="project-card reveal">
          <p class="project-index">${project.id}</p>
          <h3>${project.title}</h3>
          <p>${localized(project.description)}</p>
          <div class="project-tags">
            ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
          <a href="${project.href}" target="_blank" rel="noreferrer">${labels[currentLanguage]["projects.open"]}</a>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("#projects .reveal").forEach((element) => {
    element.classList.add("is-visible");
  });
}

function renderCertificates() {
  if (!nodes.certificatesList) {
    return;
  }

  nodes.certificatesList.innerHTML = state.certificates
    .map((certificate) => {
      const issuer = certificate.issuer || certificate.category || "";
      const link = certificate.href
        ? `<a href="${certificate.href}" target="_blank" rel="noreferrer">${
            currentLanguage === "en" ? "Open PDF" : "Открыть PDF"
          }</a>`
        : "";
      const year = certificate.year ? `<span>${certificate.year}</span>` : "";

      return `
        <article class="certificate-card">
          <h3>${localized(certificate.title)}</h3>
          <div class="certificate-meta">
            <span>${localized(issuer)}</span>
            ${year}
          </div>
          ${link}
        </article>
      `;
    })
    .join("");

  if (nodes.educationCount) {
    nodes.educationCount.textContent =
      currentLanguage === "en"
        ? `${state.certificates.length} certificates`
        : `${state.certificates.length} сертификатов`;
  }

  if (nodes.educationLabel) {
    setText(nodes.educationLabel, labels[currentLanguage]["edu.summary.label"]);
  }

  if (nodes.educationText) {
    setText(nodes.educationText, labels[currentLanguage]["edu.summary.text"]);
  }
}

function renderContact() {
  if (nodes.contactEyebrow) {
    setText(nodes.contactEyebrow, labels[currentLanguage]["contact.eyebrow"]);
  }

  if (nodes.contactTitle) {
    setText(nodes.contactTitle, labels[currentLanguage]["contact.title"]);
  }

  if (nodes.contactText && state.profile) {
    setText(nodes.contactText, localized(state.profile.contact.text));
  }
}

function renderAll() {
  renderTranslations();
  renderHero();
  renderAbout();
  renderExperience();
  renderStack();
  renderProjects();
  renderCertificates();
  renderContact();
}

async function bootstrap() {
  try {
    await loadData();
  } catch {
    state.profile = null;
    state.experience = [];
    state.stack = [];
    state.projects = [];
    state.certificates = [];
  }

  renderAll();
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.dataset.lang;
    window.localStorage.setItem("portfolio-lang", lang);
    currentLanguage = lang;
    renderAll();
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0.18,
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-visible");
  });
}

bootstrap();
