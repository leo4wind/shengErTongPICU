import type {
  BedsideObservation,
  CaseRecord,
  CaseTrend,
  CohortProject,
  CrfField,
  CrfModule,
  CrfTemplate,
  DeviceMappingField,
  DeviceReport,
  ExportJob,
  PatientLifecycle,
  QueryTemplate,
  RawTable,
  ScreeningCandidate,
  SourceEvidence,
} from "@/types";

function field(
  id: string,
  moduleId: string,
  module: string,
  label: string,
  sourceSystems: string[],
  inputMode: CrfField["inputMode"],
  control: CrfField["control"],
  options: string[] = [],
  notes = "",
): CrfField {
  return {
    id,
    moduleId,
    module,
    label,
    options,
    dataSource: sourceSystems.join(" / "),
    rootSource: sourceSystems[0] || "来源待确认",
    inputMode,
    rawInputMode: inputMode,
    annotationRequired: inputMode === "file_review",
    rawAnnotation: inputMode === "file_review" ? "需保留源文件并人工复核" : "",
    control,
    notes,
    sourceSystems,
  };
}

function module(id: string, name: string, fields: CrfField[]): CrfModule {
  return {
    id,
    name,
    fieldCount: fields.length,
    sourceSystems: [...new Set(fields.flatMap((item) => item.sourceSystems))],
    fields,
  };
}

const tbiModules = [
  module("tbi_m01_outcome", "PICU结局与随访", [
    field("tbi_outcome", "tbi_m01_outcome", "PICU结局与随访", "PICU 结局", ["EMR/住院病历", "随访"], "review", "select", [
      "存活",
      "临床死亡",
      "放弃治疗后死亡",
      "放弃治疗后存活",
    ]),
    field("tbi_followup_90d", "tbi_m01_outcome", "PICU结局与随访", "90 天随访结局", ["随访"], "manual", "select", [
      "良好恢复",
      "中重度残障",
      "死亡",
      "失访",
    ]),
  ]),
  module("tbi_m02_screening", "创伤性脑损伤纳入标准", [
    field("tbi_brain_edema_record", "tbi_m02_screening", "创伤性脑损伤纳入标准", "具有脑水肿仪扰动系数记录", ["离线设备-脑水肿仪"], "file_review", "boolean", ["无", "有"]),
    field("tbi_icp_monitoring", "tbi_m02_screening", "创伤性脑损伤纳入标准", "有创颅内压监测", ["床边人工观测", "护理/监护"], "manual", "boolean", ["无", "有"]),
    field("tbi_pacs_edema", "tbi_m02_screening", "创伤性脑损伤纳入标准", "PACS 结论提示脑水肿", ["检查/PACS"], "auto", "boolean", ["无", "有"]),
  ]),
  module("tbi_m03_neuro", "神经功能与干预", [
    field("tbi_eeg_background", "tbi_m03_neuro", "神经功能与干预", "脑电图背景活动", ["离线设备-脑电图"], "file_review", "select", ["正常", "慢化", "爆发抑制"]),
    field("tbi_hyperventilation", "tbi_m03_neuro", "神经功能与干预", "过度换气记录", ["护理/监护", "床边人工观测"], "manual", "boolean", ["无", "有"]),
  ]),
  module("tbi_m04_device", "设备参数", [
    field("device_brain_edema_index", "tbi_m04_device", "设备参数", "脑水肿扰动系数最大/最小值", ["离线设备-脑水肿仪"], "file_review", "number", [], "左图右数核查后录入"),
    field("device_tccd_ps", "tbi_m04_device", "设备参数", "TCCD 峰流速 PS", ["离线设备-TCCD"], "file_review", "number", ["cm/s"]),
    field("device_tccd_ri", "tbi_m04_device", "设备参数", "TCCD 阻力指数 RI", ["离线设备-TCCD"], "file_review", "number"),
    field("tbi_icp_value", "tbi_m04_device", "设备参数", "有创颅内压最高值", ["床边人工观测"], "manual", "number", ["mmHg"]),
  ]),
  module("tbi_m05_scores", "危重度评分", [
    field("tbi_pim3", "tbi_m05_scores", "危重度评分", "入 ICU 1 小时内 PIM3 评分", ["评分表"], "review", "number"),
    field("tbi_pss", "tbi_m05_scores", "危重度评分", "PSS 评分", ["评分表"], "review", "number"),
  ]),
];

