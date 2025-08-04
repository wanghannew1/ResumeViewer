import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type { ApiError, ApiResponse} from '@/types'

// 1. 定义 API 返回数据的通用结构（根据你的后端调整）
/* interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
} */

// 2. 定义 API 错误结构
/*
interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
*/

// 3. 创建 Axios 实例（带类型增强）
const api: AxiosInstance = axios.create({
  baseURL: 'http://10.2.211.7:8000', // 从环境变量读取 import.meta.env.VITE_API_BASE_URL || 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 4. 请求拦截器
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => { // 使用新版的 InternalAxiosRequestConfig 代替旧版的AxiosRequestConfig
    // 可在此添加 token（示例）
    const token = localStorage.getItem('token');
    if (token && config.headers) { // 有token就带上，没有就不带，前台框架不验证token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 5. 响应拦截器（统一错误处理）
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 如果后端返回的 code 不是成功状态码（如 200），可以在此拦截
    if (response.data.code !== 200) {
      return Promise.reject({
        message: response.data.message || 'API Error',
        code: response.data.code,
      });
    }
    // return response;
    return response.data.data; // 直接返回 data 字段，减少组件中的解构
  },
  (error: AxiosError<ApiResponse>) => {
    // 统一错误处理
    const err: ApiError = {
      message:
        error.response?.data?.message ||
        error.message ||
        'Network Error',
      status: error.response?.status,
      code: String(error.response?.data?.code || error.code),
    };
    return Promise.reject(err);
  }
);

// 6. 封装通用请求函数（带类型泛型）
export const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    return await api(config);
  } catch (error) {
    throw error as ApiError; // 类型断言为已知错误结构
  }
};

// 7. 具体 API 函数（示例）
// export const fetchData = async (): Promise<{ id: number; name: string }[]> => {
export const fetchData = async (getUrl: string): Promise<any> => {
  return request({
    method: 'GET',
    url: getUrl,
    // url: '/',
  });
};

export const postData = async (payload: { title: string }): Promise<{ id: number }> => {
  return request({
    method: 'POST',
    url: '/create',
    data: payload,
  });
};