<script setup lang="ts">
import { Link } from "@element-plus/icons-vue";
import { computed, watchEffect } from "vue";

import CaseSummary from "@/components/CaseSummary.vue";
import SourceTags from "@/components/SourceTags.vue";
import { useCrfStore } from "@/composables/useCrfStore";
import type { RawTableId } from "@/types";

const {
  caseEvidence,
  currentRawTable,
  currentRawTables,
  ensureRawTable,
  fieldById,
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
      </el-tabs>
    </el-card>
  </section>
</template>
