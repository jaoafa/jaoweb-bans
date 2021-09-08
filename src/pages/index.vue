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
            <v-card class="ma-5" :loading="count.gban == null">
              <v-card-title>GBan</v-card-title>
              <v-card-subtitle
                v-text="count.gban != null ? count.gban + ' 件' : ''"
              />
              <v-card-actions>
                <v-btn
                  icon
                  @click="explanation.gban.show = !explanation.gban.show"
                >
                  <v-icon>
                    {{
                      explanation.gban.show
                        ? 'mdi-chevron-up'
                        : 'mdi-chevron-down'
                    }}
                  </v-icon>
                </v-btn>
                <v-spacer />

                <v-btn fab x-small dark depressed color="#ffb41d" to="/gban/">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="explanation.gban.show">
                  <v-divider />

                  <v-card-text v-text="explanation.gban.text" />
                </div>
              </v-expand-transition>
            </v-card>

            <v-card class="ma-5" :loading="count.vban == null">
              <v-card-title>VBan</v-card-title>
              <v-card-subtitle
                v-text="count.vban != null ? count.vban + ' 件' : ''"
              />
              <v-card-actions>
                <v-btn
                  icon
                  @click="explanation.vban.show = !explanation.vban.show"
                >
                  <v-icon>
                    {{
                      explanation.vban.show
                        ? 'mdi-chevron-up'
                        : 'mdi-chevron-down'
                    }}
                  </v-icon>
                </v-btn>
                <v-spacer />

                <v-btn fab x-small dark depressed color="#ffb41d" to="/vban/">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="explanation.vban.show">
                  <v-divider />

                  <v-card-text v-text="explanation.vban.text" />
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
          <v-col sm="6" cols="12">
            <v-card class="ma-5" :loading="count.lban == null">
              <v-card-title>LBan</v-card-title>
              <v-card-subtitle
                v-text="count.lban != null ? count.lban + ' 件' : ''"
              />
              <v-card-actions>
                <v-btn
                  icon
                  @click="explanation.lban.show = !explanation.lban.show"
                >
                  <v-icon>
                    {{
                      explanation.lban.show
                        ? 'mdi-chevron-up'
                        : 'mdi-chevron-down'
                    }}
                  </v-icon>
                </v-btn>
                <v-spacer />

                <v-btn fab x-small dark depressed color="#ffb41d" to="/lban/">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="explanation.lban.show">
                  <v-divider />

                  <v-card-text v-text="explanation.lban.text" />
                </div>
              </v-expand-transition>
            </v-card>

            <v-card class="ma-5" :loading="count.eban == null">
              <v-card-title>EBan</v-card-title>
              <v-card-subtitle
                v-text="count.eban != null ? count.eban + ' 件' : ''"
              />
              <v-card-actions>
                <v-btn
                  icon
                  @click="explanation.eban.show = !explanation.eban.show"
                >
                  <v-icon>
                    {{
                      explanation.eban.show
                        ? 'mdi-chevron-up'
                        : 'mdi-chevron-down'
                    }}
                  </v-icon>
                </v-btn>
                <v-spacer />

                <v-btn fab x-small dark depressed color="#ffb41d" to="/eban/">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="explanation.eban.show">
                  <v-divider />

                  <v-card-text v-text="explanation.eban.text" />
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>

        <v-card class="mx-5" :loading="count.chatban == null">
          <v-card-title>ChatBan</v-card-title>
          <v-card-subtitle
            v-text="count.chatban != null ? count.chatban + ' 件' : ''"
          />
          <v-card-actions>
            <v-btn
              icon
              @click="explanation.chatban.show = !explanation.chatban.show"
            >
              <v-icon>
                {{
                  explanation.chatban.show
                    ? 'mdi-chevron-up'
                    : 'mdi-chevron-down'
                }}
              </v-icon>
            </v-btn>
            <v-spacer />

            <v-btn fab x-small dark depressed color="#ffb41d" to="/chatban/">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="explanation.chatban.show">
              <v-divider />

              <v-card-text v-text="explanation.chatban.text" />
            </div>
          </v-expand-transition>
        </v-card>

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
import { RecentItemModel } from '@/src/components/RecentTable.vue'

interface MCBansItemModel {
  banid: number
  mcid: string
  uuid: string
  reason: string
  // eslint-disable-next-line camelcase
  banned_at: string
}
interface VBanItemModel {
  id: number
  mcid: string
  uuid: string
  reason: string
  // eslint-disable-next-line camelcase
  banned_at: string
}
interface BanItemModel {
  id: number
  mcid: string
  uuid: string
  reason: string
  // eslint-disable-next-line camelcase
  banned_at: string
}

export default Vue.extend({
  data(): {
    all: RecentItemModel[]
    count: {
      gban: number | null
      lban: number | null
      vban: number | null
      chatban: number | null
      eban: number | null
    }
    explanation: {
      gban: {
        show: boolean
        text: string
      }
      lban: {
        show: boolean
        text: string
      }
      vban: {
        show: boolean
        text: string
      }
      chatban: {
        show: boolean
        text: string
      }
      eban: {
        show: boolean
        text: string
      }
    }
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
      explanation: {
        gban: {
          show: false,
          text: 'GBan(Global Ban)とは、MCBansプラグインが提供するグローバルなBanです。jao Minecraft Serverにログインすることができなくなり、MCBansプラグインを導入している他のサーバにも処罰内容が公開・通知され、違反を起こすと下がる数値 Reputation の設定に応じてログインを制限することができます。',
        },
        lban: {
          show: false,
          text: 'LBan(Local Ban)とは、MCBansプラグインが提供するローカルなBanです。jao Minecraft Serverにログインすることができなくなり、MCBansプラグインを導入している他のサーバにも処罰内容が公開・通知されますが、Reputation には影響しません。',
        },
        vban: {
          show: false,
          text: 'VBan(Vanila Ban)とはMinecraftの元々唯一のBan機能であるローカルBanのことです。他サーバへの影響は一切ありませんが、jao Minecraft Serverにログインすることができなくなります。',
        },
        chatban: {
          show: false,
          text: 'ChatBanとは、jao Minecraft Server独自のBan機能です。他サーバのMuteと同様、チャットが一切できなくなります。',
        },
        eban: {
          show: false,
          text: 'EBan(Eden Ban)とは、jao Minecraft Server独自のBan機能です。特定のエリアから出ることができなくなる他、ブロックの編集やアイテムの使用ができなくなります。',
        },
      },
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
        .then((response) => {
          this.count.gban = response.data.count.gban
          this.count.lban = response.data.count.lban

          this.all = this.all.concat(
            response.data.items.gban.map((item: MCBansItemModel) => {
              return {
                id: item.banid,
                mcid: item.mcid,
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
        .catch((error) => {
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
        .then((response) => {
          this.count.vban = response.data.count

          this.all = this.all.concat(
            response.data.items.map((item: VBanItemModel) => {
              return {
                id: item.id,
                mcid: item.mcid,
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
        .catch((error) => {
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
        .then((response) => {
          this.count.eban = response.data.count

          this.all = this.all.concat(
            response.data.items.map((item: BanItemModel) => {
              return {
                id: item.id,
                mcid: item.mcid,
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
        .catch((error) => {
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
        .then((response) => {
          this.count.chatban = response.data.count

          this.all = this.all.concat(
            response.data.items.map((item: BanItemModel) => {
              return {
                id: item.id,
                mcid: item.mcid,
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
        .catch((error) => {
          console.error(error)
        })
    })
  },
})
</script>
