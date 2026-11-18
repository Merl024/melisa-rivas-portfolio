(function () {
  "use strict";

  const DATA = window.PORTFOLIO;

  if (!DATA) {
    console.error("No se encontró window.PORTFOLIO. ¿Se cargó data.js antes que main.js?");
    return;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function pad(number) {
    return String(number).padStart(2, "0");
  }

  function renderTags(tags) {
    return tags.map((tag) => `<li class="tag">${escapeHTML(tag)}</li>`).join("");
  }

  function mount(name, html) {
    const container = document.querySelector(`[data-render="${name}"]`);
    if (container) container.innerHTML = html;
  }

  const ICONS = {
    ticketType:
      '<svg viewBox="0 0 24 24" class="icon ticket__type-icon" aria-hidden="true" focusable="false"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 12l2 2 4-4"/></svg>',
    arrowDown:
      '<svg viewBox="0 0 24 24" class="icon" aria-hidden="true" focusable="false"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
    download:
      '<svg viewBox="0 0 24 24" class="icon" aria-hidden="true" focusable="false"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    file:
      '<svg viewBox="0 0 24 24" class="icon" aria-hidden="true" focusable="false"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" class="icon" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    external:
      '<svg viewBox="0 0 24 24" class="icon" aria-hidden="true" focusable="false"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    star:
      '<svg viewBox="0 0 24 24" class="icon icon--sm" aria-hidden="true" focusable="false"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
  };

  function statusBadgeClass(status) {
    const map = { done: "badge--green", "in-progress": "badge--accent" };
    return map[slugify(status)] || "badge--neutral";
  }

  const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function getCurrentTheme() {
    const explicit = document.documentElement.getAttribute("data-theme");
    if (explicit === "light" || explicit === "dark") return explicit;
    return themeQuery.matches ? "dark" : "light";
  }

  function syncThemeUI() {
    const theme = getCurrentTheme();
    const button = document.getElementById("theme-toggle");
    const next = theme === "dark" ? "claro" : "oscuro";
    button.setAttribute("aria-label", `Cambiar a modo ${next}`);
    button.setAttribute("title", `Cambiar a modo ${next}`);

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute("content", theme === "dark" ? "#11130F" : "#F6EEE1");
  }

  function initTheme() {
    const button = document.getElementById("theme-toggle");

    button.addEventListener("click", () => {
      const next = getCurrentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {

      }
      syncThemeUI();
    });

    themeQuery.addEventListener("change", syncThemeUI);
    syncThemeUI();
  }

  function initTabs() {
    const links = Array.from(document.querySelectorAll(".nav__link"));

    const linkBySection = new Map();
    links.forEach((link) => {
      (link.dataset.sections || "").split(/\s+/).filter(Boolean).forEach((id) => {
        linkBySection.set(id, link);
      });
    });

    function setActive(sectionId) {
      const active = linkBySection.get(sectionId) || null;
      links.forEach((link) => {
        if (link === active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }

    const sections = Array.from(document.querySelectorAll("main > section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initMobileMenu() {
    const topbar = document.querySelector(".topbar");
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");
    if (!topbar || !toggle || !menu) return;

    const mobileQuery = window.matchMedia("(max-width: 720px)");
    topbar.classList.add("has-menu");

    function setOpen(open, { focusToggle = false } = {}) {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      if (focusToggle) toggle.focus();
    }

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      setOpen(open);
      if (open) menu.querySelector(".nav__link")?.focus();
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest(".nav__link")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false, { focusToggle: true });
      }
    });

    document.addEventListener("click", (event) => {
      if (menu.classList.contains("is-open") && !topbar.contains(event.target)) setOpen(false);
    });

    mobileQuery.addEventListener("change", (event) => {
      if (!event.matches) setOpen(false);
    });
  }

  function renderHero() {
    const p = DATA.profile;
    const container = document.getElementById("hero-ticket");

    const nameParts = p.name.trim().split(/\s+/);
    const lastName = nameParts.length > 1 ? nameParts.pop() : "";
    const firstName = nameParts.join(" ");

    const cvButton = p.cv
      ? `<a class="btn btn--secondary" href="${escapeHTML(p.cv)}" download>${ICONS.download}Descargar CV</a>`
      : "";

    container.innerHTML = `
      <div class="ticket__main">
        <p class="ticket__crumbs">
          <span>Portafolio</span><span aria-hidden="true">/</span><span>Perfil</span>
          <span aria-hidden="true">/</span>
          <span class="ticket-id">${escapeHTML(p.id)}</span>
        </p>

        <h1 class="ticket__title" id="hero-title">
          <span class="ticket__title-main">${escapeHTML(firstName)}</span>
          <span class="ticket__title-echo">${escapeHTML(lastName)}</span>
        </h1>
        ${p.role ? `<p class="ticket__type">${ICONS.ticketType}<span>${escapeHTML(p.role)}</span></p>` : ""}

        <p class="ticket__summary">${escapeHTML(p.summary)}</p>

        <div class="ticket__actions">
          <a class="btn btn--primary" href="#proyectos">Ver proyectos ${ICONS.arrowDown}</a>
          <a class="btn btn--secondary" href="#contacto">Contactar</a>
          ${cvButton}
        </div>
      </div>

      <aside class="ticket__aside" aria-label="Detalles del ticket">
        <figure class="ticket__photo">
          <img
            src="${escapeHTML(p.photo.src)}"
            alt="${escapeHTML(p.photo.alt)}"
            width="${p.photo.width}"
            height="${p.photo.height}"
            style="object-position: ${escapeHTML(p.photo.position || "center")}"
            fetchpriority="high"
          />
          <figcaption class="photo-tag">${escapeHTML(p.id)} · Asignada</figcaption>
        </figure>

        <div class="ticket__meta">
          <dl class="meta-list">
            <div class="meta-list__full">
              <dt>Nombre completo</dt>
              <dd>${escapeHTML(p.fullName || p.name)}</dd>
            </div>
            <div class="meta-list__full">
              <dt>Graduación</dt>
              <dd class="mono">${escapeHTML(p.graduation)}</dd>
            </div>
            <div class="meta-list__full">
              <dt>Etiquetas</dt>
              <dd><ul class="tag-list">${renderTags(p.tags)}</ul></dd>
            </div>
            <div class="meta-list__full">
              <dt>Ubicación</dt>
              <dd>${escapeHTML(p.location)}</dd>
            </div>
            <div class="meta-list__full">
              <dt>Idiomas</dt>
              <dd>${escapeHTML(p.languages)}</dd>
            </div>
          </dl>
        </div>
      </aside>
    `;
  }

  function renderAbout() {
    const about = DATA.about;
    const photo = about.photo;

    const figure = photo
      ? `
        <figure class="figure">
          <img
            src="${escapeHTML(photo.src)}"
            alt="${escapeHTML(photo.alt)}"
            width="${photo.width}"
            height="${photo.height}"
            loading="lazy"
            decoding="async"
          />
          <figcaption><span>FIG. 01</span><span>${escapeHTML(photo.caption)}</span></figcaption>
        </figure>`
      : "";

    mount(
      "about",
      `
      <div class="about">
        <div class="about__text">
          ${about.paragraphs.map((text) => `<p>${escapeHTML(text)}</p>`).join("")}
        </div>
        ${figure}
      </div>`
    );
  }

  function renderSkills() {
    const rows = DATA.skills
      .map(
        (group, index) => `
        <div class="fields__row">
          <div class="fields__label">
            <span class="fields__key">COMP-${pad(index + 1)}</span>
            <h3 class="fields__name">${escapeHTML(group.group)}</h3>
          </div>
          <ul class="tag-list" aria-label="${escapeHTML(group.group)}">${renderTags(group.items)}</ul>
        </div>`
      )
      .join("");

    mount("skills", `<div class="fields">${rows}</div>`);
  }

  function renderActivity() {

    const typeBadge = {
      internship: "badge--accent",
      academic: "badge--green",
      education: "badge--neutral",
    };

    const items = DATA.activity
      .map((item) => {
        const highlights = item.highlights && item.highlights.length ? item.highlights : [];
        const hasDetail = Boolean(item.description) || highlights.length > 0;

        const summaryInner = `
          <span class="tl-when">
            <span class="tl-dates">${escapeHTML(item.dates)}</span>
            <span class="badge ${typeBadge[item.type] || "badge--neutral"}">${escapeHTML(item.mode)}</span>
          </span>
          <span class="tl-main">
            <span class="tl-role">${escapeHTML(item.role)}</span>
            <span class="tl-org">${escapeHTML(item.org)}</span>
            ${item.summary ? `<span class="tl-line">${escapeHTML(item.summary)}</span>` : ""}
          </span>`;

        if (!hasDetail) {
          return `
          <li class="tl-item">
            <div class="tl-summary tl-summary--static">${summaryInner}</div>
          </li>`;
        }

        const description = item.description ? `<p>${escapeHTML(item.description)}</p>` : "";
        const list = highlights.length
          ? `<ul>${highlights.map((h) => `<li>${escapeHTML(h)}</li>`).join("")}</ul>`
          : "";

        return `
          <li class="tl-item">
            <details>
              <summary class="tl-summary">
                ${summaryInner}
                <span class="tl-toggle">Detalles</span>
              </summary>
              <div class="tl-detail">
                ${description}
                ${list}
              </div>
            </details>
          </li>`;
      })
      .join("");

    mount("activity", `<ol class="timeline">${items}</ol>`);
  }

  function renderCertifications() {
    const items = DATA.certifications
      .map((cert) => {
        const meta = [cert.issuer, cert.year].filter(Boolean).join(" · ");
        const inner = `
          <span class="attachment__icon">${ICONS.file}</span>
          <span>
            <span class="attachment__name">${escapeHTML(cert.name)}</span>
            <span class="attachment__meta">${escapeHTML(meta)}</span>
          </span>`;

        const body = cert.url
          ? `<a class="attachment" href="${escapeHTML(cert.url)}" target="_blank" rel="noopener noreferrer">${inner}<span class="visually-hidden">(abre en una pestaña nueva)</span></a>`
          : `<div class="attachment">${inner}</div>`;

        return `<li>${body}</li>`;
      })
      .join("");

    mount("certifications", `<ul class="attachments">${items}</ul>`);
  }

  function renderWorkflow() {
    const steps = DATA.workflow
      .map(
        (step, index) => `
        <li class="flow__step">
          <span class="flow__num" aria-hidden="true">${pad(index + 1)}</span>
          <span class="badge state--${slugify(step.state)}">${escapeHTML(step.state)}</span>
          <p>${escapeHTML(step.description)}</p>
        </li>`
      )
      .join("");

    mount("workflow", `<ol class="flow">${steps}</ol>`);
  }

  const CARD_TECH_LIMIT = 4;

  function renderCard(project) {
    const visibleTech = project.tech.slice(0, CARD_TECH_LIMIT);
    const hiddenCount = project.tech.length - visibleTech.length;
    const featured = project.featured
      ? `<span class="badge badge--accent">${ICONS.star}Destacado</span>`
      : "";

    return `
      <li data-tags="${escapeHTML(project.tags.join("|"))}">
        <button
          type="button"
          class="card"
          data-project="${escapeHTML(project.id)}"
          aria-haspopup="dialog"
          aria-label="Ver ficha de ${escapeHTML(project.id)} · ${escapeHTML(project.title)}"
        >
          <span class="card__top">
            <span class="ticket-id">${escapeHTML(project.id)}</span>
            <span class="card__badges">
              ${featured}
              <span class="badge ${statusBadgeClass(project.status)}">${escapeHTML(project.status)}</span>
            </span>
          </span>
          <span class="card__title">${escapeHTML(project.title)}</span>
          <span class="card__summary">${escapeHTML(project.summary || "")}</span>
          <span class="card__labels">
            ${project.tags.map((tag) => `<span class="label">${escapeHTML(tag)}</span>`).join("")}
          </span>
          <span class="tag-list">
            ${visibleTech.map((tech) => `<span class="tag">${escapeHTML(tech)}</span>`).join("")}
            ${hiddenCount > 0 ? `<span class="tag">+${hiddenCount}</span>` : ""}
          </span>
          <span class="card__more">Ver ficha técnica →</span>
        </button>
      </li>`;
  }

  function renderBoard() {
    const { filters, columns } = DATA.board;

    const filterButtons = ["Todos", ...filters]
      .map(
        (filter, index) => `
        <button type="button" class="filter" data-filter="${index === 0 ? "" : escapeHTML(filter)}" aria-pressed="${index === 0}">
          ${escapeHTML(filter)}
        </button>`
      )
      .join("");

    const columnsHTML = columns
      .map((column) => {
        const projects = DATA.projects.filter((p) => p.column === column.id);
        return `
          <section class="column" aria-labelledby="col-${escapeHTML(column.id)}">
            <header class="column__head">
              <h3 id="col-${escapeHTML(column.id)}">${escapeHTML(column.title)}</h3>
              <span class="column__count">${projects.length}</span>
            </header>
            <ul class="column__list">${projects.map(renderCard).join("")}</ul>
            <p class="column__empty" hidden>Sin tickets con esta etiqueta</p>
          </section>`;
      })
      .join("");

    mount(
      "board",
      `
      <div class="filters" role="group" aria-label="Filtrar proyectos por etiqueta">
        <span class="filters__label">Etiqueta</span>
        ${filterButtons}
      </div>
      <p class="board__status" id="board-status" aria-live="polite"></p>
      <div class="board">${columnsHTML}</div>`
    );
  }

  function initFilters() {
    const root = document.querySelector('[data-render="board"]');
    if (!root) return;

    const buttons = Array.from(root.querySelectorAll(".filter"));
    const status = root.querySelector("#board-status");

    function apply(filter) {
      let visible = 0;

      root.querySelectorAll(".column").forEach((column) => {
        let columnVisible = 0;
        column.querySelectorAll("li[data-tags]").forEach((item) => {
          const matches = !filter || item.dataset.tags.split("|").includes(filter);
          item.hidden = !matches;
          if (matches) columnVisible += 1;
        });
        column.querySelector(".column__count").textContent = columnVisible;
        column.querySelector(".column__empty").hidden = columnVisible > 0;
        visible += columnVisible;
      });

      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === filter)));
      const total = DATA.projects.length;
      status.textContent = filter
        ? `Mostrando ${visible} de ${total} proyectos con la etiqueta ${filter}`
        : `Mostrando los ${total} proyectos`;
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => apply(button.dataset.filter));
    });

    apply("");
  }

  function renderPanelContent(project) {
    const note = project.note
      ? `<p class="panel__note">${ICONS.star}<span>${escapeHTML(project.note)}</span></p>`
      : "";

    const links = (project.links || [])
      .map(
        (link, index) => `
        <a class="btn ${index === 0 ? "btn--primary" : "btn--secondary"}" href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">
          ${escapeHTML(link.label)} ${ICONS.external}
          <span class="visually-hidden">(abre en una pestaña nueva)</span>
        </a>`
      )
      .join("");

    return `
      <div class="panel__bar">
        <div class="panel__ids">
          <span class="ticket-id">${escapeHTML(project.id)}</span>
          <span class="badge ${statusBadgeClass(project.status)}">${escapeHTML(project.status)}</span>
        </div>
        <button type="button" class="icon-btn" data-close-panel aria-label="Cerrar ficha">${ICONS.close}</button>
      </div>

      <h2 class="panel__title" id="panel-title">${escapeHTML(project.title)}</h2>
      ${project.summary ? `<p class="panel__summary">${escapeHTML(project.summary)}</p>` : ""}
      <ul class="tag-list panel__labels" aria-label="Etiquetas">
        ${project.tags.map((tag) => `<li class="label">${escapeHTML(tag)}</li>`).join("")}
      </ul>
      ${note}

      <dl class="panel__facts">
        <div>
          <dt>Duración</dt>
          <dd>${escapeHTML(project.duration)}</dd>
        </div>
        <div>
          <dt>Participación</dt>
          <dd>${escapeHTML(project.participation)}</dd>
        </div>
      </dl>

      <section class="panel__section">
        <h3>Rol</h3>
        <p>${escapeHTML(project.role)}</p>
      </section>

      <section class="panel__section">
        <h3>Tecnologías</h3>
        <ul class="tag-list">${renderTags(project.tech)}</ul>
      </section>

      <section class="panel__section">
        <h3>Retos técnicos</h3>
        <p>${escapeHTML(project.challenges)}</p>
      </section>

      ${links ? `<section class="panel__section"><h3>Enlaces</h3><div class="panel__links">${links}</div></section>` : ""}
    `;
  }

  function initPanel() {
    const panel = document.getElementById("project-panel");
    const inner = panel.querySelector(".panel__inner");
    let trigger = null;

    function open(projectId, sourceButton) {
      const project = DATA.projects.find((p) => p.id === projectId);
      if (!project) return;

      trigger = sourceButton;
      inner.innerHTML = renderPanelContent(project);
      panel.showModal();
      inner.scrollTop = 0;
      panel.scrollTop = 0;
      panel.querySelector("[data-close-panel]").focus();
    }

    document.addEventListener("click", (event) => {
      const card = event.target.closest(".card[data-project]");
      if (card) open(card.dataset.project, card);
    });

    panel.addEventListener("click", (event) => {
      if (event.target.closest("[data-close-panel]")) {
        panel.close();
        return;
      }

      if (event.target === panel) panel.close();
    });

    panel.addEventListener("close", () => {
      if (trigger) trigger.focus();
      trigger = null;
    });
  }

  function buildMailto(contact) {
    const params = new URLSearchParams({
      subject: contact.emailSubject || "",
      body: (contact.emailBody || []).join("\n"),
    });

    return `mailto:${contact.email}?${params.toString().replace(/\+/g, "%20")}`;
  }

  function renderContact() {
    const c = DATA.contact;

    const fields = [
      { label: "Correo", text: c.email, url: `mailto:${c.email}`, external: false },
      ...c.links.map((link) => ({
        label: link.label,

        text: link.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
        url: link.url,
        external: true,
      })),
    ];

    const fieldRows = fields
      .map(
        (f) => `
        <div class="contact__field">
          <dt>${escapeHTML(f.label)}</dt>
          <dd>
            <a href="${escapeHTML(f.url)}" ${f.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
              ${escapeHTML(f.text)}${f.external ? `${ICONS.external}<span class="visually-hidden">(abre en una pestaña nueva)</span>` : ""}
            </a>
          </dd>
        </div>`
      )
      .join("");

    const photo = c.photo
      ? `
        <figure class="figure contact__photo">
          <img src="${escapeHTML(c.photo.src)}" alt="${escapeHTML(c.photo.alt)}"
               width="${c.photo.width}" height="${c.photo.height}" loading="lazy" decoding="async" />
          <figcaption><span>FIG. 02</span><span>${escapeHTML(c.photo.caption)}</span></figcaption>
        </figure>`
      : "";

    mount(
      "contact",
      `
      <div class="contact">
        <div class="contact__main">
          <p class="contact__title">${escapeHTML(c.title)}</p>
          <p class="contact__text">${escapeHTML(c.text)}</p>

          <div class="contact__actions">
            <a class="btn btn--primary" href="${escapeHTML(buildMailto(c))}">+ Create issue</a>
            <button type="button" class="btn btn--secondary" id="copy-email">Copiar correo</button>
          </div>
          <p class="contact__feedback" id="copy-feedback" role="status" aria-live="polite"></p>

          <dl class="contact__fields">${fieldRows}</dl>
        </div>
        ${photo}
      </div>`
    );
  }

  function initCopyEmail() {
    const button = document.getElementById("copy-email");
    const feedback = document.getElementById("copy-feedback");
    if (!button) return;

    function legacyCopy(text) {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {
        ok = false;
      }
      field.remove();
      return ok;
    }

    async function copy(text) {
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await Promise.race([
            navigator.clipboard.writeText(text),
            new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 1500)),
          ]);
          return true;
        } catch (e) {

        }
      }
      return legacyCopy(text);
    }

    let timer;
    button.addEventListener("click", async () => {
      const email = DATA.contact.email;
      const ok = await copy(email);

      feedback.textContent = ok ? `Correo copiado: ${email}` : `No se pudo copiar. Mi correo es ${email}`;
      clearTimeout(timer);
      timer = setTimeout(() => (feedback.textContent = ""), 4000);
    });
  }

  function init() {
    renderHero();
    renderAbout();
    renderSkills();
    renderBoard();
    renderActivity();
    renderCertifications();
    renderWorkflow();
    renderContact();

    initTheme();
    initTabs();
    initMobileMenu();
    initFilters();
    initPanel();
    initCopyEmail();

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  init();
})();
