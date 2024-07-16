import { AppDataSource } from '../config/data-source';
import { Book } from '../entity/book.entity';

const bookRepository = AppDataSource.getRepository(Book);

export const getNumBooks = async () => bookRepository.count();
