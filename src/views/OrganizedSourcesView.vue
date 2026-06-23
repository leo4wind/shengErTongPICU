<script setup lang="ts">
import { Link } from "@element-plus/icons-vue";
import { watchEffect } from "vue";

import SourceTags from "@/components/SourceTags.vue";
import { useCrfStore } from "@/composables/useCrfStore";

const {
  caseEvidence,
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
    </el-card>
  </section>
</template>
