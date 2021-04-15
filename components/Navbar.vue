<template>
  <nav class="flex flex-row justify-between items-center p-2">
    <div class="flex flex-row items-center ml-2">
      <img src="/hero-pin.svg" class="w-6">
      <span class="text-xl font-bold ml-1 select-none">Incident Map</span>
    </div>
    <div class="links mr-2">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink v-if="isAuthenticated" to="/add">Add</NuxtLink>
      <NuxtLink v-if="!isAuthenticated" to="/login">Login</NuxtLink>
      <button v-if="isAuthenticated" @click="logout" class="underline">Logout</button>
      <span v-if="isAuthenticated"> | </span>
      <span v-if="isAuthenticated">Hello </span>
      <NuxtLink v-if="isAuthenticated" :to="'/users/' + getUser">{{ getUser }}</NuxtLink>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Navbar',
  computed: {
      ...mapGetters({
          isAuthenticated: 'auth/isAuthenticated'
        }),
      getUser() {
          return (
          this.$store.state.auth?.cognitoUser?.username || "Unknown User"
          )
      },
    },
  methods: {
      ...mapActions({
        logout: 'auth/logout'
        })
    }
}
</script>

<style scoped>
a {
    text-decoration: underline
  }
button {
    padding: 0;
    margin: 0;
  }
</style>
