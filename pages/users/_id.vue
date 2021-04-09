<template>
  <h1 class="text-2xl">Hello {{ getUser.username }}</h1>
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
