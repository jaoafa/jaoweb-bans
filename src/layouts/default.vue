<template>
  <v-app>
    <v-app-bar fixed app>
      <div class="logo">
        <nuxt-link to="/">
          <AppLogo width="38px" />
        </nuxt-link>
      </div>
      <nuxt-link to="/" tag="div" style="cursor: pointer">
        <v-toolbar-title class="header-title">jMS Bans</v-toolbar-title>
      </nuxt-link>
      <v-spacer />
      <div class="version mt-7">
        <a
          :href="
            'https://github.com/jaoafa/jaoweb-bans/releases/tag/' + getTag()
          "
          v-text="getTag()"
        />
        -
        <a
          :href="
            'https://github.com/jaoafa/jaoweb-bans/commit/' + getShortHash()
          "
          v-text="getShortHash()"
        />
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <VAlert type="error">
          本アプリはベータ版です。不具合等がかなりある可能性があります。たぶん。
        </VAlert>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'DefaultPage',
  methods: {
    getTag() {
      return process.env.Tag
    },
    getShortHash() {
      return process.env.ShortHash
    },
  },
})
</script>

<style lang="scss" scoped>
.logo {
  height: 45px;
  width: 45px;
  background-color: #ffb41d;
  padding: 3px;
}

.header-title {
  font-style: normal;
  font-weight: 900;
  font-size: 32px;
  line-height: 56px;
  margin: 10px;
}
</style>
