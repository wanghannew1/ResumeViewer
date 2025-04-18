<template>
  <div class="person">
    <ul>
      <li v-for="item in pList" :key="item._id">
        {{item.name}}--{{item.age}}
      </li>
    </ul>
  </div>

    <div class="json-viewer">
      <!-- 根节点开始 -->
      <div v-if="isRoot" class="json-root">
        <h2 v-if="title">{{ title }}</h2>
        <json-node :value="jsonData" :key="rootKey" :depth="0" />
      </div>
      
      <!-- 递归组件定义 -->
      <template v-else>
        <!-- 对象类型 -->
        <div v-if="isObject" class="json-object" :style="indentStyle">
          <span class="json-brace">{</span>
          <!-- <div v-for="(value, key) in value" :key="key" class="json-property">
            <span class="json-key">"{{ key }}": </span>
            <json-node :value="value" :depth="depth + 1" />
            <span class="json-comma">,</span>
          </div> -->
          <span class="json-brace">}</span>
        </div>
        
        <!-- 数组类型 -->
        <!-- <div v-else-if="isArray" class="json-array" :style="indentStyle">
          <span class="json-bracket">[</span>
          <div v-for="(item, index) in value" :key="index" class="json-item">
            <json-node :value="item" :depth="depth + 1" />
            <span class="json-comma">,</span>
          </div>
          <span class="json-bracket">]</span>
        </div> -->
        
        <!-- 基本类型 -->
        <!-- <span v-else class="json-value" :class="valueType" :style="indentStyle">
          {{ formattedValue }}
        </span> -->
      </template>
    </div>
</template>


<script lang="ts">
  export default {
    name:'JsonNode',
  }
</script>

<script lang="ts" setup>
  import { type PersonInter, type Persons } from '@/types'
  import { defineProps } from 'vue'

  const porps = defineProps<{personList?: Persons}>()
  const pList = porps.personList
  let isRoot = false
  let title = '标题'
  let rootKey = 'root'
  let jsonData:any = []
  let isObject = false
  let indentStyle = ''
  let value
</script>


  
<style scoped>
  .json-viewer {
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    background-color: #f8f8f8;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
  }
  
  .json-root {
    background-color: white;
    padding: 20px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
  }
  
  .json-object, .json-array {
    border-left: 1px dashed #ccc;
  }
  
  .json-property, .json-item {
    position: relative;
  }
  
  .json-key {
    color: #881391;
    font-weight: bold;
  }
  
  .json-value.string {
    color: #c41a16;
  }
  
  .json-value.number {
    color: #1c00cf;
  }
  
  .json-value.boolean {
    color: #0d22aa;
  }
  
  .json-value.null {
    color: #666;
  }
  
  .json-brace, .json-bracket {
    color: #000;
    font-weight: bold;
  }
  
  .json-comma {
    color: #000;
  }
  
  .json-toggle {
    cursor: pointer;
    margin-right: 5px;
    color: #666;
  }
  
  .json-collapsed {
    color: #999;
    font-style: italic;
  }
  
  /* 添加悬停效果 */
  .json-property:hover, .json-item:hover {
    background-color: #f0f0f0;
  }
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .json-viewer {
      font-size: 12px;
    }
  }
</style>