let commHost = ''
if (process.env.NODE_ENV == 'development') {
  commHost = 'http://192.168.0.210:8090'
}

/**
 * 上传文件
 */
export const uploadApi = commHost + '/sys/wxapp/upload'


/**
 * 登录
 */
export const login = '/sys/login'

/**
 * 广告列表
 */
export const advertisementList = '/sys/wxapp/list'


/**
 * 广告保存
 */
export const advertisementSave = '/sys/wxapp/save'


/**
 * 预览
 */
export const previewApp = '/sys/wxapp/mp/preview'


/**
 * 发布
 */
export const uploadApp = '/sys/wxapp/mp/upload'



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

/**
 * 扣除积分
 */
export const changCredits = '/sys/user/changCredits'

/**
 * 门店分页列表
 */
export const shopPage = '/sys/shop/page'


/**
 * 门店保存
 */
export const shopSave = '/sys/shop/save'


/**
 * 门店积分记录
 */
export const shopCreditsLog = '/sys/shop/shopCreditsLog'


