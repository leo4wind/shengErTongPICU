export type ViewName = "dashboard" | "raw" | "crf" | "mapping";

export type RawMode = "organized" | "tables" | "device" | "trends";

export type StatusKey =
  | "auto_filled"
  | "manual_required"
  | "review_required"
  | "missing"
  | "source_unclear"
  | "file_review_required";

export type InputModeKey = "auto" | "manual" | "manual_unextractable" | "review" | "unknown" | "file_review";

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
  fileType?: "PDF" | "XPS" | "图片" | "纸质扫描件";
  fileUrl?: string;
  previewTitle?: string;
  extractedFields?: DeviceExtractedField[];
  reviewStatus?: "已复核" | "待复核" | "缺失";
}

export interface DeviceExtractedField {
  label: string;
  value: string;
  unit?: string;
  fieldId?: string;
}

export interface DeviceReport {
  id: string;
  caseId: string;
  deviceName: string;
  system: string;
  fileName: string;
  fileType: "PDF" | "XPS" | "图片" | "纸质扫描件";
  reportTime: string;
  status: "uploaded" | "missing" | "review_required";
  previewTitle: string;
  conclusion: string;
  extractedFields: DeviceExtractedField[];
  relatedFields: string[];
}

export interface BedsideObservation {
  id: string;
  caseId: string;
  label: string;
  value: string;
  unit: string;
  observedAt: string;
  observer: string;
  source: string;
  status: StatusKey;
}

export interface TrendPoint {
  time: string;
  heartRate: number;
  map: number;
  temperature: number;
}

export interface DeviceEventPoint {
  time: string;
  label: string;
  value: string;
  system: string;
}

export interface CaseTrend {
  caseId: string;
  points: TrendPoint[];
  events: DeviceEventPoint[];
}

export interface DeviceMappingField {
  id: string;
  module: string;
  label: string;
  options: string[];
  sourceSystems: string[];
  dataSource: string;
  rootSource: string;
  inputMode: InputModeKey;
  notes: string;
  annotationRequired: boolean;
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
