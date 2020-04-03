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
    </time-stacked-bar-chart>
  </v-col>
</template>

<script>
import Inspection from '@/data/inspection.json'
import PreInspection from '@/data/pre_inspection.json'
import TimeStackedBarChart from '@/components/TimeStackedBarChart.vue'
import dayjs from 'dayjs'

export default {
  components: {
    TimeStackedBarChart
  },
  data() {
    // 検査実施日別状況
    const inspectionsGraph = [
      Inspection.datasets.map(v => v['陽性数']),
      Inspection.datasets.map(v => v['陰性数'])
    ]
    const inspectionsItems = [
      this.$t('陽性数'),
      this.$t('陰性数')
    ]
    const inspectionsLabels = Inspection.datasets.map(v => dayjs(v['検査日時']).format('MM/DD'))
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
