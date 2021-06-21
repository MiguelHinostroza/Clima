import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

const KEY = '774a8892-a972-4dfc-8ca0-b7cf4263f0d4';

const Http = axios.create(
    {baseURL: 'http://api.airvisual.com/v2/'}
)

const requestInterceptor = (request: AxiosRequestConfig) => {
    request.url = `${request.url}${request.url?.includes('?') ? '&' : '?'}key=${KEY}`
    return request;
}

const responseInterceptor = (response: AxiosResponse) => {
    let responseProcessed = response.data.data ?? response.data ?? response;
    return responseProcessed;
}

const errorInterceptor = (error: AxiosError) => {
    return Promise.reject(error);
}

Http.interceptors.request.use(requestInterceptor);
Http.interceptors.response.use(responseInterceptor, errorInterceptor);

export default Http;
