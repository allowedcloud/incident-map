<template>
  <div class="absolute top-1 left-14 text-gray-700 dark:text-gray-200 animate__animated animate__fadeIn">
    <span class="font-bold">
      {{ numberOfActivities }}
    </span>
    &nbsp; activities in 
    <span class="font-bold">
      {{ selectedMonth }}
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    selectedMonth() {
      return this.$store.state.incidents.selectedMonth
    },
    numberOfActivities() {
      const count = this.$store.state.incidents.sortedByMonth
      return count.length
    }
  }
}

</script>