export const tbiCrfTemplate = {
  id: "tbi-crf-v1",
  name: "创伤性脑损伤队列 CRF",
  sourceFile: "v1.2 Mock 表单设计器",
  moduleCount: tbiModules.length,
  fieldCount: tbiModules.reduce((sum, item) => sum + item.fieldCount, 0),
  sourceSystemCounts: {},
  modules: tbiModules,
  fields: tbiModules.flatMap((item) => item.fields),
} satisfies CrfTemplate;

function values(template: CrfTemplate, seed: Record<string, string>): CaseRecord["values"] {
  const statuses: CaseRecord["values"] = {};
  template.fields.forEach((item, index) => {
    const value = seed[item.id] || "";
    statuses[item.id] = {
      value,
      status: value ? (index % 3 === 0 ? "review_required" : "auto_filled") : "manual_required",
      confirmedBy: value && index % 3 !== 0 ? "系统带入" : "",
      updatedAt: "2026-06-04 09:30",
    };
  });
  return statuses;
}

export const tbiCaseRecords = [
  {
    id: "PICU-TBI-2026-0601",
    bed: "PICU-08",
    demographics: "6岁 男",
    diagnosis: "重型颅脑损伤 / 脑水肿",
    owner: "赵医生",
    updatedAt: "2026-06-01 16:20",
    completion: 76,
    statusCounts: {},
    cohortId: "cohort-tbi",
    patientLifecycleId: "life-tbi-0601",
    enrollmentStatus: "enrolled",
    qualityStatus: "pending_review",
    values: values(tbiCrfTemplate, {
      tbi_outcome: "存活",
      tbi_followup_90d: "中重度残障",
      tbi_brain_edema_record: "有",
      tbi_icp_monitoring: "有",
      tbi_pacs_edema: "有",
      tbi_eeg_background: "慢化",
      tbi_hyperventilation: "有",
      device_brain_edema_index: "188 / 132",
      device_tccd_ps: "142",
      device_tccd_ri: "0.78",
      tbi_icp_value: "24",
      tbi_pim3: "8.6",
      tbi_pss: "20",
    }),
  },
  {
    id: "PICU-TBI-2026-0603",
    bed: "PICU-10",
    demographics: "11岁 女",
    diagnosis: "创伤性脑损伤 / 颅内压升高",
    owner: "钱医生",
    updatedAt: "2026-06-03 10:12",
    completion: 68,
    statusCounts: {},
    cohortId: "cohort-tbi",
    patientLifecycleId: "life-tbi-0603",
    enrollmentStatus: "enrolled",
    qualityStatus: "data_missing",
    values: values(tbiCrfTemplate, {
      tbi_outcome: "放弃治疗后存活",
      tbi_brain_edema_record: "有",
      tbi_icp_monitoring: "有",
      tbi_pacs_edema: "有",
      tbi_eeg_background: "爆发抑制",
      device_brain_edema_index: "202 / 145",
      device_tccd_ps: "155",
      device_tccd_ri: "0.82",
      tbi_icp_value: "29",
      tbi_pim3: "12.4",
      tbi_pss: "16",
    }),
  },
] satisfies CaseRecord[];

