<template>
  <v-col cols="12" md="6" class="DataCard">
    <confirmed-cases-card
      :title="$t('検査陽性者の状況')"
      :title-id="'details-of-confirmed-cases'"
      :date="lastUpdate"
    >
      <confirmed-cases-table
        :aria-label="$t('検査陽性者の状況')"
        v-bind="confirmedCases"
      />
    </confirmed-cases-card>
  </v-col>
</template>

<script>
import Data from '@/data/data.json'
import formatConfirmedCases from '@/utils/formatConfirmedCases'
import ConfirmedCasesCard from '@/components/ConfirmedCasesCard.vue'
import ConfirmedCasesTable from '@/components/ConfirmedCasesTable.vue'

export default {
  components: {
    ConfirmedCasesCard,
    ConfirmedCasesTable
  },
  methods: {
    async getData() {
      //検査陽性者の状況を外部APIから取得して上書きする
      let json = await this.$axios.$get('https://www.stopcovid19.jp/data/covid19japan.json')
      const data = {
        検査実施人数: 0,
        陽性物数: json['area'][1]['npatients'],
        入院中: json['area'][1]['ncurrentpatients'],
        軽症中等症: 0,
        重症: 0,
        死亡: json['area'][1]['ndeaths'],
        退院: json['area'][1]['nexits']
      }
      this.confirmedCases = data;
      //更新日
      this.lastUpdate = json['lastUpdate']
    }
  },
  data() {
    // 検査陽性者の状況
    // const confirmedCases = formatConfirmedCases(Data.main_summary)
    // 読み込み前は値をゼロでセットしておく
    let confirmedCases = {
      検査実施人数: 0,
      陽性物数: 0,
      入院中: 0,
      軽症中等症: 0,
      重症: 0,
      死亡: 0,
      退院: 0
    }
    // 外部APIから取得した値で上書きする
    this.getData()

    const lastUpdate = ''

    const data = {
      Data,
      lastUpdate,
      confirmedCases
    }
    return data
  }
}
</script>
