<template>
  <div>
    <p>姓名: {{ name }}</p>
    <p>年龄: {{ age }}</p>
    <p>邮箱: {{ email }}</p>
  </div>
</template>
<script setup lang="ts">
interface UserInfo {
  name: string
  age: number
  email: string
}
 
const props = defineProps<UserInfo>()
</script>