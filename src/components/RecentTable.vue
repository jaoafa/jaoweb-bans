<template>
  <div class="recent-container ma-5">
    <v-simple-table>
      <template #default>
        <thead>
          <tr>
            <th class="text-left">MinecraftID</th>
            <th class="text-left">Type</th>
            <th class="text-left">BannedAt</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items.slice(0, 15)"
            :key="item.type + '-' + item.id"
          >
            <td>{{ item.mcid }}</td>
            <td>{{ item.type }}</td>
            <td>{{ formatDate(item.bannedAt, 'yyyy/MM/dd HH:mm:ss') }}</td>
            <td>
              <v-btn
                fab
                x-small
                color="#ffb41d"
                dark
                :to="item.type.toLowerCase() + '/' + item.id"
              >
                <v-icon dark>mdi-chevron-right</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line import/named
import Vue, { PropType } from 'vue'

export interface RecentItemModel {
  id: number
  mcid: string
  type: string
  reason: string
  bannedAt: Date
}

export default Vue.extend({
  name: 'RecentTable',
  props: {
    items: {
      type: Array as PropType<RecentItemModel[]>,
      default: () => [],
      required: true,
    },
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
