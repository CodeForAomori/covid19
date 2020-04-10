<template>
  <v-col cols="12" md="6" class="DataCard">
    <data-table
      :title="$t('陽性患者の属性')"
      :title-id="'attributes-of-confirmed-cases'"
      :chart-data="patientsTable"
      :chart-option="{}"
      :date="date"
      :info="sumInfoOfPatients"
      :url="'https://opendata.pref.aomori.lg.jp/dataset/1531.html'"
      :url-text="'出典元：青い森オープンデータカタログ'"
      :note="'※現在「退院」のデータは県から提供されていないので反映していません。'"
    />
  </v-col>
</template>

<script>
import Patients from '@/data/patients.json'
import PatientsDataset from '@/data/_patients.json'
import Inspection from '@/data/inspection.json'
import InspectionDataset from '@/data/_inspection.json'
import formatGraph from '@/utils/formatGraph'
import formatTable from '@/utils/formatTable'
import DataTable from '@/components/DataTable.vue'
import dayjs from 'dayjs'

export default {
  components: {
    DataTable
  },
  data() {
    // 日本語の年月日を日時データに変換する
    const convert_day = v => dayjs(v.replace(/[年月]/g, '/').replace(/日/g, ''))

    // 感染者数グラフ
    const patientsGraph = formatGraph(InspectionDataset.filter(v => v['検査日時']).map(v => ({
      '日付': dayjs(v['検査日時'].replace(/[年月]/g, '/').replace(/日/g, '')).format('YYYY-MM-DDTHH:mm:ss.000z'),
      '小計': Number(v['陽性数'])
    })), false)

    // 感染者数
    const patientsTable = formatTable(PatientsDataset.filter(v => v['公表_年月日']).map(v => ({
      "リリース日": convert_day(v['公表_年月日']).format('YYYY-MM-DD'),
      "居住地": v['居住地'],
      "年代": v['年代'],
      "性別": v['性別'],
      "退院": null,
      "date": convert_day(v['判明_年月日']).format('YYYY-MM-DD')
    })))

    const sumInfoOfPatients = {
      lText: patientsGraph[
        patientsGraph.length - 1
      ].cumulative.toLocaleString(),
      sText: this.$t('{date}の累計', {
        date: patientsGraph[patientsGraph.length - 1].label
      }),
      unit: this.$t('人')
    }

    // 陽性患者の属性 ヘッダー翻訳
    for (const header of patientsTable.headers) {
      header.text =
        header.value === '退院' ? this.$t('退院※') : this.$t(header.value)
    }
    // 陽性患者の属性 中身の翻訳
    for (const row of patientsTable.datasets) {
      row['居住地'] = this.$t(row['居住地'])
      row['性別'] = this.$t(row['性別'])
      row['退院'] = this.$t(row['退院'])

      if (row['年代'] === '10歳未満') {
        row['年代'] = this.$t('10歳未満')
      } else {
        const age = row['年代'].substring(0, 2)
        row['年代'] = this.$t('{age}代', { age })
      }
    }

    const date = Patients.date

    const data = {
      date,
      patientsTable,
      sumInfoOfPatients
    }
    return data
  }
}
</script>
