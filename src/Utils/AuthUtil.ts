import { jwtDecode } from 'jwt-decode';
import { Logger } from './Logger';

type JwtPayload = {
  id: string;
  refresh?: boolean;
  iss: string;
  exp: number;
  iat: number;
  aud: string;
  sub: string;
  jti: string;
};

export class AuthUtil {
  public static getAccessToken() {
    return localStorage.getItem('AccessToken');
  }
  public static getAccessTokenContents() {
    return AuthUtil._decodeToken(AuthUtil.getAccessToken());
  }
  public static getRefreshToken() {
    return localStorage.getItem('RefreshToken');
  }
  public static getRefreshTokenContents() {
    return AuthUtil._decodeToken(AuthUtil.getRefreshToken());
  }
  private static _isValidToken(token: JwtPayload | null) {
    if (token == null) {
      Logger.info('Token Null:');
      return false;
    }
    if (token.iss !== 'api.verseledger.space') {
      Logger.info('Bad Issuer', token.iss);
      return false;
    }
    if ((token.exp ?? 0) * 1000 < Date.now()) {
      Logger.info('Token Expired', token.exp);
      return false;
    }
    if (token.id !== token.sub) {
      Logger.info('Wrong User', token.sub, token.id);
      return false;
    }
    return true;
  }
  private static _decodeToken(tokenString: string | null) {
    if (tokenString == null) return null;
    try {
      return jwtDecode<JwtPayload>(tokenString);
    } catch (error) {
      return null;
    }
  }
  public static isValidToken(tokenString: string | null) {
    if (tokenString == null) return false;
    const token = AuthUtil._decodeToken(tokenString);
    return AuthUtil._isValidToken(token);
  }
  public static isRefreshToken(tokenString: string) {
    const token = AuthUtil._decodeToken(tokenString);
    const isValid = AuthUtil._isValidToken(token);
    if (!isValid) return false;
    return token?.refresh ?? false;
  }
  public static getAccessHeader() {
    const token = AuthUtil.getAccessToken();
    if (token == null) return void 0;
    return { Authorization: `Bearer ${token}` };
  }
  public static getRefreshHeader() {
    const token = AuthUtil.getRefreshToken();
    if (token == null) return void 0;
    return { Authorization: `Bearer ${token}` };
  }
  public static setAccessToken(accessToken: string) {
    localStorage.setItem('AccessToken', accessToken);
  }
  public static setRefreshToken(refreshToken: string) {
    localStorage.setItem('RefreshToken', refreshToken);
  }
}
