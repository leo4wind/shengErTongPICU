<script setup lang="ts">
import { computed } from "vue";

import { useCrfStore } from "@/composables/useCrfStore";

const { cohorts, countCaseStatus, currentCase, currentCohort, currentExportJobs, currentQueryTemplate, currentTemplate, state } =
  useCrfStore();

const counts = computed(() => countCaseStatus(currentCase.value));

const patientContextViews = ["raw_device", "raw", "crf"];

const showPatientContext = computed(() => patientContextViews.includes(state.view));

const scopeTitle = computed(() => {
  if (state.view === "home") return "系统首页";
  if (state.view === "cohorts") return "项目/队列管理";
  if (state.view === "dashboard") return "队列全景看板";
  if (state.view === "mapping") return currentTemplate.value.name;
  if (state.view === "query") return currentQueryTemplate.value?.name || "高级查询";
  if (state.view === "export") return "导出中心";
  return "患者工作台";
});

const scopeDetail = computed(() => {
  if (state.view === "home") return "流程介绍 · 功能模块 · Mock 队列概览";
  if (state.view === "cohorts") return `共 ${cohorts.length} 个队列 · 当前选中 ${currentCohort.value.disease}`;
  if (state.view === "dashboard") {
    return `入组 ${currentCohort.value.enrolledCount} 人 · 候选 ${currentCohort.value.candidateCount} 人 · 完成度 ${currentCohort.value.completion}%`;
  }
  if (state.view === "mapping") return `${currentTemplate.value.moduleCount} 个模块 · ${currentTemplate.value.fieldCount} 个字段`;
  if (state.view === "query") return `${currentQueryTemplate.value?.conditions.length || 0} 个组合条件`;
  if (state.view === "export") return `${currentExportJobs.value.length} 个导出任务 · CSV + .sps + 源文件包`;
  return "";
});
</script>

<template>
  <div class="context-summary" :class="{ patient: showPatientContext }">
    <section class="context-card cohort-context">
      <span class="context-label">当前队列</span>
      <strong>{{ currentCohort.name }}</strong>
      <small>{{ currentCohort.disease }} · {{ currentCohort.status }} · 负责人 {{ currentCohort.owner }}</small>
    </section>

    <section v-if="showPatientContext" class="context-card patient-context">
      <span class="context-label">当前病例</span>
      <strong>{{ currentCase.id }} · {{ currentCase.bed }}</strong>
      <div class="context-meta-row">
        <el-tag effect="plain">{{ currentCase.demographics }}</el-tag>
        <el-tag effect="plain">{{ currentCase.enrollmentStatus || "enrolled" }}</el-tag>
        <el-tag type="success" effect="plain">{{ currentCase.completion }}%</el-tag>
        <el-tag type="warning" effect="plain">手填 {{ counts.manual_required || 0 }}</el-tag>
        <el-tag type="primary" effect="plain">确认 {{ counts.review_required || 0 }}</el-tag>
      </div>
      <small>{{ currentCase.diagnosis }} · 负责人 {{ currentCase.owner }}</small>
    </section>

    <section v-else class="context-card scope-context">
      <span class="context-label">当前页面</span>
      <strong>{{ scopeTitle }}</strong>
      <small>{{ scopeDetail }}</small>
    </section>
  </div>
</template>
