<script setup lang="ts">
import { DataBoard, Refresh, Select } from "@element-plus/icons-vue";
import { computed } from "vue";

import { useCrfStore } from "@/composables/useCrfStore";
import type { CandidateStatus, RuleCondition, RuleGroup } from "@/types";

const {
  cohorts,
  currentCandidates,
  currentCohort,
  runMockScan,
  selectCase,
  selectCohort,
  setView,
  state,
  updateCandidateStatus,
} = useCrfStore();

const candidateLabels: Record<CandidateStatus, string> = {
  pending: "待确认",
  enrolled: "已入组",
  excluded: "已排除",
  deferred: "暂缓",
  needs_data: "需补资料",
};

const candidateTypes: Record<CandidateStatus, "success" | "warning" | "info" | "danger" | "primary"> = {
  pending: "warning",
  enrolled: "success",
  excluded: "danger",
  deferred: "info",
  needs_data: "primary",
};

const candidateOptions = [
  { label: "全部候选", value: "all" },
  { label: "待确认", value: "pending" },
  { label: "已入组", value: "enrolled" },
  { label: "需补资料", value: "needs_data" },
  { label: "暂缓", value: "deferred" },
  { label: "已排除", value: "excluded" },
];

function isGroup(item: RuleCondition | RuleGroup): item is RuleGroup {
  return "conditions" in item;
}

const ruleRows = computed(() => {
  const rows: Array<{ id: string; depth: number; logic: string; source: string; summary: string }> = [];
  function walk(group: RuleGroup, depth = 0) {
    rows.push({ id: group.id, depth, logic: group.logic, source: "条件组", summary: group.summary });
    group.conditions.forEach((item) => {
      if (isGroup(item)) {
        walk(item, depth + 1);
        return;
      }
      rows.push({
        id: item.id,
        depth: depth + 1,
        logic: item.operator,
        source: item.sourceSystem,
        summary: item.summary,
      });
    });
  }
  walk(currentCohort.value.rules);
  return rows;
});

function openCandidate(caseId?: string) {
  if (caseId) {
    selectCase(caseId, "crf");
  }
}
</script>

<template>
  <section class="view-stack">
    <div class="cohort-center-layout">
      <el-card shadow="never" class="work-card">
        <template #header>
          <div class="card-header">
            <div>
              <p class="eyebrow">项目/队列管理中心</p>
              <h2>多专病队列</h2>
            </div>
            <el-button type="primary" plain>新建队列</el-button>
          </div>
        </template>

        <div class="cohort-list">
          <button
            v-for="cohort in cohorts"
            :key="cohort.id"
            class="cohort-card-button"
            :class="{ active: cohort.id === currentCohort.id }"
            type="button"
            @click="selectCohort(cohort.id)"
          >
            <div class="panel-title">
              <strong>{{ cohort.name }}</strong>
              <el-tag effect="plain">{{ cohort.status }}</el-tag>
            </div>
            <p class="muted">{{ cohort.disease }} · 负责人 {{ cohort.owner }} · {{ cohort.updatedAt }}</p>
            <div class="cohort-card-metrics">
              <span>候选 {{ cohort.candidateCount }}</span>
              <span>入组 {{ cohort.enrolledCount }}</span>
              <span>退出 {{ cohort.withdrawnCount }}</span>
              <span>完成度 {{ cohort.completion }}%</span>
            </div>
          </button>
        </div>
      </el-card>

      <el-card shadow="never" class="work-card">
        <template #header>
          <div class="card-header">
            <div>
              <p class="eyebrow">入排标准</p>
              <h2>{{ currentCohort.name }}</h2>
            </div>
            <el-button :icon="Refresh" type="primary" plain @click="runMockScan">Mock 日扫</el-button>
          </div>
        </template>

        <el-alert v-if="state.scanNotice" :title="state.scanNotice" type="success" show-icon :closable="false" />

        <div class="rule-list">
          <div v-for="row in ruleRows" :key="row.id" class="rule-row" :style="{ marginLeft: `${row.depth * 18}px` }">
            <el-tag effect="plain">{{ row.logic }}</el-tag>
            <strong>{{ row.summary }}</strong>
            <span class="muted">{{ row.source }}</span>
          </div>
        </div>
      </el-card>
    </div>

    <el-card shadow="never" class="work-card">
      <template #header>
        <div class="card-header">
          <div>
            <p class="eyebrow">候选患者池</p>
            <h2>待筛选 / 待确认</h2>
          </div>
          <div class="filter-bar compact-filter">
            <el-select v-model="state.candidateFilter" style="width: 150px">
              <el-option v-for="item in candidateOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button :icon="DataBoard" type="primary" plain @click="setView('dashboard')">进入队列看板</el-button>
          </div>
        </div>
      </template>

      <el-table :data="currentCandidates" stripe height="430">
        <el-table-column label="患者" min-width="210">
          <template #default="{ row }">
            <strong>{{ row.patientId }}</strong>
            <div class="muted">{{ row.demographics }} · {{ row.diagnosis }}</div>
          </template>
        </el-table-column>
        <el-table-column label="命中规则" min-width="260">
          <template #default="{ row }">
            <div class="tag-stack">
              <el-tag v-for="rule in row.matchedRules" :key="rule" size="small" effect="plain">{{ rule }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="来源证据" min-width="220">
          <template #default="{ row }">
            {{ row.evidence.join(" / ") }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="130">
          <template #default="{ row }">
            <el-tag :type="candidateTypes[row.status as CandidateStatus]" effect="plain">
              {{ candidateLabels[row.status as CandidateStatus] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="负责人" width="160">
          <template #default="{ row }">
            <strong>{{ row.owner }}</strong>
            <div class="muted">{{ row.scannedAt }}</div>
          </template>
        </el-table-column>
        <el-table-column align="right" width="250">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button :icon="Select" size="small" type="primary" plain @click="updateCandidateStatus(row.id, 'enrolled')">
                入组
              </el-button>
              <el-button size="small" plain @click="updateCandidateStatus(row.id, 'needs_data')">补资料</el-button>
              <el-button size="small" :disabled="!row.caseId" @click="openCandidate(row.caseId)">CRF</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>
