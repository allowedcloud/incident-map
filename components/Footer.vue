<template>
  <footer class="text-right mr-4 py-1 z-20 absolute bottom-0 right-0">
    <p class="text-xs text-gray-600 dark:text-gray-200">
      <ColorModeToggle />
      <button
        v-tippy="{
          trigger: 'focus mouseenter',
          hideOnClick: false,
          theme: 'dark'
        }"
        content="The icons used on this website are from FlatIcon and SVGRepo. All icons are property of their respective owners."
        class="underline ml-1 hover:no-underline"
        >
        Icons
      </button>
      <NuxtLink to="/contact" class="underline ml-1 hover:no-underline">Contact</NuxtLink>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

