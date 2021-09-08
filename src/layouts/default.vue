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
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

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
