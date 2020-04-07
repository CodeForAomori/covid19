<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('陽性患者確認数')"
      :title-id="'number-of-confirmed-cases'"
      :chart-id="'time-bar-chart-patients'"
      :chart-data="patientsGraph"
      :date="date"
      :unit="$t('人')"
      :url="'https://opendata.pref.aomori.lg.jp/dataset/1531.html'"
      :url-text="'出典元：青い森オープンデータカタログ'"
    />
  </v-col>
</template>

<script>
import Inspection from '@/data/inspection.json'
import InspectionDataset from '@/data/_inspection.json'
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart.vue'
import dayjs from 'dayjs'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 感染者数グラフ
    const patientsGraph = formatGraph(InspectionDataset.filter(v => v['検査日時']).map(v => ({
      '日付': dayjs(v['検査日時'].replace(/[年月]/g, '/').replace(/日/g, '')).format('YYYY-MM-DDTHH:mm:ss.000z'),
      '小計': Number(v['陽性数'])
    })), false)
    const date = Inspection.date
    console.log()

    const data = {
      date,
      patientsGraph
    }
    return data
  }
}
</script>
