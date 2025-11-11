import { z } from "zod";
export const ContractSubTypeSchema = z.enum([
  "Transport",
  "Hauling",
  "Manage",
  "Trauma",
  "On-Call",
  "Escort",
  "Bounty",
  "QRF",
  "Asset-Protection",
  "Attache",
  "Collection",
  "Procurement",
  "Mining",
  "Refining",
  "Manufacturing",
  "Scouting",
  "Refuel",
  "Rearm",
  "Repair",
  "Crewman",
  "Outsourcing",
  "Locate",
  "Charting",
  "Middleman",
  "Redacted",
]);

export const RatingTypeSchema = z.enum([...ContractSubTypeSchema.options]);

export type IRatingType = z.infer<typeof RatingTypeSchema>;
