<script setup lang="ts">
defineProps<{
  systems: string[];
}>();
</script>

<template>
  <div class="source-tags">
    <el-tag v-for="system in systems" :key="system" type="info" effect="plain" round>
      {{ system }}
    </el-tag>
  </div>
</template>
