<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { computed } from "vue";

import StatusTag from "@/components/StatusTag.vue";
import { useCrfStore } from "@/composables/useCrfStore";

const { cases, countCaseStatus, crfTemplate, selectCase, sourceSystems } = useCrfStore();

const totalManual = computed(() =>
  cases.reduce((sum, caseRecord) => sum + (countCaseStatus(caseRecord).manual_required || 0), 0),
);
const totalReview = computed(() =>
  cases.reduce((sum, caseRecord) => sum + (countCaseStatus(caseRecord).review_required || 0), 0),
);
const averageCompletion = computed(() =>
  Math.round(cases.reduce((sum, caseRecord) => sum + caseRecord.completion, 0) / cases.length),
);
</script>

<template>
  <section class="view-stack">
    <div class="metric-grid">
      <el-card shadow="never" class="metric-card">
        <span>病例数</span>
        <strong>{{ cases.length }}</strong>
      </el-card>
      <el-card shadow="never" class="metric-card">
        <span>CRF 字段</span>
        <strong>{{ crfTemplate.fieldCount }}</strong>
      </el-card>
      <el-card shadow="never" class="metric-card">
        <span>平均完成度</span>
        <strong>{{ averageCompletion }}%</strong>
      </el-card>
      <el-card shadow="never" class="metric-card">
        <span>待手填 / 待确认</span>
        <strong>{{ totalManual }} / {{ totalReview }}</strong>
      </el-card>
    </div>

    <el-card shadow="never" class="work-card">
      <template #header>
        <div class="card-header">
          <div>
            <p class="eyebrow">单病种队列</p>
            <h2>待处理病例</h2>
          </div>
          <div class="source-tags">
            <el-tag v-for="system in sourceSystems" :key="system" type="info" effect="plain" round>
              {{ system }}
            </el-tag>
          </div>
        </div>
      </template>

      <el-table :data="cases" stripe height="520">
        <el-table-column label="病例号" min-width="180">
          <template #default="{ row }">
            <strong>{{ row.id }}</strong>
            <div class="muted">{{ row.demographics }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="bed" label="床位" width="120" />
        <el-table-column prop="diagnosis" label="诊断摘要" min-width="240" />
        <el-table-column label="负责人" width="150">
          <template #default="{ row }">
            <strong>{{ row.owner }}</strong>
            <div class="muted">{{ row.updatedAt }}</div>
          </template>
        </el-table-column>
        <el-table-column label="CRF 完成度" width="180">
          <template #default="{ row }">
            <el-progress :percentage="row.completion" :stroke-width="10" />
          </template>
        </el-table-column>
        <el-table-column label="待办" width="210">
          <template #default="{ row }">
            <div class="todo-tags">
              <StatusTag status="manual_required" />
              <span>{{ countCaseStatus(row).manual_required || 0 }}</span>
              <StatusTag status="review_required" />
              <span>{{ countCaseStatus(row).review_required || 0 }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right" width="90">
          <template #default="{ row }">
            <el-button :icon="ArrowRight" circle @click="selectCase(row.id, 'crf')" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>
