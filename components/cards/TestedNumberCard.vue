<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-stacked-bar-chart
      :title="$t('検査実施件数')"
      :title-id="'number-of-tested'"
      :chart-id="'time-stacked-bar-chart-inspections'"
      :chart-data="inspectionsGraph"
      :chart-data-offset="offset"
      :date="date"
      :items="inspectionsItems"
      :labels="inspectionsLabels"
      :unit="$t('件.tested')"
      :data-labels="inspectionsDataLabels"
      :url="'https://opendata.pref.aomori.lg.jp/dataset/1531.html'"
      :url-text="'出典元：青い森オープンデータカタログ'"
    >
      <template v-slot:additionalNotes>
        ※3/22以前の検査件数は青森県庁のHPに公表されていた累計値をプラスしています。
      </template>
    </time-stacked-bar-chart>
  </v-col>
</template>

<script>
import Inspection from '@/data/inspection.json'
import InspectionDataset from '@/data/_inspection.json'
import PreInspection from '@/data/pre_inspection.json'
import TimeStackedBarChart from '@/components/TimeStackedBarChart.vue'
import dayjs from 'dayjs'

export default {
  components: {
    TimeStackedBarChart
  },
  data() {
    // 元データが逆順になったので反転する
    const dataset = InspectionDataset.slice()
    dataset.sort((a, b) => {
      const da = dayjs(a['検査日時'].replace(/[年月]/g, '/').replace(/日/g, ''))
      const db = dayjs(b['検査日時'].replace(/[年月]/g, '/').replace(/日/g, ''))

      if (da < db) {
        return -1
      } else if (da > db) {
        return 1
      } else {
        return 0
      }
    })

    // 検査実施日別状況
    const inspectionsGraph = [
      dataset.map(v => Number(v['陽性数'])),
      dataset.map(v => Number(v['陰性数']))
    ]
    const inspectionsItems = [
      this.$t('陽性数'),
      this.$t('陰性数')
    ]
    const inspectionsLabels = dataset
        .map(v => v['検査日時'])
        .filter(v => v.match(/^\d+年\d+月\d+日$/))
        .map(v => dayjs(v.replace(/[年月]/g, '/').replace(/日/g, '')).format('MM/DD'))
    const inspectionsDataLabels = [
      this.$t('陽性数'),
      this.$t('陰性数')
    ]
    const date = Inspection.date
    const offset = [PreInspection.dataset['陽性'], PreInspection.dataset['陰性']]

    const data = {
      date,
      offset,
      inspectionsGraph,
      inspectionsItems,
      inspectionsLabels,
      inspectionsDataLabels
    }
    return data
  }
}
</script>
