import { z } from "zod";
import { ContractSubTypeSchema } from "./ContractSubTypeSchema";
import { ITimestamped, TimestampedSchema } from "./TimestampedSchema";

export const RatingTypeSchema = z.enum([
  ...ContractSubTypeSchema.options,
])

export type IRatingType = z.infer<typeof RatingTypeSchema>;

export const UserRatingSchema = z.object({
  id: z.string().max(26),
  submitter_id: z.string().max(26),
  reciever_id: z.string().max(26),
  contract_id: z.string().max(26),
  rating_type: RatingTypeSchema,
  rating_value: z.number().int().min(1).max(5),
  comment: z.string().max(300).optional(),
});

export type IUserRating = z.infer<typeof UserRatingSchema>;

export const UserRatingTimestampedSchema = z.union([
  UserRatingSchema,
  TimestampedSchema,
]);

export type IUserRatingTimestamped = IUserRating & ITimestamped; // To allow type mixing