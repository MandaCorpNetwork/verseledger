interface User extends ITimestamped {
  id: number;
  rsi_handle: string | null;
  profile: string | null;
}
