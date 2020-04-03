<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('帰国者・接触者相談件数')"
      :title-id="'number-of-reports-to-covid19-consultation-desk'"
      :chart-id="'time-bar-chart-querents'"
      :chart-data="querentsGraph"
      :date="date"
      :unit="$t('件.reports')"
      :url="'https://opendata.pref.aomori.lg.jp/dataset/1531.html'"
      :url-text="'出典元：青い森オープンデータカタログ'"
    />
    <!-- 件.reports = 窓口相談件数 -->
  </v-col>
</template>

<script>
import Consult from '@/data/consult.json'
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart.vue'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 帰国者・接触者 電話相談センター 相談件数
    const querentsGraph = formatGraph(Consult.datasets.map(v => ({
      '日付': v['受付_年月日'],
      '曜日': '',
      '9-17時': v['相談件数'],
      '17-翌9時': v['相談件数'],
      'date': v['受付_年月日'],
      'w': 0,
      'short_date': v['受付_年月日'],
      '小計': v['相談件数']
    })), false)
    const date = Consult.date

    const data = {
      date,
      querentsGraph
    }
    return data
  }
}
</script>
