<script setup lang="ts">
import { Check, Files } from "@element-plus/icons-vue";
import { computed } from "vue";

import CaseSummary from "@/components/CaseSummary.vue";
import SourceTags from "@/components/SourceTags.vue";
import StatusTag from "@/components/StatusTag.vue";
import { useCrfStore } from "@/composables/useCrfStore";
import type { CaseFieldValue, CrfField } from "@/types";

const {
  confirmField,
  countCaseStatus,
  currentCase,
  currentEvidence,
  currentField,
  currentModule,
  currentValue,
  inputModeLabels,
  selectField,
  selectModule,
  setView,
  state,
  updateFieldValue,
  crfTemplate,
} = useCrfStore();

const statusOptions = [
  { label: "全部", value: "all" },
  { label: "已自动带入", value: "auto_filled" },
  { label: "需手填", value: "manual_required" },
  { label: "需确认", value: "review_required" },
  { label: "缺失", value: "missing" },
  { label: "来源不明确", value: "source_unclear" },
];

const filteredFields = computed(() => {
  const keyword = state.fieldSearch.trim().toLowerCase();
  return currentModule.value.fields.filter((field) => {
    const item = valueFor(field);
    const matchesStatus = state.statusFilter === "all" || item.status === state.statusFilter;
    const text = [field.label, field.options.join(" "), field.dataSource, field.rootSource, field.notes]
      .join(" ")
      .toLowerCase();
    return matchesStatus && (!keyword || text.includes(keyword));
  });
});

const counts = computed(() => countCaseStatus(currentCase.value));

function valueFor(field: CrfField): CaseFieldValue {
  return currentCase.value.values[field.id];
}

function updateValue(field: CrfField, value: unknown) {
  updateFieldValue(field.id, String(value ?? ""));
}

function openRaw() {
  state.rawMode = "organized";
  setView("raw");
}
</script>

<template>
  <section class="crf-layout">
    <aside class="module-sidebar">
      <el-card shadow="never">
        <template #header>
          <div class="panel-title">
            <span>模块</span>
            <strong>{{ crfTemplate.moduleCount }} 个</strong>
          </div>
        </template>
        <div class="module-list">
          <button
            v-for="(module, index) in crfTemplate.modules"
            :key="module.id"
            class="module-button"
            :class="{ active: module.id === state.moduleId }"
            type="button"
            :aria-pressed="module.id === state.moduleId"
            @click="selectModule(module.id)"
          >
            <span class="module-index">{{ String(index + 1).padStart(2, "0") }}</span>
            <span class="module-name">{{ module.name }}</span>
            <span class="module-count">{{ module.fieldCount }}</span>
          </button>
        </div>
      </el-card>
    </aside>

    <main class="crf-main">
      <el-card shadow="never" class="work-card">
        <CaseSummary />
      </el-card>

      <el-card shadow="never" class="work-card">
        <div class="filter-bar">
          <el-select v-model="state.statusFilter" placeholder="状态" style="width: 180px">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-model="state.fieldSearch" clearable placeholder="字段、来源、备注" />
          <span class="muted">手填 {{ counts.manual_required || 0 }} · 确认 {{ counts.review_required || 0 }}</span>
        </div>

        <div class="field-list">
          <el-card
            v-for="field in filteredFields"
            :key="field.id"
            shadow="never"
            class="field-card"
            :class="{ active: field.id === currentField.id }"
          >
            <div class="field-grid">
              <div class="field-title">
                <el-button link type="primary" @click="selectField(field.id)">
                  {{ field.label }}
                </el-button>
                <SourceTags :systems="field.sourceSystems" />
                <p class="muted">{{ field.notes || field.dataSource || "来源待确认" }}</p>
              </div>

              <div class="field-control">
                <el-select
                  v-if="field.control === 'select' || field.control === 'boolean'"
                  :model-value="valueFor(field).value"
                  clearable
                  placeholder="未填写"
                  @update:model-value="updateValue(field, $event)"
                >
                  <el-option v-for="option in field.options.length ? field.options : ['无', '有']" :key="option" :label="option" :value="option" />
                </el-select>
                <el-input
                  v-else-if="field.control === 'number' || field.control === 'date'"
                  :model-value="valueFor(field).value"
                  clearable
                  @update:model-value="updateValue(field, $event)"
                />
                <el-input
                  v-else
                  :model-value="valueFor(field).value"
                  type="textarea"
                  :rows="3"
                  @update:model-value="updateValue(field, $event)"
                />
                <p class="muted">{{ field.options[0] || inputModeLabels[field.inputMode] }}</p>
              </div>

              <div class="field-actions">
                <StatusTag :status="valueFor(field).status" />
                <el-button :icon="Check" @click="confirmField(field.id)">
                  {{ valueFor(field).status === "auto_filled" ? "已确认" : "确认" }}
                </el-button>
              </div>
            </div>
          </el-card>
          <el-empty v-if="!filteredFields.length" description="当前筛选下没有字段" />
        </div>
      </el-card>
    </main>

    <aside class="evidence-sidebar">
      <el-card shadow="never">
        <template #header>
          <div class="panel-title">
            <span>来源证据</span>
            <strong>{{ currentField.sourceSystems[0] }}</strong>
          </div>
        </template>
        <div class="evidence-current">
          <h3>{{ currentField.label }}</h3>
          <StatusTag :status="currentValue.status" />
          <p class="muted">{{ currentField.dataSource || "原表未明确数据来源" }}</p>
          <el-button :icon="Files" @click="openRaw">原始资料</el-button>
        </div>
        <el-divider />
        <div class="evidence-list">
          <div v-for="source in currentEvidence" :key="source.id" class="evidence-item">
            <strong>{{ source.system }} · {{ source.title }}</strong>
            <span class="muted">{{ source.time }}</span>
            <p>{{ source.snippet }}</p>
          </div>
          <el-empty v-if="!currentEvidence.length" description="没有匹配的 Mock 来源片段" />
        </div>
        <el-divider />
        <div class="evidence-item">
          <strong>数据根源</strong>
          <p>{{ currentField.rootSource || "待接口调研补充" }}</p>
        </div>
      </el-card>
    </aside>
  </section>
</template>
