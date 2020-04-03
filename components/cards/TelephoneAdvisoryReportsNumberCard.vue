<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('コールセンター相談件数')"
      :title-id="'number-of-reports-to-covid19-telephone-advisory-center'"
      :chart-id="'time-bar-chart-contacts'"
      :chart-data="contactsGraph"
      :date="date"
      :unit="$t('件.reports')"
      :url="'https://opendata.pref.aomori.lg.jp/dataset/1531.html'"
      :url-text="'出典元：青い森オープンデータカタログ'"
    />
    <!-- 件.reports = 窓口相談件数 -->
  </v-col>
</template>

<script>
import ConsultCallCenter from '@/data/consult_call_center.json'
import ConsultCallCenterDataset from '@/data/_consult_call_center.json'
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart.vue'
import dayjs from 'dayjs'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 相談件数
    const contactsGraph = formatGraph(ConsultCallCenterDataset.filter(v => v['受付_年月日']).map(v => ({
      '日付': dayjs(v['受付_年月日'].replace(/[年月]/g, '/').replace(/日/g, '')).format('YYYY/MM/DD'),
      '曜日': "",
      '9-13時': Number(v['相談件数(対応)']),
      '13-17時': Number(v['相談件数(対応)']),
      '17-21時': Number(v['相談件数(対応)']),
      'date': dayjs(v['受付_年月日'].replace(/[年月]/g, '/').replace(/日/g, '')).format('YYYY/MM/DD'),
      'w': 0,
      'short_date': dayjs(v['受付_年月日'].replace(/[年月]/g, '/').replace(/日/g, '')).format('YYYY/MM/DD'),
      '小計': Number(v['相談件数(対応)'])
    })), false)

    // 更新日時
    const date = ConsultCallCenter.date

    const data = {
      date,
      contactsGraph
    }
    return data
  }
}
</script>
