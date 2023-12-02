<template>
  <div>
    <LoginUser />
    <Wave class="fixed bottom-[-60px] left-0 right-0 pointer-events-none" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 10,
    };
  },
};
</script>

<style scoped></style>

<!-- <template>
    <div>
        <pre>{{ pages }}</pre>
      
    </div>
</template>

<script setup>

const pages= ref();

onMounted(async() => {
const {result} = await $fetch("/api/query?col=pages");
console.log(result)
pages.value= result;
});
</script>

<style scoped></style> -->
