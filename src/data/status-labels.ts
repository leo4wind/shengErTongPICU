import type { InputModeLabels, StatusLabels } from "@/types";

export const statusLabels = {
  "auto_filled": "已自动带入",
  "manual_required": "需手填",
  "review_required": "需确认",
  "missing": "缺失",
  "source_unclear": "来源不明确"
} satisfies StatusLabels;

export const inputModeLabels = {
  "auto": "自动提取",
  "manual": "手动输入",
  "manual_unextractable": "手动输入（无法提取）",
  "review": "自动提取后人工分类",
  "unknown": "待确认"
} satisfies InputModeLabels;
