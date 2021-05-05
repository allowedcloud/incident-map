<template>
  <div>
    <ul class="tabs__header text-gray-700 dark:text-white animate__animated animate__fadeIn">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
        :class="{'tab__selected': (index == selectedIndex)}"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0,
      tabs: [],
    };
  },
  created() {
    this.tabs = this.$children;
  },
  mounted() {
    this.selectTab(0);
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i;

      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      });
    },
  },
};
</script>

<style lang="scss">
ul.tabs__header {
  @apply absolute;
  @apply right-2;
  @apply top-0;
  @apply text-sm;
  list-style: none;

  li {
    display: inline-block;
    cursor: pointer;
    @apply select-none;
    margin: 0 5px 0 5px;
    @apply border;
    @apply border-gray-300;
    @apply rounded-full;
    padding: 5px 15px;
    transition: border-color 0.3s, color 0.3s;
    @apply bg-white;
    @apply dark:bg-gray-600;

    &:hover {
      @apply border-yellow-300;
    }
  }
  .tab__selected {
    font-weight: 600;
    @apply text-yellow-400;
    @apply border-yellow-400;
  }
}
</style>
