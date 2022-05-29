// import request from '@/utils/request';
import { mockRequest, Login } from './base';
/**
 * @description 用户登录
 */

export const userLogin = () => mockRequest({
  mockData: {
    token: 'mock-token',
  },
});

// GET /login
export const wangLogin = (params) => Login(params);

/**
 * @description 获取用户数据
 */

export const getUserData = () => mockRequest({
  mockData: {
    id: '1',
    userName: 'Daniel',
    sex: '1',
  },
});
