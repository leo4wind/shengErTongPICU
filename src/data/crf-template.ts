import type { CrfTemplate } from "@/types";

export const crfTemplate = {
  "id": "picu-sepsis-v1",
  "name": "省儿童 PICU 脓毒症 CRF",
  "sourceFile": "业务调研2（2026.）省儿童PICU调研-脓毒症病历.xlsx",
  "moduleCount": 21,
  "fieldCount": 74,
  "sourceSystemCounts": {
    "EMR/住院病历": 36,
    "随访": 2,
    "来源待确认": 3,
    "护理/监护": 11,
    "LIS/检验": 37,
    "检查/PACS": 3,
    "评分表": 9
  },
  "modules": [
    {
      "id": "m01_PICU结局",
      "name": "PICU结局",
      "fieldCount": 3,
      "sourceSystems": [
        "EMR/住院病历",
        "随访"
      ],
      "fields": [
        {
          "id": "f001_PICU结局_今日出院",
          "moduleId": "m01_PICU结局",
          "module": "PICU结局",
          "label": "今日出院",
          "options": [
            "存活"
          ],
          "dataSource": "出院病历，转归",
          "rootSource": "",
          "inputMode": "manual",
          "rawInputMode": "手动输入",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "不确定，存在随访，离开以后回去的情况不确定",
          "sourceSystems": [
            "EMR/住院病历",
            "随访"
          ]
        },
        {
          "id": "f002_PICU结局_临床死亡",
          "moduleId": "m01_PICU结局",
          "module": "PICU结局",
          "label": "临床死亡",
          "options": [
            "死亡"
          ],
          "dataSource": "出院病历：医嘱",
          "rootSource": "",
          "inputMode": "manual",
          "rawInputMode": "手动输入",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "不确定",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        },
        {
          "id": "f003_PICU结局_自动出院_危重放弃治疗_转院",
          "moduleId": "m01_PICU结局",
          "module": "PICU结局",
          "label": "自动出院（危重放弃治疗；转院）",
          "options": [
            "放弃治疗后死亡",
            "放弃治疗后存活"
          ],
          "dataSource": "住院病历：医嘱-自动出院\n同时满足门诊病历：诊断/现病史 包含死亡。\n如果回去死的只能随访，在系统上不会体现。；只能随访",
          "rootSource": "",
          "inputMode": "manual_unextractable",
          "rawInputMode": "手动输入；手动输入（无法提取）",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "不确定",
          "sourceSystems": [
            "EMR/住院病历",
            "随访"
          ]
        }
      ]
    },
    {
      "id": "m02_入PICU主要病因",
      "name": "入PICU主要病因",
      "fieldCount": 1,
      "sourceSystems": [
        "EMR/住院病历"
      ],
      "fields": [
        {
          "id": "f004_入PICU主要病因_疾病代码",
          "moduleId": "m02_入PICU主要病因",
          "module": "入PICU主要病因",
          "label": "疾病代码",
          "options": [
            "呼吸系统疾病",
            "心血管系统疾病（心衰+休克）",
            "神经系统疾病",
            "血液系统疾病",
            "泌尿系统疾病",
            "消化系统疾病",
            "创伤",
            "术后监护",
            "各种危象",
            "严重感染",
            "代谢紊乱",
            "皮肤",
            "其他"
          ],
          "dataSource": "住院病历：诊断，入院初步诊断、转院诊断\n其他科转入的病人：转入记录-接科诊断",
          "rootSource": "诊断里面有疾病代码，不需要手写，是结构化字段",
          "inputMode": "review",
          "rawInputMode": "自动提取诊断，然后手动分类；自动提取",
          "annotationRequired": true,
          "rawAnnotation": "需要标注",
          "control": "select",
          "notes": "诊断编码来源地方有初步入院、出院\n转入病人就是接科诊断\n直接入院的病人：初步诊断（未必明确，不提取）入院诊断和出院诊断。（取前三条）",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        }
      ]
    },
    {
      "id": "m03_入PICU已伴有疾病__引发的疾病",
      "name": "入PICU已伴有疾病 （引发的疾病）",
      "fieldCount": 1,
      "sourceSystems": [
        "EMR/住院病历"
      ],
      "fields": [
        {
          "id": "f005_入PICU已伴有疾病__引发的疾病_疾病代码",
          "moduleId": "m03_入PICU已伴有疾病__引发的疾病",
          "module": "入PICU已伴有疾病 （引发的疾病）",
          "label": "疾病代码",
          "options": [
            "呼吸系统疾病",
            "心血管系统疾病",
            "神经系统疾病",
            "血液系统疾病",
            "泌尿系统疾病",
            "消化系统疾病",
            "免疫系统疾病",
            "肿瘤",
            "代谢性疾病",
            "遗传性疾病",
            "器官移植或干细胞移植",
            "营养性疾病",
            "其他",
            "无"
          ],
          "dataSource": "既往史：门诊病历、住院病历；诊断：病历",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "有疾病还没好",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        }
      ]
    },
    {
      "id": "m04_基础疾病__本来就存在的疾病",
      "name": "基础疾病 （本来就存在的疾病）",
      "fieldCount": 2,
      "sourceSystems": [
        "EMR/住院病历",
        "来源待确认"
      ],
      "fields": [
        {
          "id": "f006_基础疾病__本来就存在的疾病_无",
          "moduleId": "m04_基础疾病__本来就存在的疾病",
          "module": "基础疾病 （本来就存在的疾病）",
          "label": "无",
          "options": [],
          "dataSource": "",
          "rootSource": "",
          "inputMode": "manual",
          "rawInputMode": "手动输入",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "有疾病已经好了",
          "sourceSystems": [
            "来源待确认"
          ]
        },
        {
          "id": "f007_基础疾病__本来就存在的疾病_有",
          "moduleId": "m04_基础疾病__本来就存在的疾病",
          "module": "基础疾病 （本来就存在的疾病）",
          "label": "有",
          "options": [
            "呼吸系统疾病",
            "心血管系统疾病",
            "神经系统疾病",
            "血液系统疾病",
            "泌尿系统疾病",
            "消化系统疾病",
            "免疫系统疾病",
            "肿瘤",
            "代谢性疾病",
            "遗传性疾病",
            "营养性疾病",
            "其他"
          ],
          "dataSource": "既往史-健康状况：门诊病历、住院病历；诊断",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "会有明确写出疾病的名称",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        }
      ]
    },
    {
      "id": "m05_免疫抑制",
      "name": "免疫抑制",
      "fieldCount": 2,
      "sourceSystems": [
        "EMR/住院病历"
      ],
      "fields": [
        {
          "id": "f008_免疫抑制_无",
          "moduleId": "m05_免疫抑制",
          "module": "免疫抑制",
          "label": "无",
          "options": [],
          "dataSource": "既往史：门诊病历、住院病历；诊断：本次病历",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        },
        {
          "id": "f009_免疫抑制_有",
          "moduleId": "m05_免疫抑制",
          "module": "免疫抑制",
          "label": "有",
          "options": [
            "血液/实体肿瘤/化疗/骨髓移植/Car-T（同一类，血液病）",
            "实体器官移植",
            "原发性免疫缺陷",
            "结缔组织病/风湿免疫",
            "HIV",
            "结核感染活动",
            "其他"
          ],
          "dataSource": "既往史：门诊病历、住院病历；诊断：本次病历",
          "rootSource": "提取困难，病历里面没有免疫抑制的字眼；要看病史",
          "inputMode": "manual",
          "rawInputMode": "手动输入",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "具体的确认方法",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        }
      ]
    },
    {
      "id": "m06_家族史",
      "name": "家族史",
      "fieldCount": 2,
      "sourceSystems": [
        "EMR/住院病历"
      ],
      "fields": [
        {
          "id": "f010_家族史_无",
          "moduleId": "m06_家族史",
          "module": "家族史",
          "label": "无",
          "options": [],
          "dataSource": "家族史：住院病历",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        },
        {
          "id": "f011_家族史_有",
          "moduleId": "m06_家族史",
          "module": "家族史",
          "label": "有",
          "options": [
            "习惯性流产史",
            "先心病病史",
            "肾病病史",
            "高血压病病史",
            "糖尿病病史",
            "肿瘤病史",
            "冠心病病史",
            "耳聋家族史",
            "癫痫病史",
            "精神病史",
            "其他"
          ],
          "dataSource": "家族史：住院病历",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        }
      ]
    },
    {
      "id": "m07_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分",
      "name": "脓毒症（纳入标准：感染+SIRS，脓毒症诊断标准：感染＋PSS评分）",
      "fieldCount": 2,
      "sourceSystems": [
        "EMR/住院病历"
      ],
      "fields": [
        {
          "id": "f012_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分_无",
          "moduleId": "m07_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分",
          "module": "脓毒症（纳入标准：感染+SIRS，脓毒症诊断标准：感染＋PSS评分）",
          "label": "无",
          "options": [],
          "dataSource": "有无诊断",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        },
        {
          "id": "f013_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分_有",
          "moduleId": "m07_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分",
          "module": "脓毒症（纳入标准：感染+SIRS，脓毒症诊断标准：感染＋PSS评分）",
          "label": "有",
          "options": [
            "纳入日期",
            "出院时是否诊断",
            "诊断日期"
          ],
          "dataSource": "诊断对应病历的日期；出院诊断有无包含脓毒症，这次住院是否有包含脓毒症；不确定",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "date",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        }
      ]
    },
    {
      "id": "m08_SIRS_炎症反应",
      "name": "SIRS（炎症反应）",
      "fieldCount": 4,
      "sourceSystems": [
        "LIS/检验",
        "护理/监护"
      ],
      "fields": [
        {
          "id": "f014_SIRS_炎症反应_体温",
          "moduleId": "m08_SIRS_炎症反应",
          "module": "SIRS（炎症反应）",
          "label": "体温",
          "options": [
            "正常",
            "发热（≥38.5℃）或低体温（≤36℃）"
          ],
          "dataSource": "有符合脓毒症的护理记录单上",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "监护仪",
          "sourceSystems": [
            "护理/监护"
          ]
        },
        {
          "id": "f015_SIRS_炎症反应_心动过速",
          "moduleId": "m08_SIRS_炎症反应",
          "module": "SIRS（炎症反应）",
          "label": "心动过速",
          "options": [
            "无，不超过120",
            "有"
          ],
          "dataSource": "心率：护理单",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "boolean",
          "notes": "监护仪",
          "sourceSystems": [
            "护理/监护"
          ]
        },
        {
          "id": "f016_SIRS_炎症反应_呼吸增加",
          "moduleId": "m08_SIRS_炎症反应",
          "module": "SIRS（炎症反应）",
          "label": "呼吸增加",
          "options": [
            "无",
            "有"
          ],
          "dataSource": "每分钟呼吸次数：护理单",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "boolean",
          "notes": "监护仪",
          "sourceSystems": [
            "护理/监护"
          ]
        },
        {
          "id": "f017_SIRS_炎症反应_白细胞",
          "moduleId": "m08_SIRS_炎症反应",
          "module": "SIRS（炎症反应）",
          "label": "白细胞",
          "options": [
            "正常：数值",
            "白细胞增多（>12×109/L）",
            "白细胞减少（<4×109/L）"
          ],
          "dataSource": "血常规检验单，lis检验检查结果",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "血常规",
          "sourceSystems": [
            "LIS/检验"
          ]
        }
      ]
    },
    {
      "id": "m09_感染指标",
      "name": "感染指标",
      "fieldCount": 11,
      "sourceSystems": [
        "LIS/检验",
        "检查/PACS"
      ],
      "fields": [
        {
          "id": "f018_感染指标_CRP",
          "moduleId": "m09_感染指标",
          "module": "感染指标",
          "label": "CRP",
          "options": [],
          "dataSource": "血常规检验单，lis检验检查结果",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f019_感染指标_PCT",
          "moduleId": "m09_感染指标",
          "module": "感染指标",
          "label": "PCT",
          "options": [],
          "dataSource": "血常规检验单，lis检验检查结果",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验",
            "检查/PACS"
          ]
        },
        {
          "id": "f020_感染指标_IL_1",
          "moduleId": "m09_感染指标",
          "module": "感染指标",
          "label": "IL-1",
          "options": [],
          "dataSource": "血常规检验单，lis检验检查结果",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f021_感染指标_IL_2",
          "moduleId": "m09_感染指标",
          "module": "感染指标",
          "label": "IL-2",
          "options": [],
          "dataSource": "血常规检验单，lis检验检查结果",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f022_感染指标_IL_6",
          "moduleId": "m09_感染指标",
          "module": "感染指标",
          "label": "IL-6",
          "options": [],
          "dataSource": "血常规检验单，lis检验检查结果",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f023_感染指标_IL_8",
          "moduleId": "m09_感染指标",
          "module": "感染指标",
          "label": "IL-8",
          "options": [],
          "dataSource": "血常规检验单，lis检验检查结果",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f024_感染指标_IL_10",
          "moduleId": "m09_感染指标",
          "module": "感染指标",
          "label": "IL-10",
          "options": [],
          "dataSource": "血常规检验单，lis检验检查结果",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f025_感染指标_TNF_α",
          "moduleId": "m09_感染指标",
          "module": "感染指标",
          "label": "TNF-α",
          "options": [],
          "dataSource": "血常规检验单，lis检验检查结果",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f026_感染指标_INF_γ",
          "moduleId": "m09_感染指标",
          "module": "感染指标",
          "label": "INF-γ",
          "options": [],
          "dataSource": "血常规检验单，lis检验检查结果",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f027_感染指标_1_3_β_D葡聚糖",
          "moduleId": "m09_感染指标",
          "module": "感染指标",
          "label": "（1,3）-β-D葡聚糖",
          "options": [],
          "dataSource": "血常规检验单，lis检验检查结果",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f028_感染指标_GM",
          "moduleId": "m09_感染指标",
          "module": "感染指标",
          "label": "GM",
          "options": [],
          "dataSource": "血常规检验单，lis检验检查结果",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        }
      ]
    },
    {
      "id": "m10_PSS评分",
      "name": "PSS评分",
      "fieldCount": 7,
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验",
        "护理/监护",
        "评分表"
      ],
      "fields": [
        {
          "id": "f029_PSS评分_呼吸",
          "moduleId": "m10_PSS评分",
          "module": "PSS评分",
          "label": "呼吸",
          "options": [],
          "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "监护仪",
          "sourceSystems": [
            "EMR/住院病历",
            "护理/监护",
            "评分表"
          ]
        },
        {
          "id": "f030_PSS评分_血管活性药物",
          "moduleId": "m10_PSS评分",
          "module": "PSS评分",
          "label": "血管活性药物",
          "options": [
            "肾上腺素、去甲肾上腺素、特利加压素、多巴胺、多巴酚丁胺"
          ],
          "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "病程中有没有提及",
          "sourceSystems": [
            "EMR/住院病历",
            "评分表"
          ]
        },
        {
          "id": "f031_PSS评分_平均动脉压",
          "moduleId": "m10_PSS评分",
          "module": "PSS评分",
          "label": "平均动脉压",
          "options": [],
          "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "监护仪",
          "sourceSystems": [
            "EMR/住院病历",
            "护理/监护",
            "评分表"
          ]
        },
        {
          "id": "f032_PSS评分_乳酸",
          "moduleId": "m10_PSS评分",
          "module": "PSS评分",
          "label": "乳酸",
          "options": [],
          "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "血气分析-LAC；床边血气仪器（数据自动上传）",
          "sourceSystems": [
            "EMR/住院病历",
            "LIS/检验",
            "评分表"
          ]
        },
        {
          "id": "f033_PSS评分_循环",
          "moduleId": "m10_PSS评分",
          "module": "PSS评分",
          "label": "循环",
          "options": [],
          "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "不确定",
          "sourceSystems": [
            "EMR/住院病历",
            "评分表"
          ]
        },
        {
          "id": "f034_PSS评分_凝血",
          "moduleId": "m10_PSS评分",
          "module": "PSS评分",
          "label": "凝血",
          "options": [],
          "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "凝血检验LIS-EMR",
          "sourceSystems": [
            "EMR/住院病历",
            "LIS/检验",
            "评分表"
          ]
        },
        {
          "id": "f035_PSS评分_神经",
          "moduleId": "m10_PSS评分",
          "module": "PSS评分",
          "label": "神经",
          "options": [],
          "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "昏迷评分表，只能人为",
          "sourceSystems": [
            "EMR/住院病历",
            "评分表"
          ]
        }
      ]
    },
    {
      "id": "m11_呼吸功能障碍",
      "name": "呼吸功能障碍",
      "fieldCount": 4,
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验"
      ],
      "fields": [
        {
          "id": "f036_呼吸功能障碍_低氧血症",
          "moduleId": "m11_呼吸功能障碍",
          "module": "呼吸功能障碍",
          "label": "低氧血症",
          "options": [
            "吸氧时：P/F(Pa02／Fi02 ) =     mmHg;"
          ],
          "dataSource": "血气检验单",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "吸氧时候测量",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f037_呼吸功能障碍_机械通气",
          "moduleId": "m11_呼吸功能障碍",
          "module": "呼吸功能障碍",
          "label": "机械通气",
          "options": [
            "无创机械通气：P/F =   mmHg",
            "无创机械通气：S/F比 =",
            "有创机械通气：OI指数="
          ],
          "dataSource": "血气检验单",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f038_呼吸功能障碍_有创机械通气_OIS指数",
          "moduleId": "m11_呼吸功能障碍",
          "module": "呼吸功能障碍",
          "label": "有创机械通气：OIS指数=",
          "options": [
            "有创机械通气：OIS指数="
          ],
          "dataSource": "血气检验单",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f039_呼吸功能障碍_ARDS",
          "moduleId": "m11_呼吸功能障碍",
          "module": "呼吸功能障碍",
          "label": "ARDS",
          "options": [
            "无",
            "PaO2   mmHg, FiO2   %，PaO2/FiO2   mmHg,",
            "PaCO2     mmHg，SpO2      %，Paw",
            "无创通气：P/F比      ，S/F比（P/F无法获取时填写）",
            "有创机械通气：氧指数（OI）     ， 氧饱和度指数（OSI）（OI无法获取时填写）      ；"
          ],
          "dataSource": "血气检验单",
          "rootSource": "手动选择",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "1.做成范围值\n2.如果是转入病人（病程记录有转入日期），6-7小时以内的血气单时间",
          "sourceSystems": [
            "EMR/住院病历",
            "LIS/检验"
          ]
        }
      ]
    },
    {
      "id": "m12_心血管功能障碍",
      "name": "心血管功能障碍",
      "fieldCount": 2,
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验",
        "护理/监护"
      ],
      "fields": [
        {
          "id": "f040_心血管功能障碍_低血压_护理单上血压最低时候",
          "moduleId": "m12_心血管功能障碍",
          "module": "心血管功能障碍",
          "label": "低血压（护理单上血压最低时候）",
          "options": [
            "无",
            "有血管活性药：肾上腺素、去甲肾上腺素、特利加压素、多巴胺、多巴酚丁胺",
            "高乳酸血症：数值",
            "毛细血管再充盈时间或CRT延长（≥2s）",
            "皮肤花斑/花纹"
          ],
          "dataSource": "住院病历：住院医嘱中的临时医嘱，来源医嘱系统；血气经验单；病程里面；病历体格检查、病程",
          "rootSource": "对应血压低的时候；血压最低时候的乳酸，血压来源监护仪；血压最低时候，6小时内对应的值",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": true,
          "rawAnnotation": "要",
          "control": "date",
          "notes": "血压最低（重症护理记录单，监护仪数据实时导入），往后12小时之内的乳酸值，如果多次取最高的；CRT常规在大病历中才有；血压低的时候要求大家在病程中把这些内容写出来",
          "sourceSystems": [
            "EMR/住院病历",
            "LIS/检验",
            "护理/监护"
          ]
        },
        {
          "id": "f041_心血管功能障碍_低灌注_低血压的时候是否有低灌注表显",
          "moduleId": "m12_心血管功能障碍",
          "module": "心血管功能障碍",
          "label": "低灌注（低血压的时候是否有低灌注表显）",
          "options": [
            "心率、脉搏变化：外周动脉搏动细弱，心率、脉搏增快；",
            "皮肤改变：面色苍白或苍灰，湿冷，大理石样花纹。如暖休克可表现为四肢温暖、皮肤干燥。",
            "毛细血管再充盈时间（CRT）延长（>2s）（需除外环境温度影响）",
            "意识改变：早期烦躁不安或萎靡，表情淡漠。晚期意识模糊，甚至昏迷、惊厥。",
            "液体复苏后尿量<0.5 ml／(kg·h)，持续至少2h"
          ],
          "dataSource": "重症护理单（血压低的时候，心率分次、呼吸分次）；病程；同上；病程：查体；护理单-尿管/出量（尿管、尿液）",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "date",
          "notes": "低灌注的病人要护士去记录每小时数值",
          "sourceSystems": [
            "EMR/住院病历",
            "护理/监护"
          ]
        }
      ]
    },
    {
      "id": "m13_神经功能障碍",
      "name": "神经功能障碍",
      "fieldCount": 2,
      "sourceSystems": [
        "EMR/住院病历",
        "评分表"
      ],
      "fields": [
        {
          "id": "f042_神经功能障碍_无",
          "moduleId": "m13_神经功能障碍",
          "module": "神经功能障碍",
          "label": "无",
          "options": [],
          "dataSource": "昏迷评分表",
          "rootSource": "",
          "inputMode": "manual",
          "rawInputMode": "需要手选",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "评分表"
          ]
        },
        {
          "id": "f043_神经功能障碍_有",
          "moduleId": "m13_神经功能障碍",
          "module": "神经功能障碍",
          "label": "有",
          "options": [
            "Glassgow评分",
            "瞳孔"
          ],
          "dataSource": "昏迷评分表；病程体格检查",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历",
            "评分表"
          ]
        }
      ]
    },
    {
      "id": "m14_血液系统功能障碍",
      "name": "血液系统功能障碍",
      "fieldCount": 2,
      "sourceSystems": [
        "LIS/检验"
      ],
      "fields": [
        {
          "id": "f044_血液系统功能障碍_无",
          "moduleId": "m14_血液系统功能障碍",
          "module": "血液系统功能障碍",
          "label": "无",
          "options": [],
          "dataSource": "检验信息",
          "rootSource": "",
          "inputMode": "manual",
          "rawInputMode": "需要手选",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f045_血液系统功能障碍_有",
          "moduleId": "m14_血液系统功能障碍",
          "module": "血液系统功能障碍",
          "label": "有",
          "options": [
            "血小板计数      ×109/L",
            "APTT        s",
            "INR",
            "FDP",
            "纤维蛋白原",
            "D-Dimers"
          ],
          "dataSource": "检验信息-血常规；检验信息-凝血功能",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        }
      ]
    },
    {
      "id": "m15_肾脏功能障碍",
      "name": "肾脏功能障碍",
      "fieldCount": 3,
      "sourceSystems": [
        "LIS/检验"
      ],
      "fields": [
        {
          "id": "f046_肾脏功能障碍_无",
          "moduleId": "m15_肾脏功能障碍",
          "module": "肾脏功能障碍",
          "label": "无",
          "options": [],
          "dataSource": "检验信息-生化",
          "rootSource": "",
          "inputMode": "manual",
          "rawInputMode": "需要手选",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f047_肾脏功能障碍_有",
          "moduleId": "m15_肾脏功能障碍",
          "module": "肾脏功能障碍",
          "label": "有",
          "options": [
            "血肌酐     umoL/L；",
            "血尿素氮     umoL/L；"
          ],
          "dataSource": "检验信息-生化",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f048_肾脏功能障碍_足量液体复苏后尿量_0_5_ml_kg_h_持续至少2_h",
          "moduleId": "m15_肾脏功能障碍",
          "module": "肾脏功能障碍",
          "label": "足量液体复苏后尿量<0.5 ml／(kg·h)，持续至少2 h",
          "options": [
            "无",
            "有"
          ],
          "dataSource": "检验信息-生化",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        }
      ]
    },
    {
      "id": "m16_消化功能障碍",
      "name": "消化功能障碍",
      "fieldCount": 3,
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验"
      ],
      "fields": [
        {
          "id": "f049_消化功能障碍_无",
          "moduleId": "m16_消化功能障碍",
          "module": "消化功能障碍",
          "label": "无",
          "options": [],
          "dataSource": "检验信息-生化",
          "rootSource": "",
          "inputMode": "manual",
          "rawInputMode": "需要手选",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "text",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f050_消化功能障碍_有",
          "moduleId": "m16_消化功能障碍",
          "module": "消化功能障碍",
          "label": "有",
          "options": [
            "总胆红素    μmoL/L；",
            "ALT       mmoL/L；"
          ],
          "dataSource": "检验信息-生化",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f051_消化功能障碍_肠鸣音消失",
          "moduleId": "m16_消化功能障碍",
          "module": "消化功能障碍",
          "label": "肠鸣音消失",
          "options": [
            "无",
            "有"
          ],
          "dataSource": "人为查体判断-病程",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "boolean",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        }
      ]
    },
    {
      "id": "m17_原发感染部位",
      "name": "原发感染部位",
      "fieldCount": 4,
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验"
      ],
      "fields": [
        {
          "id": "f052_原发感染部位_具体疾病名称",
          "moduleId": "m17_原发感染部位",
          "module": "原发感染部位",
          "label": "具体疾病名称",
          "options": [
            "呼吸道",
            "腹部",
            "心血管",
            "血液",
            "中枢神经系统",
            "泌尿系统疾病",
            "皮肤",
            "其他"
          ],
          "dataSource": "病程里面有诊断，出院诊断会有所有感染名称；病程",
          "rootSource": "检验-肺泡灌洗液是否有细菌或病毒",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "判断微生物名称里面排除掉无或者未检出；项目名称-样本名关联",
          "sourceSystems": [
            "EMR/住院病历",
            "LIS/检验"
          ]
        },
        {
          "id": "f053_原发感染部位_原发疾病诊断日期",
          "moduleId": "m17_原发感染部位",
          "module": "原发感染部位",
          "label": "原发疾病诊断日期",
          "options": [],
          "dataSource": "所有病程（第一次出现脓毒症的日期）",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "date",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        },
        {
          "id": "f054_原发感染部位_病原来源",
          "moduleId": "m17_原发感染部位",
          "module": "原发感染部位",
          "label": "病原来源",
          "options": [
            "血液",
            "尿液",
            "脑脊液",
            "呼吸系统（痰液、支气管肺泡灌洗）",
            "粪便",
            "胸腔积液",
            "心包积液",
            "腹水",
            "伤口"
          ],
          "dataSource": "病程",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历",
            "LIS/检验"
          ]
        },
        {
          "id": "f055_原发感染部位_具体病原结果",
          "moduleId": "m17_原发感染部位",
          "module": "原发感染部位",
          "label": "具体病原结果",
          "options": [
            "细菌（1肺炎链球菌2流感嗜血杆菌3金黄葡萄球菌4假单胞菌属5表皮葡萄球菌6克雷白杆菌7阴沟杆菌8大肠杆菌9溶血性链球菌10鲍曼不动杆菌11其他）",
            "病毒（1呼吸道合胞病毒（RSV）2巨细胞病毒（CMV）3柯萨奇病毒4腺病毒5流感病毒6EB病毒7其它）",
            "真菌（1白色念珠菌2曲霉菌属3其它）",
            "其他（1支原体2衣原体3寄生虫4其它"
          ],
          "dataSource": "检验",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        }
      ]
    },
    {
      "id": "m18_入ICU1小时内PIM3评分",
      "name": "入ICU1小时内PIM3评分",
      "fieldCount": 10,
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验",
        "护理/监护",
        "来源待确认"
      ],
      "fields": [
        {
          "id": "f056_入ICU1小时内PIM3评分_收缩压",
          "moduleId": "m18_入ICU1小时内PIM3评分",
          "module": "入ICU1小时内PIM3评分",
          "label": "收缩压",
          "options": [
            "mmHg"
          ],
          "dataSource": "入院时间-护理记录",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "",
          "sourceSystems": [
            "护理/监护"
          ]
        },
        {
          "id": "f057_入ICU1小时内PIM3评分_瞳孔反射",
          "moduleId": "m18_入ICU1小时内PIM3评分",
          "module": "入ICU1小时内PIM3评分",
          "label": "瞳孔反射",
          "options": [
            "（>3mm和双侧瞳孔固定计分1，其他或者未知计分0）"
          ],
          "dataSource": "入院时间-病程记录",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历",
            "护理/监护"
          ]
        },
        {
          "id": "f058_入ICU1小时内PIM3评分_Fio2_100_PaO2",
          "moduleId": "m18_入ICU1小时内PIM3评分",
          "module": "入ICU1小时内PIM3评分",
          "label": "［Fio2×100］/PaO2",
          "options": [
            "（如果Fio2 或 Pao2未知，则[(Fio2 × 100)/Pao2] = 0.23）"
          ],
          "dataSource": "血气分析",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f059_入ICU1小时内PIM3评分_碱剩余",
          "moduleId": "m18_入ICU1小时内PIM3评分",
          "module": "入ICU1小时内PIM3评分",
          "label": "碱剩余",
          "options": [
            "mmol/L（未知计分0）"
          ],
          "dataSource": "血气分析",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f060_入ICU1小时内PIM3评分_入PICU1小时内是否使用机械通气",
          "moduleId": "m18_入ICU1小时内PIM3评分",
          "module": "入ICU1小时内PIM3评分",
          "label": "入PICU1小时内是否使用机械通气",
          "options": [
            "（未用＝0，使用＝1）"
          ],
          "dataSource": "入院时间-病程记录",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历",
            "护理/监护"
          ]
        },
        {
          "id": "f061_入ICU1小时内PIM3评分_是否为选择性入ICU",
          "moduleId": "m18_入ICU1小时内PIM3评分",
          "module": "入ICU1小时内PIM3评分",
          "label": "是否为选择性入ICU",
          "options": [
            "（否＝0，是＝1）"
          ],
          "dataSource": "",
          "rootSource": "",
          "inputMode": "unknown",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "来源待确认"
          ]
        },
        {
          "id": "f062_入ICU1小时内PIM3评分_是否为外科或其他操作后恢复期病例",
          "moduleId": "m18_入ICU1小时内PIM3评分",
          "module": "入ICU1小时内PIM3评分",
          "label": "是否为外科或其他操作后恢复期病例",
          "options": [
            "［0］不是",
            "［1］是，心脏旁路手术的恢复",
            "［2］是，非心脏旁路手术的恢复",
            "［3］是，非心脏手术的恢复"
          ],
          "dataSource": "手动评分",
          "rootSource": "",
          "inputMode": "unknown",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "来源待确认"
          ]
        },
        {
          "id": "f063_入ICU1小时内PIM3评分_低危诊断",
          "moduleId": "m18_入ICU1小时内PIM3评分",
          "module": "入ICU1小时内PIM3评分",
          "label": "低危诊断",
          "options": [
            "［0］无",
            "［1］哮喘为入ICU主要原因",
            "［2］毛细支气管炎为入ICU主要原因",
            "［3］喉气管支气管炎为入ICU主要原因",
            "［4］阻塞性睡眠呼吸暂停为入ICU主要原因",
            "［5］糖尿病酮症酸中毒为入ICU主要原因",
            "［6］惊厥为入ICU主要原因"
          ],
          "dataSource": "手动评分",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        },
        {
          "id": "f064_入ICU1小时内PIM3评分_高危诊断",
          "moduleId": "m18_入ICU1小时内PIM3评分",
          "module": "入ICU1小时内PIM3评分",
          "label": "高危诊断",
          "options": [
            "［0］无",
            "［1］自发性脑出血",
            "［2］心肌病或心肌炎",
            "［3］左心发育不全综合症",
            "［4］神经退行性疾病",
            "［5］坏死性小肠结肠炎为入PICU主要原因"
          ],
          "dataSource": "手动评分",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        },
        {
          "id": "f065_入ICU1小时内PIM3评分_极高风险诊断",
          "moduleId": "m18_入ICU1小时内PIM3评分",
          "module": "入ICU1小时内PIM3评分",
          "label": "极高风险诊断",
          "options": [
            "［0］无",
            "［1］入ICU前心脏骤停",
            "［2］严重联合免疫缺陷",
            "［3］第一次诱导后淋巴瘤或白血病",
            "［4］骨髓移植受者",
            "［5］肝衰竭为入住PICU主要原因"
          ],
          "dataSource": "手动评分",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        }
      ]
    },
    {
      "id": "m19_实验室检查",
      "name": "实验室检查",
      "fieldCount": 6,
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验"
      ],
      "fields": [
        {
          "id": "f066_实验室检查_血常规",
          "moduleId": "m19_实验室检查",
          "module": "实验室检查",
          "label": "血常规",
          "options": [
            "白细胞计数（WBC）",
            "中性粒细胞%(NEUTP)",
            "中性粒细胞计数(NEUT)",
            "单核细胞%(MONOP)",
            "单核细胞计数(MONON)",
            "淋巴细胞%(LYMPHN)",
            "淋巴细胞计数(LYMPHN)",
            "红细胞计数（RBC）",
            "血红蛋白（Hb）",
            "网织红细胞计数",
            "有核红细胞%",
            "有核红细胞计数",
            "红细胞分布宽度CV",
            "红细胞压积(HCT)",
            "平均血红蛋白浓度",
            "平均红细胞体积(MCV)",
            "平均血红蛋白(MCH)",
            "红细胞分布宽度-SD",
            "血小板计数（PLT）",
            "血小板压积(PCT)",
            "血小板分布宽度(PDW)",
            "平均血小板体积(MPV)",
            "C-反应蛋白（CRP）"
          ],
          "dataSource": "检验信息",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "诊断脓毒症后的第一个结果",
          "sourceSystems": [
            "EMR/住院病历",
            "LIS/检验"
          ]
        },
        {
          "id": "f067_实验室检查_肝功能",
          "moduleId": "m19_实验室检查",
          "module": "实验室检查",
          "label": "肝功能",
          "options": [
            "丙氨酸氨基转移酶（ALT）",
            "门冬氨酸氨基转移酶（AST）",
            "γ-谷氨酰转肽酶（GGT",
            "碱性磷酸酯酶（ALP）",
            "总蛋白",
            "白蛋白（ALB）",
            "球蛋白",
            "白蛋白/球蛋白",
            "前白蛋白",
            "总胆红素",
            "直接胆红素",
            "间接胆红素",
            "甘油三酯",
            "总胆固醇（TC）",
            "载脂蛋白-A1",
            "载脂蛋白-B",
            "高密度脂蛋白胆固醇HDL",
            "低密度脂蛋白胆固醇LDL"
          ],
          "dataSource": "检验信息",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f068_实验室检查_凝血功能",
          "moduleId": "m19_实验室检查",
          "module": "实验室检查",
          "label": "凝血功能",
          "options": [
            "凝血酶原时间（PT）",
            "凝血酶时间（TT）",
            "凝血酶原活动度（PTA）",
            "活化部分凝血酶时间（APTT）",
            "国际标准化比值（INR）",
            "纤维蛋白原（FIB）",
            "纤维蛋白(原)降解产物（FDP）",
            "D-二聚体"
          ],
          "dataSource": "检验信息",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "date",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f069_实验室检查_电解质",
          "moduleId": "m19_实验室检查",
          "module": "实验室检查",
          "label": "电解质",
          "options": [
            "钾(K+)",
            "钠(Na+)",
            "氯(Cl-)",
            "钙(Ca+)",
            "磷（P）",
            "镁（Mg）"
          ],
          "dataSource": "检验信息",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f070_实验室检查_血气分析",
          "moduleId": "m19_实验室检查",
          "module": "实验室检查",
          "label": "血气分析",
          "options": [
            "酸碱度（PH）",
            "动脉血二氧化碳分压（PaCO2）",
            "动脉血阳分压（PaO2）",
            "碳酸氢根（HCO3-）",
            "剩余碱（BE）",
            "血乳酸"
          ],
          "dataSource": "检验信息",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        },
        {
          "id": "f071_实验室检查_甲状腺功能",
          "moduleId": "m19_实验室检查",
          "module": "实验室检查",
          "label": "甲状腺功能",
          "options": [
            "三-碘甲腺原氨酸总量(TT3)",
            "甲状腺素总量(TT4)",
            "游离三-碘甲腺原氨酸(FT3)",
            "游离甲状腺素(FT4)",
            "促甲状腺激素(TSH)",
            "促甲状腺激素释放激素(TRH)"
          ],
          "dataSource": "检验信息",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "LIS/检验"
          ]
        }
      ]
    },
    {
      "id": "m20_仪器检查",
      "name": "仪器检查",
      "fieldCount": 2,
      "sourceSystems": [
        "EMR/住院病历",
        "护理/监护",
        "检查/PACS"
      ],
      "fields": [
        {
          "id": "f072_仪器检查_心电图",
          "moduleId": "m20_仪器检查",
          "module": "仪器检查",
          "label": "心电图",
          "options": [
            "心率",
            "PR间期",
            "QRS间期",
            "QT间期",
            "QTcF间期",
            "□窦性心律 □窦性心动过缓 □窦性心律不齐 □窦性心动过速\n□房性早搏 □房性心动过速 □心房扑动 □心房颤动\n□交界性早搏 □室上性心动过速 □室性早搏 □室性心动过速\n□心室扑动 □心室颤动 □室性自主心律\n□房室传导阻滞（I、II度I型、II度II型、III度）"
          ],
          "dataSource": "检查信息",
          "rootSource": "EMR-心电图-心率（数值）；EMR-心电图（数值）；EMR-心电图-诊断（文字描述）",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "number",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历",
            "护理/监护",
            "检查/PACS"
          ]
        },
        {
          "id": "f073_仪器检查_影像学",
          "moduleId": "m20_仪器检查",
          "module": "仪器检查",
          "label": "影像学",
          "options": [
            "○aEEG○EEG○CT○X光○超声○TCD○MRI○TDI○MRS○MRA○MRV\n○近红外光谱（NIRS）○AABR○TEOAE○眼底"
          ],
          "dataSource": "检查信息-诊断印象",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "select",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历",
            "检查/PACS"
          ]
        }
      ]
    },
    {
      "id": "m21_治疗",
      "name": "治疗",
      "fieldCount": 1,
      "sourceSystems": [
        "EMR/住院病历"
      ],
      "fields": [
        {
          "id": "f074_治疗_复苏或CPR",
          "moduleId": "m21_治疗",
          "module": "治疗",
          "label": "复苏或CPR",
          "options": [
            "○是 ○否"
          ],
          "dataSource": "医嘱：心肺复苏术",
          "rootSource": "",
          "inputMode": "auto",
          "rawInputMode": "",
          "annotationRequired": false,
          "rawAnnotation": "",
          "control": "boolean",
          "notes": "",
          "sourceSystems": [
            "EMR/住院病历"
          ]
        }
      ]
    }
  ],
  "fields": [
    {
      "id": "f001_PICU结局_今日出院",
      "moduleId": "m01_PICU结局",
      "module": "PICU结局",
      "label": "今日出院",
      "options": [
        "存活"
      ],
      "dataSource": "出院病历，转归",
      "rootSource": "",
      "inputMode": "manual",
      "rawInputMode": "手动输入",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "不确定，存在随访，离开以后回去的情况不确定",
      "sourceSystems": [
        "EMR/住院病历",
        "随访"
      ]
    },
    {
      "id": "f002_PICU结局_临床死亡",
      "moduleId": "m01_PICU结局",
      "module": "PICU结局",
      "label": "临床死亡",
      "options": [
        "死亡"
      ],
      "dataSource": "出院病历：医嘱",
      "rootSource": "",
      "inputMode": "manual",
      "rawInputMode": "手动输入",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "不确定",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f003_PICU结局_自动出院_危重放弃治疗_转院",
      "moduleId": "m01_PICU结局",
      "module": "PICU结局",
      "label": "自动出院（危重放弃治疗；转院）",
      "options": [
        "放弃治疗后死亡",
        "放弃治疗后存活"
      ],
      "dataSource": "住院病历：医嘱-自动出院\n同时满足门诊病历：诊断/现病史 包含死亡。\n如果回去死的只能随访，在系统上不会体现。；只能随访",
      "rootSource": "",
      "inputMode": "manual_unextractable",
      "rawInputMode": "手动输入；手动输入（无法提取）",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "不确定",
      "sourceSystems": [
        "EMR/住院病历",
        "随访"
      ]
    },
    {
      "id": "f004_入PICU主要病因_疾病代码",
      "moduleId": "m02_入PICU主要病因",
      "module": "入PICU主要病因",
      "label": "疾病代码",
      "options": [
        "呼吸系统疾病",
        "心血管系统疾病（心衰+休克）",
        "神经系统疾病",
        "血液系统疾病",
        "泌尿系统疾病",
        "消化系统疾病",
        "创伤",
        "术后监护",
        "各种危象",
        "严重感染",
        "代谢紊乱",
        "皮肤",
        "其他"
      ],
      "dataSource": "住院病历：诊断，入院初步诊断、转院诊断\n其他科转入的病人：转入记录-接科诊断",
      "rootSource": "诊断里面有疾病代码，不需要手写，是结构化字段",
      "inputMode": "review",
      "rawInputMode": "自动提取诊断，然后手动分类；自动提取",
      "annotationRequired": true,
      "rawAnnotation": "需要标注",
      "control": "select",
      "notes": "诊断编码来源地方有初步入院、出院\n转入病人就是接科诊断\n直接入院的病人：初步诊断（未必明确，不提取）入院诊断和出院诊断。（取前三条）",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f005_入PICU已伴有疾病__引发的疾病_疾病代码",
      "moduleId": "m03_入PICU已伴有疾病__引发的疾病",
      "module": "入PICU已伴有疾病 （引发的疾病）",
      "label": "疾病代码",
      "options": [
        "呼吸系统疾病",
        "心血管系统疾病",
        "神经系统疾病",
        "血液系统疾病",
        "泌尿系统疾病",
        "消化系统疾病",
        "免疫系统疾病",
        "肿瘤",
        "代谢性疾病",
        "遗传性疾病",
        "器官移植或干细胞移植",
        "营养性疾病",
        "其他",
        "无"
      ],
      "dataSource": "既往史：门诊病历、住院病历；诊断：病历",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "有疾病还没好",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f006_基础疾病__本来就存在的疾病_无",
      "moduleId": "m04_基础疾病__本来就存在的疾病",
      "module": "基础疾病 （本来就存在的疾病）",
      "label": "无",
      "options": [],
      "dataSource": "",
      "rootSource": "",
      "inputMode": "manual",
      "rawInputMode": "手动输入",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "有疾病已经好了",
      "sourceSystems": [
        "来源待确认"
      ]
    },
    {
      "id": "f007_基础疾病__本来就存在的疾病_有",
      "moduleId": "m04_基础疾病__本来就存在的疾病",
      "module": "基础疾病 （本来就存在的疾病）",
      "label": "有",
      "options": [
        "呼吸系统疾病",
        "心血管系统疾病",
        "神经系统疾病",
        "血液系统疾病",
        "泌尿系统疾病",
        "消化系统疾病",
        "免疫系统疾病",
        "肿瘤",
        "代谢性疾病",
        "遗传性疾病",
        "营养性疾病",
        "其他"
      ],
      "dataSource": "既往史-健康状况：门诊病历、住院病历；诊断",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "会有明确写出疾病的名称",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f008_免疫抑制_无",
      "moduleId": "m05_免疫抑制",
      "module": "免疫抑制",
      "label": "无",
      "options": [],
      "dataSource": "既往史：门诊病历、住院病历；诊断：本次病历",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f009_免疫抑制_有",
      "moduleId": "m05_免疫抑制",
      "module": "免疫抑制",
      "label": "有",
      "options": [
        "血液/实体肿瘤/化疗/骨髓移植/Car-T（同一类，血液病）",
        "实体器官移植",
        "原发性免疫缺陷",
        "结缔组织病/风湿免疫",
        "HIV",
        "结核感染活动",
        "其他"
      ],
      "dataSource": "既往史：门诊病历、住院病历；诊断：本次病历",
      "rootSource": "提取困难，病历里面没有免疫抑制的字眼；要看病史",
      "inputMode": "manual",
      "rawInputMode": "手动输入",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "具体的确认方法",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f010_家族史_无",
      "moduleId": "m06_家族史",
      "module": "家族史",
      "label": "无",
      "options": [],
      "dataSource": "家族史：住院病历",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f011_家族史_有",
      "moduleId": "m06_家族史",
      "module": "家族史",
      "label": "有",
      "options": [
        "习惯性流产史",
        "先心病病史",
        "肾病病史",
        "高血压病病史",
        "糖尿病病史",
        "肿瘤病史",
        "冠心病病史",
        "耳聋家族史",
        "癫痫病史",
        "精神病史",
        "其他"
      ],
      "dataSource": "家族史：住院病历",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f012_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分_无",
      "moduleId": "m07_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分",
      "module": "脓毒症（纳入标准：感染+SIRS，脓毒症诊断标准：感染＋PSS评分）",
      "label": "无",
      "options": [],
      "dataSource": "有无诊断",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f013_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分_有",
      "moduleId": "m07_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分",
      "module": "脓毒症（纳入标准：感染+SIRS，脓毒症诊断标准：感染＋PSS评分）",
      "label": "有",
      "options": [
        "纳入日期",
        "出院时是否诊断",
        "诊断日期"
      ],
      "dataSource": "诊断对应病历的日期；出院诊断有无包含脓毒症，这次住院是否有包含脓毒症；不确定",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "date",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f014_SIRS_炎症反应_体温",
      "moduleId": "m08_SIRS_炎症反应",
      "module": "SIRS（炎症反应）",
      "label": "体温",
      "options": [
        "正常",
        "发热（≥38.5℃）或低体温（≤36℃）"
      ],
      "dataSource": "有符合脓毒症的护理记录单上",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "监护仪",
      "sourceSystems": [
        "护理/监护"
      ]
    },
    {
      "id": "f015_SIRS_炎症反应_心动过速",
      "moduleId": "m08_SIRS_炎症反应",
      "module": "SIRS（炎症反应）",
      "label": "心动过速",
      "options": [
        "无，不超过120",
        "有"
      ],
      "dataSource": "心率：护理单",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "boolean",
      "notes": "监护仪",
      "sourceSystems": [
        "护理/监护"
      ]
    },
    {
      "id": "f016_SIRS_炎症反应_呼吸增加",
      "moduleId": "m08_SIRS_炎症反应",
      "module": "SIRS（炎症反应）",
      "label": "呼吸增加",
      "options": [
        "无",
        "有"
      ],
      "dataSource": "每分钟呼吸次数：护理单",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "boolean",
      "notes": "监护仪",
      "sourceSystems": [
        "护理/监护"
      ]
    },
    {
      "id": "f017_SIRS_炎症反应_白细胞",
      "moduleId": "m08_SIRS_炎症反应",
      "module": "SIRS（炎症反应）",
      "label": "白细胞",
      "options": [
        "正常：数值",
        "白细胞增多（>12×109/L）",
        "白细胞减少（<4×109/L）"
      ],
      "dataSource": "血常规检验单，lis检验检查结果",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "血常规",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f018_感染指标_CRP",
      "moduleId": "m09_感染指标",
      "module": "感染指标",
      "label": "CRP",
      "options": [],
      "dataSource": "血常规检验单，lis检验检查结果",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f019_感染指标_PCT",
      "moduleId": "m09_感染指标",
      "module": "感染指标",
      "label": "PCT",
      "options": [],
      "dataSource": "血常规检验单，lis检验检查结果",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验",
        "检查/PACS"
      ]
    },
    {
      "id": "f020_感染指标_IL_1",
      "moduleId": "m09_感染指标",
      "module": "感染指标",
      "label": "IL-1",
      "options": [],
      "dataSource": "血常规检验单，lis检验检查结果",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f021_感染指标_IL_2",
      "moduleId": "m09_感染指标",
      "module": "感染指标",
      "label": "IL-2",
      "options": [],
      "dataSource": "血常规检验单，lis检验检查结果",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f022_感染指标_IL_6",
      "moduleId": "m09_感染指标",
      "module": "感染指标",
      "label": "IL-6",
      "options": [],
      "dataSource": "血常规检验单，lis检验检查结果",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f023_感染指标_IL_8",
      "moduleId": "m09_感染指标",
      "module": "感染指标",
      "label": "IL-8",
      "options": [],
      "dataSource": "血常规检验单，lis检验检查结果",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f024_感染指标_IL_10",
      "moduleId": "m09_感染指标",
      "module": "感染指标",
      "label": "IL-10",
      "options": [],
      "dataSource": "血常规检验单，lis检验检查结果",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f025_感染指标_TNF_α",
      "moduleId": "m09_感染指标",
      "module": "感染指标",
      "label": "TNF-α",
      "options": [],
      "dataSource": "血常规检验单，lis检验检查结果",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f026_感染指标_INF_γ",
      "moduleId": "m09_感染指标",
      "module": "感染指标",
      "label": "INF-γ",
      "options": [],
      "dataSource": "血常规检验单，lis检验检查结果",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f027_感染指标_1_3_β_D葡聚糖",
      "moduleId": "m09_感染指标",
      "module": "感染指标",
      "label": "（1,3）-β-D葡聚糖",
      "options": [],
      "dataSource": "血常规检验单，lis检验检查结果",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f028_感染指标_GM",
      "moduleId": "m09_感染指标",
      "module": "感染指标",
      "label": "GM",
      "options": [],
      "dataSource": "血常规检验单，lis检验检查结果",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f029_PSS评分_呼吸",
      "moduleId": "m10_PSS评分",
      "module": "PSS评分",
      "label": "呼吸",
      "options": [],
      "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "监护仪",
      "sourceSystems": [
        "EMR/住院病历",
        "护理/监护",
        "评分表"
      ]
    },
    {
      "id": "f030_PSS评分_血管活性药物",
      "moduleId": "m10_PSS评分",
      "module": "PSS评分",
      "label": "血管活性药物",
      "options": [
        "肾上腺素、去甲肾上腺素、特利加压素、多巴胺、多巴酚丁胺"
      ],
      "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "病程中有没有提及",
      "sourceSystems": [
        "EMR/住院病历",
        "评分表"
      ]
    },
    {
      "id": "f031_PSS评分_平均动脉压",
      "moduleId": "m10_PSS评分",
      "module": "PSS评分",
      "label": "平均动脉压",
      "options": [],
      "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "监护仪",
      "sourceSystems": [
        "EMR/住院病历",
        "护理/监护",
        "评分表"
      ]
    },
    {
      "id": "f032_PSS评分_乳酸",
      "moduleId": "m10_PSS评分",
      "module": "PSS评分",
      "label": "乳酸",
      "options": [],
      "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "血气分析-LAC；床边血气仪器（数据自动上传）",
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验",
        "评分表"
      ]
    },
    {
      "id": "f033_PSS评分_循环",
      "moduleId": "m10_PSS评分",
      "module": "PSS评分",
      "label": "循环",
      "options": [],
      "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "不确定",
      "sourceSystems": [
        "EMR/住院病历",
        "评分表"
      ]
    },
    {
      "id": "f034_PSS评分_凝血",
      "moduleId": "m10_PSS评分",
      "module": "PSS评分",
      "label": "凝血",
      "options": [],
      "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "凝血检验LIS-EMR",
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验",
        "评分表"
      ]
    },
    {
      "id": "f035_PSS评分_神经",
      "moduleId": "m10_PSS评分",
      "module": "PSS评分",
      "label": "神经",
      "options": [],
      "dataSource": "PSS评分表（必须手填的一个表，可以直接从EMR上面提取）此表单来源病历",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "昏迷评分表，只能人为",
      "sourceSystems": [
        "EMR/住院病历",
        "评分表"
      ]
    },
    {
      "id": "f036_呼吸功能障碍_低氧血症",
      "moduleId": "m11_呼吸功能障碍",
      "module": "呼吸功能障碍",
      "label": "低氧血症",
      "options": [
        "吸氧时：P/F(Pa02／Fi02 ) =     mmHg;"
      ],
      "dataSource": "血气检验单",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "吸氧时候测量",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f037_呼吸功能障碍_机械通气",
      "moduleId": "m11_呼吸功能障碍",
      "module": "呼吸功能障碍",
      "label": "机械通气",
      "options": [
        "无创机械通气：P/F =   mmHg",
        "无创机械通气：S/F比 =",
        "有创机械通气：OI指数="
      ],
      "dataSource": "血气检验单",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f038_呼吸功能障碍_有创机械通气_OIS指数",
      "moduleId": "m11_呼吸功能障碍",
      "module": "呼吸功能障碍",
      "label": "有创机械通气：OIS指数=",
      "options": [
        "有创机械通气：OIS指数="
      ],
      "dataSource": "血气检验单",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f039_呼吸功能障碍_ARDS",
      "moduleId": "m11_呼吸功能障碍",
      "module": "呼吸功能障碍",
      "label": "ARDS",
      "options": [
        "无",
        "PaO2   mmHg, FiO2   %，PaO2/FiO2   mmHg,",
        "PaCO2     mmHg，SpO2      %，Paw",
        "无创通气：P/F比      ，S/F比（P/F无法获取时填写）",
        "有创机械通气：氧指数（OI）     ， 氧饱和度指数（OSI）（OI无法获取时填写）      ；"
      ],
      "dataSource": "血气检验单",
      "rootSource": "手动选择",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "1.做成范围值\n2.如果是转入病人（病程记录有转入日期），6-7小时以内的血气单时间",
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验"
      ]
    },
    {
      "id": "f040_心血管功能障碍_低血压_护理单上血压最低时候",
      "moduleId": "m12_心血管功能障碍",
      "module": "心血管功能障碍",
      "label": "低血压（护理单上血压最低时候）",
      "options": [
        "无",
        "有血管活性药：肾上腺素、去甲肾上腺素、特利加压素、多巴胺、多巴酚丁胺",
        "高乳酸血症：数值",
        "毛细血管再充盈时间或CRT延长（≥2s）",
        "皮肤花斑/花纹"
      ],
      "dataSource": "住院病历：住院医嘱中的临时医嘱，来源医嘱系统；血气经验单；病程里面；病历体格检查、病程",
      "rootSource": "对应血压低的时候；血压最低时候的乳酸，血压来源监护仪；血压最低时候，6小时内对应的值",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": true,
      "rawAnnotation": "要",
      "control": "date",
      "notes": "血压最低（重症护理记录单，监护仪数据实时导入），往后12小时之内的乳酸值，如果多次取最高的；CRT常规在大病历中才有；血压低的时候要求大家在病程中把这些内容写出来",
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验",
        "护理/监护"
      ]
    },
    {
      "id": "f041_心血管功能障碍_低灌注_低血压的时候是否有低灌注表显",
      "moduleId": "m12_心血管功能障碍",
      "module": "心血管功能障碍",
      "label": "低灌注（低血压的时候是否有低灌注表显）",
      "options": [
        "心率、脉搏变化：外周动脉搏动细弱，心率、脉搏增快；",
        "皮肤改变：面色苍白或苍灰，湿冷，大理石样花纹。如暖休克可表现为四肢温暖、皮肤干燥。",
        "毛细血管再充盈时间（CRT）延长（>2s）（需除外环境温度影响）",
        "意识改变：早期烦躁不安或萎靡，表情淡漠。晚期意识模糊，甚至昏迷、惊厥。",
        "液体复苏后尿量<0.5 ml／(kg·h)，持续至少2h"
      ],
      "dataSource": "重症护理单（血压低的时候，心率分次、呼吸分次）；病程；同上；病程：查体；护理单-尿管/出量（尿管、尿液）",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "date",
      "notes": "低灌注的病人要护士去记录每小时数值",
      "sourceSystems": [
        "EMR/住院病历",
        "护理/监护"
      ]
    },
    {
      "id": "f042_神经功能障碍_无",
      "moduleId": "m13_神经功能障碍",
      "module": "神经功能障碍",
      "label": "无",
      "options": [],
      "dataSource": "昏迷评分表",
      "rootSource": "",
      "inputMode": "manual",
      "rawInputMode": "需要手选",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "评分表"
      ]
    },
    {
      "id": "f043_神经功能障碍_有",
      "moduleId": "m13_神经功能障碍",
      "module": "神经功能障碍",
      "label": "有",
      "options": [
        "Glassgow评分",
        "瞳孔"
      ],
      "dataSource": "昏迷评分表；病程体格检查",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历",
        "评分表"
      ]
    },
    {
      "id": "f044_血液系统功能障碍_无",
      "moduleId": "m14_血液系统功能障碍",
      "module": "血液系统功能障碍",
      "label": "无",
      "options": [],
      "dataSource": "检验信息",
      "rootSource": "",
      "inputMode": "manual",
      "rawInputMode": "需要手选",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f045_血液系统功能障碍_有",
      "moduleId": "m14_血液系统功能障碍",
      "module": "血液系统功能障碍",
      "label": "有",
      "options": [
        "血小板计数      ×109/L",
        "APTT        s",
        "INR",
        "FDP",
        "纤维蛋白原",
        "D-Dimers"
      ],
      "dataSource": "检验信息-血常规；检验信息-凝血功能",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f046_肾脏功能障碍_无",
      "moduleId": "m15_肾脏功能障碍",
      "module": "肾脏功能障碍",
      "label": "无",
      "options": [],
      "dataSource": "检验信息-生化",
      "rootSource": "",
      "inputMode": "manual",
      "rawInputMode": "需要手选",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f047_肾脏功能障碍_有",
      "moduleId": "m15_肾脏功能障碍",
      "module": "肾脏功能障碍",
      "label": "有",
      "options": [
        "血肌酐     umoL/L；",
        "血尿素氮     umoL/L；"
      ],
      "dataSource": "检验信息-生化",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f048_肾脏功能障碍_足量液体复苏后尿量_0_5_ml_kg_h_持续至少2_h",
      "moduleId": "m15_肾脏功能障碍",
      "module": "肾脏功能障碍",
      "label": "足量液体复苏后尿量<0.5 ml／(kg·h)，持续至少2 h",
      "options": [
        "无",
        "有"
      ],
      "dataSource": "检验信息-生化",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f049_消化功能障碍_无",
      "moduleId": "m16_消化功能障碍",
      "module": "消化功能障碍",
      "label": "无",
      "options": [],
      "dataSource": "检验信息-生化",
      "rootSource": "",
      "inputMode": "manual",
      "rawInputMode": "需要手选",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "text",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f050_消化功能障碍_有",
      "moduleId": "m16_消化功能障碍",
      "module": "消化功能障碍",
      "label": "有",
      "options": [
        "总胆红素    μmoL/L；",
        "ALT       mmoL/L；"
      ],
      "dataSource": "检验信息-生化",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f051_消化功能障碍_肠鸣音消失",
      "moduleId": "m16_消化功能障碍",
      "module": "消化功能障碍",
      "label": "肠鸣音消失",
      "options": [
        "无",
        "有"
      ],
      "dataSource": "人为查体判断-病程",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "boolean",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f052_原发感染部位_具体疾病名称",
      "moduleId": "m17_原发感染部位",
      "module": "原发感染部位",
      "label": "具体疾病名称",
      "options": [
        "呼吸道",
        "腹部",
        "心血管",
        "血液",
        "中枢神经系统",
        "泌尿系统疾病",
        "皮肤",
        "其他"
      ],
      "dataSource": "病程里面有诊断，出院诊断会有所有感染名称；病程",
      "rootSource": "检验-肺泡灌洗液是否有细菌或病毒",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "判断微生物名称里面排除掉无或者未检出；项目名称-样本名关联",
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验"
      ]
    },
    {
      "id": "f053_原发感染部位_原发疾病诊断日期",
      "moduleId": "m17_原发感染部位",
      "module": "原发感染部位",
      "label": "原发疾病诊断日期",
      "options": [],
      "dataSource": "所有病程（第一次出现脓毒症的日期）",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "date",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f054_原发感染部位_病原来源",
      "moduleId": "m17_原发感染部位",
      "module": "原发感染部位",
      "label": "病原来源",
      "options": [
        "血液",
        "尿液",
        "脑脊液",
        "呼吸系统（痰液、支气管肺泡灌洗）",
        "粪便",
        "胸腔积液",
        "心包积液",
        "腹水",
        "伤口"
      ],
      "dataSource": "病程",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验"
      ]
    },
    {
      "id": "f055_原发感染部位_具体病原结果",
      "moduleId": "m17_原发感染部位",
      "module": "原发感染部位",
      "label": "具体病原结果",
      "options": [
        "细菌（1肺炎链球菌2流感嗜血杆菌3金黄葡萄球菌4假单胞菌属5表皮葡萄球菌6克雷白杆菌7阴沟杆菌8大肠杆菌9溶血性链球菌10鲍曼不动杆菌11其他）",
        "病毒（1呼吸道合胞病毒（RSV）2巨细胞病毒（CMV）3柯萨奇病毒4腺病毒5流感病毒6EB病毒7其它）",
        "真菌（1白色念珠菌2曲霉菌属3其它）",
        "其他（1支原体2衣原体3寄生虫4其它"
      ],
      "dataSource": "检验",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f056_入ICU1小时内PIM3评分_收缩压",
      "moduleId": "m18_入ICU1小时内PIM3评分",
      "module": "入ICU1小时内PIM3评分",
      "label": "收缩压",
      "options": [
        "mmHg"
      ],
      "dataSource": "入院时间-护理记录",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "",
      "sourceSystems": [
        "护理/监护"
      ]
    },
    {
      "id": "f057_入ICU1小时内PIM3评分_瞳孔反射",
      "moduleId": "m18_入ICU1小时内PIM3评分",
      "module": "入ICU1小时内PIM3评分",
      "label": "瞳孔反射",
      "options": [
        "（>3mm和双侧瞳孔固定计分1，其他或者未知计分0）"
      ],
      "dataSource": "入院时间-病程记录",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历",
        "护理/监护"
      ]
    },
    {
      "id": "f058_入ICU1小时内PIM3评分_Fio2_100_PaO2",
      "moduleId": "m18_入ICU1小时内PIM3评分",
      "module": "入ICU1小时内PIM3评分",
      "label": "［Fio2×100］/PaO2",
      "options": [
        "（如果Fio2 或 Pao2未知，则[(Fio2 × 100)/Pao2] = 0.23）"
      ],
      "dataSource": "血气分析",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f059_入ICU1小时内PIM3评分_碱剩余",
      "moduleId": "m18_入ICU1小时内PIM3评分",
      "module": "入ICU1小时内PIM3评分",
      "label": "碱剩余",
      "options": [
        "mmol/L（未知计分0）"
      ],
      "dataSource": "血气分析",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f060_入ICU1小时内PIM3评分_入PICU1小时内是否使用机械通气",
      "moduleId": "m18_入ICU1小时内PIM3评分",
      "module": "入ICU1小时内PIM3评分",
      "label": "入PICU1小时内是否使用机械通气",
      "options": [
        "（未用＝0，使用＝1）"
      ],
      "dataSource": "入院时间-病程记录",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历",
        "护理/监护"
      ]
    },
    {
      "id": "f061_入ICU1小时内PIM3评分_是否为选择性入ICU",
      "moduleId": "m18_入ICU1小时内PIM3评分",
      "module": "入ICU1小时内PIM3评分",
      "label": "是否为选择性入ICU",
      "options": [
        "（否＝0，是＝1）"
      ],
      "dataSource": "",
      "rootSource": "",
      "inputMode": "unknown",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "来源待确认"
      ]
    },
    {
      "id": "f062_入ICU1小时内PIM3评分_是否为外科或其他操作后恢复期病例",
      "moduleId": "m18_入ICU1小时内PIM3评分",
      "module": "入ICU1小时内PIM3评分",
      "label": "是否为外科或其他操作后恢复期病例",
      "options": [
        "［0］不是",
        "［1］是，心脏旁路手术的恢复",
        "［2］是，非心脏旁路手术的恢复",
        "［3］是，非心脏手术的恢复"
      ],
      "dataSource": "手动评分",
      "rootSource": "",
      "inputMode": "unknown",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "来源待确认"
      ]
    },
    {
      "id": "f063_入ICU1小时内PIM3评分_低危诊断",
      "moduleId": "m18_入ICU1小时内PIM3评分",
      "module": "入ICU1小时内PIM3评分",
      "label": "低危诊断",
      "options": [
        "［0］无",
        "［1］哮喘为入ICU主要原因",
        "［2］毛细支气管炎为入ICU主要原因",
        "［3］喉气管支气管炎为入ICU主要原因",
        "［4］阻塞性睡眠呼吸暂停为入ICU主要原因",
        "［5］糖尿病酮症酸中毒为入ICU主要原因",
        "［6］惊厥为入ICU主要原因"
      ],
      "dataSource": "手动评分",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f064_入ICU1小时内PIM3评分_高危诊断",
      "moduleId": "m18_入ICU1小时内PIM3评分",
      "module": "入ICU1小时内PIM3评分",
      "label": "高危诊断",
      "options": [
        "［0］无",
        "［1］自发性脑出血",
        "［2］心肌病或心肌炎",
        "［3］左心发育不全综合症",
        "［4］神经退行性疾病",
        "［5］坏死性小肠结肠炎为入PICU主要原因"
      ],
      "dataSource": "手动评分",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f065_入ICU1小时内PIM3评分_极高风险诊断",
      "moduleId": "m18_入ICU1小时内PIM3评分",
      "module": "入ICU1小时内PIM3评分",
      "label": "极高风险诊断",
      "options": [
        "［0］无",
        "［1］入ICU前心脏骤停",
        "［2］严重联合免疫缺陷",
        "［3］第一次诱导后淋巴瘤或白血病",
        "［4］骨髓移植受者",
        "［5］肝衰竭为入住PICU主要原因"
      ],
      "dataSource": "手动评分",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    },
    {
      "id": "f066_实验室检查_血常规",
      "moduleId": "m19_实验室检查",
      "module": "实验室检查",
      "label": "血常规",
      "options": [
        "白细胞计数（WBC）",
        "中性粒细胞%(NEUTP)",
        "中性粒细胞计数(NEUT)",
        "单核细胞%(MONOP)",
        "单核细胞计数(MONON)",
        "淋巴细胞%(LYMPHN)",
        "淋巴细胞计数(LYMPHN)",
        "红细胞计数（RBC）",
        "血红蛋白（Hb）",
        "网织红细胞计数",
        "有核红细胞%",
        "有核红细胞计数",
        "红细胞分布宽度CV",
        "红细胞压积(HCT)",
        "平均血红蛋白浓度",
        "平均红细胞体积(MCV)",
        "平均血红蛋白(MCH)",
        "红细胞分布宽度-SD",
        "血小板计数（PLT）",
        "血小板压积(PCT)",
        "血小板分布宽度(PDW)",
        "平均血小板体积(MPV)",
        "C-反应蛋白（CRP）"
      ],
      "dataSource": "检验信息",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "诊断脓毒症后的第一个结果",
      "sourceSystems": [
        "EMR/住院病历",
        "LIS/检验"
      ]
    },
    {
      "id": "f067_实验室检查_肝功能",
      "moduleId": "m19_实验室检查",
      "module": "实验室检查",
      "label": "肝功能",
      "options": [
        "丙氨酸氨基转移酶（ALT）",
        "门冬氨酸氨基转移酶（AST）",
        "γ-谷氨酰转肽酶（GGT",
        "碱性磷酸酯酶（ALP）",
        "总蛋白",
        "白蛋白（ALB）",
        "球蛋白",
        "白蛋白/球蛋白",
        "前白蛋白",
        "总胆红素",
        "直接胆红素",
        "间接胆红素",
        "甘油三酯",
        "总胆固醇（TC）",
        "载脂蛋白-A1",
        "载脂蛋白-B",
        "高密度脂蛋白胆固醇HDL",
        "低密度脂蛋白胆固醇LDL"
      ],
      "dataSource": "检验信息",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f068_实验室检查_凝血功能",
      "moduleId": "m19_实验室检查",
      "module": "实验室检查",
      "label": "凝血功能",
      "options": [
        "凝血酶原时间（PT）",
        "凝血酶时间（TT）",
        "凝血酶原活动度（PTA）",
        "活化部分凝血酶时间（APTT）",
        "国际标准化比值（INR）",
        "纤维蛋白原（FIB）",
        "纤维蛋白(原)降解产物（FDP）",
        "D-二聚体"
      ],
      "dataSource": "检验信息",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "date",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f069_实验室检查_电解质",
      "moduleId": "m19_实验室检查",
      "module": "实验室检查",
      "label": "电解质",
      "options": [
        "钾(K+)",
        "钠(Na+)",
        "氯(Cl-)",
        "钙(Ca+)",
        "磷（P）",
        "镁（Mg）"
      ],
      "dataSource": "检验信息",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f070_实验室检查_血气分析",
      "moduleId": "m19_实验室检查",
      "module": "实验室检查",
      "label": "血气分析",
      "options": [
        "酸碱度（PH）",
        "动脉血二氧化碳分压（PaCO2）",
        "动脉血阳分压（PaO2）",
        "碳酸氢根（HCO3-）",
        "剩余碱（BE）",
        "血乳酸"
      ],
      "dataSource": "检验信息",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f071_实验室检查_甲状腺功能",
      "moduleId": "m19_实验室检查",
      "module": "实验室检查",
      "label": "甲状腺功能",
      "options": [
        "三-碘甲腺原氨酸总量(TT3)",
        "甲状腺素总量(TT4)",
        "游离三-碘甲腺原氨酸(FT3)",
        "游离甲状腺素(FT4)",
        "促甲状腺激素(TSH)",
        "促甲状腺激素释放激素(TRH)"
      ],
      "dataSource": "检验信息",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "LIS/检验"
      ]
    },
    {
      "id": "f072_仪器检查_心电图",
      "moduleId": "m20_仪器检查",
      "module": "仪器检查",
      "label": "心电图",
      "options": [
        "心率",
        "PR间期",
        "QRS间期",
        "QT间期",
        "QTcF间期",
        "□窦性心律 □窦性心动过缓 □窦性心律不齐 □窦性心动过速\n□房性早搏 □房性心动过速 □心房扑动 □心房颤动\n□交界性早搏 □室上性心动过速 □室性早搏 □室性心动过速\n□心室扑动 □心室颤动 □室性自主心律\n□房室传导阻滞（I、II度I型、II度II型、III度）"
      ],
      "dataSource": "检查信息",
      "rootSource": "EMR-心电图-心率（数值）；EMR-心电图（数值）；EMR-心电图-诊断（文字描述）",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "number",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历",
        "护理/监护",
        "检查/PACS"
      ]
    },
    {
      "id": "f073_仪器检查_影像学",
      "moduleId": "m20_仪器检查",
      "module": "仪器检查",
      "label": "影像学",
      "options": [
        "○aEEG○EEG○CT○X光○超声○TCD○MRI○TDI○MRS○MRA○MRV\n○近红外光谱（NIRS）○AABR○TEOAE○眼底"
      ],
      "dataSource": "检查信息-诊断印象",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "select",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历",
        "检查/PACS"
      ]
    },
    {
      "id": "f074_治疗_复苏或CPR",
      "moduleId": "m21_治疗",
      "module": "治疗",
      "label": "复苏或CPR",
      "options": [
        "○是 ○否"
      ],
      "dataSource": "医嘱：心肺复苏术",
      "rootSource": "",
      "inputMode": "auto",
      "rawInputMode": "",
      "annotationRequired": false,
      "rawAnnotation": "",
      "control": "boolean",
      "notes": "",
      "sourceSystems": [
        "EMR/住院病历"
      ]
    }
  ]
} satisfies CrfTemplate;
