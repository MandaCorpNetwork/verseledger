import type {
  TOAuth2UrlParams,
  TOAuth2Scope,
  TOAuth2AccessToken
} from '../index';

export function env(name: string) {
  if (!(name in process.env)) {
    throw new Error(
      `.env variable '${name}' is required but could not be found`
    );
  }
  return process.env[name];
}

export function buildUrl(
  url: string,
  params: TOAuth2UrlParams,
  scope?: TOAuth2Scope
) {
  const _url = new URL(url);

  if (scope) {
    _url.searchParams.append('scope', scope.join(','));
  }

  for (const [name, value] of Object.entries(params)) {
    _url.searchParams.append(name, value.toString());
  }

  return _url.href;
}

export function redirect(location: string, headers: Record<string, string | null> = {}) {
  return new Response('', {
    status: 302,
    statusText: 'Found',
    headers: { ...headers, Location: location }
  });
}
export async function getJWTValues(ctx?: any) {
  const tokenString = ctx?.cookie?.auth
  //const prof =
  if (!tokenString) {
    return false;
  }
  return ctx?.vljwt?.verify(tokenString);
}

export async function isTokenValid(ctx?: any) {
  const prof = await getJWTValues(ctx)
  if (!prof) return false
  const { token } = prof
  const now = Date.now() / 1000;
  const expiry = token.created_at + token.expires_in;
  return now < expiry;
}
