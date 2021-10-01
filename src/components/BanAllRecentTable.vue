<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="15"
    :item-class="checkStatus"
    class="elevation-1"
  >
    <template #[`item.bannedAt`]="{ item }">
      {{ formatDate(item.bannedAt, 'yyyy/MM/dd HH:mm:ss') }}
    </template>
    <template #[`item.icon`]="{ item }">
      <v-img
        width="40"
        :src="`https://crafatar.com/avatars/${item.uuid}?scale=1&overlay`"
      />
    </template>
    <template #[`item.seeBtn`]="{ item }">
      <v-btn
        fab
        x-small
        color="#ffb41d"
        dark
        :to="`/${item.type.toLowerCase()}/${item.id}`"
      >
        <v-icon dark>mdi-chevron-right</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
// eslint-disable-next-line import/named
import Vue, { PropType } from 'vue'
import { BanItemModel } from '~/plugins/models'
export default Vue.extend({
  props: {
    items: {
      type: Array as PropType<BanItemModel[]>,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        { text: '', value: 'icon' },
        { text: 'BanId', value: 'id' },
        { text: 'MinecraftID', value: 'mcid' },
        { text: 'Reason', value: 'reason' },
        { text: 'BannedAt', value: 'bannedAt' },
        { text: 'See', value: 'seeBtn' },
      ],
    }
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

<style lang="scss">
.inactive {
  background-color: darkgray !important;
}
</style>
