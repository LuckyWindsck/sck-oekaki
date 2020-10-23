<template>
  <div class="about">
    <span
      v-for="([name, link], index) in Object.entries(this.sites)"
      :key="index"
    >
      <span v-if="index > 0"> | </span>
      <a target="_blank" rel="noopener noreferrer" :href="link">{{ name }}</a>
    </span>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      sites: {
        repo: 'https://github.com/LuckyWindsck/sck-oekaki',
        github: 'https://github.com/LuckyWindsck',
        twitter: 'https://twitter.com/LuckyWind_sck',
      },
    };
  },
};
</script>

<style>
</style>
