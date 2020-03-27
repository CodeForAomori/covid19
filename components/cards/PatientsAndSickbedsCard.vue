<template>
   <v-col cols="12" md="6" class="DataCard">
      <circle-chart
        title="入院患者数と残り病床数"
        :title-id="'patients-and-sickbeds'"
        :chart-data="patientsGraph"
        :date="Data.sickbeds_summary.last_update"
        :unit="'床'"
        :info="'総病床数'"
      />
  </v-col>
</template>

<script>
import Data from '@/data/data.json'
import CircleChart from '@/components/CircleChart'
import formatVariableGraph from '@/utils/formatVariableGraph'


export default {
  components: {
    CircleChart
  },
  data() {
    const patientsGraph = formatVariableGraph(Data.sickbeds_summary.data)

    const data = {
      Data,
      patientsGraph
    }
    return data
  }
}
</script>
