<template>
  <v-col cols="12" md="6" class="DataCard">
    <data-view
      :title="$t('検査件数')"
      :title-id="'number-of-inspection-persons'"
      :date="Data.inspection_status_simple.date"
    >
      <div class="InspectionPersionsDetails">
        <span class="InspectionPersionsDetails-Value">
          {{Data.inspection_status_simple.value}}
        </span>

        <span class="InspectionPersionsDetails-Text">
          {{ $t('人') }}
        </span>
      </div>
    </data-view>
  </v-col>
</template>

<script>
import Data from '@/data/data.json'
import DataView from '@/components/DataView.vue'

export default {
  components: {
    DataView
  },
  data() {
    return {
      Data
    }
  }
}
</script>

<style lang="scss" scoped>
.InspectionPersionsDetails {
  $text-font-size: 36px;
  $value-font-size: $text-font-size * 1.5;

  text-align: center;

  &-Value {
    font-size: $value-font-size;
    font-weight: bold;
  }
  &-Text {
    font-size: $text-font-size;
  }
}
</style>
