import { Book } from '../entity/book.entity';
import { AppDataSource } from '../config/data-source';
import { BookInstance } from '../entity/bookinstance.entity';
import { BookInstanceStatus } from '../enums/BookInstanceStatus';

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export const getNumBookInstances = async () => bookInstanceRepository.count();

export const getNumAvailableBookInstances = async () =>
    bookInstanceRepository.findAndCount({
        where: { status: BookInstanceStatus.AVAILABLE },
    });

export const getBookinstanceList = async () => {
    return bookInstanceRepository.find({
        relations: ['book'],
    });
};

export const getBookinstanceById = async (id: number) => {
    return bookInstanceRepository.findOne({
        where: { id },
        relations: ['book'],
    });
};

export const createBookinstance = async (
    book: Book,
    imprint: string,
    status: BookInstanceStatus,
    due_back?: Date
) => {
    const bookInstance = new BookInstance();
    bookInstance.book = book;
    bookInstance.imprint = imprint;
    bookInstance.status = status;
    if (due_back) bookInstance.due_back = due_back;
    return bookInstanceRepository.save(bookInstance);
};

export const deleteBookinstance = async (id: number) => {
    return bookInstanceRepository.delete(id);
};

export const updateBookinstance = async (
    bookInstance: BookInstance,
    book: Book,
    imprint: string,
    status: BookInstanceStatus,
    due_back?: Date
) => {
    bookInstance.book = book;
    bookInstance.imprint = imprint;
    bookInstance.status = status;
    if (due_back) bookInstance.due_back = due_back;
    return bookInstanceRepository.save(bookInstance);
};
