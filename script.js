const year = document.getElementById("year");
const langButtons = document.querySelectorAll(".lang-btn");
const translatable = document.querySelectorAll("[data-i18n]");
const scrollTopButton = document.querySelector(".scroll-top");

const nodes = {
  certificateCount: document.getElementById("certificate-count"),
  educationSectionEyebrow: document.querySelector("#education .section-title .eyebrow"),
  educationTitle: document.querySelector("#education .section-title h2"),
  educationSubtitle: document.querySelector("#education .section-note"),
  educationList: document.getElementById("education-list"),
  languagesList: document.getElementById("languages-list"),
  certificatesCount: document.getElementById("education-count"),
  certificatesTitle: document.querySelector("#certificates .section-title h2"),
  certificatesSubtitle: document.querySelector("#certificates .section-note"),
  certificatesLabel: document.querySelector("#certificates .panel-label"),
  certificatesList: document.getElementById("certificates-list"),
  heroEyebrow: document.querySelector(".hero-copy .eyebrow"),
  heroTitle: document.querySelector(".hero-copy h1"),
  heroSubtitle: document.querySelector(".name-subtitle"),
  heroFocusLabel: document.querySelector(".panel-card-main .panel-label"),
  heroFocusTitle: document.querySelector(".panel-card-main h2"),
  heroFocusText: document.querySelector(".panel-card-main p:last-of-type"),
  experienceTitle: document.querySelector("#experience .section-title h2"),
  experienceTimeline: document.querySelector("#experience .timeline"),
  stackTitle: document.querySelector("#stack .section-title h2"),
  stackSubtitle: document.querySelector("#stack .section-note"),
  stackGrid: document.querySelector("#stack .stack-grid"),
  projectsTitle: document.querySelector("#projects .section-title h2"),
  projectsGrid: document.querySelector("#projects .projects"),
  contactTitle: document.querySelector("#contact h2"),
  contactEyebrow: document.querySelector("#contact .eyebrow"),
};

const labels = {
  ru: {
    "nav.experience": "Опыт",
    "nav.languages": "Языки",
    "nav.projects": "Проекты",
    "nav.stack": "Стек",
    "nav.education": "Образование",
    "nav.certificates": "Сертификаты",
    "nav.contact": "Контакты",
    "stats.repos.label": "Репозитории",
    "stats.companies.label": "Компании",
    "stats.certificates.label": "Сертификаты",
    "stats.role.label": "Роль",
    "stats.role.value": "Senior+ / Lead backend engineer",
    "hero.github": "GitHub",
    "hero.gitlab": "GitLab",
    "hero.projects": "Смотреть проекты",
    "hero.subtitle": "Senior+ / Lead backend engineer · Golang · Python · CV / ML",
    "hero.lead":
      "Senior+ / Lead backend engineer с 5+ годами опыта в разработке и масштабировании высоконагруженных распределённых систем. Сильная экспертиза в Golang, микросервисах, оптимизации производительности и observability. Опыт руководства командами, менторинга инженеров и повышения надёжности production-систем под высокой нагрузкой (до 10M RPS).",
    "hero.panel.focus.label": "Обо мне",
    "hero.panel.focus.title": "Senior+ / Lead backend engineer",
    "hero.panel.focus.text":
      "Golang, микросервисы, производительность, observability и надёжность. Инженерные задачи с измеримым результатом и ответственностью за продакшен.",
    "experience.eyebrow": "Опыт",
    "experience.title": "Опыт и ключевые результаты",
    "experience.subtitle": "Роли, проекты и вклад в продукт",
    "education.eyebrow": "Образование",
    "education.title": "Образование",
    "education.subtitle": "Математика и data science как база для backend и ML",
    "languages.eyebrow": "Языки",
    "languages.title": "Языки",
    "languages.subtitle": "Русский свободно, английский для работы и общения",
    "stack.eyebrow": "Стек",
    "stack.title": "Стек",
    "stack.subtitle": "Технологии, с которыми я работаю",
    "stack.chip.core": "Используется в продакшене",
    "stack.chip.support": "Вспомогательный инструмент",
    "projects.eyebrow": "Проекты",
    "projects.title": "Выбранные репозитории и инженерные кейсы",
    "projects.subtitle": "Репозитории, где видны подход к данным, backend и инженерной реализации",
    "projects.open": "Открыть",
    "edu.eyebrow": "Сертификаты",
    "edu.title": "Сертификаты и курсы",
    "edu.subtitle": "Подтверждённые курсы и сертификаты по основным направлениям",
    "edu.summary.label": "Всего",
    "contact.eyebrow": "Контакты",
    "contact.title": "Связаться со мной",
    "contact.text": "Если нужен контекст по опыту, сертификатам или проектам, напишите в Telegram, на email или откройте GitHub.",
    "contact.github": "Профиль GitHub",
    "scrollTop": "Наверх",
  },
  en: {
    "nav.experience": "Experience",
    "nav.languages": "Languages",
    "nav.projects": "Projects",
    "nav.stack": "Stack",
    "nav.education": "Education",
    "nav.certificates": "Certificates",
    "nav.contact": "Contact",
    "stats.repos.label": "Repos",
    "stats.companies.label": "Companies",
    "stats.certificates.label": "Certificates",
    "stats.role.label": "Role",
    "stats.role.value": "Senior+ / Lead backend engineer",
    "hero.github": "GitHub",
    "hero.gitlab": "GitLab",
    "hero.projects": "View projects",
    "hero.subtitle": "Senior+ / Lead backend engineer · Golang · Python · CV / ML",
    "hero.lead":
      "Senior+ / Lead backend engineer with 5+ years of experience building and scaling high-load distributed systems. Strong expertise in Golang, microservices, performance optimization, and observability. Experienced in leading teams, mentoring engineers, and improving reliability of production systems under heavy load (up to 10M RPS).",
    "hero.panel.focus.label": "About me",
    "hero.panel.focus.title": "Senior+ / Lead backend engineer",
    "hero.panel.focus.text":
      "Golang, microservices, performance, observability, and reliability. Engineering work with measurable results and production ownership.",
    "experience.eyebrow": "Experience",
    "experience.title": "Experience and key results",
    "experience.subtitle": "Roles, projects, and product impact",
    "education.eyebrow": "Education",
    "education.title": "Education",
    "education.subtitle": "Mathematics and data science as a base for backend and ML",
    "languages.eyebrow": "Languages",
    "languages.title": "Languages",
    "languages.subtitle": "Russian is fluent, English for work and communication",
    "stack.eyebrow": "Stack",
    "stack.title": "Stack",
    "stack.subtitle": "Technologies I work with",
    "stack.chip.core": "Used in production",
    "stack.chip.support": "Supporting tool",
    "projects.eyebrow": "Projects",
    "projects.title": "Selected repositories and engineering cases",
    "projects.subtitle": "Repositories that show data work, backend depth, and engineering execution",
    "projects.open": "Open",
    "edu.eyebrow": "Certificates",
    "edu.title": "Certificates and courses",
    "edu.subtitle": "Verified courses and certificates across core areas",
    "edu.summary.label": "Total",
    "contact.eyebrow": "Contact",
    "contact.title": "Get in touch",
    "contact.text": "If you need context on experience, certificates, or projects, reach out via Telegram, email, or GitHub.",
    "contact.github": "GitHub profile",
    "scrollTop": "Back to top",
  },
};