export const cohortProjects = [
  {
    id: "cohort-sepsis",
    name: "脓毒症预后研究队列",
    disease: "脓毒症",
    owner: "李主任",
    members: ["李医生", "王医生", "陈医生", "周医生"],
    status: "active",
    crfTemplateId: "picu-sepsis-crf-v1",
    rules: {
      id: "rule-sepsis-root",
      logic: "AND",
      summary: "严重感染 + SIRS 体温条件 + PSS 评分记录",
      conditions: [
        {
          id: "rule-sepsis-diagnosis",
          sourceSystem: "EMR/住院病历",
          field: "诊断代码/诊断文本",
          operator: "contains",
          value: "严重感染/脓毒症",
          summary: "诊断代码或文本命中严重感染",
        },
        {
          id: "rule-sepsis-temp",
          logic: "OR",
          summary: "SIRS 体温 >= 38.5℃ 或 <= 36℃",
          conditions: [
            {
              id: "rule-sepsis-temp-high",
              sourceSystem: "护理/监护",
              field: "体温",
              operator: ">=",
              value: "38.5",
              unit: "℃",
              summary: "体温 >= 38.5℃",
            },
            {
              id: "rule-sepsis-temp-low",
              sourceSystem: "护理/监护",
              field: "体温",
              operator: "<=",
              value: "36",
              unit: "℃",
              summary: "体温 <= 36℃",
            },
          ],
        },
        {
          id: "rule-sepsis-pss",
          sourceSystem: "评分表",
          field: "PSS 评分",
          operator: "exists",
          value: "存在",
          summary: "具备 PSS 评分记录",
        },
      ],
    },
    candidateCount: 3,
    enrolledCount: 4,
    withdrawnCount: 1,
    completion: 72,
    pendingReviewCount: 21,
    manualRequiredCount: 18,
    deviceMissingCount: 2,
    followupMissingCount: 1,
    mainCauseDistribution: [
      { label: "呼吸系统", value: 2 },
      { label: "严重感染", value: 4 },
      { label: "心血管", value: 1 },
      { label: "消化系统", value: 1 },
    ],
    updatedAt: "2026-06-04 18:20",
  },
  {
    id: "cohort-tbi",
    name: "创伤性脑损伤队列",
    disease: "创伤性脑损伤",
    owner: "赵主任",
    members: ["赵医生", "钱医生", "孙医生"],
    status: "screening",
    crfTemplateId: "tbi-crf-v1",
    rules: {
      id: "rule-tbi-root",
      logic: "OR",
      summary: "脑水肿仪记录 / 有创颅内压监测 / PACS 脑水肿证据",
      conditions: [
        {
          id: "rule-tbi-edema",
          sourceSystem: "离线设备-脑水肿仪",
          field: "扰动系数",
          operator: "exists",
          value: "存在",
          summary: "具有脑水肿仪扰动系数记录",
        },
        {
          id: "rule-tbi-icp",
          sourceSystem: "床边人工观测",
          field: "有创颅内压",
          operator: "exists",
          value: "存在",
          summary: "存在有创颅内压监测",
        },
        {
          id: "rule-tbi-pacs",
          sourceSystem: "检查/PACS",
          field: "影像结论",
          operator: "contains",
          value: "脑水肿",
          summary: "影像结论提示脑水肿或颅脑创伤",
        },
      ],
    },
    candidateCount: 4,
    enrolledCount: 2,
    withdrawnCount: 0,
    completion: 72,
    pendingReviewCount: 7,
    manualRequiredCount: 6,
    deviceMissingCount: 1,
    followupMissingCount: 2,
    mainCauseDistribution: [
      { label: "交通伤", value: 2 },
      { label: "坠落伤", value: 1 },
      { label: "钝器伤", value: 1 },
    ],
    updatedAt: "2026-06-04 17:10",
  },
] satisfies CohortProject[];

export const screeningCandidates = [
  {
    id: "cand-sepsis-01",
    patientId: "EMR-2026-1184",
    cohortId: "cohort-sepsis",
    caseId: "PICU-2026-0511",
    demographics: "2岁 女",
    diagnosis: "脓毒症 / 急性呼吸衰竭",
    matchedRules: ["诊断命中脓毒症", "体温 39.1℃", "PSS 评分存在"],
    evidence: ["EMR 入院诊断", "护理体温单", "评分表"],
    status: "enrolled",
    owner: "王医生",
    scannedAt: "2026-06-04 06:10",
    handledAt: "2026-06-04 08:32",
  },
  {
    id: "cand-sepsis-02",
    patientId: "EMR-2026-1207",
    cohortId: "cohort-sepsis",
    demographics: "5岁 男",
    diagnosis: "严重肺部感染 / SIRS",
    matchedRules: ["诊断命中严重感染", "体温 38.8℃"],
    evidence: ["EMR 出院诊断", "护理体温单"],
    status: "needs_data",
    owner: "陈医生",
    scannedAt: "2026-06-04 06:10",
    note: "缺 PSS 评分记录",
  },
  {
    id: "cand-tbi-01",
    patientId: "EMR-2026-1302",
    cohortId: "cohort-tbi",
    caseId: "PICU-TBI-2026-0601",
    demographics: "6岁 男",
    diagnosis: "重型颅脑损伤 / 脑水肿",
    matchedRules: ["脑水肿仪扰动系数记录", "有创颅内压监测"],
    evidence: ["脑水肿仪 XPS", "床边 ICP 记录"],
    status: "enrolled",
    owner: "赵医生",
    scannedAt: "2026-06-04 06:20",
    handledAt: "2026-06-04 09:12",
  },
  {
    id: "cand-tbi-02",
    patientId: "EMR-2026-1329",
    cohortId: "cohort-tbi",
    demographics: "9岁 男",
    diagnosis: "颅脑外伤 / 疑似脑水肿",
    matchedRules: ["PACS 结论提示脑水肿"],
    evidence: ["头颅 CT 报告"],
    status: "pending",
    owner: "孙医生",
    scannedAt: "2026-06-04 06:20",
  },
] satisfies ScreeningCandidate[];

