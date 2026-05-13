/**
 * CourseRenderer.js
 * Renders a list of course modules with expandable lesson lists.
 */
function renderCourse(containerSelector, modules, courseId) {

  const container = document.querySelector(containerSelector);
  const svgNS = "http://www.w3.org/2000/svg";

  let moduleIcon;

  if (courseId === "css"){
    moduleIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="map-icon">
        <path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3 .1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2 .1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z"></path>
      </svg>
    `;
  } else {
    moduleIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="map-icon">
        <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/>
      </svg>
    `;
  }
  

  modules.forEach(module => {

    const details = document.createElement("details");
    details.className = "module";

    const summary = document.createElement("summary");

    // ── Project / Certification module ──────────────────────────────────────
    if (module.project) {
      const wrapper = document.createElement("div");
      wrapper.className = "module";

      if (module.id) {
        // Clickable — links to its lesson
        const link = document.createElement("a");
        link.href = `../lessons/lesson.html?id=${module.id}&course=${courseId || "responsive-web-design"}`;
        link.className = "module-link";
        link.innerHTML = `
          <div class="module-left">
            ${moduleIcon}
            <span class="module-title">${module.module}</span>
          </div>
          <div class="module-right">
            <span class="badge ${module.type.toLowerCase()}">${module.type} Project</span>
          </div>
        `;
        wrapper.appendChild(link);
      } else {
        // No lesson yet — static display
        wrapper.innerHTML = `
          <div class="module-summary">
            <div class="module-left">
              ${moduleIcon}
              <span class="module-title">${module.module}</span>
            </div>
            <div class="module-right">
              <span class="badge ${module.type.toLowerCase()}">${module.type} Project</span>
            </div>
          </div>
        `;
      }

      container.appendChild(wrapper);
      return;
    }

    // ── Regular module with no lessons yet (coming soon) ───────────────────
    if (!module.lessons || module.lessons.length === 0) {
      summary.innerHTML = `
        <div class="module-left">
          ${moduleIcon}
          <span class="module-title">${module.module}</span>
        </div>
        <div class="module-right">
          <span class="badge coming-soon">Coming soon</span>
        </div>
      `;
      details.appendChild(summary);
      container.appendChild(details);
      return;
    }

    // ── Regular module with lessons ─────────────────────────────────────────
    summary.innerHTML = `
      <div class="module-left">
        ${moduleIcon}
        <span class="module-title">${module.module}</span>
      </div>
      <div class="module-right">
        <span class="lesson-count">${module.lessons.length} lessons</span>
        <span class="arrow"></span>
      </div>
    `;

    const ul = document.createElement("ul");
    ul.className = "lesson-list";

    module.lessons.forEach(lesson => {

      const li   = document.createElement("li");
      li.className = "module lesson";

      const link = document.createElement("a");
      // Path is relative to the course HTML file location
      link.href      = `../lessons/lesson.html?id=${lesson.id}&course=${courseId || "responsive-web-design"}`;
      link.className = "lesson-link";
      link.addEventListener("click", () => {
        sessionStorage.setItem(`last-lesson-${courseId}`, lesson.id);
      });

      // Left side
      const left = document.createElement("div");
      left.className = "module-left";

      const svg    = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 36 36");
      svg.classList.add("lesson-icon");

      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", "18");
      circle.setAttribute("cy", "18");
      circle.setAttribute("r", "12");
      circle.setAttribute("fill", "#fff");

      const check = document.createElementNS(svgNS, "path");
      check.setAttribute("d", "M25.23 15.84a1.4 1.4 0 0 0-2-2l-6.77 6.77L13 17.16a1.4 1.4 0 0 0-2 2l5.45 5.45Z");
      check.setAttribute("fill", "var(--bg)");

      svg.appendChild(circle);
      svg.appendChild(check);

      const title = document.createElement("span");
      title.className  = "module-title";
      title.textContent = lesson.title;

      left.appendChild(svg);
      left.appendChild(title);

      // Right side
      const right  = document.createElement("div");
      right.className = "module-right";

      const badge  = document.createElement("span");
      badge.className  = `badge ${lesson.type.toLowerCase()}`;
      badge.textContent = lesson.type;

      right.appendChild(badge);

      link.appendChild(left);
      link.appendChild(right);
      li.appendChild(link);
      ul.appendChild(li);
    });

    details.appendChild(summary);
    details.appendChild(ul);
    container.appendChild(details);

    // Restore: only open the module matching the last visited lesson
    const lastId  = sessionStorage.getItem(`last-lesson-${courseId}`);
    const inThis  = module.lessons.some(l => l.id === lastId);
    if (inThis) {
      details.open = true;
      // After render, scroll to and highlight the last lesson link
      requestAnimationFrame(() => {
        const link = ul.querySelector(`a[href*="${lastId}"]`);
        if (link) {
          link.closest("li").classList.add("lesson-last-visited");
          link.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    }
  });
}
