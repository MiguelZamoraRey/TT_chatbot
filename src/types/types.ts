export enum AiRoles {
  USER = 'user',
  ASSISTANT = 'assistant',
  TOOL = 'tool'
}

export interface AiCallParams {
  content: string;
}
