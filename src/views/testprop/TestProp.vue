<script setup lang="ts">
import { ref, reactive } from 'vue'
import ChildComp from '../components/ChildComp.vue'
import ResumeViewer from '../components/ResumeViewer.vue'

const greeting = ref('父对象传给自组件的参数')
const obj = reactive({ _id:"abcd", name: "zhang3" })
</script>

<template>
  <!-- <ChildComp :msg="greeting"/> -->
   <ChildComp :resume="obj"/>
</template>