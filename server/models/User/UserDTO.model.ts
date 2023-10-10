import { t } from 'elysia';

export const UserDTO = t.Object({
  id: t.String(),
  name: t.String(),
});
