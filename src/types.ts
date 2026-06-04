export type ViewName = "dashboard" | "raw" | "crf" | "mapping";

export type RawMode = "organized" | "tables";

export type StatusKey = "auto_filled" | "manual_required" | "review_required" | "missing" | "source_unclear";

export type InputModeKey = "auto" | "manual" | "manual_unextractable" | "review" | "unknown";

export type FieldControl = "select" | "boolean" | "number" | "date" | "text";

export interface CrfField {
  id: string;
  moduleId: string;
  module: string;
  label: string;
  options: string[];
  dataSource: string;
  rootSource: string;
  inputMode: InputModeKey;
  rawInputMode: string;
  annotationRequired: boolean;
  rawAnnotation: string;
  control: FieldControl;
  notes: string;
  sourceSystems: string[];
}

export interface CrfModule {
  id: string;
  name: string;
  fieldCount: number;
  sourceSystems: string[];
  fields: CrfField[];
}

export interface CrfTemplate {
  id: string;
  name: string;
  sourceFile: string;
  moduleCount: number;
  fieldCount: number;
  sourceSystemCounts: Record<string, number>;
  modules: CrfModule[];
  fields: CrfField[];
}

export interface CaseFieldValue {
  value: string;
  status: StatusKey;
  confirmedBy: string;
  updatedAt: string;
}

export interface CaseRecord {
  id: string;
  bed: string;
  demographics: string;
  diagnosis: string;
  owner: string;
  updatedAt: string;
  completion: number;
  statusCounts: Partial<Record<StatusKey, number>>;
  values: Record<string, CaseFieldValue>;
}

export interface SourceEvidence {
  id: string;
  caseId: string;
  system: string;
  title: string;
  time: string;
  snippet: string;
  relatedFields: string[];
}

export type RawTableId =
  | "patient_profile"
  | "diagnosis_orders"
  | "lis_results"
  | "nursing_vitals"
  | "exam_reports"
  | "score_forms"
  | "followup";

export type RawTableRow = Record<string, string>;

export interface RawTable {
  id: RawTableId;
  caseId: string;
  name: string;
  system: string;
  columns: string[];
  rows: RawTableRow[];
  linkedFields: string[];
}

export type StatusLabels = Record<StatusKey, string>;

export type InputModeLabels = Record<InputModeKey, string>;
