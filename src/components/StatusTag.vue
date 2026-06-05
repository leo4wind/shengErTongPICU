<script setup lang="ts">
import type { StatusKey } from "@/types";
import { useCrfStore } from "@/composables/useCrfStore";

const props = defineProps<{
  status: StatusKey;
}>();

const { statusLabels } = useCrfStore();

const tagType: Record<StatusKey, "success" | "warning" | "primary" | "danger" | "info"> = {
  auto_filled: "success",
  manual_required: "warning",
  review_required: "primary",
  missing: "danger",
  source_unclear: "info",
  file_review_required: "warning",
};
</script>

<template>
  <el-tag :type="tagType[props.status]" effect="light" round>
    {{ statusLabels[props.status] }}
  </el-tag>
</template>
