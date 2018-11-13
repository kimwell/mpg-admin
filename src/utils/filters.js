import df from 'dateformat-util'


//  格式化日期
export const dateformat = (value, fromatStr = 'yyyy-MM-dd hh:mm') => {
  return df.format(new Date(value), fromatStr)
}