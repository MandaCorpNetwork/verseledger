import { Logger } from "@/utils/Logger";
// import { TYPES } from "@Constant/types";
import { injectable } from "inversify";
// import { type NotificationService } from "./notification.service";
import { UserRating } from "@Models/user_ratings.model";

@injectable()
export class RatingService {
  constructor() {
    Logger.init();
  }

  // @inject(TYPES.NotificiationService)
  // private notifications!: NotificationService;
  public async createRating(rating: { submitter_id: string; user_id: string; contract_id: string; rating_type: string; rating_value: number; comments?: string; }) {
    const newRating = await UserRating.create(rating);
    return;
  }
}
