import {
  BaseHttpController,
  controller,
  httpPost,
  requestBody,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { UserService } from '@V1/models/user/user.service';
import { CreateChatSchema } from 'vl-shared/src/schemas/ChatSchema';
import { ChatService } from './chat.service';
import { Logger } from '@Utils/Logger';

@controller('/v1/chat')
export class ChatController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService,
    @inject(TYPES.ChatService) private readonly chatService: ChatService,
  ) {
    super();
  }

  @httpPost('/', TYPES.VerifiedUserMiddleware)
  private async createMessage(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @requestBody() body: any,
  ) {
    const dto = body;
    const model = CreateChatSchema.strict().parse(dto);
    Logger.info(`Create Chat`, model);
    //TODO Wire Up Chat
  }
}
