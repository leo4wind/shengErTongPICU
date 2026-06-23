<script setup lang="ts">
import { Link, Coin, DataAnalysis, DataBoard, Promotion, Collection } from "@element-plus/icons-vue";
import { computed, watchEffect } from "vue";

import SourceTags from "@/components/SourceTags.vue";
import { useCrfStore } from "@/composables/useCrfStore";
import type { RawTableId } from "@/types";

const {
  caseEvidence,
  currentRawTable,
  currentRawTables,
  currentDeviceReports,
  currentLifecycle,
  currentTrend,
  currentTemplate,
  sourceSystems,
  ensureRawTable,
  fieldById,
  selectField,
  selectRawTable,
  state,
} = useCrfStore();

watchEffect(() => ensureRawTable());

const selectedTableColumns = computed(() => currentRawTable.value?.columns || []);

const trendPath = computed(() => {
  const points = currentTrend.value.points;
  if (!points.length) return "";
  return points
    .map((point, index) => {
      const x = 54 + index * 104;
      const y = 220 - (point.heartRate - 105) * 2.2;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
});

const mapPath = computed(() => {
  const points = currentTrend.value.points;
  return points
    .map((point, index) => {
      const x = 54 + index * 104;
      const y = 238 - (point.map - 45) * 3.2;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
});

const tempPath = computed(() => {
  const points = currentTrend.value.points;
  return points
    .map((point, index) => {
      const x = 54 + index * 104;
      const y = 230 - (point.temperature - 36.5) * 42;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
});

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
      <el-tabs v-model="state.rawMode">
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
        </el-tab-pane>

        <el-tab-pane label="参数趋势视图" name="trends">
          <div class="trend-layout">
            <section class="trend-chart-panel">
              <div class="panel-title">
                <strong>生命体征与设备参数时间轴</strong>
                <div class="trend-legend">
                  <span class="hr">心率</span>
                  <span class="map">平均动脉压</span>
                  <span class="temp">体温</span>
                  <span class="event">设备事件</span>
                </div>
              </div>
              <svg class="trend-chart" viewBox="0 0 660 280" role="img" aria-label="设备参数趋势图">
                <line x1="44" y1="236" x2="620" y2="236" class="axis" />
                <line x1="44" y1="40" x2="44" y2="236" class="axis" />
                <path :d="trendPath" class="trend-line hr-line" />
                <path :d="mapPath" class="trend-line map-line" />
                <path :d="tempPath" class="trend-line temp-line" />
                <g v-for="(point, index) in currentTrend.points" :key="point.time">
                  <text :x="44 + index * 104" y="258" class="axis-label">{{ point.time.slice(11) }}</text>
                </g>
                <g v-for="event in currentTrend.events" :key="event.time">
                  <line :x1="54 + currentTrend.points.findIndex((point) => point.time.slice(0, 13) === event.time.slice(0, 13)) * 104" y1="48" :x2="54 + currentTrend.points.findIndex((point) => point.time.slice(0, 13) === event.time.slice(0, 13)) * 104" y2="236" class="event-line" />
                  <circle :cx="54 + currentTrend.points.findIndex((point) => point.time.slice(0, 13) === event.time.slice(0, 13)) * 104" cy="62" r="5" class="event-dot" />
                </g>
              </svg>
            </section>
            <section class="trend-events">
              <strong>离散检查事件</strong>
              <div v-for="event in currentTrend.events" :key="event.time" class="evidence-item">
                <span class="muted">{{ event.time }}</span>
                <strong>{{ event.label }} · {{ event.value }}</strong>
                <SourceTags :systems="[event.system]" />
              </div>
            </section>
          </div>
        </el-tab-pane>

        <el-tab-pane label="全周期时间轴" name="lifecycle">
          <div class="lifecycle-layout">
            <section class="lifecycle-timeline">
              <el-timeline>
                <el-timeline-item
                  v-for="event in currentLifecycle.events"
                  :key="event.id"
                  :timestamp="event.time"
                  placement="top"
                >
                  <el-card shadow="never" class="timeline-event-card">
                    <div class="panel-title">
                      <strong>{{ event.stage }} · {{ event.title }}</strong>
                      <SourceTags :systems="[event.sourceSystem]" />
                    </div>
                    <p class="muted">{{ event.description }}</p>
                    <div v-if="event.linkedFields?.length" class="field-link-row">
                      <el-button
                        v-for="fieldId in event.linkedFields"
                        :key="fieldId"
                        :icon="Link"
                        size="small"
                        :disabled="!fieldById(fieldId)"
                        @click="jumpToField(fieldId)"
                      >
                        {{ fieldById(fieldId)?.label || fieldId }}
                      </el-button>
                    </div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </section>

            <section class="lifecycle-side-panel">
              <div class="panel-title">
                <strong>同轴临床事件</strong>
                <el-tag effect="plain">生命体征 / 检验 / 设备</el-tag>
              </div>
              <div v-for="event in currentTrend.events" :key="event.time" class="evidence-item">
                <span class="muted">{{ event.time }}</span>
                <strong>{{ event.label }} · {{ event.value }}</strong>
                <SourceTags :systems="[event.system]" />
              </div>
              <el-divider />
              <div class="panel-title">
                <strong>设备源文件</strong>
                <el-tag type="warning" effect="plain">{{ currentDeviceReports.length }} 份</el-tag>
              </div>
              <div v-for="report in currentDeviceReports" :key="report.id" class="evidence-item">
                <strong>{{ report.deviceName }}</strong>
                <span class="muted">{{ report.reportTime }} · {{ report.fileName }}</span>
                <p>{{ report.conclusion }}</p>
              </div>
            </section>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </section>
</template>
