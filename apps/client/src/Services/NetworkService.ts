import { URLUtil } from '@Utils/URLUtil';
import axios from 'axios';

class NetworkService {
  public async HEAD<R>(url: string, headers?: Record<string, string>) {
    const isLocal = NetworkService.isLocalUrl(url);
    return axios.head<R>(isLocal ? NetworkService.resolveApiUri(url) : url, {
      headers,
    });
  }
  public async GET<R>(url: string, headers?: Record<string, string>) {
    const isLocal = NetworkService.isLocalUrl(url);
    return axios.get<R>(isLocal ? NetworkService.resolveApiUri(url) : url, {
      headers,
    });
  }
  public async PUT<R, T>(url: string, body: T, headers?: Record<string, string>) {
    const isLocal = NetworkService.isLocalUrl(url);
    return axios.put<R>(isLocal ? NetworkService.resolveApiUri(url) : url, body, {
      headers,
    });
  }
  public async PATCH<R, T>(url: string, body: T, headers?: Record<string, string>) {
    const isLocal = NetworkService.isLocalUrl(url);
    return axios.patch<R>(isLocal ? NetworkService.resolveApiUri(url) : url, body, {
      headers,
    });
  }
  public async POST<R, T>(url: string, body: T, headers?: Record<string, string>) {
    const isLocal = NetworkService.isLocalUrl(url);
    return axios.post<R>(isLocal ? NetworkService.resolveApiUri(url) : url, body, {
      headers,
    });
  }
  public async DELETE<R>(url: string, headers?: Record<string, string>) {
    const isLocal = NetworkService.isLocalUrl(url);
    return axios.delete<R>(isLocal ? NetworkService.resolveApiUri(url) : url, {
      headers,
    });
  }
  public static isLocalUrl(url: string) {
    return url.startsWith('/');
  }
  public static resolveApiUri(url: string) {
    return `${URLUtil.backendHost}${url.startsWith('/') ? '' : '/'}${url}`;
  }
}

export default new NetworkService();
