import { Author } from '../entity/author.entity';
import { AppDataSource } from '../config/data-source';
import { Book } from '../entity/book.entity';
import { Genre } from '../entity/genre.entity';

const bookRepository = AppDataSource.getRepository(Book);

export const getNumBooks = async () => bookRepository.count();

export const getBookList = async () => {
    return bookRepository.find({
        order: { title: 'ASC' },
        relations: ['author'],
    });
};

export const getBookById = async (id: number) => {
    return bookRepository.findOne({
        relations: ['author', 'genres', 'bookInstances'],
        where: { id },
    });
};

export const createBook = async (
    title: string,
    author: Author,
    summary: string,
    isbn: string,
    genres: Genre[]
) => {
    const book = new Book();
    book.title = title;
    book.author = author;
    book.summary = summary;
    book.isbn = isbn;
    book.genres = genres;
    return bookRepository.save(book);
};

export const deleteBook = async (id: number) => {
    return bookRepository.delete(id);
};

export const updateBook = async (
    book: Book,
    title: string,
    author: Author,
    summary: string,
    isbn: string,
    genres: Genre[]
) => {
    book.title = title;
    book.author = author;
    book.summary = summary;
    book.isbn = isbn;
    book.genres = genres;
    return bookRepository.save(book);
};
