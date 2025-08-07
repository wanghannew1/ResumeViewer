<script setup lang="ts">
interface Resume {
  _id: string;
  name?: string;
}
/* const props = defineProps({
  msg: String
}) */
const props = defineProps<Resume>()

</script>

<template>
  <!-- <h2>{{ msg || 'No props passed yet' }}</h2> -->
   <div>{{ props._id }}</div>
   <div>{{ props.name }}</div>
</template>