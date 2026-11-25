export interface Comment {
  id: string;
  taskId: string;
  text: string;
  createdAt: string;
}

export type NewComment = Pick<Comment, 'taskId' | 'text'>;
