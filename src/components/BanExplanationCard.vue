<template>
  <v-card class="ma-5" :loading="count == null">
    <v-card-title>
      {{ name }}
      <v-spacer />
      <v-chip v-if="isDeprecated" color="red lighten-1" dark>
        <v-icon class="mx-1">mdi-alert-circle-outline</v-icon>
        廃止
      </v-chip>
    </v-card-title>
    <v-card-subtitle v-text="count != null ? count + ' 件' : ''" />
    <v-card-actions>
      <v-btn icon @click="explanationShowing = !explanationShowing">
        <v-icon>
          {{ explanationShowing ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
      </v-btn>
      <v-spacer />

      <v-btn
        fab
        x-small
        dark
        depressed
        color="#ffb41d"
        :to="`/${name.toLowerCase()}/`"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="explanationShowing">
        <v-divider />

        <v-card-text v-text="explanation" />
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'BanExplanationCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    isDeprecated: {
      type: Boolean,
      required: false,
    },
    count: {
      type: Number,
      required: false,
      default: null,
    },
    explanation: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    explanationShowing: false,
  }),
})
</script>
