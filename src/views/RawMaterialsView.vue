<script setup lang="ts">
import { Link, Coin, DataAnalysis, DataBoard, Promotion, Collection } from "@element-plus/icons-vue";
import { computed, watchEffect } from "vue";

import { useCrfStore } from "@/composables/useCrfStore";
import type { RawTableId } from "@/types";

const {
  caseEvidence,
  currentRawTable,
  currentRawTables,
  currentDeviceReports,
  currentTemplate,
  sourceSystems,
  ensureRawTable,
  selectField,
  selectRawTable,
  state,
} = useCrfStore();

watchEffect(() => ensureRawTable());

const selectedTableColumns = computed(() => currentRawTable.value?.columns || []);

function jumpToField(fieldId: string) {
  selectField(fieldId, "crf");
}

function jumpFromTable() {
  const firstField = currentRawTable.value?.linkedFields[0];
  if (firstField) jumpToField(firstField);
}
</script>

<template>
  <section class="view-stack">
    <el-card shadow="never" class="governance-card">
      <div class="governance-header">
        <h3>
          <el-icon><DataAnalysis /></el-icon>
          数据治理流水线
        </h3>
        <span class="governance-sub">从原始数据源到结构化 CRF 字段的全链路治理</span>
      </div>

      <div class="governance-pipeline">
        <div class="pipeline-step">
          <div class="step-icon raw">
            <el-icon><Collection /></el-icon>
          </div>
          <div class="step-body">
            <strong>原始数据源</strong>
            <small>多源异构数据接入</small>
          </div>
        </div>
        <div class="pipeline-arrow">
          <el-icon><Promotion /></el-icon>
        </div>
        <div class="pipeline-step">
          <div class="step-icon distill">
            <el-icon><Coin /></el-icon>
          </div>
          <div class="step-body">
            <strong>数据蒸馏</strong>
            <small>半结构化 → 结构化萃取</small>
          </div>
        </div>
        <div class="pipeline-arrow">
          <el-icon><Promotion /></el-icon>
        </div>
        <div class="pipeline-step">
          <div class="step-icon govern">
            <el-icon><DataBoard /></el-icon>
          </div>
          <div class="step-body">
            <strong>结构化治理</strong>
            <small>字段映射 &middot; 校验 &middot; 归仓</small>
          </div>
        </div>
      </div>

      <div class="governance-stats">
        <div class="stat-item">
          <span class="stat-value">{{ sourceSystems.length }}</span>
          <span class="stat-label">数据源系统</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span class="stat-value">{{ caseEvidence.length + currentDeviceReports.length }}</span>
          <span class="stat-label">原始证据条目</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span class="stat-value">{{ currentRawTables.length }}</span>
          <span class="stat-label">原始数据表</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span class="stat-value">{{ currentTemplate.fieldCount }}</span>
          <span class="stat-label">结构化 CRF 字段</span>
        </div>
      </div>

      <div class="governance-footer">
        <span class="governance-tag" v-for="[sys, count] of Object.entries(currentTemplate.sourceSystemCounts)" :key="sys">
          {{ sys }} ({{ count }})
        </span>
      </div>
    </el-card>

    <el-card shadow="never" class="work-card">
      <div class="raw-table-layout">
        <aside class="raw-table-menu">
          <button
            v-for="table in currentRawTables"
            :key="table.id"
            class="raw-table-button"
            :class="{ active: table.id === currentRawTable.id }"
            type="button"
            @click="selectRawTable(table.id as RawTableId)"
          >
            <strong>{{ table.name }}</strong>
            <span>{{ table.system }} · {{ table.rows.length }} 行</span>
          </button>
        </aside>

        <main class="raw-table-panel">
          <div class="card-header raw-table-heading">
            <div>
              <p class="eyebrow">{{ currentRawTable.system }}</p>
              <h2>{{ currentRawTable.name }}</h2>
            </div>
            <el-button :icon="Link" :disabled="!currentRawTable.linkedFields.length" @click="jumpFromTable">
              关联字段
            </el-button>
          </div>
          <el-table :data="currentRawTable.rows" stripe height="460">
            <el-table-column
              v-for="column in selectedTableColumns"
              :key="column"
              :prop="column"
              :label="column"
              min-width="150"
              show-overflow-tooltip
            />
          </el-table>
        </main>
      </div>
    </el-card>
  </section>
</template>
