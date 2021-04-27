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
        class="underline ml-1"
        >
        Icons
      </button>
      <NuxtLink to="/contact" class="underline ml-1">Contact</NuxtLink>
      <span class="mx-1">·</span>
        <span class="font-bold">S.A.M</span> &nbsp; 2021
    </p>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
