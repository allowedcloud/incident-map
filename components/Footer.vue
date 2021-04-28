<template>
  <div class="pr-4 py-1 text-right bg-gray-200">
    <p class="text-gray-600 text-xs mr-2">
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
      <span class="mx-1">·</span>
      <a href="https://narco.news" class="font-bold text-yellow-500">narco.news</a>&nbsp;
      <span class="font-bold select-none">SAM</span>
    </p>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