let currentLanguage = window.localStorage.getItem("portfolio-lang") || "ru";
const state = {
  profile: null,
  experience: [],
  education: [],
  languages: [],
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

function formatRussianCount(value, one, few, many) {
  const lastTwo = value % 100;
  const lastOne = value % 10;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return `${value} ${many}`;
  }

  if (lastOne === 1) {
    return `${value} ${one}`;
  }

  if (lastOne >= 2 && lastOne <= 4) {
    return `${value} ${few}`;
  }

  return `${value} ${many}`;
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }

  return response.json();
}

async function loadJsonOptional(path) {
  const response = await fetch(path);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }

  return response.json();
}

async function loadData() {
  const [profile, experience, education, languages, stack, projects, certificates] = await Promise.all([
    loadJson("data/profile.json"),
    loadJson("data/experience.json"),
    loadJsonOptional("data/education.json"),
    loadJsonOptional("data/languages.json"),
    loadJson("data/stack.json"),
    loadJson("data/projects.json"),
    loadJson("data/certificates.json"),
  ]);

  state.profile = profile;
  state.experience = Array.isArray(experience.items) ? experience.items : [];
  state.education = education && Array.isArray(education.items) ? education.items : [];
  state.languages = languages && Array.isArray(languages.items) ? languages.items : [];
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

  if (scrollTopButton) {
    scrollTopButton.setAttribute("aria-label", labels[currentLanguage].scrollTop);
    scrollTopButton.title = labels[currentLanguage].scrollTop;
  }

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
  setText(nodes.heroFocusLabel, localized(profile.panel.focus.label));
  setText(nodes.heroFocusTitle, localized(profile.panel.focus.title));
  setText(nodes.heroFocusText, localized(profile.panel.focus.text));

  if (nodes.certificateCount) {
    nodes.certificateCount.textContent = String(state.certificates.length);
  }
}

