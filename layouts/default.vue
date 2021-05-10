<template>
  <div class="flex flex-col h-screen lg:h-screen bg-gray-50 dark:bg-gray-700">
    <ColorModeToggle class="absolute top-1 right-1 dark:text-white" />
    <Navbar />
    <Nuxt class="mb-auto z-20" />
    <div class="absolute bottom-0 w-screen text-gray-200 dark:text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="currentColor" fill-opacity="1" d="M0,96L120,101.3C240,107,480,117,720,133.3C960,149,1200,171,1320,181.3L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z">
        </path>
      </svg>
    </div>
  </div>
</template>

<style>
</style>
