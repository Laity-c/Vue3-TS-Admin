//dayjs时间转化格式库
import dayjs from 'dayjs'
//因为我们接口中时间的数据是utc的,所以我们需要引入utc时间类型
import utc from 'dayjs/plugin/utc'

//因为dayjs默认转换类型不是utc的，所以我们需要把utc类型加入到dayjs中去
dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  //下面使用dayjs库来完成对时间的转换
  //首先使用dayjs中的utc类型来对utcString的数据做转换，最后在format中传入转换的格式
  //因为我们utc使用的是0时区，但北就时间是一个东八区的，所以我们需要偏移8个小时
  //我们看到的才是正常时间
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