export const tbiDeviceReports = tbiCaseRecords.flatMap((caseRecord, index) => [
  {
    id: `${caseRecord.id}-edema`,
    caseId: caseRecord.id,
    deviceName: "脑水肿仪",
    system: "离线设备-脑水肿仪",
    fileName: `${caseRecord.id}-脑水肿仪.xps`,
    fileType: "XPS",
    reportTime: `2026-06-0${index + 1} 10:15`,
    status: "review_required",
    previewTitle: "脑水肿扰动系数报告",
    conclusion: "扰动系数超出正常范围，建议结合 ICP 与影像复核。",
    extractedFields: [
      { label: "扰动系数最大值", value: index === 0 ? "188" : "202" },
      { label: "扰动系数最小值", value: index === 0 ? "132" : "145" },
    ],
    relatedFields: ["device_brain_edema_index", "tbi_brain_edema_record"],
  },
  {
    id: `${caseRecord.id}-tccd`,
    caseId: caseRecord.id,
    deviceName: "迈瑞 TCCD",
    system: "离线设备-TCCD",
    fileName: `${caseRecord.id}-TCCD.png`,
    fileType: "图片",
    reportTime: `2026-06-0${index + 1} 11:05`,
    status: index === 0 ? "uploaded" : "review_required",
    previewTitle: "TCCD 脑血流超声截图",
    conclusion: "大脑中动脉峰流速升高，RI 需人工核查。",
    extractedFields: [
      { label: "峰流速 PS", value: index === 0 ? "142" : "155", unit: "cm/s", fieldId: "device_tccd_ps" },
      { label: "阻力指数 RI", value: index === 0 ? "0.78" : "0.82", fieldId: "device_tccd_ri" },
    ],
    relatedFields: ["device_tccd_ps", "device_tccd_ri"],
  },
] satisfies DeviceReport[]);

export const tbiBedsideObservations = tbiCaseRecords.map((caseRecord, index) => ({
  id: `${caseRecord.id}-icp`,
  caseId: caseRecord.id,
  label: "有创颅内压",
  value: index === 0 ? "24" : "29",
  unit: "mmHg",
  observedAt: `2026-06-0${index + 1} 11:40`,
  observer: index === 0 ? "赵医生" : "钱医生",
  source: "床边 ICP 监测人工录入",
  status: "manual_required",
})) satisfies BedsideObservation[];

export const tbiTrends = tbiCaseRecords.map((caseRecord, index) => ({
  caseId: caseRecord.id,
  points: [
    { time: `2026-06-0${index + 1} 08:00`, heartRate: 118 + index * 6, map: 72 - index * 3, temperature: 37.2 },
    { time: `2026-06-0${index + 1} 09:00`, heartRate: 126 + index * 6, map: 68 - index * 3, temperature: 37.4 },
    { time: `2026-06-0${index + 1} 10:00`, heartRate: 134 + index * 6, map: 64 - index * 3, temperature: 37.8 },
    { time: `2026-06-0${index + 1} 11:00`, heartRate: 130 + index * 6, map: 66 - index * 3, temperature: 37.6 },
    { time: `2026-06-0${index + 1} 12:00`, heartRate: 122 + index * 6, map: 70 - index * 3, temperature: 37.3 },
  ],
  events: [
    { time: `2026-06-0${index + 1} 10:15`, label: "脑水肿仪", value: index === 0 ? "188" : "202", system: "离线设备-脑水肿仪" },
    { time: `2026-06-0${index + 1} 11:05`, label: "TCCD", value: index === 0 ? "142 cm/s" : "155 cm/s", system: "离线设备-TCCD" },
    { time: `2026-06-0${index + 1} 11:40`, label: "ICP", value: index === 0 ? "24 mmHg" : "29 mmHg", system: "床边人工观测" },
  ],
})) satisfies CaseTrend[];

