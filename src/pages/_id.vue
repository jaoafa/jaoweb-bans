<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12">
        <h1>検索結果</h1>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="bans"
          :items-per-page="15"
          :item-class="checkStatus"
        >
          <template #[`item.mcid`]="{ item }">
            <v-avatar size="28px" class="mr-2">
              <v-img
                :src="`https://crafatar.com/avatars/${item.uuid}?scale=1&overlay`"
              />
            </v-avatar>
            {{ item.mcid }}
          </template>
          <template #[`item.bannedAt`]="{ item }">
            {{ formatDate(item.bannedAt, 'yyyy/MM/dd HH:mm:ss') }}
          </template>
          <template #[`item.seeBtn`]="{ item }">
            <v-btn
              fab
              x-small
              color="#ffb41d"
              dark
              :to="`${item.type.toLowerCase()}/${item.id}`"
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
import { DataTableHeader } from 'vuetify'
import { BanItemModel, MCBansItemModel } from '~/plugins/models'

interface Ban {
  id: number
  type: 'GBan' | 'LBan' | 'EBan' | 'VBan' | 'ChatBan'
  mcid: string
  uuid: string
  reason: string
  status: boolean
  bannedAt: string
}

export default Vue.extend({
  name: 'UserBans',
  data(): {
    headers: DataTableHeader[]
    bans: Ban[]
    loading: boolean
  } {
    return {
      headers: [
        { text: 'BanType', value: 'type' },
        { text: 'BanId', value: 'id' },
        { text: 'MinecraftID', value: 'mcid' },
        { text: 'Reason', value: 'reason' },
        { text: 'BannedAt', value: 'bannedAt' },
        { text: 'See', value: 'seeBtn' },
      ],
      bans: [],
      loading: true,
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

    const userId = this.$route.params.id

    this.$recaptcha.execute('login').then((token: string) => {
      this.$axios
        .get(`https://api.jaoafa.com/v2/bans/recent/${userId}`, {
          headers: {
            'X-reCAPTCHA-Token': token,
          },
        })
        .then((response: any) => {
          if (!response.data.status) {
            alert('Not Found')
            this.$router.push('/')
            return
          }

          const data = response.data.data

          this.bans = this.bans.concat(
            data.gban.map((item: MCBansItemModel) => {
              return {
                id: item.banid,
                type: 'GBan',
                mcid: item.mcid,
                uuid: item.uuid,
                reason: item.reason,
                status: true,
                bannedAt: new Date(item.banned_at),
              }
            })
          )

          this.bans = this.bans.concat(
            data.lban.map((item: MCBansItemModel) => {
              return {
                id: item.banid,
                type: 'LBan',
                mcid: item.mcid,
                uuid: item.uuid,
                reason: item.reason,
                status: true,
                bannedAt: new Date(item.banned_at),
              }
            })
          )

          this.bans = this.bans.concat(
            data.vban.map((item: BanItemModel) => {
              return {
                id: item.id,
                type: 'VBan',
                mcid: item.mcid,
                uuid: item.uuid,
                reason: item.reason,
                status: true,
                bannedAt: new Date(item.banned_at),
              }
            })
          )

          this.bans = this.bans.concat(
            data.eban.map((item: BanItemModel) => {
              return {
                id: item.id,
                type: 'EBan',
                mcid: item.mcid,
                uuid: item.uuid,
                reason: item.reason,
                status: true,
                bannedAt: new Date(item.banned_at),
              }
            })
          )

          this.bans = this.bans.concat(
            data.chatban.map((item: BanItemModel) => {
              return {
                id: item.id,
                type: 'ChatBan',
                mcid: item.mcid,
                uuid: item.uuid,
                reason: item.reason,
                status: true,
                bannedAt: new Date(item.banned_at),
              }
            })
          )

          this.bans.sort(function (a, b) {
            if (a.bannedAt > b.bannedAt) return -1
            if (a.bannedAt < b.bannedAt) return 1
            return 0
          })

          this.loading = false
        })
        .catch((error: any) => {
          if (error.status === 404) {
            alert('Not Found')
            this.$router.push('/')
            return
          }
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
    checkStatus(item: BanItemModel): string {
      return item.status === undefined || item.status ? 'active' : 'inactive'
    },
  },
})
</script>
