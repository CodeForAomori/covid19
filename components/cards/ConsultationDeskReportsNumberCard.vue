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
import ConsultDataset from '@/data/_consult.json'
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart.vue'
import dayjs from 'dayjs'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 帰国者・接触者 電話相談センター 相談件数
    const querentsGraph = formatGraph(ConsultDataset.map(v => ({
      '日付': dayjs(v['受付_年月日'].replace(/[年月]/g, '/').replace(/日/g, '')).format('YYYY/MM/DD'),
      '曜日': '',
      '9-17時': Number(v['相談件数']),
      '17-翌9時': Number(v['相談件数']),
      'date': dayjs(v['受付_年月日'].replace(/[年月]/g, '/').replace(/日/g, '')).format('YYYY/MM/DD'),
      'w': 0,
      'short_date': dayjs(v['受付_年月日'].replace(/[年月]/g, '/').replace(/日/g, '')).format('YYYY/MM/DD'),
      '小計': Number(v['相談件数'])
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
