let commHost = ''
if (process.env.NODE_ENV == 'development') {
  commHost = 'http://192.168.0.81:8090'
}

/**
 * 上传文件
 */
export const uploadApi = commHost + '/sys/advertisement/upload'


/**
 * 登录
 */
export const login = '/sys/login'

/**
 * 广告列表
 */
export const advertisementList = '/sys/advertisement/list'


/**
 * 广告保存
 */
export const advertisementSave = '/sys/advertisement/save'



/**
 * 广告删除
 */
export const advertisementDelete = '/sys/advertisement/delete'

/**
 * 获取配置
 */
export const settingData = '/sys/setting/detail'

/**
 * 保存配置
 */
export const settingChange = '/sys/setting/change'

/**
 * 会员
 */
export const userPage = '/sys/user/page'


