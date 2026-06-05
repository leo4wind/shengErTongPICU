export { crfTemplate } from "./crf-template";
export { caseRecords } from "./case-records";
export { sourceEvidence } from "./source-evidence";
export { bedsideObservations, caseTrends, deviceMappingFields, deviceReports } from "./device-data";
export {
  cohortProjects,
  cohortQueryTemplates,
  exportJobs,
  patientLifecycles,
  screeningCandidates,
  tbiBedsideObservations,
  tbiCaseRecords,
  tbiCrfTemplate,
  tbiDeviceMappingFields,
  tbiDeviceReports,
  tbiRawTables,
  tbiSourceEvidence,
  tbiTrends,
} from "./cohort-data";
export { inputModeLabels, statusLabels } from "./status-labels";
import { patientProfile } from "./raw/patient-profile";
import { diagnosisOrders } from "./raw/diagnosis-orders";
import { lisResults } from "./raw/lis-results";
import { nursingVitals } from "./raw/nursing-vitals";
import { examReports } from "./raw/exam-reports";
import { scoreForms } from "./raw/score-forms";
import { followup } from "./raw/followup";

export const rawTables = [patientProfile, diagnosisOrders, lisResults, nursingVitals, examReports, scoreForms, followup].flat();
