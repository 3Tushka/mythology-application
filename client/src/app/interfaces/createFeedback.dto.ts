export class CreateFeedbackMessageDto {
  readonly theme: string;
  readonly email: string;
  readonly message: string;
  readonly isFixed: boolean;
}
