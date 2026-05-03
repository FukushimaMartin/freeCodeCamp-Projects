/**
 * lessonViewer.js
 * Handles: lesson loading, multi-file tabs, live code editor,
 * line numbers, real-time preview, reset.
 */

// ── STATE ────────────────────────────────────────────────────────────────────

const state = {
  lesson:          null,
  files:           {},   // { filename: currentContent }
  originals:       {},   // { filename: your completed code }
  activeFile:      null,
  previewDebounce: null,
};

// ── INIT ─────────────────────────────────────────────────────────────────────

async function init() {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get("id");
  const course = params.get("course") || "responsive-web-design";

  // Set back button to the correct course page
  const backBtn = document.getElementById("back-btn");
  if (backBtn) backBtn.href = `../courses/${course}.html`;

  if (!id) {
    showError("No lesson ID in the URL. Make sure the link includes ?id=your-lesson-id");
    return;
  }

  try {
    const res = await fetch(`../../../public/lessons/${id}/lesson.json`);
    if (!res.ok) throw new Error(`lesson.json not found for id="${id}" (HTTP ${res.status})`);
    state.lesson = await res.json();
  } catch (e) {
    showError(`Could not load lesson "<strong>${id}</strong>".<br><br>${e.message}`);
    return;
  }

  populateUI();
  buildTabs();
  setActiveFile(state.lesson.files[0].name);
  setupEditor();
  setupDividerDrag();
  setupButtons();
  runPreview();
}

function showError(msg) {
  document.body.innerHTML = `
    <div style="
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      height:100vh; font-family:system-ui,sans-serif; background:#0d0d1a; color:#e8e8f0;
      gap:16px; padding:32px; text-align:center;
    ">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f06292" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
      </svg>
      <h2 style="margin:0; color:#f06292;">Lesson not found</h2>
      <p style="margin:0; color:#7878a0; max-width:420px; line-height:1.6;">${msg}</p>
      <a href="javascript:history.back()" style="
        margin-top:8px; padding:8px 20px; border-radius:6px;
        background:#4f8ef7; color:#fff; text-decoration:none; font-weight:600;
      ">← Go back</a>
    </div>
  `;
}

// ── POPULATE UI ──────────────────────────────────────────────────────────────

function populateUI() {
  const { lesson } = state;

  document.title = lesson.title;
  el("breadcrumb-module").textContent  = lesson.module;
  el("breadcrumb-title").textContent   = lesson.title;
  el("lesson-badge").textContent       = lesson.type;
  el("lesson-badge").className         = `badge-type ${lesson.type.toLowerCase()}`;
  el("meta-module").textContent        = lesson.module;
  el("lesson-title").textContent       = lesson.title;
  el("lesson-description").textContent = lesson.description;

  const ul = el("objectives-list");
  ul.innerHTML = "";
  (lesson.objectives || []).forEach(obj => {
    const li = document.createElement("li");
    li.textContent = obj;
    ul.appendChild(li);
  });

  lesson.files.forEach(f => {
    state.files[f.name]     = f.content;
    state.originals[f.name] = f.content;
  });
}

// ── FILE TABS ─────────────────────────────────────────────────────────────────

function buildTabs() {
  const container = el("file-tabs");
  container.innerHTML = "";

  state.lesson.files.forEach(f => {
    const tab = document.createElement("div");
    tab.className = "file-tab";
    tab.dataset.file = f.name;

    const ext = f.name.split(".").pop();
    const dot = document.createElement("span");
    dot.className = `file-tab-dot dot-${ext}`;

    const name = document.createElement("span");
    name.textContent = f.name;

    tab.appendChild(dot);
    tab.appendChild(name);
    tab.addEventListener("click", () => setActiveFile(f.name));
    container.appendChild(tab);
  });
}

function setActiveFile(filename) {
  if (state.activeFile) {
    state.files[state.activeFile] = el("code-editor").value;
  }

  state.activeFile = filename;

  document.querySelectorAll(".file-tab").forEach(t => {
    t.classList.toggle("active", t.dataset.file === filename);
  });

  el("code-editor").value = state.files[filename] || "";
  updateLineNumbers();
  runPreview();
}

// ── EDITOR ───────────────────────────────────────────────────────────────────

function setupEditor() {
  const editor = el("code-editor");

  editor.addEventListener("input", () => {
    state.files[state.activeFile] = editor.value;
    updateLineNumbers();
    schedulePreview();
  });

  editor.addEventListener("keydown", e => {
    if (e.key === "Tab") {
      e.preventDefault();
      const s      = editor.selectionStart;
      const indent = "  ";
      editor.value = editor.value.slice(0, s) + indent + editor.value.slice(editor.selectionEnd);
      editor.selectionStart = editor.selectionEnd = s + indent.length;
      state.files[state.activeFile] = editor.value;
      updateLineNumbers();
      schedulePreview();
    }
  });

  editor.addEventListener("scroll", () => {
    el("line-numbers").scrollTop = editor.scrollTop;
  });

  updateLineNumbers();
}

