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
    >
      <template v-slot:description>
        <ul>
          <li>
            {{ $t('※ 陽性患者確認数は、青い森オープンデータカタログに東奥日報社の独自調査による最新データを反映しています。') }}
          </li>
        </ul>
      </template>
    </time-bar-chart>
  </v-col>
</template>

<script>
import InspectionDataset from '@/data/positive.json'
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart.vue'
import dayjs from 'dayjs'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 感染者数グラフ
    const patientsGraph = formatGraph(InspectionDataset['values']
    .slice(1)
    .filter(v => v[0])
      .map(v => ({
      '日付': dayjs(v[0].replace(/[年月]/g, '/').replace(/日/g, '')).format('YYYY-MM-DD'),
      '小計': Number(v[2])
      })
    ), false)

    //更新日は最後のデータの日付とする
    const date = InspectionDataset['values'][InspectionDataset['values'].length-1][0].replace(/[年月]/g, '/').replace(/日/g, '')
;
    const data = {
      date,
      patientsGraph
    }
    return data
  }
}
</script>
