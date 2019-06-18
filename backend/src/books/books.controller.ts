import { Controller, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksEntity } from './entities/books.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(): BooksEntity {
    return new BooksEntity({ books: this.booksService.findAll() });
  }
}
