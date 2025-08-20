// 定义一个接口，限制每个Person对象的格式
// 废弃
export interface PersonInter {
    _id:string,
    seq_num:number,
    name:string,
    file_name:string,
    [key: string]: any // 允许任意额外的动态属性
}
  
// 定义一个自定义类型Persons
// 废弃
export type Persons = Array<PersonInter>

// 任意属性的json
// 废弃
export interface IResume {
    [key: string]: any // 允许任意额外的动态属性
}

// 2. 定义 API 错误结构
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// api返回值类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 时间区间子类型
export interface TimeRange {
  start_date?: string;
  end_date?: string;
}

// 教育背景子类型
export interface EducationBackground {
  institution?: string;
  degree?: string;
  major?: string;
  time_range?: TimeRange;

}

// 简历类型
export interface Resume {
  _id: string;
  name?: string;
  age?:number;
  phone?: string;
  email?: string;
  birthday?: string;
  school?: string;
  highest_degree?: string;
  highest_major?: string;
  graduationTime?: string;
  is_resume?: boolean;
  file_name?: string;
  ethnicity?: string;
  political_affiliation?: string;
  seq_num?: number;
  native_place?: string; // 户口地
  address?: string;
  gender?: string | null;
  // 其他可能为null的字段...
  education_background?: EducationBackground[];
  campus_activities?: string[];
  work_experience?: string[] | null;
  skills_certification?: string[];
  project_experience?: string[];
  award?: string[];
  other?: string[];
  selfEvaluation?: string;
}

// 翻页参数对象
export interface Pagination {
  current_page: number,
  size: number,
  total: number,
  total_pages: number
}

