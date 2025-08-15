<script setup lang="ts">
import ResumeViewer from '../components/ResumeViewer.vue'
import ResumeDialog from '../components/ResumeDialog.vue'
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import type { Resume } from '@/types';

const route = useRoute()

// const resume = reactive({ _id:"abcd", name: "zhang3" })

// const resume = { _id:"abcd", name: "zhang3" }

const resume = route.meta.state as Resume

const visible = ref(true)

const sampleResume: Resume = {
  _id: "1",
  name: '张三',
  age: 28,
  gender: '男',
  phone: '13800138000',
  highest_degree: '本科',
  school: '某某大学',
  major: '计算机科学与技术',
  graduationTime: '2018年',
  work_experience: [
    '某某科技有限公司',
    '某某网络公司',
  ],
  skills: ['Vue3', 'TypeScript', 'Element Plus', 'React', 'Node.js', 'Webpack'],
  project_experience: [
      '企业级后台管理系统',
      'xx项目技术负责人',
  ],
  selfEvaluation: '5年前端开发经验，熟练掌握Vue技术栈，对前端工程化和性能优化有深入理解。具有良好的编码习惯和团队协作能力。'
}

 console.log(resume)
// const resume = history.state.myObject

</script>

<template>
  <main>
    <el-switch v-model="visible" />
    <!-- <ResumeViewer :resume-data="resume"/> :modelValue="visible" -->
    <ResumeDialog v-model="visible" :resume="sampleResume"></ResumeDialog>
  </main>
</template>