export const tbiSourceEvidence = tbiCaseRecords.flatMap((caseRecord, index) => [
  {
    id: `${caseRecord.id}-external`,
    caseId: caseRecord.id,
    system: "院外数据",
    title: "院外数据接入",
    time: `2026-06-0${index + 1} 08:00`,
    snippet: "院外转诊记录、既往病史及外院检查数据经数据治理平台接入，清洗后统一结构化。",
    relatedFields: ["tbi_baseline_gcs"],
  },
  {
    id: `${caseRecord.id}-pacs`,
    caseId: caseRecord.id,
    system: "检查/PACS",
    title: "头颅 CT / MRI 报告",
    time: `2026-06-0${index + 1} 09:30`,
    snippet: "影像提示脑水肿及颅内压升高相关征象。",
    relatedFields: ["tbi_pacs_edema"],
  },
  {
    id: `${caseRecord.id}-score`,
    caseId: caseRecord.id,
    system: "评分表",
    title: "PIM3 / PSS 评分表",
    time: `2026-06-0${index + 1} 12:20`,
    snippet: "入 ICU 一小时内完成危重度评分记录。",
    relatedFields: ["tbi_pim3", "tbi_pss"],
  },
]) satisfies SourceEvidence[];

export const patientLifecycles: PatientLifecycle[] = [
  ...["PICU-2026-0503", "PICU-2026-0511", "PICU-2026-0520", "PICU-2026-0528"].map((caseId, index) => ({
    id: `life-${caseId}`,
    caseId,
    cohortId: "cohort-sepsis",
    events: [
      { id: `${caseId}-opd`, stage: "门诊" as const, time: `2026-05-${String(index + 3).padStart(2, "0")} 08:10`, title: "发热/感染就诊", description: "门诊记录提示感染相关症状。", sourceSystem: "EMR/门诊" },
      { id: `${caseId}-picu`, stage: "PICU" as const, time: `2026-05-${String(index + 3).padStart(2, "0")} 09:22`, title: "转入 PICU", description: "进入重症监护并启动脓毒症评估。", sourceSystem: "护理/监护" },
      { id: `${caseId}-device`, stage: "PICU" as const, time: `2026-05-${String(index + 3).padStart(2, "0")} 11:05`, title: "设备采集", description: "TCCD/脑水肿仪离线报告上传。", sourceSystem: "离线设备报告" },
      { id: `${caseId}-follow`, stage: "随访" as const, time: `2026-06-${String(index + 1).padStart(2, "0")} 10:00`, title: "结局随访", description: "补录离开 PICU 后最终结局。", sourceSystem: "随访" },
    ],
  })),
  ...tbiCaseRecords.map((caseRecord, index) => ({
    id: caseRecord.patientLifecycleId || `life-${caseRecord.id}`,
    caseId: caseRecord.id,
    cohortId: "cohort-tbi",
    events: [
      { id: `${caseRecord.id}-er`, stage: "门诊" as const, time: `2026-06-0${index + 1} 07:40`, title: "急诊入院", description: "外伤后意识障碍，急诊完成初筛。", sourceSystem: "EMR/急诊" },
      { id: `${caseRecord.id}-ward`, stage: "住院" as const, time: `2026-06-0${index + 1} 08:50`, title: "头颅 CT", description: "PACS 结论提示脑水肿。", sourceSystem: "检查/PACS", linkedFields: ["tbi_pacs_edema"] },
      { id: `${caseRecord.id}-picu`, stage: "PICU" as const, time: `2026-06-0${index + 1} 10:15`, title: "脑水肿仪采集", description: "扰动系数最大值超出正常范围。", sourceSystem: "离线设备-脑水肿仪", linkedFields: ["device_brain_edema_index"] },
      { id: `${caseRecord.id}-follow`, stage: "随访" as const, time: `2026-06-${String(index + 18).padStart(2, "0")} 14:00`, title: "90 天随访登记", description: "登记神经功能恢复情况。", sourceSystem: "随访", linkedFields: ["tbi_followup_90d"] },
    ],
  })),
];

