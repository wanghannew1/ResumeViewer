<template>
  <!-- 传递一个对象给子组件 -->
  <Child :user-info="userData" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child1.vue'

// 定义一个对象
const userData = ref({
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com'
})
</script>