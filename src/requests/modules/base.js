import request from '@/utils/request';
import { baseURL } from '@/configs/request';
import { assetURL } from '@/configs';

/**
 * @description 模拟接口
 * @param mockData 想要返回的模拟数据
 */

export const Login = (params) => request.get('/login', { params });

//GET /my_cost我的费用列表
export const my_cost  =  (params) => request.get('/my_cost', { params });
export const my_cost_submit  =  (params) => request.post('/my_cost', params );
export const my_cost_delete  =  (params) => request.delete(`/my_cost/${params.id}`, {params} );


// 注意：get，传的话，需要{ params }
//    post 直接 params

/**
 * @description 模拟接口
 * @param 注意事项： get,put,delete 接受参数的话，需要{ params } ； post 接受参数直接 params
 */
export const get_url  =  (params) => request.get(`${params.url}`, {params} );
export const back  =  (params) => request.put(`${params.url}`, {params} );
export const submit  =  (params) => request.put(`${params.url}/${params.id}`, {params} );
export const get_delete  =  (params) => request.delete(`${params.url}/${params.id}`, {params} );
export const save =  (params) => request.post(`${params.url}`, params );




export const mockRequest = ({
  mockData = {},
  delay = 500,
} = {}) => new Promise((resolve) => setTimeout(() => {
  resolve({
    code: '0000',
    data: mockData,
  });
}, delay));

/**
 * @desc 获取基础地址
 */
export const getBaseURL = () => baseURL;

/**
 * 获取字典数据
 */
export const dictDataList = (dictType) => request.post('/api/dictDataList', {
  dictType,
});

/**
 * @description 获取当前登录用户菜单
 */
export const personMenu = (data) => mockRequest({
  ...data,
  mockData: [],
});
// export const personMenu = (data) => request.post('/person/menu', data);

/**
 * @desc 获取上传地址
 */
export const getUploadUrl = () => `${baseURL}/audit/attachment/upload`;

/**
 * @desc 下载文件
 */
export const downloadFile = (id) => window.open(`${baseURL}/audit/attachment/downloadFile?id=${id}`);

/**
 * @desc 获取CDN资源文件
 */
export const getAssetFile = (path) => assetURL + path;
