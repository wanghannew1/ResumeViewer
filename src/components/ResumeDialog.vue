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
        <el-descriptions-item label="生日">{{ resume.birthday }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ resume.age }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ resume.gender }}</el-descriptions-item>
        <el-descriptions-item label="民族">{{ resume.ethnicity }}</el-descriptions-item>
        <el-descriptions-item label="政治面貌">{{ resume.political_affiliation }}</el-descriptions-item>
        <el-descriptions-item label="联系方式">{{ (resume.phone || "") +" / "+ (resume.email || "") }}</el-descriptions-item>
        <el-descriptions-item label="户口地/居住地">{{ (resume.native_place || "") +" / "+ (resume.address || "") }}</el-descriptions-item>
        <el-descriptions-item label="学历">{{ resume.highest_degree }}</el-descriptions-item>
        <el-descriptions-item label="专业">{{ resume.highest_major }}</el-descriptions-item>
      </el-descriptions>

      <!-- 折叠面板区域 accordion -->
      <el-collapse v-model="activeCollapse" class="resume-collapse">
        <el-collapse-item title="教育背景" name="education_background">
          <div class="collapse-content">
            <div v-for="(exp, index) in resume.education_background" :key="index" class="education-item">
              <!-- <h4>{{ exp }} </h4> -->
              <div class="education-header">
                <h4 class="institution">{{ exp.institution }}</h4>
                <span class="degree-major">{{ exp.degree }} · {{ exp.major }}</span>
              </div>
              <div v-if="exp.time_range" class="education-time">
                {{ exp.time_range.start_date }} 至 {{ exp.time_range.end_date }}
              </div>
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item title="校园经历" name="campus_activities">
          <div class="collapse-content">
            <div v-for="(exp, index) in resume.campus_activities" :key="index" class="education-item">
              <h4>{{ exp }} </h4>
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item title="工作经历" name="experience">
          <div class="collapse-content">
            <div v-for="(exp, index) in resume.work_experience" :key="index" class="experience-item">
              <h4>{{ exp }} </h4>
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item title="技能专长" name="skills">
          <div class="collapse-content">
            <el-tag
              v-for="(skill, index) in resume.skills_certification"
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
            <div v-for="(project, index) in resume.project_experience" :key="index" class="project-item">
              <h4>{{ project }} </h4>
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item title="所获奖项" name="awards">
          <div class="collapse-content">
            <div v-for="(award, index) in resume.award" :key="index" class="project-item">
              <h4>{{ award }} </h4>
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item title="其他" name="other">
          <div class="collapse-content">
            <div v-for="(other, index) in resume.other" :key="index" class="project-item">
              <h4>{{ other }} </h4>
            </div>
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
import type { Resume } from '@/types';

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

/* interface Resume {
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
} */

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

watch(() => props.resume, (newResume) => {
  const newActiveCollapse = [];
  
  if (newResume && newResume.education_background && newResume.education_background.length > 0) {
      newActiveCollapse.push("education_background");
  }

  if (newResume && newResume.campus_activities && newResume.campus_activities.length > 0) {
      newActiveCollapse.push("campus_activities");
  }
  
  if (newResume && newResume.work_experience && newResume.work_experience.length > 0) {
      newActiveCollapse.push("experience");
  }
  
  if (newResume && newResume.skills_certification && newResume.skills_certification.length > 0) {
      newActiveCollapse.push("skills");
  }
  
  if (newResume && newResume.project_experience && newResume.project_experience.length > 0) {
      newActiveCollapse.push("projects");
  }
  
  if (newResume && newResume.award && newResume.award.length > 0) {
      newActiveCollapse.push("awards");
  }

  if (newResume && newResume.other && newResume.other.length > 0) {
      newActiveCollapse.push("other");
  }
  
  // 默认展开第一项有内容的
  if (newActiveCollapse.length > 0) {
      activeCollapse.value = [...newActiveCollapse];
  } else {
      activeCollapse.value = [];
  }
}, { deep: true, immediate: true });

const handleContact = () => {
  if (props.resume?.phone) {
    alert(`将联系 ${props.resume.name}，电话: ${props.resume.phone}`)
  }
}

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

.education-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-left: 3px solid #3a86ff;
  background-color: #f8f9fa;
  border-radius: 0 4px 4px 0;

  .education-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;

    .institution {
      margin: 0;
      font-size: 1.1rem;
      color: #212529;
    }

    .degree-major {
      font-size: 0.9rem;
      color: #6c757d;
    }
  }

  .education-time {
    font-size: 0.85rem;
    color: #6c757d;
    font-style: italic;
  }
}


</style>