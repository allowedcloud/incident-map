<template>
  <div class="m-12 mx-36">
    <h1 class="text-3xl font-bold border-b-2 border-gray-300 mb-6">
      Hello {{ getUser.username }}!
    </h1>
      <NuxtLink to="/add">Add Incident</NuxtLink>
      <NuxtLink to="/edit">Edit Incident</NuxtLink>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",

  computed: {
    getUser() {
      return this.$store.state.auth?.cognitoUser || "Unknown User";
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  font-weight: 600;
  @apply bg-yellow-400;
  @apply p-2;
  @apply m-2;
  @apply rounded-lg;

  &:hover {
    @apply bg-yellow-300;
  }
}
</style>
