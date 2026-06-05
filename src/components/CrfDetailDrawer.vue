<script setup lang="ts">
import { computed } from "vue";

import StatusTag from "@/components/StatusTag.vue";
import type { CaseRecord, CrfField, CrfTemplate } from "@/types";

const props = defineProps<{
  visible: boolean;
  caseRecord?: CaseRecord;
  template: CrfTemplate;
}>();

const emit = defineEmits<{
  "update:visible": [value: boolean];
}>();

const visibleProxy = computed({
  get: () => props.visible,
  set: (value: boolean) => emit("update:visible", value),
});

const moduleRows = computed(() => {
  if (!props.caseRecord) return [];
  return props.template.modules
    .map((module) => ({
      id: module.id,
      name: module.name,
      fields: module.fields
        .filter((field) => props.caseRecord?.values[field.id])
        .slice(0, 5)
        .map((field) => ({ field, value: valueFor(field) })),
    }))
    .filter((module) => module.fields.length)
    .slice(0, 5);
});

function valueFor(field: CrfField) {
  return props.caseRecord?.values[field.id];
}
</script>

<template>
  <el-drawer v-model="visibleProxy" title="CRF 详情" direction="rtl" size="560px" class="crf-detail-drawer">
    <template v-if="caseRecord">
      <section class="drawer-case-header">
        <div>
          <p class="eyebrow">当前病例</p>
          <h2>{{ caseRecord.id }} · {{ caseRecord.bed }}</h2>
        </div>
        <el-tag type="success" effect="plain">{{ caseRecord.completion }}%</el-tag>
      </section>

      <div class="drawer-meta-grid">
        <div>
          <span>人口学</span>
          <strong>{{ caseRecord.demographics }}</strong>
        </div>
        <div>
          <span>负责人</span>
          <strong>{{ caseRecord.owner }}</strong>
        </div>
        <div class="wide">
          <span>诊断摘要</span>
          <strong>{{ caseRecord.diagnosis }}</strong>
        </div>
      </div>

      <section class="drawer-field-stack">
        <el-card v-for="module in moduleRows" :key="module.id" shadow="never" class="drawer-module-card">
          <template #header>
            <div class="panel-title">
              <strong>{{ module.name }}</strong>
              <el-tag effect="plain">{{ module.fields.length }} 个字段</el-tag>
            </div>
          </template>
          <div class="drawer-field-list">
            <div v-for="item in module.fields" :key="item.field.id" class="drawer-field-row">
              <div>
                <strong>{{ item.field.label }}</strong>
                <p class="muted">{{ item.field.sourceSystems.join(" / ") }}</p>
              </div>
              <div class="drawer-field-value">
                <span>{{ item.value?.value || "未填写" }}</span>
                <StatusTag v-if="item.value" :status="item.value.status" />
              </div>
            </div>
          </div>
        </el-card>
      </section>
    </template>
    <el-empty v-else description="未选择病例" />
  </el-drawer>
</template>
