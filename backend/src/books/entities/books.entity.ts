import { Type } from 'class-transformer';
import { BookEntity } from './book.entity';

export class BooksEntity {
  @Type(() => BookEntity)
  books: BookEntity[];

  constructor(partial: Partial<BooksEntity>) {
    Object.assign(this, partial);
  }
}
