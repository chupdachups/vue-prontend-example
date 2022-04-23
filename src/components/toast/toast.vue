<template/>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      toast(msg, append = false) {
        // this.$bvToast.toast(`${msg}`, {
        this.$bvToast.toast(' ', {
          title: `${msg}`,
          toaster: 'b-toaster-bottom-center',
          solid: true,
          appendToast: append,
          autoHideDelay: 5000
        })
      }
    }
  }
</script>