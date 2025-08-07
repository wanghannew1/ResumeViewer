<template>
  <div>
    <p>姓名: {{ userInfo.name }}</p>
    <p>年龄: {{ userInfo.age }}</p>
    <p>邮箱: {{ userInfo.email }}</p>
  </div>
</template>
<script setup lang="ts">
interface UserInfo {
  name: string
  age: number
  email: string
}
 
const props = defineProps<{
  userInfo: UserInfo  // 直接使用接口类型
}>()
</script>