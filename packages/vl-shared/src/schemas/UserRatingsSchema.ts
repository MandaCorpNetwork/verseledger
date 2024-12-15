import { z } from 'zod';
import { ContractSubTypeSchema } from './contracts/ContractSubTypeSchema';
import { type ITimestamped, TimestampedSchema } from './TimestampedSchema';

export const RatingTypeSchema = z.enum([...ContractSubTypeSchema.options]);

export type IRatingType = z.infer<typeof RatingTypeSchema>;

export const UserRatingSchema = z.object({
  id: z.string().max(26),
  submitter_id: z.string().max(26),
  reciever_id: z.string().max(26),
  contract_id: z.string().max(26).optional(),
  rating_type: RatingTypeSchema,
  rating_value: z.number().int().min(-3).max(3),
  comment: z.string().max(300).optional(),
});

export type IUserRating = z.infer<typeof UserRatingSchema>;

export const UserRatingTimestampedSchema = z.union([UserRatingSchema, TimestampedSchema]);

export type IUserRatingTimestamped = IUserRating & ITimestamped; // To allow type mixing

export const CreateUserRatingBodySchema = UserRatingSchema.omit({
  id: true,
  submitter_id: true,
  rating_type: true,
});
export type ICreateUserRatingBody = z.infer<typeof CreateUserRatingBodySchema>;

export const CreateContractRatingsBodySchema = z.object({
  contract_id: z.string().max(26),
  ratings: z.array(CreateUserRatingBodySchema).nullable(),
});

export type ICreateContractRatingsBody = z.infer<typeof CreateContractRatingsBodySchema>;
