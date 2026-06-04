import { computed, reactive } from "vue";

import {
  caseRecords,
  crfTemplate,
  inputModeLabels,
  rawTables,
  sourceEvidence,
  statusLabels,
} from "@/data";
import type { CaseRecord, CrfField, RawMode, RawTableId, StatusKey, ViewName } from "@/types";

interface AppState {
  view: ViewName;
  caseId: string;
  moduleId: string;
  fieldId: string;
  rawMode: RawMode;
  rawTableId: RawTableId;
  statusFilter: StatusKey | "all";
  fieldSearch: string;
  mappingSource: string;
  mappingModule: string;
  mappingInput: string;
  mappingSearch: string;
}

const cases = reactive<CaseRecord[]>(structuredClone(caseRecords));

const state = reactive<AppState>({
  view: "dashboard",
  caseId: cases[0].id,
  moduleId: crfTemplate.modules[0].id,
  fieldId: crfTemplate.modules[0].fields[0].id,
  rawMode: "organized",
  rawTableId: "patient_profile",
  statusFilter: "all",
  fieldSearch: "",
  mappingSource: "all",
  mappingModule: "all",
  mappingInput: "all",
  mappingSearch: "",
});

function countCaseStatus(caseRecord: CaseRecord) {
  const counts: Partial<Record<StatusKey, number>> = {
    auto_filled: 0,
    manual_required: 0,
    review_required: 0,
    missing: 0,
    source_unclear: 0,
  };
  Object.values(caseRecord.values).forEach((item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
  });
  return counts;
}

function fieldById(fieldId: string): CrfField | undefined {
  return crfTemplate.fields.find((field) => field.id === fieldId);
}

function setView(view: ViewName) {
  state.view = view;
}

function selectCase(caseId: string, view: ViewName = state.view) {
  const nextCase = cases.find((caseRecord) => caseRecord.id === caseId);
  if (!nextCase) return;
  state.caseId = nextCase.id;
  state.view = view;
}

function selectModule(moduleId: string) {
  const module = crfTemplate.modules.find((item) => item.id === moduleId);
  if (!module) return;
  state.moduleId = module.id;
  state.fieldId = module.fields[0].id;
}

function selectField(fieldId: string, view: ViewName = state.view) {
  const field = fieldById(fieldId);
  if (!field) return;
  state.fieldId = field.id;
  state.moduleId = field.moduleId;
  state.view = view;
}

function updateCompletion(caseRecord: CaseRecord) {
  const counts = countCaseStatus(caseRecord);
  caseRecord.statusCounts = counts;
  const finished = (counts.auto_filled || 0) + (counts.review_required || 0);
  caseRecord.completion = Math.round((finished / crfTemplate.fieldCount) * 100);
}

function updateFieldValue(fieldId: string, value: string) {
  const caseRecord = currentCase.value;
  const item = caseRecord.values[fieldId];
  if (!item) return;
  item.value = value;
  item.status = value ? "review_required" : "missing";
  item.updatedAt = new Date().toISOString().slice(0, 16).replace("T", " ");
  state.fieldId = fieldId;
  updateCompletion(caseRecord);
}

function confirmField(fieldId: string) {
  const caseRecord = currentCase.value;
  const item = caseRecord.values[fieldId];
  if (!item) return;
  item.status = "auto_filled";
  item.confirmedBy = caseRecord.owner;
  item.updatedAt = new Date().toISOString().slice(0, 16).replace("T", " ");
  state.fieldId = fieldId;
  updateCompletion(caseRecord);
}

function selectRawTable(rawTableId: RawTableId) {
  state.rawTableId = rawTableId;
}

const currentCase = computed(() => cases.find((caseRecord) => caseRecord.id === state.caseId) || cases[0]);

const currentModule = computed(
  () => crfTemplate.modules.find((module) => module.id === state.moduleId) || crfTemplate.modules[0],
);

const currentField = computed(() => fieldById(state.fieldId) || crfTemplate.fields[0]);

const currentValue = computed(() => currentCase.value.values[currentField.value.id]);

const sourceSystems = computed(() =>
  [...new Set(crfTemplate.fields.flatMap((field) => field.sourceSystems))].sort(),
);

const currentEvidence = computed(() =>
  sourceEvidence.filter(
    (source) =>
      source.caseId === state.caseId &&
      (source.relatedFields.includes(state.fieldId) || currentField.value.sourceSystems.includes(source.system)),
  ),
);

const caseEvidence = computed(() => sourceEvidence.filter((source) => source.caseId === state.caseId));

const currentRawTables = computed(() => rawTables.filter((table) => table.caseId === state.caseId));

const currentRawTable = computed(() => {
  return currentRawTables.value.find((table) => table.id === state.rawTableId) || currentRawTables.value[0];
});

function ensureRawTable() {
  if (!currentRawTables.value.some((table) => table.id === state.rawTableId)) {
    state.rawTableId = currentRawTables.value[0].id;
  }
}

export function useCrfStore() {
  return {
    caseEvidence,
    cases,
    confirmField,
    countCaseStatus,
    crfTemplate,
    currentCase,
    currentEvidence,
    currentField,
    currentModule,
    currentRawTable,
    currentRawTables,
    currentValue,
    ensureRawTable,
    fieldById,
    inputModeLabels,
    selectCase,
    selectField,
    selectModule,
    selectRawTable,
    setView,
    sourceSystems,
    state,
    statusLabels,
    updateFieldValue,
  };
}
