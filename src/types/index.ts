// 定义一个接口，限制每个Person对象的格式
export interface PersonInter {
    _id:string,
    seq_num:number,
    name:string,
    file_name:string,
    [key: string]: any // 允许任意额外的动态属性
}
  
// 定义一个自定义类型Persons
export type Persons = Array<PersonInter>