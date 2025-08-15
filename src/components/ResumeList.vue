<template>
  <div class="resume-container">
    <el-table 
      :data="resumeList" 
      border 
      stripe
    >
      <!-- v-loading="loading"       style="width: 100%" -->
      <!-- 基础信息列 -->
      <el-table-column prop="seq_num" label="序号" width="80" fixed />
      <el-table-column prop="name" label="姓名" width="100" fixed />
      <el-table-column prop="gender" label="性别" width="60" />
      <el-table-column prop="ethnicity" label="民族" width="80" />
      <el-table-column prop="phone" label="电话" width="160" />
      <el-table-column prop="email" label="邮箱" width="240" />
      <el-table-column prop="birthday" label="生日" width="120" />
      <el-table-column prop="highest_degree" label="学历" width="100" />
      <el-table-column prop="major" label="专业" width="200" />

      <!-- 操作列 -->
      <el-table-column label="操作" width="300" fixed="right">
        <template #default="{ row }">

          
          <el-button 
            size="small" 
            @click="handlePreview(row)"
          >
            查看详情
          </el-button>
          <el-button 
            type="primary"
            size="small"
            
          >
            下载简历
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页控件 @click="handleDownload(row.file_name)" -->
    <el-pagination
      v-model:current-page="pagination.current_page"
      v-model:page-size="pagination.size"
      :page-sizes="[100, 200, 500, 1000]"
      :total="pagination.total"
      @current-change="loadResumes"
      layout="sizes, total, prev, pager, next"
    />
  </div>
  <ResumeDialog v-model="visible" :resume="currentResume"></ResumeDialog>
</template>


<!-- <script lang="ts">
  export default {
    name:'Resume',
  }
</script> -->

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
// 在组件中使用
import { fetchData, postData } from '@/api';
import type { Pagination, Resume } from '@/types'

const resumeList: any[] = reactive([]) // 必须设置数组的类型，否则resumeList被 TypeScript 推断为 never[] 类型（表示"不允许任何元素"的数组）
const currentResume: Resume = reactive({
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
})
const pagination: Pagination = reactive({
  current_page: 1,
  size: 10,
  total: 0,
  total_pages: 0
})
// 简历详情页面显示开关
const visible = ref(false)

const loadResumes = async () => {
  try {
    //console.log(pagination)
    const resdata = await fetchData(`/resume_list/${pagination.current_page}/${pagination.size}`);
    //console.log('Loaded data:', resdata);
    //console.log(typeof(resdata))
    resumeList.splice(0, resumeList.length, ...resdata.resumes);// 返回值结构{resumes:[], pagination:{...}}
    //console.log(resumeList)
    Object.assign(pagination, resdata.pagination);
  } catch (error) {
    console.error('API Error:', error);
  }
};
const handlePreview = (rowData: Resume)=> {
  // Object.assign批量更新 reactive 或 ref 对象的属性，并保持响应性
  // Object.assign 可以一次性将所有 rowData 的属性复制到currentResume，并保持响应性
  Object.assign(currentResume, rowData)
  visible.value = true
  console.log((rowData))
}

// 在组件挂载时自动调用
onMounted(() => {
  loadResumes(); // ✅ 主动调用
});

</script>


  
<style scoped>

</style>