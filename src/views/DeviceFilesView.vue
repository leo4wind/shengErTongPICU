<script setup lang="ts">
import { Check, Link } from "@element-plus/icons-vue";
import { watchEffect } from "vue";

import { useCrfStore } from "@/composables/useCrfStore";

const {
  currentDeviceReports,
  ensureRawTable,
  fieldById,
  selectField,
  state,
} = useCrfStore();

watchEffect(() => ensureRawTable());

function jumpToField(fieldId: string) {
  selectField(fieldId, "crf");
}
</script>

<template>
  <section class="view-stack">
    <el-card shadow="never" class="work-card">
      <div class="device-evidence-stack">
        <el-card v-for="report in currentDeviceReports" :key="report.id" shadow="never" class="device-evidence-card">
          <div class="device-evidence-grid">
            <section class="device-preview">
              <div class="panel-title">
                <strong>{{ report.previewTitle }}</strong>
                <el-tag effect="plain">{{ report.fileType }}</el-tag>
              </div>
              <div class="device-image-viewer" :class="{ missing: report.status === 'missing' }">
                <img v-if="report.status !== 'missing'" :src="'/images/' + report.fileName" :alt="report.previewTitle" />
                <div v-else class="device-image-missing">
                  <span>未上传设备文件</span>
                </div>
                <p class="device-image-caption">{{ report.conclusion }}</p>
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
                    <template v-if="'unit' in item && item.unit" #append>{{ item.unit }}</template>
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
    </el-card>
  </section>
</template>
