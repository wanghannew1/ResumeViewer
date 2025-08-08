<template>
  <el-dialog
    v-model="visible"
    :title="`${resume?.name}的简历`"
    width="800px"
    top="5vh"
  >
    <div class="resume-detail" v-if="resume">
      <!-- 基本信息展示 -->
      <el-descriptions border :column="2" size="small">
        <el-descriptions-item label="姓名">{{ resume.name }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ resume.age }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ resume.gender }}</el-descriptions-item>
        <el-descriptions-item label="联系方式">{{ resume.phone }}</el-descriptions-item>
      </el-descriptions>

      <!-- 折叠面板区域 -->
      <el-collapse v-model="activeCollapse" class="resume-collapse" accordion>
        <el-collapse-item title="教育背景" name="education">
          <div class="collapse-content">
            <h4>{{ resume.education }}</h4>
            <p v-if="resume.school">毕业院校: {{ resume.school }}</p>
            <p v-if="resume.major">专业: {{ resume.major }}</p>
            <p v-if="resume.graduationTime">毕业时间: {{ resume.graduationTime }}</p>
          </div>
        </el-collapse-item>

        <el-collapse-item title="工作经历" name="experience">
          <div class="collapse-content">
            <div v-for="(exp, index) in resume.experiences" :key="index" class="experience-item">
              <h4>{{ exp.company }} ({{ exp.duration }})</h4>
              <p><strong>职位:</strong> {{ exp.position }}</p>
              <p><strong>工作内容:</strong></p>
              <ul>
                <li v-for="(desc, i) in exp.descriptions" :key="i">{{ desc }}</li>
              </ul>
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item title="技能专长" name="skills">
          <div class="collapse-content">
            <el-tag
              v-for="(skill, index) in resume.skills"
              :key="index"
              type="success"
              effect="dark"
              class="skill-tag"
            >
              {{ skill }}
            </el-tag>
          </div>
        </el-collapse-item>

        <el-collapse-item title="项目经验" name="projects">
          <div class="collapse-content">
            <div v-for="(project, index) in resume.projects" :key="index" class="project-item">
              <h4>{{ project.name }} ({{ project.period }})</h4>
              <p><strong>技术栈:</strong> {{ project.techStack.join(', ') }}</p>
              <p><strong>项目描述:</strong> {{ project.description }}</p>
              <p><strong>职责:</strong></p>
              <ul>
                <li v-for="(resp, i) in project.responsibilities" :key="i">{{ resp }}</li>
              </ul>
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item title="自我评价" name="evaluation">
          <div class="collapse-content">
            <p>{{ resume.selfEvaluation }}</p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
      <el-button type="primary" @click="handleContact">联系TA</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Experience {
  company: string
  position: string
  duration: string
  descriptions: string[]
}

interface Project {
  name: string
  period: string
  techStack: string[]
  description: string
  responsibilities: string[]
}

interface Resume {
  id: number
  name: string
  age: number
  gender: string
  phone: string
  education: string
  school?: string
  major?: string
  graduationTime?: string
  experiences: Experience[]
  skills: string[]
  projects: Project[]
  selfEvaluation: string
}

const props = defineProps<{
  modelValue: boolean
  resume: Resume | null
}>()

const emit = defineEmits(['update:modelValue'])

const visible = ref(props.modelValue)
const activeCollapse = ref(['education']) // 默认展开教育背景

watch(() => props.modelValue, (val) => {
  visible.value = val
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const handleContact = () => {
  if (props.resume?.phone) {
    alert(`将联系 ${props.resume.name}，电话: ${props.resume.phone}`)
  }
}

/* // 在父组件中使用的数据示例
const sampleResume: Resume = {
  id: 1,
  name: '张三',
  age: 28,
  gender: '男',
  phone: '13800138000',
  education: '本科',
  school: '某某大学',
  major: '计算机科学与技术',
  graduationTime: '2018年',
  experiences: [
    {
      company: '某某科技有限公司',
      position: '前端开发工程师',
      duration: '2019.06-至今',
      descriptions: [
        '负责公司核心产品的前端架构设计和开发',
        '使用Vue3+TypeScript重构旧项目',
        '优化前端性能，首屏加载时间减少40%'
      ]
    },
    {
      company: '某某网络公司',
      position: '前端开发实习生',
      duration: '2018.07-2019.05',
      descriptions: [
        '参与公司官网和后台管理系统开发',
        '学习并应用Vue.js技术栈'
      ]
    }
  ],
  skills: ['Vue3', 'TypeScript', 'Element Plus', 'React', 'Node.js', 'Webpack'],
  projects: [
    {
      name: '企业级后台管理系统',
      period: '2022.03-2022.08',
      techStack: ['Vue3', 'TypeScript', 'Element Plus', 'Pinia'],
      description: '为公司内部使用的综合管理平台，包含用户管理、权限控制、数据统计等功能模块',
      responsibilities: [
        '负责前端架构设计和核心模块开发',
        '实现动态路由和权限控制',
        '优化表格大数据量渲染性能'
      ]
    }
  ],
  selfEvaluation: '5年前端开发经验，熟练掌握Vue技术栈，对前端工程化和性能优化有深入理解。具有良好的编码习惯和团队协作能力。'
} */


</script>

<style scoped>
.resume-detail {
  padding: 0 10px;
}

.resume-collapse {
  margin-top: 20px;
}

.collapse-content {
  padding: 10px 15px;
}

.experience-item,
.project-item {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #eee;
}

.experience-item:last-child,
.project-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.skill-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}

h4 {
  margin: 0 0 10px 0;
  color: #333;
}

ul {
  padding-left: 20px;
  margin: 8px 0;
}
</style>