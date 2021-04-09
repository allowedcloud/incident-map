<template>
  <nav class="flex flex-row justify-between bg-indigo-200 p-2">
    <div class="font-mono">Incident Map</div>
    <div class="links">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink v-if="!isAuthenticated" to="/login">Login</NuxtLink>
      <button v-if="isAuthenticated" @click="logout">Logout</button>
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
        }
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
