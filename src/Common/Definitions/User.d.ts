interface User extends ITimestamped {
  id: string;
  rsi_handle: string | null;
  profile: string | null;
}
