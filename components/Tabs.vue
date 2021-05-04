<template>
  <div>
    <ul class="tabs__header text-gray-700 dark:text-white">
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
  @apply top-2;
  list-style: none;

  li {
    display: inline-block;
    cursor: pointer;
    @apply select-none;
    @apply underline;
    @apply text-lg;
    margin: 0 5px 0 5px;
  }
  .tab__selected {
    font-weight: 600;
    @apply text-yellow-500;
    text-decoration: none;
  }
}
</style>
