import { isDev } from './isDev';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class Logger {
  public static info(...args: Parameters<(typeof console)['info']>) {
    if (isDev()) {
      console.info(...args);
    }
  }
  public static error(...args: Parameters<(typeof console)['error']>) {
    if (isDev()) {
      console.error(...args);
    }
  }
  public static warn(...args: Parameters<(typeof console)['warn']>) {
    if (isDev()) {
      console.warn(...args);
    }
  }
  public static count(...args: Parameters<(typeof console)['count']>) {
    if (isDev()) {
      console.count(...args);
    }
  }
}
