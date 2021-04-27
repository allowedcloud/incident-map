<template>
  <div class="flex flex-col gap-6 mt-20">
    <div class="flex items-center gap-4">
      <h1 class="text-lg font-bold font-mono">2021</h1>
      <div @click="reset" class="text-xs bg-yellow-300 text-yellow-700 p-1 rounded-md cursor-pointer">RESET</div>
    </div>
    <div class="flex flex-wrap gap-4 w-96">
      <div @click="sortByMonth('April')" class="underline text-blue-500 cursor-pointer">
        April
      </div>
      <div @click="sortByMonth('May')" class="underline text-blue-500 cursor-pointer">
        May
      </div>
      <div class="text-gray-400 cursor-not-allowed">
        June
      </div>
      <div class="text-gray-400 cursor-not-allowed">
        July
      </div>
      <div class="text-gray-400 cursor-not-allowed">
        August
      </div>
      <div class="text-gray-400 cursor-not-allowed">
        September
      </div>
      <div class="text-gray-400 cursor-not-allowed">
        October
      </div>
      <div class="text-gray-400 cursor-not-allowed">
        November
      </div>
      <div class="text-gray-400 cursor-not-allowed">
        December
      </div>
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
