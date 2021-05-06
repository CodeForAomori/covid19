<template>
  <v-col cols="12" md="6" class="DataCard">
    <confirmed-cases-card
      :title="$t('検査陽性者の状況')"
      :title-id="'details-of-confirmed-cases'"
      :date="lastUpdate"
      :url="'https://opendata.pref.aomori.lg.jp/dataset/1531.html'"
      :url-text="'出典元：青い森オープンデータカタログ'"
    >
      <confirmed-cases-table
        :aria-label="$t('検査陽性者の状況')"
        v-bind="confirmedCases"
      />
    </confirmed-cases-card>
  </v-col>
</template>

<script>
import Data from '@/data/data.json'
import attr from '@/data/_attributes.json'
import attrdate from '@/data/attributes.json'
import formatConfirmedCases from '@/utils/formatConfirmedCases'
import ConfirmedCasesCard from '@/components/ConfirmedCasesCard.vue'
import ConfirmedCasesTable from '@/components/ConfirmedCasesTable.vue'

export default {
  components: {
    ConfirmedCasesCard,
    ConfirmedCasesTable
  },
  methods: {
    async getData() {
    }
  },
  data() {
    // 検査陽性者の状況
    // const confirmedCases = formatConfirmedCases(Data.main_summary)
    const confirmedCases = {
        陽性者数: attr[0]['総計'],
        入院中: attr[0]['入院中'],
        軽症中等症: attr[0]['入院中'] - attr[0]['（うち重症）'],
        重症: attr[0]['（うち重症）'],
        宿泊療養: attr[0]['宿泊療養中'],
        自宅療養: attr[0]['自宅療養中'],
        調査中: attr[0]['入院調整中'],
        死亡: attr[0]['死亡'],
        退院: attr[0]['退院・療養解除']
    }

    const lastUpdate = attrdate.date

    const data = {
      Data,
      lastUpdate,
      confirmedCases
    }
    return data
  }
}
</script>