export const tbiRawTables = tbiCaseRecords.flatMap((caseRecord) => [
  {
    id: "patient_profile",
    caseId: caseRecord.id,
    name: "患者基本信息表",
    system: "EMR/住院病历",
    columns: ["字段", "值", "来源"],
    rows: [
      { 字段: "病例号", 值: caseRecord.id, 来源: "EMR" },
      { 字段: "床位", 值: caseRecord.bed, 来源: "PICU床位表" },
      { 字段: "诊断", 值: caseRecord.diagnosis, 来源: "入院诊断" },
    ],
    linkedFields: ["tbi_pacs_edema"],
  },
  {
    id: "exam_reports",
    caseId: caseRecord.id,
    name: "检查报告表",
    system: "检查/PACS",
    columns: ["时间", "检查", "结论"],
    rows: [{ 时间: caseRecord.updatedAt, 检查: "头颅 CT", 结论: "脑水肿，颅内压升高征象" }],
    linkedFields: ["tbi_pacs_edema"],
  },
  {
    id: "score_forms",
    caseId: caseRecord.id,
    name: "评分表",
    system: "评分表",
    columns: ["时间", "评分", "值"],
    rows: [
      { 时间: caseRecord.updatedAt, 评分: "PIM3", 值: caseRecord.values.tbi_pim3.value },
      { 时间: caseRecord.updatedAt, 评分: "PSS", 值: caseRecord.values.tbi_pss.value },
    ],
    linkedFields: ["tbi_pim3", "tbi_pss"],
  },
]) satisfies RawTable[];

export const cohortQueryTemplates = [
  {
    id: "query-sepsis-hypoperfusion",
    cohortId: "cohort-sepsis",
    name: "低灌注 + 鲍曼不动杆菌",
    description: "毛细血管再充盈时间 > 2s 且血培养病原为鲍曼不动杆菌",
    conditions: ["毛细血管再充盈时间 > 2s", "血培养病原 = 鲍曼不动杆菌"],
    resultCaseIds: ["PICU-2026-0511", "PICU-2026-0528"],
    chartType: "km",
    exportPreset: "结构化数据 + rawTables",
  },
  {
    id: "query-tbi-edema-high",
    cohortId: "cohort-tbi",
    name: "扰动系数超正常范围",
    description: "脑水肿仪扰动系数最大值超出正常范围",
    conditions: ["扰动系数最大值 > 180", "存在 TCCD 或 ICP 记录"],
    resultCaseIds: ["PICU-TBI-2026-0601", "PICU-TBI-2026-0603"],
    chartType: "trend",
    exportPreset: "多模态源文件包",
  },
] satisfies QueryTemplate[];

export const exportJobs = [
  {
    id: "export-sepsis-01",
    cohortId: "cohort-sepsis",
    queryTemplateId: "query-sepsis-hypoperfusion",
    name: "脓毒症低灌注查询数据集",
    includes: ["caseRecord", "rawTables", "随访结局"],
    fileTypes: ["CSV", ".sps", "设备缩略图包"],
    status: "finished",
    createdBy: "李主任",
    createdAt: "2026-06-04 18:40",
  },
  {
    id: "export-tbi-01",
    cohortId: "cohort-tbi",
    queryTemplateId: "query-tbi-edema-high",
    name: "脑损伤设备参数多模态包",
    includes: ["caseRecord", "rawTables", "脑水肿仪 XPS", "TCCD 图片"],
    fileTypes: ["CSV", ".sps", "PDF/图片包"],
    status: "ready",
    createdBy: "赵主任",
    createdAt: "2026-06-04 17:35",
  },
] satisfies ExportJob[];

export const tbiDeviceMappingFields = [
  {
    id: "tbi_device_bundle",
    module: "设备参数",
    label: "脑水肿仪 / TCCD / ICP 组合参数",
    options: ["扰动系数", "PS cm/s", "RI", "ICP mmHg"],
    sourceSystems: ["离线设备-脑水肿仪", "离线设备-TCCD", "床边人工观测"],
    dataSource: "设备文件视图与床边人工观测表单",
    rootSource: "XPS、TCCD 图片、床边 ICP 读数",
    inputMode: "file_review",
    notes: "用于脑损伤队列的设备融合字段。",
    annotationRequired: true,
  },
] satisfies DeviceMappingField[];
