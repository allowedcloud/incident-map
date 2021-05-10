<template>
  <div class="flex flex-col gap-6 mt-20">
    <div class="flex items-center mb-2">
      <h1 class="text-lg font-bold font-mono mr-4 dark:text-gray-100">2021</h1>
      <div @click="reset" class="text-xs bg-yellow-300 text-yellow-700 p-1 rounded-md cursor-pointer">RESET</div>
    </div>
    <div class="flex flex-wrap w-96">
      <button @click="sortByMonth('May')" class="underline text-blue-500 cursor-pointer">
        May
      </button>
      <button class="text-gray-400 cursor-not-allowed">
        June
      </button>
      <button class="text-gray-400 cursor-not-allowed">
        July
      </button>
      <button class="text-gray-400 cursor-not-allowed">
        August
      </button>
      <button class="text-gray-400 cursor-not-allowed">
        September
      </button>
      <button class="text-gray-400 cursor-not-allowed">
        October
      </button>
      <button class="text-gray-400 cursor-not-allowed">
        November
      </button>
      <button class="text-gray-400 cursor-not-allowed">
        December
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Date',
  methods: {
    sortByMonth(month) {
      this.$store.dispatch("incidents/sortByMonth", month)
    },
    reset() {
      this.$store.dispatch("incidents/getIncidents")
    }
  }
}

</script>

<style scoped>
button {
  margin: 0 .5em .5em 0;

  &:hover {
    text-decoration: none;
  }
}
</style>
