const data = window.CRF_DATA;

const state = {
  view: "dashboard",
  caseId: data.caseRecords[0].id,
  moduleId: data.crfTemplate.modules[0].id,
  fieldId: data.crfTemplate.modules[0].fields[0].id,
  rawMode: "organized",
  rawTableId: "patient_profile",
  statusFilter: "all",
  fieldSearch: "",
  mappingSource: "all",
  mappingModule: "all",
  mappingInput: "all",
  mappingSearch: "",
};

const statusClass = {
  auto_filled: "auto_filled",
  manual_required: "manual_required",
  review_required: "review_required",
  missing: "missing",
  source_unclear: "source_unclear",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function currentCase() {
  return data.caseRecords.find((item) => item.id === state.caseId) || data.caseRecords[0];
}

function currentModule() {
  return data.crfTemplate.modules.find((item) => item.id === state.moduleId) || data.crfTemplate.modules[0];
}

function currentField() {
  return data.crfTemplate.fields.find((item) => item.id === state.fieldId) || data.crfTemplate.fields[0];
}

function fieldById(fieldId) {
  return data.crfTemplate.fields.find((item) => item.id === fieldId);
}

function selectField(fieldId) {
  const field = fieldById(fieldId);
  if (!field) return;
  state.fieldId = field.id;
  state.moduleId = field.moduleId;
}

function currentRawSet() {
  return data.rawTables.find((item) => item.caseId === state.caseId) || data.rawTables[0];
}

function currentRawTable() {
  const rawSet = currentRawSet();
  return rawSet.tables.find((item) => item.id === state.rawTableId) || rawSet.tables[0];
}

function valueFor(caseRecord, field) {
  return caseRecord.values[field.id] || {
    value: "",
    status: "source_unclear",
    confirmedBy: "",
    updatedAt: "",
  };
}

function countCaseStatus(caseRecord) {
  const counts = {
    auto_filled: 0,
    manual_required: 0,
    review_required: 0,
    missing: 0,
    source_unclear: 0,
  };
  Object.values(caseRecord.values).forEach((item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
  });
  return counts;
}

function updateCompletion(caseRecord) {
  const counts = countCaseStatus(caseRecord);
  caseRecord.statusCounts = counts;
  const finished = counts.auto_filled + counts.review_required;
  caseRecord.completion = Math.round((finished / data.crfTemplate.fieldCount) * 100);
}

function sourceSystems() {
  return [...new Set(data.crfTemplate.fields.flatMap((field) => field.sourceSystems))].sort();
}

function renderStatus(status) {
  return `<span class="status-chip ${statusClass[status] || ""}">${escapeHtml(data.statusLabels[status] || status)}</span>`;
}

function renderSourceChips(systems) {
  return systems.map((system) => `<span class="source-chip">${escapeHtml(system)}</span>`).join("");
}

function switchView(view) {
  state.view = view;
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.view === view);
  });
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("is-active", section.id === `${view}-view`);
  });
  if (view === "crf") {
    renderCrf();
  }
  if (view === "raw") {
    renderRaw();
  }
  if (view === "mapping") {
    renderMapping();
  }
}

function renderDashboard() {
  const totalManual = data.caseRecords.reduce((sum, item) => sum + countCaseStatus(item).manual_required, 0);
  const totalReview = data.caseRecords.reduce((sum, item) => sum + countCaseStatus(item).review_required, 0);
  const avgCompletion = Math.round(
    data.caseRecords.reduce((sum, item) => sum + item.completion, 0) / data.caseRecords.length,
  );
  const summary = [
    ["病例数", data.caseRecords.length],
    ["CRF 字段", data.crfTemplate.fieldCount],
    ["平均完成度", `${avgCompletion}%`],
    ["待手填 / 待确认", `${totalManual} / ${totalReview}`],
  ];
  document.querySelector("#dashboard-summary").innerHTML = summary
    .map(([label, value]) => `<article class="metric"><span>${label}</span><strong>${value}</strong></article>`)
    .join("");

  document.querySelector("#source-legend").innerHTML = sourceSystems()
    .map((system) => `<span class="source-chip">${escapeHtml(system)}</span>`)
    .join("");

  document.querySelector("#case-table-body").innerHTML = data.caseRecords
    .map((caseRecord) => {
      const counts = countCaseStatus(caseRecord);
      return `
        <tr class="${caseRecord.id === state.caseId ? "is-selected" : ""}">
          <td><strong>${escapeHtml(caseRecord.id)}</strong><div class="mapping-note">${escapeHtml(caseRecord.demographics)}</div></td>
          <td>${escapeHtml(caseRecord.bed)}</td>
          <td>${escapeHtml(caseRecord.diagnosis)}</td>
          <td>${escapeHtml(caseRecord.owner)}<div class="mapping-note">${escapeHtml(caseRecord.updatedAt)}</div></td>
          <td>
            <div class="progress" aria-label="完成度 ${caseRecord.completion}%"><span style="width:${caseRecord.completion}%"></span></div>
            <div class="mapping-note">${caseRecord.completion}%</div>
          </td>
          <td>
            ${renderStatus("manual_required")} <span class="nowrap">${counts.manual_required || 0}</span>
            ${renderStatus("review_required")} <span class="nowrap">${counts.review_required || 0}</span>
          </td>
          <td><button class="open-btn" type="button" data-case-id="${escapeHtml(caseRecord.id)}" aria-label="打开病例">›</button></td>
        </tr>
      `;
    })
    .join("");
}

