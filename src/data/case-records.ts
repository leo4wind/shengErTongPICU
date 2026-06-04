import type { CaseRecord } from "@/types";

export const caseRecords = [
  {
    "id": "PICU-2026-0503",
    "bed": "PICU-03",
    "demographics": "7岁 男",
    "diagnosis": "感染性休克 / 肺部感染",
    "owner": "李医生",
    "updatedAt": "2026-05-03 09:22",
    "completion": 77,
    "statusCounts": {
      "manual_required": 9,
      "review_required": 14,
      "auto_filled": 43,
      "missing": 6,
      "source_unclear": 2
    },
    "values": {
      "f001_PICU结局_今日出院": {
        "value": "存活",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f002_PICU结局_临床死亡": {
        "value": "死亡",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f003_PICU结局_自动出院_危重放弃治疗_转院": {
        "value": "放弃治疗后死亡",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f004_入PICU主要病因_疾病代码": {
        "value": "血液系统疾病",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f005_入PICU已伴有疾病__引发的疾病_疾病代码": {
        "value": "泌尿系统疾病",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f006_基础疾病__本来就存在的疾病_无": {
        "value": "待复核",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f007_基础疾病__本来就存在的疾病_有": {
        "value": "免疫系统疾病",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f008_免疫抑制_无": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f009_免疫抑制_有": {
        "value": "实体器官移植",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f010_家族史_无": {
        "value": "已记录",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f011_家族史_有": {
        "value": "92",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f012_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分_无": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f013_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分_有": {
        "value": "2026-05-03",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f014_SIRS_炎症反应_体温": {
        "value": "发热（≥38.5℃）或低体温（≤36℃）",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f015_SIRS_炎症反应_心动过速": {
        "value": "无，不超过120",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f016_SIRS_炎症反应_呼吸增加": {
        "value": "有",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f017_SIRS_炎症反应_白细胞": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f018_感染指标_CRP": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f019_感染指标_PCT": {
        "value": "已记录",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f020_感染指标_IL_1": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f021_感染指标_IL_2": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f022_感染指标_IL_6": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f023_感染指标_IL_8": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f024_感染指标_IL_10": {
        "value": "待复核",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f025_感染指标_TNF_α": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f026_感染指标_INF_γ": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f027_感染指标_1_3_β_D葡聚糖": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f028_感染指标_GM": {
        "value": "已记录",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f029_PSS评分_呼吸": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f030_PSS评分_血管活性药物": {
        "value": "肾上腺素、去甲肾上腺素、特利加压素、多巴胺、多巴酚丁胺",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f031_PSS评分_平均动脉压": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f032_PSS评分_乳酸": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f033_PSS评分_循环": {
        "value": "待复核",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f034_PSS评分_凝血": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f035_PSS评分_神经": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f036_呼吸功能障碍_低氧血症": {
        "value": "118",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f037_呼吸功能障碍_机械通气": {
        "value": "0.8",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f038_呼吸功能障碍_有创机械通气_OIS指数": {
        "value": "12.4",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f039_呼吸功能障碍_ARDS": {
        "value": "145",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f040_心血管功能障碍_低血压_护理单上血压最低时候": {
        "value": "2026-05-03",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f041_心血管功能障碍_低灌注_低血压的时候是否有低灌注表显": {
        "value": "2026-05-05",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f042_神经功能障碍_无": {
        "value": "待复核",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f043_神经功能障碍_有": {
        "value": "92",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f044_血液系统功能障碍_无": {
        "value": "未见异常",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f045_血液系统功能障碍_有": {
        "value": "0.8",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f046_肾脏功能障碍_无": {
        "value": "已记录",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f047_肾脏功能障碍_有": {
        "value": "血肌酐     umoL/L；",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f048_肾脏功能障碍_足量液体复苏后尿量_0_5_ml_kg_h_持续至少2_h": {
        "value": "23.1",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f049_消化功能障碍_无": {
        "value": "已记录",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f050_消化功能障碍_有": {
        "value": "7.2",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f051_消化功能障碍_肠鸣音消失": {
        "value": "无",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f052_原发感染部位_具体疾病名称": {
        "value": "血液",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f053_原发感染部位_原发疾病诊断日期": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f054_原发感染部位_病原来源": {
        "value": "伤口",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f055_原发感染部位_具体病原结果": {
        "value": "真菌（1白色念珠菌2曲霉菌属3其它）",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f056_入ICU1小时内PIM3评分_收缩压": {
        "value": "23.1",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f057_入ICU1小时内PIM3评分_瞳孔反射": {
        "value": "（>3mm和双侧瞳孔固定计分1，其他或者未知计分0）",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f058_入ICU1小时内PIM3评分_Fio2_100_PaO2": {
        "value": "7.2",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f059_入ICU1小时内PIM3评分_碱剩余": {
        "value": "92",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f060_入ICU1小时内PIM3评分_入PICU1小时内是否使用机械通气": {
        "value": "（未用＝0，使用＝1）",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f061_入ICU1小时内PIM3评分_是否为选择性入ICU": {
        "value": "",
        "status": "source_unclear",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f062_入ICU1小时内PIM3评分_是否为外科或其他操作后恢复期病例": {
        "value": "",
        "status": "source_unclear",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f063_入ICU1小时内PIM3评分_低危诊断": {
        "value": "［6］惊厥为入ICU主要原因",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f064_入ICU1小时内PIM3评分_高危诊断": {
        "value": "［3］左心发育不全综合症",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f065_入ICU1小时内PIM3评分_极高风险诊断": {
        "value": "［4］骨髓移植受者",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f066_实验室检查_血常规": {
        "value": "7.2",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f067_实验室检查_肝功能": {
        "value": "甘油三酯",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f068_实验室检查_凝血功能": {
        "value": "2026-05-05",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f069_实验室检查_电解质": {
        "value": "氯(Cl-)",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f070_实验室检查_血气分析": {
        "value": "碳酸氢根（HCO3-）",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f071_实验室检查_甲状腺功能": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f072_仪器检查_心电图": {
        "value": "23.1",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      },
      "f073_仪器检查_影像学": {
        "value": "○aEEG○EEG○CT○X光○超声○TCD○MRI○TDI○MRS○MRA○MRV\n○近红外光谱（NIRS）○AABR○TEOAE○眼底",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-03 09:22"
      },
      "f074_治疗_复苏或CPR": {
        "value": "○是 ○否",
        "status": "auto_filled",
        "confirmedBy": "李医生",
        "updatedAt": "2026-05-03 09:22"
      }
    }
  },
  {
    "id": "PICU-2026-0511",
    "bed": "PICU-04",
    "demographics": "2岁 女",
    "diagnosis": "脓毒症 / 急性呼吸衰竭",
    "owner": "王医生",
    "updatedAt": "2026-05-11 14:05",
    "completion": 76,
    "statusCounts": {
      "manual_required": 9,
      "review_required": 16,
      "missing": 7,
      "auto_filled": 40,
      "source_unclear": 2
    },
    "values": {
      "f001_PICU结局_今日出院": {
        "value": "存活",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f002_PICU结局_临床死亡": {
        "value": "死亡",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f003_PICU结局_自动出院_危重放弃治疗_转院": {
        "value": "放弃治疗后死亡",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f004_入PICU主要病因_疾病代码": {
        "value": "血液系统疾病",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f005_入PICU已伴有疾病__引发的疾病_疾病代码": {
        "value": "泌尿系统疾病",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f006_基础疾病__本来就存在的疾病_无": {
        "value": "待复核",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f007_基础疾病__本来就存在的疾病_有": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f008_免疫抑制_无": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f009_免疫抑制_有": {
        "value": "实体器官移植",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f010_家族史_无": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f011_家族史_有": {
        "value": "92",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f012_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分_无": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f013_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分_有": {
        "value": "2026-05-03",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f014_SIRS_炎症反应_体温": {
        "value": "发热（≥38.5℃）或低体温（≤36℃）",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f015_SIRS_炎症反应_心动过速": {
        "value": "无，不超过120",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f016_SIRS_炎症反应_呼吸增加": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f017_SIRS_炎症反应_白细胞": {
        "value": "36.8",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f018_感染指标_CRP": {
        "value": "待复核",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f019_感染指标_PCT": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f020_感染指标_IL_1": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f021_感染指标_IL_2": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f022_感染指标_IL_6": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f023_感染指标_IL_8": {
        "value": "未见异常",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f024_感染指标_IL_10": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f025_感染指标_TNF_α": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f026_感染指标_INF_γ": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f027_感染指标_1_3_β_D葡聚糖": {
        "value": "待复核",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f028_感染指标_GM": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f029_PSS评分_呼吸": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f030_PSS评分_血管活性药物": {
        "value": "肾上腺素、去甲肾上腺素、特利加压素、多巴胺、多巴酚丁胺",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f031_PSS评分_平均动脉压": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f032_PSS评分_乳酸": {
        "value": "未见异常",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f033_PSS评分_循环": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f034_PSS评分_凝血": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f035_PSS评分_神经": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f036_呼吸功能障碍_低氧血症": {
        "value": "118",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f037_呼吸功能障碍_机械通气": {
        "value": "0.8",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f038_呼吸功能障碍_有创机械通气_OIS指数": {
        "value": "12.4",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f039_呼吸功能障碍_ARDS": {
        "value": "145",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f040_心血管功能障碍_低血压_护理单上血压最低时候": {
        "value": "2026-05-03",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f041_心血管功能障碍_低灌注_低血压的时候是否有低灌注表显": {
        "value": "2026-05-05",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f042_神经功能障碍_无": {
        "value": "待复核",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f043_神经功能障碍_有": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f044_血液系统功能障碍_无": {
        "value": "未见异常",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f045_血液系统功能障碍_有": {
        "value": "0.8",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f046_肾脏功能障碍_无": {
        "value": "已记录",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f047_肾脏功能障碍_有": {
        "value": "血肌酐     umoL/L；",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f048_肾脏功能障碍_足量液体复苏后尿量_0_5_ml_kg_h_持续至少2_h": {
        "value": "23.1",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f049_消化功能障碍_无": {
        "value": "已记录",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f050_消化功能障碍_有": {
        "value": "7.2",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f051_消化功能障碍_肠鸣音消失": {
        "value": "无",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f052_原发感染部位_具体疾病名称": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f053_原发感染部位_原发疾病诊断日期": {
        "value": "2026-05-05",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f054_原发感染部位_病原来源": {
        "value": "伤口",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f055_原发感染部位_具体病原结果": {
        "value": "真菌（1白色念珠菌2曲霉菌属3其它）",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f056_入ICU1小时内PIM3评分_收缩压": {
        "value": "23.1",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f057_入ICU1小时内PIM3评分_瞳孔反射": {
        "value": "（>3mm和双侧瞳孔固定计分1，其他或者未知计分0）",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f058_入ICU1小时内PIM3评分_Fio2_100_PaO2": {
        "value": "7.2",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f059_入ICU1小时内PIM3评分_碱剩余": {
        "value": "92",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f060_入ICU1小时内PIM3评分_入PICU1小时内是否使用机械通气": {
        "value": "（未用＝0，使用＝1）",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f061_入ICU1小时内PIM3评分_是否为选择性入ICU": {
        "value": "",
        "status": "source_unclear",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f062_入ICU1小时内PIM3评分_是否为外科或其他操作后恢复期病例": {
        "value": "",
        "status": "source_unclear",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f063_入ICU1小时内PIM3评分_低危诊断": {
        "value": "［6］惊厥为入ICU主要原因",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f064_入ICU1小时内PIM3评分_高危诊断": {
        "value": "［3］左心发育不全综合症",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f065_入ICU1小时内PIM3评分_极高风险诊断": {
        "value": "［4］骨髓移植受者",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f066_实验室检查_血常规": {
        "value": "7.2",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f067_实验室检查_肝功能": {
        "value": "甘油三酯",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f068_实验室检查_凝血功能": {
        "value": "2026-05-05",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f069_实验室检查_电解质": {
        "value": "氯(Cl-)",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f070_实验室检查_血气分析": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f071_实验室检查_甲状腺功能": {
        "value": "促甲状腺激素(TSH)",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f072_仪器检查_心电图": {
        "value": "23.1",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-11 14:05"
      },
      "f073_仪器检查_影像学": {
        "value": "○aEEG○EEG○CT○X光○超声○TCD○MRI○TDI○MRS○MRA○MRV\n○近红外光谱（NIRS）○AABR○TEOAE○眼底",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      },
      "f074_治疗_复苏或CPR": {
        "value": "○是 ○否",
        "status": "auto_filled",
        "confirmedBy": "王医生",
        "updatedAt": "2026-05-11 14:05"
      }
    }
  },
  {
    "id": "PICU-2026-0520",
    "bed": "PICU-05",
    "demographics": "9月 男",
    "diagnosis": "重症肺炎 / 免疫抑制待排",
    "owner": "陈医生",
    "updatedAt": "2026-05-20 18:40",
    "completion": 77,
    "statusCounts": {
      "manual_required": 9,
      "review_required": 13,
      "auto_filled": 44,
      "missing": 6,
      "source_unclear": 2
    },
    "values": {
      "f001_PICU结局_今日出院": {
        "value": "存活",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f002_PICU结局_临床死亡": {
        "value": "死亡",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f003_PICU结局_自动出院_危重放弃治疗_转院": {
        "value": "放弃治疗后死亡",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f004_入PICU主要病因_疾病代码": {
        "value": "血液系统疾病",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f005_入PICU已伴有疾病__引发的疾病_疾病代码": {
        "value": "泌尿系统疾病",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f006_基础疾病__本来就存在的疾病_无": {
        "value": "待复核",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f007_基础疾病__本来就存在的疾病_有": {
        "value": "免疫系统疾病",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f008_免疫抑制_无": {
        "value": "未见异常",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f009_免疫抑制_有": {
        "value": "实体器官移植",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f010_家族史_无": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f011_家族史_有": {
        "value": "92",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f012_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分_无": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f013_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分_有": {
        "value": "2026-05-03",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f014_SIRS_炎症反应_体温": {
        "value": "发热（≥38.5℃）或低体温（≤36℃）",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f015_SIRS_炎症反应_心动过速": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f016_SIRS_炎症反应_呼吸增加": {
        "value": "有",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f017_SIRS_炎症反应_白细胞": {
        "value": "36.8",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f018_感染指标_CRP": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f019_感染指标_PCT": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f020_感染指标_IL_1": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f021_感染指标_IL_2": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f022_感染指标_IL_6": {
        "value": "已记录",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f023_感染指标_IL_8": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f024_感染指标_IL_10": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f025_感染指标_TNF_α": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f026_感染指标_INF_γ": {
        "value": "未见异常",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f027_感染指标_1_3_β_D葡聚糖": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f028_感染指标_GM": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f029_PSS评分_呼吸": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f030_PSS评分_血管活性药物": {
        "value": "肾上腺素、去甲肾上腺素、特利加压素、多巴胺、多巴酚丁胺",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f031_PSS评分_平均动脉压": {
        "value": "已记录",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f032_PSS评分_乳酸": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f033_PSS评分_循环": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f034_PSS评分_凝血": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f035_PSS评分_神经": {
        "value": "未见异常",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f036_呼吸功能障碍_低氧血症": {
        "value": "118",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f037_呼吸功能障碍_机械通气": {
        "value": "0.8",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f038_呼吸功能障碍_有创机械通气_OIS指数": {
        "value": "12.4",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f039_呼吸功能障碍_ARDS": {
        "value": "145",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f040_心血管功能障碍_低血压_护理单上血压最低时候": {
        "value": "2026-05-03",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f041_心血管功能障碍_低灌注_低血压的时候是否有低灌注表显": {
        "value": "2026-05-05",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f042_神经功能障碍_无": {
        "value": "待复核",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f043_神经功能障碍_有": {
        "value": "92",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f044_血液系统功能障碍_无": {
        "value": "未见异常",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f045_血液系统功能障碍_有": {
        "value": "0.8",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f046_肾脏功能障碍_无": {
        "value": "已记录",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f047_肾脏功能障碍_有": {
        "value": "血肌酐     umoL/L；",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f048_肾脏功能障碍_足量液体复苏后尿量_0_5_ml_kg_h_持续至少2_h": {
        "value": "23.1",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f049_消化功能障碍_无": {
        "value": "已记录",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f050_消化功能障碍_有": {
        "value": "7.2",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f051_消化功能障碍_肠鸣音消失": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f052_原发感染部位_具体疾病名称": {
        "value": "血液",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f053_原发感染部位_原发疾病诊断日期": {
        "value": "2026-05-05",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f054_原发感染部位_病原来源": {
        "value": "伤口",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f055_原发感染部位_具体病原结果": {
        "value": "真菌（1白色念珠菌2曲霉菌属3其它）",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f056_入ICU1小时内PIM3评分_收缩压": {
        "value": "23.1",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f057_入ICU1小时内PIM3评分_瞳孔反射": {
        "value": "（>3mm和双侧瞳孔固定计分1，其他或者未知计分0）",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f058_入ICU1小时内PIM3评分_Fio2_100_PaO2": {
        "value": "7.2",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f059_入ICU1小时内PIM3评分_碱剩余": {
        "value": "92",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f060_入ICU1小时内PIM3评分_入PICU1小时内是否使用机械通气": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f061_入ICU1小时内PIM3评分_是否为选择性入ICU": {
        "value": "",
        "status": "source_unclear",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f062_入ICU1小时内PIM3评分_是否为外科或其他操作后恢复期病例": {
        "value": "",
        "status": "source_unclear",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f063_入ICU1小时内PIM3评分_低危诊断": {
        "value": "［6］惊厥为入ICU主要原因",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f064_入ICU1小时内PIM3评分_高危诊断": {
        "value": "［3］左心发育不全综合症",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f065_入ICU1小时内PIM3评分_极高风险诊断": {
        "value": "［4］骨髓移植受者",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f066_实验室检查_血常规": {
        "value": "7.2",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f067_实验室检查_肝功能": {
        "value": "甘油三酯",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f068_实验室检查_凝血功能": {
        "value": "2026-05-05",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f069_实验室检查_电解质": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f070_实验室检查_血气分析": {
        "value": "碳酸氢根（HCO3-）",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f071_实验室检查_甲状腺功能": {
        "value": "促甲状腺激素(TSH)",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-20 18:40"
      },
      "f072_仪器检查_心电图": {
        "value": "23.1",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f073_仪器检查_影像学": {
        "value": "○aEEG○EEG○CT○X光○超声○TCD○MRI○TDI○MRS○MRA○MRV\n○近红外光谱（NIRS）○AABR○TEOAE○眼底",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      },
      "f074_治疗_复苏或CPR": {
        "value": "○是 ○否",
        "status": "auto_filled",
        "confirmedBy": "陈医生",
        "updatedAt": "2026-05-20 18:40"
      }
    }
  },
  {
    "id": "PICU-2026-0528",
    "bed": "PICU-06",
    "demographics": "12岁 女",
    "diagnosis": "腹腔感染 / 多器官功能障碍",
    "owner": "周医生",
    "updatedAt": "2026-05-28 11:16",
    "completion": 74,
    "statusCounts": {
      "manual_required": 9,
      "review_required": 15,
      "missing": 8,
      "auto_filled": 40,
      "source_unclear": 2
    },
    "values": {
      "f001_PICU结局_今日出院": {
        "value": "存活",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f002_PICU结局_临床死亡": {
        "value": "死亡",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f003_PICU结局_自动出院_危重放弃治疗_转院": {
        "value": "放弃治疗后死亡",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f004_入PICU主要病因_疾病代码": {
        "value": "血液系统疾病",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f005_入PICU已伴有疾病__引发的疾病_疾病代码": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f006_基础疾病__本来就存在的疾病_无": {
        "value": "待复核",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f007_基础疾病__本来就存在的疾病_有": {
        "value": "免疫系统疾病",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f008_免疫抑制_无": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f009_免疫抑制_有": {
        "value": "实体器官移植",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f010_家族史_无": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f011_家族史_有": {
        "value": "92",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f012_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分_无": {
        "value": "待复核",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f013_脓毒症_纳入标准_感染_SIRS_脓毒症诊断标准_感染_PSS评分_有": {
        "value": "2026-05-03",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f014_SIRS_炎症反应_体温": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f015_SIRS_炎症反应_心动过速": {
        "value": "无，不超过120",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f016_SIRS_炎症反应_呼吸增加": {
        "value": "有",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f017_SIRS_炎症反应_白细胞": {
        "value": "36.8",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f018_感染指标_CRP": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f019_感染指标_PCT": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f020_感染指标_IL_1": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f021_感染指标_IL_2": {
        "value": "待复核",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f022_感染指标_IL_6": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f023_感染指标_IL_8": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f024_感染指标_IL_10": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f025_感染指标_TNF_α": {
        "value": "已记录",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f026_感染指标_INF_γ": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f027_感染指标_1_3_β_D葡聚糖": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f028_感染指标_GM": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f029_PSS评分_呼吸": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f030_PSS评分_血管活性药物": {
        "value": "肾上腺素、去甲肾上腺素、特利加压素、多巴胺、多巴酚丁胺",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f031_PSS评分_平均动脉压": {
        "value": "已记录",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f032_PSS评分_乳酸": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f033_PSS评分_循环": {
        "value": "待复核",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f034_PSS评分_凝血": {
        "value": "已记录",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f035_PSS评分_神经": {
        "value": "未见异常",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f036_呼吸功能障碍_低氧血症": {
        "value": "118",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f037_呼吸功能障碍_机械通气": {
        "value": "0.8",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f038_呼吸功能障碍_有创机械通气_OIS指数": {
        "value": "12.4",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f039_呼吸功能障碍_ARDS": {
        "value": "145",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f040_心血管功能障碍_低血压_护理单上血压最低时候": {
        "value": "2026-05-03",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f041_心血管功能障碍_低灌注_低血压的时候是否有低灌注表显": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f042_神经功能障碍_无": {
        "value": "待复核",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f043_神经功能障碍_有": {
        "value": "92",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f044_血液系统功能障碍_无": {
        "value": "未见异常",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f045_血液系统功能障碍_有": {
        "value": "0.8",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f046_肾脏功能障碍_无": {
        "value": "已记录",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f047_肾脏功能障碍_有": {
        "value": "血肌酐     umoL/L；",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f048_肾脏功能障碍_足量液体复苏后尿量_0_5_ml_kg_h_持续至少2_h": {
        "value": "23.1",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f049_消化功能障碍_无": {
        "value": "已记录",
        "status": "manual_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f050_消化功能障碍_有": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f051_消化功能障碍_肠鸣音消失": {
        "value": "无",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f052_原发感染部位_具体疾病名称": {
        "value": "血液",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f053_原发感染部位_原发疾病诊断日期": {
        "value": "2026-05-05",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f054_原发感染部位_病原来源": {
        "value": "伤口",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f055_原发感染部位_具体病原结果": {
        "value": "真菌（1白色念珠菌2曲霉菌属3其它）",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f056_入ICU1小时内PIM3评分_收缩压": {
        "value": "23.1",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f057_入ICU1小时内PIM3评分_瞳孔反射": {
        "value": "（>3mm和双侧瞳孔固定计分1，其他或者未知计分0）",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f058_入ICU1小时内PIM3评分_Fio2_100_PaO2": {
        "value": "7.2",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f059_入ICU1小时内PIM3评分_碱剩余": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f060_入ICU1小时内PIM3评分_入PICU1小时内是否使用机械通气": {
        "value": "（未用＝0，使用＝1）",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f061_入ICU1小时内PIM3评分_是否为选择性入ICU": {
        "value": "",
        "status": "source_unclear",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f062_入ICU1小时内PIM3评分_是否为外科或其他操作后恢复期病例": {
        "value": "",
        "status": "source_unclear",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f063_入ICU1小时内PIM3评分_低危诊断": {
        "value": "［6］惊厥为入ICU主要原因",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f064_入ICU1小时内PIM3评分_高危诊断": {
        "value": "［3］左心发育不全综合症",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f065_入ICU1小时内PIM3评分_极高风险诊断": {
        "value": "［4］骨髓移植受者",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f066_实验室检查_血常规": {
        "value": "7.2",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f067_实验室检查_肝功能": {
        "value": "甘油三酯",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f068_实验室检查_凝血功能": {
        "value": "",
        "status": "missing",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f069_实验室检查_电解质": {
        "value": "氯(Cl-)",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f070_实验室检查_血气分析": {
        "value": "碳酸氢根（HCO3-）",
        "status": "review_required",
        "confirmedBy": "",
        "updatedAt": "2026-05-28 11:16"
      },
      "f071_实验室检查_甲状腺功能": {
        "value": "促甲状腺激素(TSH)",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f072_仪器检查_心电图": {
        "value": "23.1",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f073_仪器检查_影像学": {
        "value": "○aEEG○EEG○CT○X光○超声○TCD○MRI○TDI○MRS○MRA○MRV\n○近红外光谱（NIRS）○AABR○TEOAE○眼底",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      },
      "f074_治疗_复苏或CPR": {
        "value": "○是 ○否",
        "status": "auto_filled",
        "confirmedBy": "周医生",
        "updatedAt": "2026-05-28 11:16"
      }
    }
  }
] satisfies CaseRecord[];
