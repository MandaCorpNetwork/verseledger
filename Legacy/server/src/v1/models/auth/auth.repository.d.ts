import { ApiPermission } from 'vl-shared/src/enum/ApiPermission';
export declare class AuthRepository {
    private static readonly ApiToken;
    static invalidateToken(token: {
        user_id: string;
        token_id: string;
    }): Promise<boolean>;
    static createApiToken(user_id: string, expires?: Date | number | `${number}${'d' | 'h' | 's' | 'm' | 'y'}`, type?: string, name?: string, roles?: ApiPermission[], jwtid?: string): Promise<any>;
    static createTokenPair(user_id: string, jwtid?: string): Promise<{
        accessToken: any;
        refreshToken: any;
    }>;
    static getTokens(user: string, type?: string): Promise<any>;
}
