<template>
  <nav class="flex flex-row justify-between items-center p-2 my-1 bg-gray-50 dark:bg-gray-700">
    <div class="flex flex-row main-links">
    <div class="flex flex-row items-center ml-2">
      <img src="/warning.svg" class="w-6">
      <span class="text-xl font-bold ml-1 select-none dark:text-white">Significant Activities Map</span>
    </div>
    <NuxtLink to="#" class="text-lg text-red-300 border border-gray-50 hover:text-red-400 hover:border-gray-200 ml-12">Articles</NuxtLink>
    <NuxtLink to="#" class="text-lg text-green-300 border border-gray-50 hover:text-green-400 hover:border-gray-200 ml-6">Library</NuxtLink>
    <NuxtLink to="#" class="text-lg text-blue-300 border border-gray-50 hover:text-blue-400 hover:border-gray-200 ml-6">Presswire</NuxtLink>
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

<style style="scss" scoped>
.main-links {
  a {
    @apply rounded-md;
    @apply p-1;
    @apply px-2;
    &:hover {
      @apply bg-gray-100;
    }
  }
}
button {
    padding: 0;
    margin: 0;
  }
</style>
