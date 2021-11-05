<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col sm="6" cols="12">
        <SearchForm />
        <RecentTable :items="all" />
      </v-col>
      <v-col sm="6" cols="12">
        <v-row>
          <v-col sm="6" cols="12">
            <ban-explanation-card
              name="GBan"
              :count="count.gban"
              :explanation="explanation.gban"
            />
            <ban-explanation-card
              name="VBan"
              :count="count.vban"
              :explanation="explanation.vban"
            />
          </v-col>
          <v-col sm="6" cols="12">
            <ban-explanation-card
              name="LBan"
              :count="count.lban"
              :explanation="explanation.lban"
            />
            <ban-explanation-card
              name="EBan"
              :count="count.eban"
              :explanation="explanation.eban"
            />
          </v-col>
        </v-row>

        <ban-explanation-card
          name="ChatBan"
          :count="count.chatban"
          :explanation="explanation.chatban"
        />

        <v-card class="ma-5">
          <v-card-text>
            このWebサイトで公開されている情報は最新ではない可能性があります。
            <br />
            各種処罰に関する詳しい説明や方針は
            <a href="https://jaoafa.com/server/policies/bans">こちら</a>
            をご覧ください。
            <hr class="my-3" />
            このWebサイトで発生した不具合の報告や意見・提案は
            <a href="https://github.com/jaoafa/jaoweb-bans/issues/new">
              GitHub の Issue
            </a>
            にてお願いいたします。
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import BanExplanationCard from '../components/BanExplanationCard.vue'
import {
  $banDescription,
  BanDescriptionModel,
} from '../plugins/banDescriptions'
import { MCBansItemModel, BanItemModel } from '~//plugins/models'
import { RecentItemModel } from '@/components/RecentTable.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { BanExplanationCard },
  data(): {
    all: RecentItemModel[]
    count: {
      gban: number | null
      lban: number | null
      vban: number | null
      chatban: number | null
      eban: number | null
    }
    explanation: BanDescriptionModel
  } {
    return {
      all: [],
      count: {
        gban: null,
        lban: null,
        vban: null,
        chatban: null,
        eban: null,
      },
      explanation: $banDescription,
    }
  },
  head() {
    return {
      title: 'Top',
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
        .get('https://api.jaoafa.com/v2/bans/recent/mcbans', {
          headers: {
            'X-reCAPTCHA-Token': token,
          },
        })
        .then((response: any) => {
          this.count.gban = response.data.count.gban
          this.count.lban = response.data.count.lban

          this.all = this.all.concat(
            response.data.items.gban.map((item: MCBansItemModel) => {
              return {
                id: item.banid,
                mcid: item.mcid,
                uuid: item.uuid,
                type: 'GBan',
                reason: item.reason,
                bannedAt: new Date(item.banned_at),
              }
            })
          )
          this.all = this.all.concat(
            response.data.items.lban.map((item: MCBansItemModel) => {
              return {
                id: item.banid,
                mcid: item.mcid,
                uuid: item.uuid,
                type: 'LBan',
                reason: item.reason,
                bannedAt: new Date(item.banned_at),
              }
            })
          )
          this.all.sort(function (a, b) {
            if (a.bannedAt > b.bannedAt) return -1
            if (a.bannedAt < b.bannedAt) return 1
            return 0
          })
        })
        .catch((error: any) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
    })

    this.$recaptcha.execute('login').then((token: string) => {
      this.$axios
        .get('https://api.jaoafa.com/v2/bans/recent/vban', {
          headers: {
            'X-reCAPTCHA-Token': token,
          },
        })
        .then((response: any) => {
          this.count.vban = response.data.count

          this.all = this.all.concat(
            response.data.items.map((item: BanItemModel) => {
              return {
                id: item.id,
                mcid: item.mcid,
                uuid: item.uuid,
                type: 'VBan',
                reason: item.reason,
                bannedAt: new Date(item.banned_at),
              }
            })
          )
          this.all.sort(function (a, b) {
            if (a.bannedAt > b.bannedAt) return -1
            if (a.bannedAt < b.bannedAt) return 1
            return 0
          })
        })
        .catch((error: any) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
    })

    this.$recaptcha.execute('login').then((token: string) => {
      this.$axios
        .get('https://api.jaoafa.com/v2/bans/recent/eban', {
          headers: {
            'X-reCAPTCHA-Token': token,
          },
        })
        .then((response: any) => {
          this.count.eban = response.data.count

          this.all = this.all.concat(
            response.data.items.map((item: BanItemModel) => {
              return {
                id: item.id,
                mcid: item.mcid,
                uuid: item.uuid,
                type: 'EBan',
                reason: item.reason,
                bannedAt: new Date(item.banned_at),
              }
            })
          )
          this.all.sort(function (a, b) {
            if (a.bannedAt > b.bannedAt) return -1
            if (a.bannedAt < b.bannedAt) return 1
            return 0
          })
        })
        .catch((error: any) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
    })

    this.$recaptcha.execute('login').then((token: string) => {
      this.$axios
        .get('https://api.jaoafa.com/v2/bans/recent/chatban', {
          headers: {
            'X-reCAPTCHA-Token': token,
          },
        })
        .then((response: any) => {
          this.count.chatban = response.data.count

          this.all = this.all.concat(
            response.data.items.map((item: BanItemModel) => {
              return {
                id: item.id,
                mcid: item.mcid,
                uuid: item.uuid,
                type: 'ChatBan',
                reason: item.reason,
                bannedAt: new Date(item.banned_at),
              }
            })
          )
          this.all.sort(function (a, b) {
            if (a.bannedAt > b.bannedAt) return -1
            if (a.bannedAt < b.bannedAt) return 1
            return 0
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
