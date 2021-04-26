<template>
  <div class="h-screen grid lg:grid-cols-6 overflow-hidden">
    <div class="h-96 lg:col-span-4 p-4 z-20">
      <Map />
    </div>
    <div class="absolute bottom-10 lg:mt-0 lg:top-0 lg:relative flex flex-col lg:col-span-2 items-center">
      <IncidentFeed />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("incidents/getIncidents")
  }
}
</script>

<style>
</style>
