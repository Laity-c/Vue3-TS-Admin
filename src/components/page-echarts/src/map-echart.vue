<template>
  <div class="map-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { IDataType } from '../type'
import { convertData } from '../utils/convert-data'

const props = withDefaults(
  defineProps<{
    title?: string
    mapData: IDataType
  }>(),
  {
    title: ''
  }
)

const option = computed(() => {
  return {
    backgroundColor: '#fff',
    title: {
      text: '全国服装销售情况',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2]
      }
    },
    // legend: {
    //   orient: 'vertical',
    //   right: 20,
    //   top: 10,
    //   data: ['泵机数'],
    //   textStyle: {
    //     color: '#fff'
    //   }
    // },
    visualMap: {
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculable: true,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
      },
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: 'china',
      roam: 'scale',
      // label: {
      //   emphasis: {
      //     show: false
      //   }
      // }
      // itemStyle: {
      //   normal: {
      //     areaColor: 'rgb(19, 91, 153)',
      //     borderColor: 'rgb(9, 54, 95)'
      //   },
      //   emphasis: {
      //     areaColor: 'rgb(10, 105, 187)'
      //   }
      // }
      //上面的写法已经淘汰了，需要像下面这样写
      //样式itemStyle都需要写在emphasis里面
      emphasis: {
        areaColor: '#f4cccc',
        borderColor: 'rgb(9,54,95)',
        itemStyle: {
          areaColor: '#f4cccc'
        }
      }
    },
    series: [
      {
        name: '销量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        symbolSize: 12,
        // label: {
        //   // normal: {
        //   //   show: false
        //   // },
        //   emphasis: {
        //     show: false
        //   }
        // }
        // itemStyle: {
        //   emphasis: {
        //     borderColor: '#fff',
        //     borderWidth: 1
        //   }
        // }
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
    // dataset: {source: mapdata}
  }
})
</script>

<style scoped></style>
