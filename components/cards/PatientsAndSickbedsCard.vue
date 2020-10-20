<template>
   <v-col cols="12" md="6" class="DataCard">
      <circle-chart
        title="入院患者数と残り病床数"
        :title-id="'patients-and-sickbeds'"
        :chart-data="patientsGraph"
        :date="Data.sickbeds_summary.last_update"
        :unit="'床'"
        :info="'総病床数'"
        :descriptions="descriptions"
        :url="'https://www.mhlw.go.jp/stf/seisakunitsuite/newpage_00023.html'"
        :url-text="'出典元：厚生労働省'"
      />
  </v-col>
</template>

<script>
import Data from '@/data/sickbeds_summary.json'
import CircleChart from '@/components/CircleChart'
import formatVariableGraph from '@/utils/formatVariableGraph'


export default {
  components: {
    CircleChart
  },
  data() {
    const sickbeds_data = Data.sickbeds_summary.data
    const a = sickbeds_data['入院患者受入確保病床'] || 0
    const b = sickbeds_data['宿泊施設受入可能室数'] || 0

    // 不要データを削除
    delete sickbeds_data['入院患者受入確保病床']
    delete sickbeds_data['宿泊施設受入可能室数']

    const patientsGraph = formatVariableGraph(sickbeds_data)
    const descriptions = [
        '病床数は新型コロナウイルス感染者専用ではなく、他の感染症でも利用されるため、あくまで現時点での目安となります。',
        `病床数は感染者用病床${a}床、宿泊療養のための宿泊施設${b}床の合計値となっています。`
    ];

    const data = {
      Data,
      patientsGraph,
      descriptions
    }
    return data
  }
}
</script>