function renderEducation() {
  if (nodes.educationSectionEyebrow) {
    setText(nodes.educationSectionEyebrow, labels[currentLanguage]["education.eyebrow"]);
  }

  if (nodes.educationTitle) {
    setText(nodes.educationTitle, labels[currentLanguage]["education.title"]);
  }

  if (nodes.educationSubtitle) {
    setText(nodes.educationSubtitle, labels[currentLanguage]["education.subtitle"]);
  }

  if (nodes.educationList) {
    const fallbackEducation = [
      {
        institution: { ru: "MISIS", en: "MISIS" },
        degree: { ru: "MSc in Data Science", en: "MSc in Data Science" },
        year: "2024",
        description: {
          ru: "Фокус на machine learning, анализе данных и обработке больших данных.",
          en: "Focused on machine learning, data analysis, and large-scale data processing.",
        },
      },
      {
        institution: { ru: "MISIS", en: "MISIS" },
        degree: { ru: "BSc in Applied Mathematics", en: "BSc in Applied Mathematics" },
        year: "2022",
        description: {
          ru: "Сильная база: математика, теория вероятностей и статистика.",
          en: "Strong foundation in mathematics, probability theory, and statistics.",
        },
      },
    ];

    const items = state.education.length ? state.education : fallbackEducation;

    nodes.educationList.innerHTML = items
      .map((item, index) => {
        const institution = localized(item.institution || item.school);
        const degree = localized(item.degree || item.title || item.institution || item.school);
        const year = item.year ? String(item.year) : "";
        const description = localized(item.description || item.text);
        const featuredClass = index === 0 ? " education-item-featured" : "";
        const institutionBlock = institution ? `<p class="education-institution">${institution}</p>` : "";
        const yearBlock = year ? `<p class="education-year">${year}</p>` : "";

        return `
          <div class="education-item${featuredClass}">
            ${institutionBlock}
            <h3>${degree}</h3>
            ${yearBlock}
            ${description ? `<p class="education-text">${description}</p>` : ""}
          </div>
        `;
      })
      .join("");
  }

  if (nodes.languagesList) {
    const fallbackLanguages = [
      { name: { ru: "Russian", en: "Russian" }, level: { ru: "Native", en: "Native" } },
      { name: { ru: "English", en: "English" }, level: { ru: "Upper-Intermediate (B2)", en: "Upper-Intermediate (B2)" } },
    ];

    const items = state.languages.length ? state.languages : fallbackLanguages;

    nodes.languagesList.innerHTML = items
      .map((item, index) => {
        const name = localized(item.name);
        const level = localized(item.level);
        return `
          <li class="language-item${index === 0 ? " language-item-primary" : ""}">
            <span class="language-name">${name}</span>
            <span class="language-level">${level}</span>
          </li>
        `;
      })
      .join("");
  }
}

function countryLabel(country) {
  if (country === "Cyprus") {
    return { flag: "🇨🇾", ru: "Кипр", en: "Cyprus" };
  }

  if (country === "Russia") {
    return { flag: "🇷🇺", ru: "РФ", en: "Russia" };
  }

  return { flag: "🌍", ru: country, en: country };
}

function normalizeCompany(company) {
  return company;
}

function formatPeriod(period) {
  if (typeof period !== "string" || period.trim() === "") {
    return "";
  }

  if (currentLanguage !== "ru") {
    return period;
  }

  const monthMap = {
    Jan: "янв",
    Feb: "фев",
    Mar: "мар",
    Apr: "апр",
    May: "май",
    Jun: "июн",
    Jul: "июл",
    Aug: "авг",
    Sep: "сен",
    Oct: "окт",
    Nov: "ноя",
    Dec: "дек",
  };

  return period
    .replace(/\bPresent\b/g, "н.в.")
    .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, (m) => monthMap[m] || m);
}

function renderExperience() {
  if (nodes.experienceTitle) {
    setText(nodes.experienceTitle, labels[currentLanguage]["experience.title"]);
  }

  if (!nodes.experienceTimeline) {
    return;
  }

  nodes.experienceTimeline.innerHTML = state.experience
    .filter((item) => item && item.country !== "Global" && item.company !== "GitHub")
    .map((item, index) => {
      const country = countryLabel(item.country);
      const company = normalizeCompany(item.company);
      const header = `${country.flag} ${currentLanguage === "ru" ? country.ru : country.en} - ${company}`;

      const period = formatPeriod(localized(item.period));
      const periodBlock = period ? `<p class="experience-period">${period}</p>` : "";
      const role = localized(item.role);
      const highlights = (item.highlights || []).slice();
      const links = (item.links || []).slice();

      const points = [role, ...highlights]
        .map((h) => {
          if (typeof h === "string") {
            return localized(h).trim();
          }

          if (h && typeof h === "object") {
            const text = localized(h.text || h.label || h);
            if (h.href) {
              return `<a href="${h.href}" target="_blank" rel="noreferrer">${text}</a>`;
            }
            return text;
          }

          return "";
        })
        .filter(Boolean);

      const list = points.map((text) => `<li>${text}</li>`).join("");
      const linksMarkup = links.length
        ? `
          <div class="experience-links">
            ${links
              .map((link) => {
                const text = localized(link.label || link.text || link);
                const href = link.href;
                if (!href || !text) {
                  return "";
                }

                return `<a class="experience-link" href="${href}" target="_blank" rel="noreferrer">${text}</a>`;
              })
              .filter(Boolean)
              .join("")}
          </div>
        `
        : "";

      const featuredClass = index === 0 ? " experience-item-featured" : "";

      return `
        <div class="experience-item${featuredClass}">
          <h3>${header}</h3>
          ${periodBlock}
          <ul>${list}</ul>
          ${linksMarkup}
        </div>
      `;
    })
    .join("");
}

