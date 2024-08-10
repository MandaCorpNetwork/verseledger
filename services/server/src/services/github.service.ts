import { Octokit } from "@octokit/rest";
import { injectable } from "inversify";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'default-owner';
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME || 'default-repo';

if (!GITHUB_TOKEN || !GITHUB_REPO_OWNER || !GITHUB_REPO_NAME) {
  throw new Error('Missing required environment variables: Github');
}

@injectable()
export class GitHubService {
  private octokit!: Octokit;

  constructor() {
    this.initializeOctokit();
  }

  private async initializeOctokit() {
    const { Octokit } = await import('@octokit/rest');
    this.octokit = new Octokit({ auth: GITHUB_TOKEN });
  }

  public async createIssue(title: string, body: string) {
    const { data } = await this.octokit.issues.create({
      owner: GITHUB_REPO_OWNER,
      repo: GITHUB_REPO_NAME,
      title,
      body,
    });
    return data;
  }
}