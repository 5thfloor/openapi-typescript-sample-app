import { Injectable } from '@nestjs/common';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksService {
  // Dummy data
  private readonly books: BookEntity[] = [
    new BookEntity({ id: 1, title: 'にのめちゃんファンブック', publishedAt: new Date(2015, 5, 5) }),
    new BookEntity({ id: 2, title: '視界不良 前編', publishedAt: new Date(2015, 8, 30) }),
    new BookEntity({ id: 3, title: '視界不良 後編', publishedAt: new Date(2016, 1, 31) }),
  ];

  findAll(): BookEntity[] {
    return this.books;
  }
}
