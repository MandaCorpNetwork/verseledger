import { Logger } from '@Utils/Logger';
import axios, { type AxiosResponse } from 'axios';
import { injectable } from 'inversify';

export type RSIUser = {
  data: {
    creator: {
      bio: string;
      citizenDossierUrl: string;
      displayName: string;
      nickname: string;
      thumbnailUrl: string;
      website: string;
      __typename: 'Account';
    };
  };
};

const userQuery = `query getAccount($CreatorQuery: CreatorQuery!) {
  creator(query: $CreatorQuery) {
    ...Account
    __typename
  }
}

fragment Account on Account {
  bio
  citizenDossierUrl
  displayName
  live
  nickname
  stats {
    ...AccountStats
    __typename
  }
  thumbnailUrl
  website
  __typename
}

fragment AccountStats on AccountStats {
  followed
  followedCount
  followingCount
  upvotesCount
  viewsCount
  __typename
}`;

@injectable()
export class RSIService {
  constructor() {
    Logger.init();
  }
  public static async getUserByHandle(nickname: string) {
    return axios<string, AxiosResponse<RSIUser>>({
      url: 'https://robertsspaceindustries.com/community-hub/api/v1/graphql',
      method: 'post',
      data: {
        query: userQuery,
        variables: {
          CreatorQuery: {
            nickname,
          },
        },
      },
    });
  }
}
