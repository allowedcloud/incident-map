<template>
  <nav class="flex flex-row justify-between items-center p-2">
    <div class="flex flex-row items-center ml-2">
      <img src="/warning.svg" class="w-6">
      <span class="text-xl font-bold ml-1 select-none">Significant Activities Map</span>
    </div>
    <div class="flex flex-row mr-2 gap-4">
      <NuxtLink to="/" v-if="isAuthenticated">
        <img src="/home.svg" alt="Home" class="h-6 w-6">
      </NuxtLink>
      <!-- <NuxtLink v-if="!isAuthenticated" to="/login">
        <img src="/user.svg" alt="Login" class="h-6 w-6">
      </NuxtLink> -->
      <NuxtLink v-if="isAuthenticated" to="/add">
        <img src="/plus.svg" alt="Add" class="h-6 w-6">
      </NuxtLink>
      <NuxtLink v-if="isAuthenticated" to="/edit">
        <img src="/edit.svg" alt="Edit" class="h-6 w-6">
      </NuxtLink>
      <NuxtLink v-if="isAuthenticated" :to="'/users/' + getUser">
        <img src="/user-circle.svg" alt="User" class="h-6 w-6">
      </NuxtLink>
      <button v-if="isAuthenticated" @click="logout">
        <img src="/logout.svg" alt="Logout" class="h-6 w-6">
      </button>
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
