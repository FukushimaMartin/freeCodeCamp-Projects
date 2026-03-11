function renderCourse(containerSelector, modules){

  const container = document.querySelector(containerSelector);

  const svgNS = "http://www.w3.org/2000/svg";

  modules.forEach(module => {

    const details = document.createElement("details");
    details.className = "module";

    const summary = document.createElement("summary");

    const moduleIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="map-icon">
      <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"></path>
    </svg>
    `;

    //Project case
    if(module.project){

      summary.innerHTML = `
        <div class="module-left">
          ${moduleIcon}
          <span class="module-title">${module.module}</span>
        </div>

        <div class="module-right">
          <span class="badge ${module.type.toLowerCase()}">${module.type} Project</span>
        </div>
      `;

      details.appendChild(summary);
      container.appendChild(details);
      return;
    }

    // Regular case
    summary.innerHTML = `
      <div class="module-left">
        ${moduleIcon}
        <span class="module-title">${module.module}</span>
      </div>

      <div class="module-right">
        <span class="arrow"></span>
      </div>
    `;

    const ul = document.createElement("ul");
    ul.className = "lesson-list";

    module.lessons.forEach(lesson => {

      const li = document.createElement("li");
      li.className = "module lesson";

      const left = document.createElement("div");
      left.className = "module-left";

      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox","0 0 36 36");
      svg.classList.add("lesson-icon");

      const circle = document.createElementNS(svgNS,"circle");
      circle.setAttribute("cx","18");
      circle.setAttribute("cy","18");
      circle.setAttribute("r","12");
      circle.setAttribute("fill","#fff");

      const check = document.createElementNS(svgNS,"path");
      check.setAttribute("d","M25.23 15.84a1.4 1.4 0 0 0-2-2l-6.77 6.77L13 17.16a1.4 1.4 0 0 0-2 2l5.45 5.45Z");
      check.setAttribute("fill","var(--bg)");

      svg.appendChild(circle);
      svg.appendChild(check);

      const title = document.createElement("span");
      title.className = "module-title";
      title.textContent = lesson.title;

      left.appendChild(svg);
      left.appendChild(title);

      const right = document.createElement("div");
      right.className = "module-right";

      const badge = document.createElement("span");
      badge.className = `badge ${lesson.type.toLowerCase()}`;
      badge.textContent = lesson.type;

      right.appendChild(badge);

      li.appendChild(left);
      li.appendChild(right);

      ul.appendChild(li);

    });

    details.appendChild(summary);
    details.appendChild(ul);

    container.appendChild(details);

  });

}