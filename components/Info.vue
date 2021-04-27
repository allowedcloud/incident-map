<template>
  <div class="absolute top-3 left-14">
    Month: <span class="font-bold">{{ selectedMonth }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    selectedMonth() {
      return this.$store.state.incidents.selectedMonth
    }
  }
}

</script>

