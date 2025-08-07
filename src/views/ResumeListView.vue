<script setup lang="ts">
import JsonNode from '../components/JsonNode.vue'
import ResumeList from '../components/ResumeList.vue'
import {reactive} from 'vue'
import {type Persons, type IResume} from '@/types'
  
let persons = reactive<Persons>([
  {_id:'e98219e12',seq_num:1,name:'张三',file_name:'f1', age:19},
  {_id:'e98219e13',seq_num:2,name:'李四',file_name:'f2', age:20, gander:'男'},
  {_id:'e98219e14',seq_num:3,name:'王五',file_name:'f3'}
])

let resume = reactive<IResume>(
  {_id:'e98219e12',seq_num:1,name:'张三',file_name:'f1', age:19}
)


</script>

<template>
  <main>
    <!-- <JsonNode :resume="resume"/> -->
    <resume-list></resume-list>
  </main>
</template>
