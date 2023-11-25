<template>
  <div>
    <NuxtPage />
    <!-- <button class="button"> click me</button> -->
    <!-- <button class="button" @click="signOut"> Sign out</button> -->
  </div>
</template>

<script setup>
//import { signOut } from 'firebase/auth';

console.log("---APP---");

onMounted(async () => {
  const email = "xyz@abc.com";
  const password = "123456";
  const credentials = await createUser(email, password);
  console.log("Credentials:", credentials);

  // const email = "xyz@abc.com"
  // const password= "123456"
  // const credentials = await signInUser(email, password)
  // console.log('Credentials:', credentials);
});
</script>

<style>
:root {
  --vs-dropdown-max-height: 210px !important;
  --vs-border-color: #673ab7 !important;
  --vs-border-radius: 10px !important;
  --vs-border-width: 2px !important;
}

html {
  font-family: "Poppins", sans-serif, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html.dark {
  background-color: #c4c4c4;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.sm-side {
}

/**
Vue Table
 */
.vgt-table thead th {
  background-color: #f7fbff !important;
  background: #f7fbff !important;
  font-weight: 500;
  font-size: 11px !important;
}
.vgt-inner-wrap {
  /* padding: 0 10px */
}
.vue-good-table-correction tr:last-child td {
  border-bottom: 0 solid #eaeaea !important;
}
.vgt-table.bordered td {
  border: none !important;
  border-bottom: 1px solid #eaeaea !important;
  vertical-align: middle;
}
.vgt-table.bordered th {
  border: none !important;
}
.vgt-table th {
  padding: 0.75em 1.5em 0.75em 0.75em !important;
}
table.vgt-table td {
  padding: 1.75em 0.75em 1.75em 0.75em !important;
}
.compact table.vgt-table td {
  padding: 5px 12px !important;
}
table.vgt-table {
  border: 1px solid #dcdfe642 !important;
  font-size: 13px !important;
}
.table-bold {
  font-weight: 500 !important;
  color: black !important;
}
/**
Vue Table
 */

.pagination {
  display: flex;
  flex-wrap: wrap;
  padding-top: 2.5rem;
}

.pagination .page-item {
  font-weight: bold;
  margin: 0.25rem;
  color: #000;
  line-height: 2rem;
}

.pagination .page-item.active {
  color: #fff;
  font-weight: bold;
  font-size: 0.75rem;
}

.pagination .page-item.active .page-link-item {
  background-color: black;
  border: 1px solid #000;
  padding: 0.5rem 1rem;
  color: #fff;
  font-weight: bold;
  font-size: 0.75rem;
  outline: none;
}

.pagination .page-item .page-link-item {
  border: 1px solid #000;
  padding: 0.5rem 1rem;
  color: #000;
  font-weight: bold;
  font-size: 0.75rem;
  outline: none;
}

.pagination .next-item .next-link-item,
.pagination .prev-item .prev-link-item {
  border: 1px solid #000;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  color: #000;
  font-size: 0.75rem;
}

.router-link-active {
  color: #62ffbc;
  font-weight: bold;
}
.router-link-active.router-link-exact-active .link {
  background-color: #4a423c;
  font-weight: bold;
}

.main {
  padding-left: 18rem;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 4rem;
}

.vc-pane {
  background-color: #0b1314;
  color: white;
  border-radius: 7px;
}
.vc-title {
  color: white !important;
}
.vc-bordered {
  border: 0 !important;
  border-radius: 10px;
  box-shadow: 0 0 0px 1px #4caf50;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease-in-out;
  transform: translateY(0);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(40px);
}

.text-primary {
  color: #673ab7;
}
.bg-primary {
  background-color: #673ab7;
}
.vs__selected-options {
  padding: 10px 6px !important;
}

.dp__input {
  border: 2px solid #673ab7 !important;
  padding: 12px 30px 10px 12px !important;
  border-radius: 10px !important;
}
</style>
