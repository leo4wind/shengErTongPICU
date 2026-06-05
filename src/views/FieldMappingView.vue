<script setup lang="ts">
import { computed } from "vue";

import SourceTags from "@/components/SourceTags.vue";
import { useCrfStore } from "@/composables/useCrfStore";

const { currentMappingFields, currentTemplate, inputModeLabels, sourceSystems, state } = useCrfStore();

const inputOptions = computed(() => Object.entries(inputModeLabels).map(([value, label]) => ({ value, label })));

const rows = computed(() => {
  const keyword = state.mappingSearch.trim().toLowerCase();
  return currentMappingFields.value.filter((field) => {
    const matchesSource = state.mappingSource === "all" || field.sourceSystems.includes(state.mappingSource);
    const matchesModule =
      state.mappingModule === "all" || ("moduleId" in field ? field.moduleId === state.mappingModule : field.module === state.mappingModule);
    const matchesInput = state.mappingInput === "all" || field.inputMode === state.mappingInput;
    const text = [field.module, field.label, field.options.join(" "), field.dataSource, field.rootSource, field.notes]
      .join(" ")
      .toLowerCase();
    return matchesSource && matchesModule && matchesInput && (!keyword || text.includes(keyword));
  });
});

function inputModeText(mode: keyof typeof inputModeLabels) {
  return inputModeLabels[mode];
}
</script>

<template>
  <section class="view-stack">
    <el-card shadow="never" class="work-card">
      <div class="mapping-filters">
        <el-select v-model="state.mappingSource" placeholder="来源系统" style="width: 190px">
          <el-option label="全部来源" value="all" />
          <el-option v-for="system in sourceSystems" :key="system" :label="system" :value="system" />
        </el-select>
        <el-select v-model="state.mappingModule" placeholder="模块" style="width: 260px">
          <el-option label="全部模块" value="all" />
          <el-option v-for="module in currentTemplate.modules" :key="module.id" :label="module.name" :value="module.id" />
          <el-option label="设备数据" value="设备数据" />
          <el-option label="床边人工观测" value="床边人工观测" />
        </el-select>
        <el-select v-model="state.mappingInput" placeholder="输入方式" style="width: 210px">
          <el-option label="全部输入方式" value="all" />
          <el-option v-for="item in inputOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="state.mappingSearch" clearable placeholder="字段、选项、来源" />
      </div>
    </el-card>

    <el-card shadow="never" class="work-card">
      <el-table :data="rows" stripe height="620">
        <el-table-column prop="module" label="模块" min-width="180" show-overflow-tooltip />
        <el-table-column label="字段" min-width="220">
          <template #default="{ row }">
            <strong>{{ row.label }}</strong>
            <div class="muted">{{ row.notes }}</div>
          </template>
        </el-table-column>
        <el-table-column label="选项/单位" min-width="240" show-overflow-tooltip>
          <template #default="{ row }">
            {{ row.options.slice(0, 5).join("；") || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="来源系统" min-width="180">
          <template #default="{ row }">
            <SourceTags :systems="row.sourceSystems" />
          </template>
        </el-table-column>
        <el-table-column label="数据来源" min-width="300" show-overflow-tooltip>
          <template #default="{ row }">
            {{ row.dataSource || "待补充" }}
            <div class="muted">{{ row.rootSource }}</div>
          </template>
        </el-table-column>
        <el-table-column label="输入方式" width="170">
          <template #default="{ row }">
            {{ inputModeText(row.inputMode) }}
          </template>
        </el-table-column>
        <el-table-column label="标注" width="110">
          <template #default="{ row }">
            {{ row.annotationRequired ? "需要标注" : "-" }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>
