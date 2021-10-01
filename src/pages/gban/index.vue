<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12">
        <h1>GBan 一覧</h1>
        <p>{{ explanation.gban }}</p>

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
  data() {
    return {
      items: [],
      explanation: $banDescription,
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
        .then((response) => {
          this.items = response.data.items.gban.map((item: MCBansItemModel) => {
            return {
              id: item.banid,
              mcid: item.mcid,
              uuid: item.uuid,
              type: 'GBan',
              reason: item.reason,
              bannedAt: new Date(item.banned_at),
            }
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
    })
  },
})
</script>
