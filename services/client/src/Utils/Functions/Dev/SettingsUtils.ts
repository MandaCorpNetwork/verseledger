export function saveSettings(storageKey: string, value: number, isSession: boolean) {
  const storage = isSession ? sessionStorage : localStorage;
  storage.setItem(storageKey, value.toString());
}

export function readSetting(storageKey: string, session: 'local' | 'session'): number {
  if (session === 'local') {
    const value = localStorage.getItem(storageKey);
    return value ? parseInt(value, 10) : 0;
  } else {
    const value = sessionStorage.getItem(storageKey);
    return value ? parseInt(value, 10) : 0;
  }
}
