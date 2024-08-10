import { Logger } from '@/utils/Logger';
import { TYPES } from '@Constant/types';
import { inject, injectable } from 'inversify';
import { IFeedbackForm } from 'vl-shared/src/schemas/FeedbackFormSchema';
import { GitHubService } from './github.service';

@injectable()
export class FeedbackService {
  private githubService: GitHubService;
  constructor(@inject(TYPES.GitHubService) githubService: GitHubService) {
    Logger.init();
    this.githubService = githubService;
  }

  public async createFeedbackIssue(feedback: IFeedbackForm) {
    const issueTitle = this.generateIssueTitle(feedback);
    const issueBody = this.generateIssueBody(feedback);

    return await this.githubService.createIssue(issueTitle, issueBody);
  }

  private generateIssueTitle(feedback: IFeedbackForm): string {
    switch (feedback.type) {
      case 'BUG':
        return `BUG: ${feedback.feature} - ${feedback.userTitle}`;
      case 'SUGGESTION':
        return `SUGGESTION: ${feedback.feature} - ${feedback.userTitle}`;
      case 'QUESTION':
        return `QUESTION: ${feedback.feature} - ${feedback.userTitle}`;
      case 'USER_ISSUE':
        return `USER ISSUE: ${feedback.userTitle}`;
      case 'UPDATE':
        return `UPDATE: ${feedback.feature} - ${feedback.userTitle}`;
      case 'MILESTONE':
        return `MILESTONE: ${feedback.feature || feedback.newFeature} - ${feedback.userTitle}`;
      default:
        return `Feedback - Missing Type`;
    }
  }

  private generateIssueBody(feedback: IFeedbackForm): string {
    let body = `# ${this.generateIssueTitle(feedback)}\n\n`;
    body += `*Submitted by: ${feedback.username}*\n`;
    body += `> Brief: ${feedback.brief}\n`;

    switch (feedback.type) {
      case 'BUG':
        body += `## Behavior \n`;
        body += `*Observed Behavior: ${feedback.observedBehavior}*\n`;
        body += feedback.expectedBehavior ? `*Expected Behavior: ${feedback.expectedBehavior}*\n` : '';
        body += feedback.suggestedBehavior ? `*Suggested Behavior: ${feedback.suggestedBehavior}*\n` : '';
        body += feedback.logs ? `##Logs \n ${feedback.logs}*\n` : '';
        body += feedback.attachments ? `##Attachment \n${feedback.attachments}*\n` : '';
        body += feedback.notes ? `##Notes \n${feedback.notes}*\n` : '';
        break;
      case 'SUGGESTION':
        body += `## Suggested Behavior \n ${feedback.suggestedBehavior}*\n`;
        body += feedback.attachments ? `##Attachment \n${feedback.attachments}*\n` : '';
        body += feedback.notes ? `##Notes \n${feedback.notes}*\n` : '';
        break;
      case 'QUESTION':
        body += `## Question \n ${feedback.question}*\n`;
        body += feedback.attachments ? `##Attachment \n${feedback.attachments}*\n` : '';
        body += feedback.notes ? `##Notes \n${feedback.notes}*\n` : '';
        break;
      case 'USER_ISSUE':
        body += `## Report \n ${feedback.report}*\n`;
        body += feedback.attachments ? `##Attachment \n${feedback.attachments}*\n` : '';
        body += feedback.notes ? `##Notes \n${feedback.notes}*\n` : '';
        break;
      case 'UPDATE':
        break;
      case 'MILESTONE':
        break;
      default:
        break;
    }
    return body;
  }
}
