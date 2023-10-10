import { t } from 'elysia';

export const UserAuthModelDTO = t.Object({
  id: t.String(),
  name: t.String(),
});
