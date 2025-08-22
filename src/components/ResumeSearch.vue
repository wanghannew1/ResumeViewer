<template>
  <div class="resume-container">
    <el-input
      v-model="textarea"
      style="width: 240px"
      :rows="2"
      type="textarea"
      placeholder="请输入岗位要求"
    />
    <el-button type="primary" @click="search()">查询</el-button>
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
      <el-table-column prop="highest_major" label="专业" width="200" />

      <!-- 操作列 -->
      <el-table-column label="操作" width="300" fixed="right">
        <template #default="{ row }">

          
          <el-button 
            size="small" 
            @click="handlePreview(row)"
          >
            查看详情
          </el-button>
          <!-- <el-button 
            type="primary"
            size="small"
            @click="handleDownload(row.file_name)"
          >
            下载简历
          </el-button> -->
          <a :href="'http://10.2.211.17/resumes/'+row.file_name" :download="row.file_name">下载简历</a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页控件 @click="handleDownload(row.file_name)" -->
    <el-pagination
      v-model:current-page="pagination.current_page"
      v-model:page-size="pagination.size"
      :page-sizes="[100, 200, 500, 1000]"
      :total="pagination.total"
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
  _id: "",
  // name: '',
  // age: 0,
  // gender: '',
  // phone: '',
  // highest_degree: '',
  // school: '',
  // highest_major: '',
  // graduationTime: '',
  // work_experience: [],
  // skills_certification: [],
  // project_experience: [],
  // selfEvaluation: ''
})
const pagination: Pagination = reactive({
  current_page: 1,
  size: 20,
  total: 0,
  total_pages: 0
})
// 简历详情页面显示开关
const visible = ref(false)
// 搜索框内容
const textarea = ref('')

const search = async () => {
  try {
    const resdata = await postData({ query: textarea.value });
    // console.log('Loaded data:', resdata);
    // console.log(typeof(resdata))
    const allResumes = resdata.vectors?.[0]?.flatMap( (item: any) => 
      item?.entity?.resume_json || []
    ) || [];

    resumeList.splice(0, resumeList.length, ...allResumes);
    console.log(resumeList)
    Object.assign(pagination, resdata.pagination);
  } catch (error) {
    console.error('API Error:', error);
  }
}

const handlePreview = (rowData: Resume)=> {
  // Object.assign批量更新 reactive 或 ref 对象的属性，并保持响应性
  // Object.assign 可以一次性将所有 rowData 的属性复制到currentResume，并保持响应性
  Object.assign(currentResume, rowData)
  visible.value = true
  console.log((rowData))
}

const handleDownload = (rowData: Resume)=> {
  // Object.assign批量更新 reactive 或 ref 对象的属性，并保持响应性
  // Object.assign 可以一次性将所有 rowData 的属性复制到currentResume，并保持响应性
  Object.assign(currentResume, rowData)
  visible.value = true
  console.log((rowData))
}


</script>


  
<style scoped>

</style>