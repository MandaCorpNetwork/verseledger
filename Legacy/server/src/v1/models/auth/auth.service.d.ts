import type { ApiPermission } from 'vl-shared/src/enum/ApiPermission';
export declare class AuthService {
    constructor();
    private readonly _envars;
    verifyToken(token: string): {
        jti: string;
        id: string;
        exp: number;
        type: "access" | "refresh" | "api";
        roles: ApiPermission[];
    };
    getUserToken(token: string): Promise<{
        jti: string;
        id: string;
        exp: number;
        type: "access" | "refresh" | "api";
        roles: ApiPermission[];
    }>;
    invalidateToken(token: string, userId?: string): Promise<boolean>;
    signUser(user_id: string): Promise<{
        accessToken: any;
        refreshToken: any;
    }>;
    createApiToken(user_id: string, expires?: Date | number | `${number}${'d' | 'h' | 's' | 'm' | 'y'}`, name?: string, roles?: ApiPermission[]): Promise<any>;
    getApiTokens(user_id: string): Promise<any>;
}
