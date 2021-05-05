<template>
  <div class="h-screen grid lg:grid-cols-6 overflow-hidden">
    <div class="h-96 lg:col-span-4 animate__animated animate__fadeInUp">
      <Map />
    </div>
    <div class="absolute bottom-10 lg:mt-0 lg:top-0 lg:relative flex flex-col lg:col-span-2 items-center animate__animated animate__fadeIn">
      <IncidentFeed />
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: "narco.news - SAM"
  },
  mounted() {
    this.$store.dispatch("incidents/getIncidents")
  }
}
</script>

<style>
</style>
