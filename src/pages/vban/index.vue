<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12">
        <h1>VBan 一覧</h1>
        <p>{{ explanation.vban }}</p>

        <BanAllRecentTable :items="items" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { $banDescription } from '~/plugins/banDescriptions'
import { BanItemModel } from '~/plugins/models'

export default Vue.extend({
  data() {
    return {
      items: [],
      headers: [
        { text: 'BanId', value: 'id' },
        { text: 'MinecraftID', value: 'mcid' },
        { text: 'Reason', value: 'reason' },
        { text: 'BannedAt', value: 'bannedAt' },
        { text: 'See', value: 'seeBtn' },
      ],
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
          'https://api.jaoafa.com/v2/bans/recent/vban?all_items=true&active_only=false',
          {
            headers: {
              'X-reCAPTCHA-Token': token,
            },
          }
        )
        .then((response) => {
          this.items = response.data.items.map((item: BanItemModel) => {
            return {
              id: item.id,
              mcid: item.mcid,
              uuid: item.uuid,
              type: 'VBan',
              reason: item.reason,
              status: item.status,
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
