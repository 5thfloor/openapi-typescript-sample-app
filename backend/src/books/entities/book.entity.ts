import { Expose, Transform } from 'class-transformer';
import { formatDate } from '../../../../frontend/utils'; // TODO: Split this into a common helper

export class BookEntity {
  id: number;
  title: string;

  @Expose({ name: 'published_at' })
  @Transform(value => formatDate(value), { toPlainOnly: true })
  publishedAt: Date;

  constructor(partial: Partial<BookEntity>) {
    Object.assign(this, partial);
  }
}
