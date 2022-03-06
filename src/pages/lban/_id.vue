<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12">
        <h1>{{ banType }}#{{ banId }} - {{ detail.player }}</h1>

        <v-container v-if="proofs.length > 0">
          <v-carousel cycle max-height="500px">
            <v-carousel-item
              v-for="(proof, index) in proofs"
              :key="index"
              :src="proof"
              :href="`https://storage.jaoafa.com/${proofIds[index]}`"
              target="_blank"
            />
          </v-carousel>
        </v-container>

        <v-simple-table>
          <template #default>
            <tbody>
              <tr v-for="(key_ja, key) in keys" :key="key">
                <td>
                  {{ key_ja }}
                  <code>({{ key }})</code>
                </td>
                <td v-if="key == 'banned_at' || key == 'updated_at'">
                  {{ formatDate(new Date(detail[key]), 'yyyy/MM/dd HH:mm:ss') }}
                </td>
                <td v-else-if="key == 'status'">
                  <code>{{ Boolean(detail[key]) }}</code>
                </td>
                <td v-else-if="key == 'player'">
                  <v-avatar size="32px" class="mr-2">
                    <v-img
                      :src="`https://crafatar.com/avatars/${detail['uuid']}?scale=1&overlay`"
                    />
                  </v-avatar>
                  {{ detail[key] }}
                  <v-btn
                    fab
                    x-small
                    color="#ffb41d"
                    dark
                    :to="`/${detail['uuid']}`"
                    class="ml-2"
                    title="その他のBanを見る"
                  >
                    <v-icon dark>mdi-file-document-multiple-outline</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    x-small
                    color="#ffb41d"
                    dark
                    :href="`https://users.jaoafa.com/${detail['uuid']}`"
                    title="ユーザーページを見る"
                  >
                    <v-icon dark>mdi-badge-account-horizontal-outline</v-icon>
                  </v-btn>
                </td>
                <td v-else>
                  <code>{{ detail[key] }}</code>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LBanDetail',
  data(): {
    banType: string
    banId: string
    keys: { [key: string]: string }
    detail: { [key: string]: any }
    proofs: string[]
    proofIds: string[]
  } {
    return {
      banType: 'LBan',
      banId: '',
      keys: {
        banid: '処罰番号',
        player: 'MinecraftID',
        uuid: 'MinecraftUUID',
        reason: '処罰理由',
        banned_by: '処罰者',
        banned_at: '処罰日時',
        updated_at: '情報更新日時',
      },
      detail: {
        player: '',
      },
      proofs: [],
      proofIds: [],
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

    this.banId = this.$route.params.id

    this.$recaptcha.execute('login').then((token: string) => {
      this.$axios
        .get(
          `https://api.jaoafa.com/v2/bans/details/${this.banType.toLowerCase()}/${
            this.banId
          }`,
          {
            headers: {
              'X-reCAPTCHA-Token': token,
            },
          }
        )
        .then((response: any) => {
          if (!response.data.status) {
            alert('Not Found')
            this.$router.push('/')
            return
          }
          this.banId = response.data.detail.banid
          this.detail = response.data.detail

          document.title = `${this.detail.player} - ${this.banType}#${this.banId} - jMS Bans`

          if (response.data.proofs !== null) {
            for (const proof of response.data.proofs) {
              this.$axios
                .get(`https://storage.jaoafa.com/${proof}`, {
                  responseType: 'arraybuffer',
                })
                .then((response: any) => {
                  const blob = new Blob([response.data])

                  const reader = new FileReader()
                  reader.readAsDataURL(blob)
                  reader.onload = () => {
                    this.proofs.push(window.URL.createObjectURL(blob))
                    this.proofIds.push(proof)
                  }
                })
            }
          }
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
  },
})
</script>
