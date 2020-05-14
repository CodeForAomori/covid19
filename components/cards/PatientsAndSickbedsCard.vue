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
        :url="'https://www.stopcovid19.jp/'"
        :url-text="'出典元：COVID-19 Japan'"
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
    const patientsGraph = formatVariableGraph(Data.sickbeds_summary.data)
    const descriptions = [
        '病床数は新型コロナウイルス感染者専用ではなく、他の感染症でも利用されるため、あくまで現時点での目安となります。病床数には宿泊施設を含んでいません。',
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
