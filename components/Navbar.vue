<template>
  <nav class="flex flex-row justify-between bg-indigo-200 p-2">
    <div class="font-mono">Incident Map</div>
    <div class="links">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  components: {
    }
}
</script>

<style scoped>
a {
    text-decoration: underline
  }

</style>
