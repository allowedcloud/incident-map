<template>
  <button @click="toggleColorMode" class="underline hover:no-underline">{{ colorMode }}</button>
</template>

<script>
export default {
  name: 'ColorModeToggle',
  computed: {
    colorMode() {
      if (this.$colorMode.preference === "light") {
        return "Dark"
      } else {
        return "Light"
      }
    }
  },
  methods: {
    toggleColorMode() {
      this.$colorMode.preference =
        this.$colorMode.value == "light" ? "dark" : "light";
    }
  }
}
</script>