function updateLineNumbers() {
  const editor = el("code-editor");
  const lines  = editor.value.split("\n").length;
  const nums   = el("line-numbers");

  while (nums.children.length < lines) {
    const div = document.createElement("div");
    div.textContent = nums.children.length + 1;
    nums.appendChild(div);
  }
  while (nums.children.length > lines) {
    nums.removeChild(nums.lastChild);
  }
}

// ── PREVIEW ──────────────────────────────────────────────────────────────────

function schedulePreview() {
  clearTimeout(state.previewDebounce);
  state.previewDebounce = setTimeout(runPreview, 400);
}

function buildPreviewHTML() {
  if (state.activeFile) {
    state.files[state.activeFile] = el("code-editor").value;
  }

  const htmlFile = state.lesson.files.find(f => f.name.endsWith(".html"));
  if (!htmlFile) return null;

  let html = state.files[htmlFile.name] || htmlFile.content;

  // Inline CSS files
  state.lesson.files.forEach(f => {
    if (!f.name.endsWith(".css")) return;
    const content = state.files[f.name] || f.content;
    if (html.includes(`href="${f.name}"`)) {
      html = html.replace(
        new RegExp(`<link[^>]*href="${f.name}"[^>]*>`, "g"),
        `<style>${content}</style>`
      );
    } else {
      html = html.replace("</head>", `<style>${content}</style></head>`);
    }
  });

  // Inline JS files
  state.lesson.files.forEach(f => {
    if (!f.name.endsWith(".js")) return;
    const content = state.files[f.name] || f.content;
    if (html.includes(`src="${f.name}"`)) {
      html = html.replace(
        new RegExp(`<script[^>]*src="${f.name}"[^>]*><\/script>`, "g"),
        `<script>${content}<\/script>`
      );
    } else {
      html = html.replace("</body>", `<script>${content}<\/script></body>`);
    }
  });

  return html;
}

function runPreview() {
  const html = buildPreviewHTML();
  if (html === null) return;

  // srcdoc is reliable across all browsers and doesn't need doc.write()
  el("preview-frame").srcdoc = html;

  const dot = document.querySelector(".status-dot");
  dot.style.background = "#4f8ef7";
  setTimeout(() => { dot.style.background = ""; }, 300);
}

// ── BUTTONS ───────────────────────────────────────────────────────────────────

function setupButtons() {
  el("run-btn").addEventListener("click", runPreview);

  el("btn-reset").addEventListener("click", () => {
    if (!confirm("Reset to the original code? Your edits will be lost.")) return;
    state.lesson.files.forEach(f => {
      state.files[f.name] = state.originals[f.name];
    });
    el("code-editor").value = state.files[state.activeFile];
    updateLineNumbers();
    runPreview();
  });
}

// ── DIVIDER DRAG ─────────────────────────────────────────────────────────────

function setupDividerDrag() {
  const divider  = el("panel-divider");
  const editor   = document.querySelector(".panel-editor");
  const preview  = document.querySelector(".panel-preview");

  let dragging      = false;
  let startX        = 0;
  let startEditorW  = 0;
  let startPreviewW = 0;

  // Overlay that sits on top of the iframe while dragging,
  // preventing it from swallowing mouse events.
  const overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;inset:0;z-index:999;display:none;cursor:col-resize;";
  document.body.appendChild(overlay);

  divider.addEventListener("mousedown", e => {
    dragging      = true;
    startX        = e.clientX;
    startEditorW  = editor.offsetWidth;
    startPreviewW = preview.offsetWidth;
    divider.classList.add("dragging");
    document.body.style.userSelect = "none";
    overlay.style.display = "block";
    document.body.classList.add("dragging");
  });

  document.addEventListener("mousemove", e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    editor.style.flex   = "none";
    editor.style.width  = Math.max(180, startEditorW  + dx) + "px";
    preview.style.width = Math.max(180, startPreviewW - dx) + "px";
  });

  document.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    divider.classList.remove("dragging");
    document.body.style.userSelect = "";
    overlay.style.display = "none";
    document.body.classList.remove("dragging");
  });
}

// ── UTILS ─────────────────────────────────────────────────────────────────────

function el(id) { return document.getElementById(id); }

// ── START ─────────────────────────────────────────────────────────────────────

init();