function renderStack() {
  if (nodes.stackTitle) {
    setText(nodes.stackTitle, labels[currentLanguage]["stack.title"]);
  }

  if (nodes.stackSubtitle) {
    setText(nodes.stackSubtitle, labels[currentLanguage]["stack.subtitle"]);
  }

  if (!nodes.stackGrid) {
    return;
  }

  const items = state.stack.slice().sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

  nodes.stackGrid.innerHTML = items
    .map((group) => {
      const title = localized(group.title);
      const description = localized(group.description);
      const key = group.key ? ` data-stack-key="${group.key}"` : "";
      const featuredClass = group.featured ? " stack-card-featured" : "";
      const chips = (group.items || [])
        .map((item) => {
          const value = typeof item === "string" ? item : localized(item.name || item.label || item);
          const tier = typeof item === "string" ? "support" : item.tier || "support";
          const titleLabel = labels[currentLanguage][`stack.chip.${tier}`] || "";
          return `<span class="chip chip-${tier}"${titleLabel ? ` title="${titleLabel}"` : ""}>${value}</span>`;
        })
        .join("");

      return `
        <article class="stack-card${featuredClass}"${key}>
          <h3>${title}</h3>
          ${description ? `<p class="stack-card-note">${description}</p>` : ""}
          <div class="chips">
            ${chips}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderProjects() {
  if (nodes.projectsTitle) {
    setText(nodes.projectsTitle, labels[currentLanguage]["projects.title"]);
  }

  const projectsSubtitle = document.querySelector("#projects .section-note");
  if (projectsSubtitle) {
    setText(projectsSubtitle, labels[currentLanguage]["projects.subtitle"]);
  }

  if (!nodes.projectsGrid) {
    return;
  }

  nodes.projectsGrid.innerHTML = state.projects
    .map((project, index) => {
      const featuredClass = index === 0 || project.featured ? " project-card-featured" : "";
      const tags = Array.isArray(project.tags) ? project.tags : [];

      return `
        <article class="project-card${featuredClass} reveal">
          <div class="project-topline">
            <p class="project-index">${project.id}</p>
            ${featuredClass ? `<span class="project-badge">${currentLanguage === "en" ? "Featured" : "Выбранный кейс"}</span>` : ""}
          </div>
          <h3>${project.title}</h3>
          <p>${localized(project.description)}</p>
          <div class="project-tags">
            ${tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
          <a class="project-link" href="${project.href}" target="_blank" rel="noreferrer">${labels[currentLanguage]["projects.open"]}</a>
        </article>
      `;
    })
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

  if (nodes.certificatesCount) {
    nodes.certificatesCount.textContent =
      currentLanguage === "en"
        ? `${state.certificates.length} certificates`
        : formatRussianCount(state.certificates.length, "сертификат", "сертификата", "сертификатов");
  }

  if (nodes.certificatesTitle) {
    setText(nodes.certificatesTitle, labels[currentLanguage]["edu.title"]);
  }

  if (nodes.certificatesSubtitle) {
    setText(nodes.certificatesSubtitle, labels[currentLanguage]["edu.subtitle"]);
  }

  if (nodes.certificatesLabel) {
    setText(nodes.certificatesLabel, labels[currentLanguage]["edu.summary.label"]);
  }
}

function renderContact() {
  if (nodes.contactEyebrow) {
    setText(nodes.contactEyebrow, labels[currentLanguage]["contact.eyebrow"]);
  }

  if (nodes.contactTitle) {
    setText(nodes.contactTitle, labels[currentLanguage]["contact.title"]);
  }
}

function updateScrollTopButton() {
  if (!scrollTopButton) {
    return;
  }

  scrollTopButton.classList.toggle("is-visible", window.scrollY > 320);
}

function renderAll() {
  renderTranslations();
  renderHero();
  renderExperience();
  renderEducation();
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
    state.education = [];
    state.languages = [];
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

if (scrollTopButton) {
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

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

window.addEventListener("scroll", updateScrollTopButton, { passive: true });
updateScrollTopButton();

bootstrap();
