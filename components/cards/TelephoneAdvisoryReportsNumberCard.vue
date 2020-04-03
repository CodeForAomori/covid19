<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('新型コロナコールセンター相談件数')"
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
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart.vue'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 相談件数
    const contactsGraph = formatGraph(ConsultCallCenter.datasets.map(v => ({
      '日付': v['受付_年月日'],
      '曜日': "",
      '9-13時': v['相談件数(対応)'],
      '13-17時': v['相談件数(対応)'],
      '17-21時': v['相談件数(対応)'],
      'date': v['受付_年月日'],
      'w': 0,
      'short_date': v['受付_年月日'],
      '小計': v['相談件数(対応)']
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
