<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12">
        <h1>LBan 一覧</h1>
        <p>{{ explanation.lban }}</p>

        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="15"
          class="elevation-1"
        >
          <template #[`item.bannedAt`]="{ item }">
            {{ formatDate(item.bannedAt, 'yyyy/MM/dd HH:mm:ss') }}
          </template>
          <template #[`item.seeBtn`]="{ item }">
            <v-btn
              fab
              x-small
              color="#ffb41d"
              dark
              :to="item.type.toLowerCase() + '/' + item.id"
            >
              <v-icon dark>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { MCBansItemModel } from '../index.vue'
import { $banDescription } from '../../plugins/banDescriptions'

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
        .get('https://api.jaoafa.com/v2/bans/recent/mcbans?all_items=true', {
          headers: {
            'X-reCAPTCHA-Token': token,
          },
        })
        .then((response) => {
          this.items = response.data.items.lban.map((item: MCBansItemModel) => {
            return {
              id: item.banid,
              mcid: item.mcid,
              type: 'LBan',
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
  methods: {
    formatDate(date: Date, format: string): string {
      format = format.replace(/yyyy/g, String(date.getFullYear()))
      format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
      format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
      format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
      format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
      format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
      format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
      return format
    },
  },
})
</script>
