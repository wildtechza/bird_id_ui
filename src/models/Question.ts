export class Question {
  image: string;
  answer: string;

  constructor(data: Partial<Question>) {
    Object.assign(this, data);
  }
}