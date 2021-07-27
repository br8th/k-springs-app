<template>
    <div id="app">
        <notifications></notifications>
        <router-view/>
    </div>
</template>

<style lang="scss">
    #app {
        text-align: center;
    }
</style>

<script>

export default {
  mounted() {
    this.addNotification();
  },
  methods: {
    addNotification() {
      this.$notifications.setOptions({
        type: 'primary',
        timeout: 4000,
        horizontalAlign: 'center',
        verticalAlign: 'bottom',
      });
    },
  },
};
</script>
<!-- import styles -->
<style src="vue-notifyjs/themes/material.css"></style>
