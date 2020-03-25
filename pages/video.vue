<template>
  <div class="Video">
    <page-header class="Video-Heading-Title">
      {{ $t('コロナウイルス対策動画') }}
    </page-header>

    <div class="Video-File">
      <a
        href="https://www.youtube.com/watch?v=WRhp0ZGVh0U"
        target="_blank"
        rel="noopener"
      >
        <img
          src="https://img.youtube.com/vi/WRhp0ZGVh0U/hqdefault.jpg"
          alt="やってみよう！新型コロナウイルス感染症対策　みんなでできること"
        >
        <div>やってみよう！新型コロナウイルス感染症対策　みんなでできること</div>
      </a>
    </div>

    <div class="Video-File">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/lViN9C_BS-0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <a
        href="https://www.youtube.com/watch?v=lViN9C_BS-0"
        target="_blank"
        rel="noopener"
      >
        <div>感染症予防のための正しい手洗い方法</div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TranslateResult } from 'vue-i18n'
import CovidIcon from '@/static/covid.svg'
import PageHeader from '@/components/PageHeader.vue'

export default Vue.extend({
  components: {
    CovidIcon,
    PageHeader
  },
  head(): any {
    const title: TranslateResult = this.$t(
      '新型コロナウイルス感染症が心配なときに'
    )
    return {
      title
    }
  }
})
</script>

<style lang="scss" scoped>
.Video {
  margin-bottom: 20px;

  &-Heading {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    > svg {
      width: 30px;
      height: 30px;

      > path:not(:first-of-type) {
        fill: $gray-2;
      }
    }

    &-Title {
      margin-left: 8px;
    }
  }

  &-Card-Button {
    @include button-text('md');
    @include font-size(20);

    font-weight: bold;
    display: inline-block;
    text-decoration: none;
    color: $green-1 !important;

    &-Wrapper {
      text-align: center;
    }

    &:hover {
      color: $white !important;
    }

    &-ExternalLinkIcon {
      margin-left: 2px;
      color: $green-1 !important;
    }
  }

  &-PullRight {
    margin: 0 0 0 auto;
  }

  &-File {
    margin: 24px 8px;

    a {
      color: hsl(0, 0, 10);
    }
  }
}

@include largerThan($medium) {
  .only-sp {
    display: none;
  }

  .only-pc {
    display: block;
  }
}

@include lessThan($medium) {
  .only-sp {
    display: block;
  }

  .only-pc {
    display: none;
  }
}
</style>
