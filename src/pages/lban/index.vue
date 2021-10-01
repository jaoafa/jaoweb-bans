<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12">
        <h1>LBan 一覧</h1>
        <p>{{ explanation.lban }}</p>

        <BanAllRecentTable :items="items" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { $banDescription } from '../../plugins/banDescriptions'
import { MCBansItemModel } from '~//plugins/models'

export default Vue.extend({
  name: 'LBan',
  data() {
    return {
      items: [],
      explanation: $banDescription,
    }
  },
  head() {
    return {
      title: this.$options.name,
    }
  },
  mounted() {
    try {
      this.$recaptcha.init()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('reCAPTCHA Error', e)
    }
    this.$recaptcha.execute('login').then((token: string) => {
      this.$axios
        .get(
          'https://api.jaoafa.com/v2/bans/recent/mcbans?all_items=true&active_only=false',
          {
            headers: {
              'X-reCAPTCHA-Token': token,
            },
          }
        )
        .then((response: any) => {
          this.items = response.data.items.lban.map((item: MCBansItemModel) => {
            return {
              id: item.banid,
              mcid: item.mcid,
              uuid: item.uuid,
              type: 'LBan',
              reason: item.reason,
              bannedAt: new Date(item.banned_at),
            }
          })
        })
        .catch((error: any) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
    })
  },
})
</script>
