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
    // 検査実施日別状況
    const inspectionsGraph = [
      InspectionDataset.map(v => Number(v['陽性数'])),
      InspectionDataset.map(v => Number(v['陰性数']))
    ]
    const inspectionsItems = [
      this.$t('陽性数'),
      this.$t('陰性数')
    ]
    const inspectionsLabels = InspectionDataset.map(v => dayjs(v['検査日時'].replace(/[年月]/g, '/').replace(/日/g, '')).format('MM/DD'))
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
