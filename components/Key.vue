<template>
  <div class="grid grid-cols-2 gap-6 mt-20 select-none">
    <div class="flex items-center">
      <img
        src="/homicide.svg"
        alt="Homicide"
        class="w-12 h-12 rounded-full border-2 border-gray-600"
      />
      <p class="text-xl font-bold">Homicide</p>
    </div>
    <div class="flex items-center">
      <img
        src="/ak.svg"
        alt="Confrontation"
        class="w-12 h-12 rounded-full border-2 border-gray-600"
      />
      <p class="text-xl font-bold">Confrontation</p>
    </div>
    <div class="flex items-center">
      <img
        src="/drugs.svg"
        alt="Drugs"
        class="w-12 h-12 rounded-full border-2 border-gray-600"
      />
      <p class="text-xl font-bold">Drug trafficking</p>
    </div>
    <div class="flex items-center">
      <img
        src="/handcuffs.svg"
        alt="arrest"
        class="w-12 h-12 rounded-full border-2 border-gray-600"
      />
      <p class="text-xl font-bold">Apprehension</p>
    </div>
    <div class="flex items-center">
      <img
        src="/kidnapping.svg"
        alt="Kidnapping"
        class="w-12 h-12 rounded-full border-2 border-gray-600"
      />
      <p class="text-xl font-bold">Kidnapping</p>
    </div>
    <div class="flex items-center">
      <img
        src="/narco-message.svg"
        alt="Narco-message"
        class="w-12 h-12 rounded-full border-2 border-gray-600"
      />
      <p class="text-xl font-bold">Narco-message</p>
    </div>
    <div class="flex items-center">
      <img
        src="/jeep.svg"
        alt="Military"
        class="w-12 h-12 rounded-full border-2 border-gray-600"
      />
      <p class="text-xl font-bold">Military</p>
    </div>
    <div class="flex items-center">
      <img
        src="/video-message.svg"
        alt="Recorded video"
        class="w-12 h-12 rounded-full border-2 border-gray-600"
      />
      <p class="text-xl font-bold">Recorded video</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Key",
};
</script>

<style scoped>
p {
  @apply dark:text-gray-100;
}
div {
  margin-bottom: 2em;
}
img {
  margin-right: 1em;
  @apply bg-white;
  @apply dark:border-gray-900;
}
</style>
