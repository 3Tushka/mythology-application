export interface CommentInterface {
  readonly id: string;
  readonly text: string;
  readonly userId: number;
  readonly articleId: number;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface ArticleDetailsInterface {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly userId: number;
  readonly category: string;
  readonly temper: string;
  readonly location: string;
  readonly appointment: string;
  readonly amulet: string;
  readonly fairing: string;
  readonly magicaItem: string;
  readonly origin: string;
  readonly image: string;

  readonly comments: CommentInterface[];
}
