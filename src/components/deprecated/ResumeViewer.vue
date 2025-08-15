<template>
  <div class="resume-container">
    <el-collapse v-model="activePanels" >
      <!-- 基本信息 accordion -->
      <el-collapse-item name="basic" title="基本信息">
        <div class="basic-info">
          <h2>{{ resumeData.name }}</h2>
          <el-descriptions :column="2" border>
            <el-descriptions-item 
              v-if="resumeData.gender" 
              label="性别"
            >
              {{ resumeData.gender }}
            </el-descriptions-item>
            <!-- <el-descriptions-item 
              v-if="resumeData.age" 
              label="年龄"
            >
              {{ resumeData.age }}
            </el-descriptions-item> -->
            <el-descriptions-item 
              v-if="resumeData.phone" 
              label="电话"
            >
              {{ resumeData.phone }}
            </el-descriptions-item>
            <el-descriptions-item 
              v-if="resumeData.email" 
              label="邮箱"
            >
              {{ resumeData.email }}
            </el-descriptions-item>
            <el-descriptions-item 
              v-if="resumeData.address" 
              label="地址"
            >
              {{ resumeData.address }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-collapse-item>

      <!-- 教育背景 -->
      <!-- <el-collapse-item name="education" title="教育背景">
        <el-timeline>
          <el-timeline-item
            v-for="(edu, index) in resumeData.education"
            :key="index"
            :timestamp="edu.time"
            placement="top"
          >
            <el-card shadow="hover">
              <h3>{{ edu.school }}</h3>
              <p>{{ edu.degree }} · {{ edu.major }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-collapse-item> -->

      <!-- 工作经历 -->
      <!-- <el-collapse-item name="work" title="工作经历">
        <div 
          v-for="(work, index) in resumeData.workExperience" 
          :key="index" 
          class="work-item"
        >
          <el-descriptions :title="work.company" border>
            <el-descriptions-item label="职位">{{ work.position }}</el-descriptions-item>
            <el-descriptions-item label="时间">{{ work.time }}</el-descriptions-item>
            <el-descriptions-item label="工作内容" :span="2">
              <ul class="responsibilities">
                <li v-for="(resp, i) in work.responsibilities" :key="i">{{ resp }}</li>
              </ul>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-collapse-item> -->

      <!-- 技能专长 -->
      <!-- <el-collapse-item name="skills" title="技能专长">
        <div class="skills-container">
          <el-progress
            v-for="(skill, index) in resumeData.skills"
            :key="index"
            :text-inside="true"
            :stroke-width="24"
            :percentage="skill.level * 20"
            :status="getSkillStatus(skill.level)"
          >
            <span class="skill-label">{{ skill.name }}</span>
          </el-progress>
        </div>
      </el-collapse-item> -->

      <!-- 项目经验 -->
      <!-- <el-collapse-item 
        v-if="resumeData.projects?.length" 
        name="projects" 
        title="项目经验"
      >
        <el-card
          v-for="(project, index) in resumeData.projects"
          :key="index"
          shadow="hover"
          class="project-card"
        >
          <template #header>
            <div class="project-header">
              <span>{{ project.name }}</span>
              <div>
                <el-tag type="info">{{ project.role }}</el-tag>
                <el-tag type="warning">{{ project.time }}</el-tag>
              </div>
            </div>
          </template>
          <p class="project-desc">{{ project.description }}</p>
          <div class="technologies">
            <span>技术栈：</span>
            <el-tag
              v-for="(tech, i) in project.technologies"
              :key="i"
              class="tech-tag"
              type="success"
              size="small"
            >
              {{ tech }}
            </el-tag>
          </div>
        </el-card>
      </el-collapse-item> -->
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, type PropType } from 'vue';
import type { Resume } from '@/types';

const props = defineProps<{
  resumeData: Resume  // 直接使用接口类型
}>()

const activePanels = ref(['basic']); // 默认展开基本信息
</script>
