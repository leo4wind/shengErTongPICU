import type { BedsideObservation, CaseTrend, DeviceMappingField, DeviceReport } from "@/types";

const cases = ["PICU-2026-0503", "PICU-2026-0511", "PICU-2026-0520", "PICU-2026-0528"] as const;

const baseTimes: Record<(typeof cases)[number], string> = {
  "PICU-2026-0503": "2026-05-03",
  "PICU-2026-0511": "2026-05-11",
  "PICU-2026-0520": "2026-05-20",
  "PICU-2026-0528": "2026-05-28",
};

export const deviceReports: DeviceReport[] = cases.flatMap((caseId, caseIndex) => {
  const day = baseTimes[caseId];
  return [
    {
      id: `${caseId}-brain-edema`,
      caseId,
      deviceName: "脑水肿仪",
      system: "离线设备-脑水肿仪",
      fileName: `脑水肿扰动系数报告.png`,
      fileType: "图片",
      reportTime: `${day} 10:20`,
      status: caseIndex === 2 ? "missing" : "review_required",
      previewTitle: "脑水肿扰动系数报告",
      conclusion: caseIndex === 2 ? "未上传设备文件" : "扰动系数升高，提示需结合颅压及影像复核。",
      extractedFields: [
        { label: "扰动系数最大值", value: caseIndex === 2 ? "-" : String(168 + caseIndex * 5), unit: "" },
        { label: "扰动系数最小值", value: caseIndex === 2 ? "-" : String(121 + caseIndex * 4), unit: "" },
        { label: "测量侧别", value: caseIndex % 2 ? "右侧" : "左侧" },
      ],
      relatedFields: ["device_brain_edema_index", "device_brain_edema_side"],
    },
    {
      id: `${caseId}-tccd`,
      caseId,
      deviceName: "迈瑞 TCCD",
      system: "离线设备-TCCD",
      fileName: `TCCD 脑血流超声截图.jpg`,
      fileType: "图片",
      reportTime: `${day} 11:05`,
      status: caseIndex === 1 ? "missing" : "uploaded",
      previewTitle: "TCCD 脑血流超声截图",
      conclusion: caseIndex === 1 ? "未上传设备图片" : "大脑中动脉血流速度偏高，RI 需人工复核。",
      extractedFields: [
        { label: "峰流速 PS", value: caseIndex === 1 ? "-" : String(115 + caseIndex * 6), unit: "cm/s" },
        { label: "阻力指数 RI", value: caseIndex === 1 ? "-" : (0.66 + caseIndex * 0.02).toFixed(2) },
        { label: "检查血管", value: "MCA" },
      ],
      relatedFields: ["device_tccd_ps", "device_tccd_ri"],
    },
    {
      id: `${caseId}-tcd`,
      caseId,
      deviceName: "德力凯 TCD",
      system: "离线设备-TCD",
      fileName: `TCD.png`,
      fileType: "图片",
      reportTime: `${day} 12:10`,
      status: "uploaded",
      previewTitle: "TCD PDF 报告",
      conclusion: "频谱形态可见搏动指数变化，建议与颅压趋势联读。",
      extractedFields: [
        { label: "PI", value: (1.28 + caseIndex * 0.08).toFixed(2) },
        { label: "平均流速", value: String(72 + caseIndex * 4), unit: "cm/s" },
      ],
      relatedFields: ["device_tcd_pi"],
    },
    {
      id: `${caseId}-eeg`,
      caseId,
      deviceName: "脑电图",
      system: "离线设备-脑电图",
      fileName: `脑电波.png`,
      fileType: "图片",
      reportTime: `${day} 15:40`,
      status: caseIndex === 3 ? "review_required" : "uploaded",
      previewTitle: "脑电图波形扫描件",
      conclusion: "背景活动慢化，未见明确癫痫样放电，纸质报告需人工确认。",
      extractedFields: [
        { label: "背景活动", value: "慢化" },
        { label: "癫痫样放电", value: "未见明确" },
      ],
      relatedFields: ["device_eeg_background"],
    },
  ] satisfies DeviceReport[];
});

