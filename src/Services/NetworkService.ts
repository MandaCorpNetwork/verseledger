import axios from 'axios';

import { isDev } from '@/Helpers/isDev';

import AuthService from './AuthService';

class NetworkService {
  public async HEAD<R>(url: string) {
    const isLocal = this.isLocalUrl(url);
    return axios.head<R>(isLocal ? this.resolveApiUri(url) : url, {
      headers: isLocal ? AuthService.authHeaders() : {},
    });
  }
  public async GET<R>(url: string) {
    const isLocal = this.isLocalUrl(url);
    return axios.get<R>(isLocal ? this.resolveApiUri(url) : url, {
      headers: isLocal ? AuthService.authHeaders() : {},
    });
  }
  public async PUT<R, T>(url: string, body: T) {
    const isLocal = this.isLocalUrl(url);
    return axios.put<R>(isLocal ? this.resolveApiUri(url) : url, body, {
      headers: isLocal ? AuthService.authHeaders() : {},
    });
  }
  public async POST<R, T>(url: string, body: T) {
    const isLocal = this.isLocalUrl(url);
    return axios.post<R>(isLocal ? this.resolveApiUri(url) : url, body, {
      headers: isLocal ? AuthService.authHeaders() : {},
    });
  }
  public async DELETE<R>(url: string) {
    const isLocal = this.isLocalUrl(url);
    return axios.delete<R>(isLocal ? this.resolveApiUri(url) : url, {
      headers: isLocal ? AuthService.authHeaders() : {},
    });
  }
  public isLocalUrl(url: string) {
    return url[0] === '/';
  }
  public resolveApiUri(url: string) {
    if (isDev()) {
      return `http://localhost:3030${url[0] === '/' ? '' : '/'}${url}`;
    } else {
      return `https://api.verseledger.space${url[0] === '/' ? '' : '/'}${url}`;
    }
  }
}

export default new NetworkService();