function renderCrf() {
  const caseRecord = currentCase();
  const module = currentModule();
  document.querySelector("#module-count").textContent = `${data.crfTemplate.moduleCount} 个`;
  document.querySelector("#module-list").innerHTML = data.crfTemplate.modules
    .map(
      (item) => `
        <button class="module-btn ${item.id === module.id ? "is-active" : ""}" type="button" data-module-id="${escapeHtml(item.id)}">
          <span>${escapeHtml(item.name)}</span>
          <small>${item.fieldCount}</small>
        </button>
      `,
    )
    .join("");

  const counts = countCaseStatus(caseRecord);
  document.querySelector("#case-strip").innerHTML = `
    <div>
      <p class="eyebrow">当前病例</p>
      <h2>${escapeHtml(caseRecord.id)} · ${escapeHtml(caseRecord.bed)}</h2>
      <div class="case-meta">
        <span class="chip">${escapeHtml(caseRecord.demographics)}</span>
        <span class="chip">${escapeHtml(caseRecord.diagnosis)}</span>
        <span class="chip">负责人 ${escapeHtml(caseRecord.owner)}</span>
      </div>
    </div>
    <div>
      <div class="progress" aria-label="完成度 ${caseRecord.completion}%"><span style="width:${caseRecord.completion}%"></span></div>
      <div class="mapping-note">${caseRecord.completion}% 完成 · 手填 ${counts.manual_required || 0} · 确认 ${counts.review_required || 0}</div>
    </div>
  `;

  const search = state.fieldSearch.trim().toLowerCase();
  const fields = module.fields.filter((field) => {
    const item = valueFor(caseRecord, field);
    const matchesStatus = state.statusFilter === "all" || item.status === state.statusFilter;
    const text = [field.label, field.options.join(" "), field.dataSource, field.rootSource, field.notes]
      .join(" ")
      .toLowerCase();
    return matchesStatus && (!search || text.includes(search));
  });

  document.querySelector("#field-list").innerHTML =
    fields
      .map((field) => {
        const item = valueFor(caseRecord, field);
        return `
        <article class="field-card ${field.id === state.fieldId ? "is-active" : ""}" data-field-card="${escapeHtml(field.id)}">
          <div class="field-title">
            <button type="button" data-field-id="${escapeHtml(field.id)}">${escapeHtml(field.label)}</button>
            <div class="field-source">${renderSourceChips(field.sourceSystems)}</div>
            <p class="field-note">${escapeHtml(field.notes || field.dataSource || "来源待确认")}</p>
          </div>
          <div class="field-input">
            ${renderInput(field, item)}
          </div>
          <div class="field-actions">
            ${renderStatus(item.status)}
            <button class="confirm-btn ${item.status === "auto_filled" ? "is-done" : ""}" type="button" data-confirm-id="${escapeHtml(field.id)}">${item.status === "auto_filled" ? "已确认" : "确认"}</button>
          </div>
        </article>
      `;
      })
      .join("") || `<div class="evidence-empty">当前筛选下没有字段。</div>`;

  renderEvidence();
}

