<template>
  <main>
    <div class="search-container">
      <SearchForm />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    try {
      this.$recaptcha.init()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('reCAPTCHA Error', e)
    }
  },
})
</script>
