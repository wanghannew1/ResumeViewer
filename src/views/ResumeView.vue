<script setup lang="ts">
import ResumeViewer from '../components/ResumeViewer.vue'
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import type { Resume } from '@/types';

const route = useRoute()

// const resume = reactive({ _id:"abcd", name: "zhang3" })

// const resume = { _id:"abcd", name: "zhang3" }

 const resume = route.meta.state as Resume

 console.log(resume)
// const resume = history.state.myObject

</script>

<template>
  <main>
    <ResumeViewer :resume-data="resume"/>
  </main>
</template>