function renderRaw() {
  const caseRecord = currentCase();
  const rawSet = currentRawSet();
  if (!rawSet.tables.some((table) => table.id === state.rawTableId)) {
    state.rawTableId = rawSet.tables[0].id;
  }
  const counts = countCaseStatus(caseRecord);

  document.querySelector("#raw-case-strip").innerHTML = `
    <div>
      <p class="eyebrow">当前病例原始资料</p>
      <h2>${escapeHtml(caseRecord.id)} · ${escapeHtml(caseRecord.bed)}</h2>
      <div class="case-meta">
        <span class="chip">${escapeHtml(caseRecord.demographics)}</span>
        <span class="chip">${escapeHtml(caseRecord.diagnosis)}</span>
        <span class="chip">手填 ${counts.manual_required || 0}</span>
        <span class="chip">确认 ${counts.review_required || 0}</span>
      </div>
    </div>
    <button class="confirm-btn" type="button" data-view="crf">CRF</button>
  `;

  document.querySelectorAll("[data-raw-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.rawMode === state.rawMode);
  });
  document.querySelectorAll(".raw-mode").forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `raw-${state.rawMode}`);
  });

  renderRawOrganized(caseRecord);
  renderRawTables(rawSet);
}

function renderRawOrganized(caseRecord) {
  const evidence = data.sourceEvidence.filter((item) => item.caseId === caseRecord.id);
  document.querySelector("#raw-organized").innerHTML = `
    <div class="raw-source-grid">
      ${evidence
        .map((source) => {
          const linked = source.relatedFields
            .map((fieldId) => fieldById(fieldId))
            .filter(Boolean)
            .slice(0, 6);
          return `
            <article class="raw-source-card">
              <div>
                <span class="source-chip">${escapeHtml(source.system)}</span>
                <h3>${escapeHtml(source.title)}</h3>
              </div>
              <p class="mapping-note">${escapeHtml(source.time)}</p>
              <p>${escapeHtml(source.snippet)}</p>
              <div class="linked-fields">
                ${linked
                  .map(
                    (field) =>
                      `<button class="field-link" type="button" data-linked-field="${escapeHtml(field.id)}">${escapeHtml(field.label)}</button>`,
                  )
                  .join("")}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderRawTables(rawSet) {
  const table = currentRawTable();
  document.querySelector("#raw-table-list").innerHTML = rawSet.tables
    .map(
      (item) => `
      <button class="raw-table-btn ${item.id === table.id ? "is-active" : ""}" type="button" data-raw-table="${escapeHtml(item.id)}">
        <strong>${escapeHtml(item.name)}</strong>
        <small>${escapeHtml(item.system)} · ${item.rows.length} 行</small>
      </button>
    `,
    )
    .join("");
  document.querySelector("#raw-table-system").textContent = table.system;
  document.querySelector("#raw-table-title").textContent = table.name;
  document.querySelector("#raw-table-to-crf").dataset.linkedField = table.linkedFields[0] || "";
  document.querySelector("#raw-table-to-crf").disabled = !table.linkedFields.length;
  document.querySelector("#raw-table-head").innerHTML = `
    <tr>${table.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
  `;
  document.querySelector("#raw-table-body").innerHTML = table.rows
    .map(
      (row) => `
      <tr>
        ${table.columns.map((column) => `<td>${escapeHtml(row[column] ?? "-")}</td>`).join("")}
      </tr>
    `,
    )
    .join("");
}

function renderInput(field, item) {
  const value = escapeHtml(item.value);
  const common = `data-value-field="${escapeHtml(field.id)}"`;
  if (field.control === "select" || field.control === "boolean") {
    const options = field.options.length ? field.options : ["无", "有"];
    return `
      <select ${common} aria-label="${escapeHtml(field.label)}">
        <option value="">未填写</option>
        ${options.map((option) => `<option value="${escapeHtml(option)}" ${option === item.value ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
      </select>
      <p class="field-note">${escapeHtml(data.inputModeLabels[field.inputMode] || field.inputMode)}</p>
    `;
  }
  if (field.control === "number" || field.control === "date") {
    return `
      <input ${common} type="${field.control === "date" ? "date" : "text"}" value="${value}" aria-label="${escapeHtml(field.label)}" />
      <p class="field-note">${escapeHtml(field.options[0] || data.inputModeLabels[field.inputMode] || "")}</p>
    `;
  }
  return `
    <textarea ${common} aria-label="${escapeHtml(field.label)}">${value}</textarea>
    <p class="field-note">${escapeHtml(data.inputModeLabels[field.inputMode] || field.inputMode)}</p>
  `;
}

function renderEvidence() {
  const caseRecord = currentCase();
  const field = currentField();
  const item = valueFor(caseRecord, field);
  const evidence = data.sourceEvidence.filter(
    (source) =>
      source.caseId === caseRecord.id &&
      (source.relatedFields.includes(field.id) || field.sourceSystems.includes(source.system)),
  );
  document.querySelector("#evidence-system").textContent = field.sourceSystems[0] || "";
  document.querySelector("#evidence-detail").innerHTML = `
    <div class="evidence-field">
      <h3>${escapeHtml(field.label)}</h3>
      ${renderStatus(item.status)}
      <p class="field-note">${escapeHtml(field.dataSource || "原表未明确数据来源")}</p>
      <button class="confirm-btn" type="button" data-go-raw="organized">原始资料</button>
    </div>
    ${
      evidence.length
        ? evidence
            .map(
              (source) => `
          <div class="evidence-row">
            <strong>${escapeHtml(source.system)} · ${escapeHtml(source.title)}</strong>
            <span class="mapping-note">${escapeHtml(source.time)}</span>
            <p>${escapeHtml(source.snippet)}</p>
          </div>
        `,
            )
            .join("")
        : `<div class="evidence-empty">没有匹配的 Mock 来源片段。</div>`
    }
    <div class="evidence-row">
      <strong>数据根源</strong>
      <p>${escapeHtml(field.rootSource || "待接口调研补充")}</p>
    </div>
  `;
}

function renderMappingControls() {
  const moduleOptions = data.crfTemplate.modules
    .map((module) => `<option value="${escapeHtml(module.id)}">${escapeHtml(module.name)}</option>`)
    .join("");
  const sourceOptions = sourceSystems()
    .map((system) => `<option value="${escapeHtml(system)}">${escapeHtml(system)}</option>`)
    .join("");
  const inputOptions = Object.entries(data.inputModeLabels)
    .map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`)
    .join("");
  document.querySelector("#mapping-source").innerHTML = `<option value="all">全部</option>${sourceOptions}`;
  document.querySelector("#mapping-module").innerHTML = `<option value="all">全部</option>${moduleOptions}`;
  document.querySelector("#mapping-input").innerHTML = `<option value="all">全部</option>${inputOptions}`;
}

function renderMapping() {
  const search = state.mappingSearch.trim().toLowerCase();
  const rows = data.crfTemplate.fields.filter((field) => {
    const matchesSource = state.mappingSource === "all" || field.sourceSystems.includes(state.mappingSource);
    const matchesModule = state.mappingModule === "all" || field.moduleId === state.mappingModule;
    const matchesInput = state.mappingInput === "all" || field.inputMode === state.mappingInput;
    const text = [field.module, field.label, field.options.join(" "), field.dataSource, field.rootSource, field.notes]
      .join(" ")
      .toLowerCase();
    return matchesSource && matchesModule && matchesInput && (!search || text.includes(search));
  });

  document.querySelector("#mapping-body").innerHTML =
    rows
      .map(
        (field) => `
      <tr>
        <td>${escapeHtml(field.module)}</td>
        <td><strong>${escapeHtml(field.label)}</strong><div class="mapping-note">${escapeHtml(field.notes)}</div></td>
        <td>${escapeHtml(field.options.slice(0, 5).join("；") || "-")}</td>
        <td>${renderSourceChips(field.sourceSystems)}</td>
        <td>${escapeHtml(field.dataSource || "待补充")}<div class="mapping-note">${escapeHtml(field.rootSource)}</div></td>
        <td>${escapeHtml(data.inputModeLabels[field.inputMode] || field.inputMode)}</td>
        <td>${field.annotationRequired ? "需要标注" : "-"}</td>
      </tr>
    `,
      )
      .join("") || `<tr><td colspan="7">当前筛选下没有字段。</td></tr>`;
}

function bindEvents() {
  document.querySelector(".tabs").addEventListener("click", (event) => {
    const target = event.target.closest("[data-view]");
    if (!target) return;
    switchView(target.dataset.view);
  });

  document.querySelector("#case-table-body").addEventListener("click", (event) => {
    const target = event.target.closest("[data-case-id]");
    if (!target) return;
    state.caseId = target.dataset.caseId;
    switchView("crf");
    renderDashboard();
  });

  document.querySelector("#raw-case-strip").addEventListener("click", (event) => {
    const target = event.target.closest("[data-view]");
    if (!target) return;
    switchView(target.dataset.view);
  });

  document.querySelector(".subtabs").addEventListener("click", (event) => {
    const target = event.target.closest("[data-raw-mode]");
    if (!target) return;
    state.rawMode = target.dataset.rawMode;
    renderRaw();
  });

  document.querySelector("#raw-table-list").addEventListener("click", (event) => {
    const target = event.target.closest("[data-raw-table]");
    if (!target) return;
    state.rawTableId = target.dataset.rawTable;
    renderRaw();
  });

  document.querySelector("#raw-organized").addEventListener("click", (event) => {
    const target = event.target.closest("[data-linked-field]");
    if (!target) return;
    selectField(target.dataset.linkedField);
    switchView("crf");
  });

  document.querySelector("#raw-table-to-crf").addEventListener("click", (event) => {
    const fieldId = event.currentTarget.dataset.linkedField;
    if (!fieldId) return;
    selectField(fieldId);
    switchView("crf");
  });

  document.querySelector("#evidence-detail").addEventListener("click", (event) => {
    const target = event.target.closest("[data-go-raw]");
    if (!target) return;
    state.rawMode = target.dataset.goRaw;
    switchView("raw");
  });

  document.querySelector("#module-list").addEventListener("click", (event) => {
    const target = event.target.closest("[data-module-id]");
    if (!target) return;
    state.moduleId = target.dataset.moduleId;
    state.fieldId = currentModule().fields[0].id;
    renderCrf();
  });

  document.querySelector("#field-list").addEventListener("click", (event) => {
    const fieldButton = event.target.closest("[data-field-id]");
    const confirmButton = event.target.closest("[data-confirm-id]");
    if (fieldButton) {
      state.fieldId = fieldButton.dataset.fieldId;
      renderCrf();
      return;
    }
    if (confirmButton) {
      const caseRecord = currentCase();
      const fieldId = confirmButton.dataset.confirmId;
      caseRecord.values[fieldId].status = "auto_filled";
      caseRecord.values[fieldId].confirmedBy = caseRecord.owner;
      caseRecord.values[fieldId].updatedAt = new Date().toISOString().slice(0, 16).replace("T", " ");
      state.fieldId = fieldId;
      updateCompletion(caseRecord);
      renderDashboard();
      renderCrf();
    }
  });

  document.querySelector("#field-list").addEventListener("change", (event) => {
    const target = event.target.closest("[data-value-field]");
    if (!target) return;
    const caseRecord = currentCase();
    const fieldId = target.dataset.valueField;
    caseRecord.values[fieldId].value = target.value;
    caseRecord.values[fieldId].status = target.value ? "review_required" : "missing";
    caseRecord.values[fieldId].updatedAt = new Date().toISOString().slice(0, 16).replace("T", " ");
    state.fieldId = fieldId;
    updateCompletion(caseRecord);
    renderDashboard();
    renderCrf();
  });

  document.querySelector("#field-list").addEventListener("input", (event) => {
    const target = event.target.closest("textarea[data-value-field], input[data-value-field]");
    if (!target) return;
    const caseRecord = currentCase();
    const fieldId = target.dataset.valueField;
    caseRecord.values[fieldId].value = target.value;
    caseRecord.values[fieldId].status = target.value ? "review_required" : "missing";
    state.fieldId = fieldId;
    updateCompletion(caseRecord);
    renderDashboard();
    renderEvidence();
  });

  document.querySelector("#status-filter").addEventListener("change", (event) => {
    state.statusFilter = event.target.value;
    renderCrf();
  });

  document.querySelector("#field-search").addEventListener("input", (event) => {
    state.fieldSearch = event.target.value;
    renderCrf();
  });

  document.querySelector("#mapping-source").addEventListener("change", (event) => {
    state.mappingSource = event.target.value;
    renderMapping();
  });

  document.querySelector("#mapping-module").addEventListener("change", (event) => {
    state.mappingModule = event.target.value;
    renderMapping();
  });

  document.querySelector("#mapping-input").addEventListener("change", (event) => {
    state.mappingInput = event.target.value;
    renderMapping();
  });

  document.querySelector("#mapping-search").addEventListener("input", (event) => {
    state.mappingSearch = event.target.value;
    renderMapping();
  });
}

function init() {
  renderMappingControls();
  bindEvents();
  renderDashboard();
  renderCrf();
  renderMapping();
}

init();
