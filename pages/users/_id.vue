<template>
  <div>
    <h1 class="text-2xl">Hello {{ getUser.username }}</h1>
    <NuxtLink to="/add">Add Incident</NuxtLink>
  </div>
</template>

<script>
export default {
 middleware: 'authenticated',
 computed: {
     getUser() {
         return (
          this.$store.state.auth?.cognitoUser || 'Unknown User'
         )
       }
   }
}
</script>

<style>

</style>
