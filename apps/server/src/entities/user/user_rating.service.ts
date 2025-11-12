// src/user-rating/user-rating.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserRating } from "./user_rating.entity";

@Injectable()
export class UserRatingService {
  constructor(
    @InjectRepository(UserRating)
    private readonly userRatingRepository: Repository<UserRating>,
  ) {}

  /**
   * Calculates a user's rating using the Wilson‑score lower bound.
   *
   * @param userId   The ID of the user whose rating we're computing.
   * @param confidence  The z‑score for the desired confidence level
   *                    (1.96 ≈ 95% confidence, 1.645 ≈ 90% confidence, etc.).
   * @returns An object containing the raw proportion (`displayRating`),
   *          the Wilson‑score weighted rating (`weightedRating`),
   *          and the total number of ratings (`totalRating`).
   */
  async calculateUserRating(userId: string, confidence = 1.9604) {
    const raw = await this.userRatingRepository
      .createQueryBuilder("ur")
      .select(
        `SUM(CASE WHEN ur.rating_value > 0 THEN ur.rating_value ELSE 0 END)`,
        "total_positive",
      )
      .addSelect(
        `SUM(CASE WHEN ur.rating_value < 0 THEN -ur.rating_value ELSE 0 END)`,
        "total_negative",
      )
      .addSelect("COUNT(*)", "total_rating")
      .where("ur.reciever_id = :userId", { userId })
      .getRawOne();

    // Normalise nulls → 0
    const totalPositive = Number(raw?.total_positive ?? 0);
    const totalNegative = Number(raw?.total_negative ?? 0);
    const totalRatings = totalPositive + totalNegative;

    // Guard against division‑by‑zero
    if (totalRatings === 0) {
      return {
        weightedRating: 0,
        displayRating: 0,
        totalRating: 0,
      };
    }

    // Raw proportion of positive ratings
    const displayRating = totalPositive / totalRatings;

    // Wilson‑score lower bound (95% confidence by default)
    const weightedRating = this.wilsonLowerBound(
      displayRating,
      totalRatings,
      confidence,
    );

    const totalRating = Number(raw?.total_rating ?? 0);

    return {
      weightedRating,
      displayRating,
      totalRating,
    };
  }

  /**
   * Computes the Wilson‑score lower bound for a binomial proportion.
   *
   * @param p  Observed proportion of positives (0≤p≤1).
   * @param n  Total number of observations.
   * @param z  z‑score for the desired confidence level.
   * @returns The lower bound of the Wilson interval.
   */
  private wilsonLowerBound(p: number, n: number, z: number): number {
    //  ½z² / n  - the "correction" term that pulls the estimate toward 0.5
    const halfZ2OverN = (z * z) / (2 * n);

    // z × sqrt( (p(1‑p) + z²/(4n)) / n )
    const margin = z * Math.sqrt((p * (1 - p) + (z * z) / (4 * n)) / n);
    const numerator = p + halfZ2OverN - margin;
    const denominator = 1 + (z * z) / n;
    return numerator / denominator;
  }
}
