import { z } from "zod";

export const ChatSchema = z.object({
  id: z.string(),
  sender_id: z.string().length(26),
  receiver_id: z.string().length(26),
  channel_id: z.string().length(26).nullish(),
  message: z.string(),
  read: z.boolean(),
});

export const CreateChatSchema = ChatSchema.omit({ id: true, read: true });

export type IChat = z.infer<typeof ChatSchema>;
