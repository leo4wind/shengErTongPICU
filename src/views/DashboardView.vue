<script setup lang="ts">
import { ArrowRight, UploadFilled } from "@element-plus/icons-vue";
import { computed } from "vue";

import StatusTag from "@/components/StatusTag.vue";
import { useCrfStore } from "@/composables/useCrfStore";
import type { CaseRecord } from "@/types";

const { cases, countCaseStatus, crfTemplate, deviceReports, selectCase, sourceSystems, state } = useCrfStore();

const totalManual = computed(() =>
  cases.reduce((sum, caseRecord) => sum + (countCaseStatus(caseRecord).manual_required || 0), 0),
);
const totalReview = computed(() =>
  cases.reduce((sum, caseRecord) => sum + (countCaseStatus(caseRecord).review_required || 0), 0),
);
const averageCompletion = computed(() =>
  Math.round(cases.reduce((sum, caseRecord) => sum + caseRecord.completion, 0) / cases.length),
);

const uploadSummary = computed(() => {
  const uploaded = deviceReports.filter((report) => report.status === "uploaded").length;
  const missing = deviceReports.filter((report) => report.status === "missing").length;
  const review = deviceReports.filter((report) => report.status === "review_required").length;
  return { uploaded, missing, review };
});

const deviceCards = computed(() => {
  const names = ["脑水肿仪", "迈瑞 TCCD", "德力凯 TCD", "脑电图"];
  return names.map((name) => {
    const reports = deviceReports.filter((report) => report.deviceName === name);
    return {
      name,
      uploaded: reports.filter((report) => report.status === "uploaded").length,
      missing: reports.filter((report) => report.status === "missing").length,
      review: reports.filter((report) => report.status === "review_required").length,
      fileTypes: [...new Set(reports.map((report) => report.fileType))].join(" / "),
    };
  });
});

const filteredCases = computed(() => {
  const keyword = state.deviceKeyword.trim().toLowerCase();
  return cases.filter((caseRecord) => {
    const reports = deviceReports.filter((report) => report.caseId === caseRecord.id);
    const matchesFilter =
      state.deviceFilter === "all" ||
      (state.deviceFilter === "missing_brain_edema" &&
        reports.some((report) => report.deviceName === "脑水肿仪" && report.status === "missing")) ||
      (state.deviceFilter === "missing_tccd" &&
        reports.some((report) => report.deviceName === "迈瑞 TCCD" && report.status === "missing")) ||
      (state.deviceFilter === "review_required" && reports.some((report) => report.status === "review_required"));
    const text = [caseRecord.id, caseRecord.diagnosis, ...reports.map((report) => report.conclusion)].join(" ").toLowerCase();
    return matchesFilter && (!keyword || text.includes(keyword));
  });
});

function deviceCounts(caseRecord: CaseRecord) {
  const reports = deviceReports.filter((report) => report.caseId === caseRecord.id);
  return {
    uploaded: reports.filter((report) => report.status === "uploaded").length,
    missing: reports.filter((report) => report.status === "missing").length,
    review: reports.filter((report) => report.status === "review_required").length,
  };
}
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
            <p class="eyebrow">离线设备工作站</p>
            <h2>离线设备报告上传</h2>
          </div>
          <div class="todo-tags">
            <el-tag type="success" effect="plain">已上传 {{ uploadSummary.uploaded }}</el-tag>
            <el-tag type="warning" effect="plain">待复核 {{ uploadSummary.review }}</el-tag>
            <el-tag type="danger" effect="plain">缺失 {{ uploadSummary.missing }}</el-tag>
          </div>
        </div>
      </template>

      <div class="device-upload-layout">
        <div class="upload-dropzone">
          <el-icon><UploadFilled /></el-icon>
          <strong>拖拽 PDF / XPS / 图片 / 扫描件到此处</strong>
          <span>一期原型模拟上传后自动解析 Mock 数值，不读取真实文件内容</span>
          <el-button type="primary" plain>批量导入设备报告</el-button>
        </div>
        <div class="device-upload-grid">
          <div v-for="device in deviceCards" :key="device.name" class="device-upload-card">
            <div class="panel-title">
              <strong>{{ device.name }}</strong>
              <el-tag size="small" effect="plain">{{ device.fileTypes }}</el-tag>
            </div>
            <div class="device-status-row">
              <span>已上传 {{ device.uploaded }}</span>
              <span>待复核 {{ device.review }}</span>
              <span>缺失 {{ device.missing }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>

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

      <div class="filter-bar device-filter-bar">
        <el-select v-model="state.deviceFilter" placeholder="设备筛选" style="width: 210px">
          <el-option label="全部病例" value="all" />
          <el-option label="缺脑水肿文件" value="missing_brain_edema" />
          <el-option label="缺 TCCD 文件" value="missing_tccd" />
          <el-option label="待人工复核" value="review_required" />
        </el-select>
        <el-input v-model="state.deviceKeyword" clearable placeholder="影像结论、设备结论关键词" />
      </div>

      <el-table :data="filteredCases" stripe height="520">
        <el-table-column label="病例号" min-width="180">
          <template #default="{ row }">
            <strong>{{ row.id }}</strong>
            <div class="muted">{{ row.demographics }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="bed" label="床位" width="100" />
        <el-table-column prop="diagnosis" label="诊断摘要" min-width="210" />
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
        <el-table-column label="待办" width="180">
          <template #default="{ row }">
            <div class="todo-tags">
              <StatusTag status="manual_required" />
              <span>{{ countCaseStatus(row).manual_required || 0 }}</span>
              <StatusTag status="review_required" />
              <span>{{ countCaseStatus(row).review_required || 0 }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="设备文件" width="210">
          <template #default="{ row }">
            <div class="todo-tags">
              <el-tag type="success" effect="plain" size="small">上传 {{ deviceCounts(row).uploaded }}</el-tag>
              <el-tag type="warning" effect="plain" size="small">复核 {{ deviceCounts(row).review }}</el-tag>
              <el-tag type="danger" effect="plain" size="small">缺失 {{ deviceCounts(row).missing }}</el-tag>
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
