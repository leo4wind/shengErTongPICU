<script setup lang="ts">
import { computed } from "vue";

import { useCrfStore } from "@/composables/useCrfStore";

const { countCaseStatus, currentCase } = useCrfStore();

const counts = computed(() => countCaseStatus(currentCase.value));
</script>

<template>
  <div class="case-summary">
    <div>
      <p class="eyebrow">当前病例</p>
      <h2>{{ currentCase.id }} · {{ currentCase.bed }}</h2>
    </div>
    <div class="case-summary-meta">
      <el-tag effect="plain">{{ currentCase.demographics }}</el-tag>
      <el-tag effect="plain">{{ currentCase.diagnosis }}</el-tag>
      <el-tag type="success" effect="plain">{{ currentCase.completion }}%</el-tag>
      <el-tag type="warning" effect="plain">手填 {{ counts.manual_required || 0 }}</el-tag>
      <el-tag type="primary" effect="plain">确认 {{ counts.review_required || 0 }}</el-tag>
      <span class="owner">负责人 {{ currentCase.owner }}</span>
    </div>
  </div>
</template>
