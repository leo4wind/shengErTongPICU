<script setup lang="ts">
import { Check, Link } from "@element-plus/icons-vue";
import { computed, watchEffect } from "vue";

import CaseSummary from "@/components/CaseSummary.vue";
import SourceTags from "@/components/SourceTags.vue";
import { useCrfStore } from "@/composables/useCrfStore";
import type { RawTableId } from "@/types";

const {
  caseEvidence,
  currentRawTable,
  currentRawTables,
  currentDeviceReports,
  currentTrend,
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
    <el-card shadow="never" class="work-card">
      <CaseSummary />
    </el-card>

    <el-card shadow="never" class="work-card">
      <el-tabs v-model="state.rawMode">
        <el-tab-pane label="按来源整理" name="organized">
          <div class="raw-source-grid">
            <el-card v-for="source in caseEvidence" :key="source.id" shadow="never" class="source-card">
              <template #header>
                <div class="source-card-header">
                  <SourceTags :systems="[source.system]" />
                  <strong>{{ source.title }}</strong>
                </div>
              </template>
              <p class="muted">{{ source.time }}</p>
              <p class="source-snippet">{{ source.snippet }}</p>
              <div class="field-link-row">
                <el-button
                  v-for="fieldId in source.relatedFields.slice(0, 6)"
                  :key="fieldId"
                  :icon="Link"
                  size="small"
                  @click="jumpToField(fieldId)"
                >
                  {{ fieldById(fieldId)?.label }}
                </el-button>
              </div>
            </el-card>
          </div>
        </el-tab-pane>

        <el-tab-pane label="原始多表" name="tables">
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

        <el-tab-pane label="设备文件视图" name="device">
          <div class="device-evidence-stack">
            <el-card v-for="report in currentDeviceReports" :key="report.id" shadow="never" class="device-evidence-card">
              <div class="device-evidence-grid">
                <section class="device-preview">
                  <div class="panel-title">
                    <strong>{{ report.previewTitle }}</strong>
                    <el-tag effect="plain">{{ report.fileType }}</el-tag>
                  </div>
                  <div class="mock-file-viewer" :class="{ missing: report.status === 'missing' }">
                    <span>{{ report.fileName }}</span>
                    <strong>{{ report.status === "missing" ? "未上传设备文件" : report.deviceName }}</strong>
                    <p>{{ report.conclusion }}</p>
                  </div>
                  <p class="muted">{{ report.system }} · {{ report.reportTime }}</p>
                </section>

                <section class="device-extract-panel">
                  <div class="panel-title">
                    <strong>提取字段表单</strong>
                    <el-tag :type="report.status === 'missing' ? 'danger' : report.status === 'review_required' ? 'warning' : 'success'" effect="plain">
                      {{ report.status === "missing" ? "缺失" : report.status === "review_required" ? "待复核" : "已复核" }}
                    </el-tag>
                  </div>
                  <div class="device-field-grid">
                    <label v-for="item in report.extractedFields" :key="item.label" class="device-field-item">
                      <span>{{ item.label }}</span>
                      <el-input :model-value="item.value" :disabled="report.status === 'missing'">
                        <template v-if="item.unit" #append>{{ item.unit }}</template>
                      </el-input>
                    </label>
                  </div>
                  <div class="field-link-row">
                    <el-button
                      v-for="fieldId in report.relatedFields"
                      :key="fieldId"
                      :icon="Link"
                      size="small"
                      :disabled="!fieldById(fieldId)"
                      @click="jumpToField(fieldId)"
                    >
                      {{ fieldById(fieldId)?.label || fieldId }}
                    </el-button>
                  </div>
                  <el-button :icon="Check" type="primary" plain :disabled="report.status === 'missing'">
                    确认提取值
                  </el-button>
                </section>
              </div>
            </el-card>
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
      </el-tabs>
    </el-card>
  </section>
</template>
