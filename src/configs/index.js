const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  title: '钛好管',
  logo: () => require('@/static/images/logo.png'),
  showMocks: () => isDevelopment,
  // 项目基础路径
  appBasePath: isProduction ? '' : '',
  // CDN 资源基础域名
  assetURL: '',
  // 请求 基础域名

  //  测试数据
  requsetURL:  'http://cims_api_dev.chetell.com/api/v1',

  // 生产数据
  // requsetURL:  'http://cims_api.chetell.com/api/v1',

};
