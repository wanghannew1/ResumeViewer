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
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="birthday" label="生日" width="120" />
      <el-table-column prop="highest_degree" label="学历" width="80" />
      <el-table-column prop="major" label="专业" width="120" />

      <!-- 操作列 -->
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <!-- <el-button 
            size="small" 
            @click="handlePreview(row)"
          >
            查看详情
          </el-button>
          <el-button 
            type="primary" 
            size="small"
            @click="handleDownload(row.file_name)"
          >
            下载简历
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页控件 -->
    <el-pagination
      v-model:current-page="pagination.current_page"
      v-model:page-size="pagination.size"
      :page-sizes="[100, 200, 500, 1000]"
      :total="pagination.total"
      @current-change="loadResumes"
      layout="sizes, total, prev, pager, next"
    />
  </div>
</template>


<!-- <script lang="ts">
  export default {
    name:'Resume',
  }
</script> -->

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
// 在组件中使用
import { fetchData, postData } from '@/api';
import type { Pagination } from '@/types'

const resumeList: any[] = reactive([]) // 必须设置数组的类型，否则resumeList被 TypeScript 推断为 never[] 类型（表示"不允许任何元素"的数组）
const pagination: Pagination = reactive({
  current_page: 1,
  size: 10,
  total: 0,
  total_pages: 0
})
const loadResumes = async () => {
  try {
    console.log(pagination)
    const resumes = await fetchData(`/resume_list/${pagination.current_page}/${pagination.size}`);
    console.log('Loaded data:', resumes);
    console.log(typeof(resumes))
    resumeList.splice(0, resumeList.length, ...resumes.resumes);// 返回值结构{resumes:[], pagination:{...}}
    console.log(resumeList)
    Object.assign(pagination, resumes.pagination);
  } catch (error) {
    console.error('API Error:', error);
  }
};

// 在组件挂载时自动调用
onMounted(() => {
  loadResumes(); // ✅ 主动调用
});

</script>


  
<style scoped>

</style>