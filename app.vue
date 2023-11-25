<template>
  <div>
    <button class="button"> click me</button>
    <!-- <button class="button" @click="signOut"> Sign out</button> -->
  </div>
</template>

<script setup>
//import { signOut } from 'firebase/auth';


console.log( "---APP---");

onMounted(async () => {
const email = "xyz@abc.com"
const password= "123456"
const credentials = await createUser(email, password)
console.log('Credentials:', credentials);


// const email = "xyz@abc.com"
// const password= "123456"
// const credentials = await signInUser(email, password)
// console.log('Credentials:', credentials);


});




</script>

<style scoped>

</style>