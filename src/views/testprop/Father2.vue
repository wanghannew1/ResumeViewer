<template>
  <!-- 传递多个参数给子组件 -->
  <Child :name="userData.name" :age="userData.age" :email="userData.email" />
</template>
 
<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child2.vue'
 
// 定义一个对象
const userData = ref({
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com'
})
</script>