export const bedsideObservations = cases.flatMap((caseId, caseIndex) => {
  const day = baseTimes[caseId];
  return [
    {
      id: `${caseId}-onsd`,
      caseId,
      label: "视神经鞘直径 ONSD",
      value: (5.2 + caseIndex * 0.2).toFixed(1),
      unit: "mm",
      observedAt: `${day} 10:45`,
      observer: "李医生",
      source: "床边超声人工测量",
      status: "manual_required",
    },
    {
      id: `${caseId}-icp`,
      caseId,
      label: "有创颅内压",
      value: String(18 + caseIndex * 2),
      unit: "mmHg",
      observedAt: `${day} 11:30`,
      observer: "责任护士",
      source: "床边监测仪读数",
      status: "manual_required",
    },
    {
      id: `${caseId}-brain-oxygen`,
      caseId,
      label: "脑氧监测",
      value: String(62 - caseIndex * 2),
      unit: "%",
      observedAt: `${day} 12:00`,
      observer: "责任护士",
      source: "脑氧监测人工录入",
      status: "file_review_required",
    },
  ] satisfies BedsideObservation[];
});

export const caseTrends = cases.map((caseId, caseIndex) => {
  const day = baseTimes[caseId];
  return {
    caseId,
    points: [
      { time: `${day} 08:00`, heartRate: 132 + caseIndex * 3, map: 58 - caseIndex, temperature: 38.2 },
      { time: `${day} 09:00`, heartRate: 146 + caseIndex * 3, map: 51 - caseIndex, temperature: 38.7 },
      { time: `${day} 10:00`, heartRate: 139 + caseIndex * 3, map: 55 - caseIndex, temperature: 38.4 },
      { time: `${day} 11:00`, heartRate: 128 + caseIndex * 3, map: 62 - caseIndex, temperature: 37.9 },
      { time: `${day} 12:00`, heartRate: 121 + caseIndex * 3, map: 66 - caseIndex, temperature: 37.5 },
      { time: `${day} 13:00`, heartRate: 118 + caseIndex * 3, map: 70 - caseIndex, temperature: 37.2 },
    ],
    events: [
      { time: `${day} 10:20`, label: "脑水肿仪", value: `${168 + caseIndex * 5}`, system: "离线设备-脑水肿仪" },
      { time: `${day} 11:05`, label: "TCCD", value: `${115 + caseIndex * 6} cm/s`, system: "离线设备-TCCD" },
      { time: `${day} 12:10`, label: "血气乳酸", value: `${2.8 + caseIndex * 0.3} mmol/L`, system: "LIS/检验" },
    ],
  } satisfies CaseTrend;
});

export const deviceMappingFields = [
  {
    id: "device_brain_edema_index",
    module: "设备数据",
    label: "脑水肿扰动系数最大/最小值",
    options: ["最大值", "最小值"],
    sourceSystems: ["离线设备-脑水肿仪"],
    dataSource: "离线设备报告上传中心",
    rootSource: "脑水肿仪 XPS/PDF 报告",
    inputMode: "file_review",
    notes: "上传后展示 Mock 解析值，需人工复核文件录入。",
    annotationRequired: true,
  },
  {
    id: "device_tccd_ps_ri",
    module: "设备数据",
    label: "TCCD 峰流速 PS / 阻力指数 RI",
    options: ["PS cm/s", "RI"],
    sourceSystems: ["离线设备-TCCD"],
    dataSource: "离线设备报告上传中心",
    rootSource: "TCCD 图片或报告截图",
    inputMode: "file_review",
    notes: "图片带数据，需人工核对提取表单。",
    annotationRequired: true,
  },
  {
    id: "device_tcd_pi",
    module: "设备数据",
    label: "TCD 搏动指数 PI",
    options: ["PI", "平均流速"],
    sourceSystems: ["离线设备-TCD"],
    dataSource: "离线设备报告上传中心",
    rootSource: "德力凯 TCD PDF 报告",
    inputMode: "file_review",
    notes: "PDF 报告 Mock 提取后人工复核。",
    annotationRequired: true,
  },
  {
    id: "device_onsd_icp",
    module: "床边人工观测",
    label: "ONSD / 有创颅内压 / 脑氧监测",
    options: ["ONSD mm", "ICP mmHg", "rSO2 %"],
    sourceSystems: ["床边人工观测"],
    dataSource: "CRF 填审床边人工观测表单",
    rootSource: "护理单或床边设备读数",
    inputMode: "manual",
    notes: "医生或护士从床边读数人工录入。",
    annotationRequired: false,
  },
  {
    id: "device_eeg_background",
    module: "设备数据",
    label: "脑电图背景活动和异常波形",
    options: ["背景活动", "癫痫样放电"],
    sourceSystems: ["离线设备-脑电图"],
    dataSource: "离线设备报告上传中心",
    rootSource: "脑电图纸质扫描件或 PDF",
    inputMode: "file_review",
    notes: "纸质或 PDF 报告留存原文件，人工确认异常波形描述。",
    annotationRequired: true,
  },
] satisfies DeviceMappingField[];
