<script setup lang="ts">
import { Connection, DataBoard, DocumentChecked, Files } from "@element-plus/icons-vue";

import CaseSummary from "@/components/CaseSummary.vue";
import { useCrfStore } from "@/composables/useCrfStore";
import CrfReviewView from "@/views/CrfReviewView.vue";
import DashboardView from "@/views/DashboardView.vue";
import FieldMappingView from "@/views/FieldMappingView.vue";
import RawMaterialsView from "@/views/RawMaterialsView.vue";
import type { ViewName } from "@/types";

const { setView, state } = useCrfStore();

function handleMenuSelect(index: string) {
  setView(index as ViewName);
}
</script>

<template>
  <el-container class="app-shell">
    <el-aside width="248px" class="app-aside">
      <div class="brand">
        <p class="eyebrow">省儿童 PICU</p>
        <h1>脓毒症 CRF</h1>
      </div>
      <el-menu class="side-menu" :default-active="state.view" @select="handleMenuSelect">
        <el-menu-item index="dashboard">
          <el-icon><DataBoard /></el-icon>
          <span>病例工作台</span>
        </el-menu-item>
        <el-menu-item index="raw">
          <el-icon><Files /></el-icon>
          <span>原始资料</span>
        </el-menu-item>
        <el-menu-item index="crf">
          <el-icon><DocumentChecked /></el-icon>
          <span>CRF 填审</span>
        </el-menu-item>
        <el-menu-item index="mapping">
          <el-icon><Connection /></el-icon>
          <span>字段映射</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="app-header" height="88px">
        <div>
          <p class="eyebrow">省儿童 PICU 专病数据库</p>
          <h2>脓毒症 CRF 填审工作台</h2>
        </div>
        <CaseSummary />
      </el-header>

      <el-main class="app-main">
        <DashboardView v-if="state.view === 'dashboard'" />
        <RawMaterialsView v-else-if="state.view === 'raw'" />
        <CrfReviewView v-else-if="state.view === 'crf'" />
        <FieldMappingView v-else />
      </el-main>
    </el-container>
  </el-container>
</template>
