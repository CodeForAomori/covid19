<template>
   <v-col cols="12" md="6" class="DataCard">
      <circle-chart
        title="入院患者数と残り病床数"
        :title-id="'patients-and-sickbeds'"
        :chart-data="patientsGraph"
        :date="'2020/03/24 00:00'"
        :unit="'床'"
        :info="'総病床数'"
      />
  </v-col>
</template>

<script>
import Data from '@/data/data.json'
import formatGraph from '@/utils/formatGraph'
import CircleChart from '@/components/CircleChart'
import formatVariableGraph from '@/utils/formatVariableGraph'


export default {
  components: {
    CircleChart
  },
  data() {
    // 感染者数グラフ
    const patientsGraph = formatVariableGraph(Data.sickbeds_summary.data)

    const data = {
      Data,
      patientsGraph
    }
    return data
  }
}
</script>
