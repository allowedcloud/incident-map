<template>
  <div class="absolute top-3 left-14 dark:text-white">
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

