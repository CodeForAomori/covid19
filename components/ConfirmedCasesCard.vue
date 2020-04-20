<template>
  <data-view :title="title" :title-id="titleId" :date="date" :url="url" :url-text="urlText">
    <template v-slot:button>
      <p :class="$style.note">
        <!-- {{ $t('（注）チャーター機帰国者、クルーズ船乗客等は含まれていない') }} -->
        ※ 「軽症・中等症」、「重症」の件数は公表されていないため0として表示しています。
      </p>
    </template>
    <slot />
  </data-view>
</template>

<style lang="scss" module>
.note {
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 12px;
  color: $gray-3;
}
</style>

<script lang="ts">
import Vue from 'vue'
import DataView from '@/components/DataView.vue'

export default Vue.extend({
  components: { DataView },
  props: {
    title: {
      type: String,
      default: ''
    },
    titleId: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    urlText: {
      type: String,
      default: ''
    }
  }
})
</script>
