import { AppDataSource } from '../config/data-source';
import { BookInstance } from '../entity/bookinstance.entity';
import { BookInstanceStatus } from '../enums/BookInstanceStatus';

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export const getNumBookInstances = async () => bookInstanceRepository.count();

export const getNumAvailableBookInstances = async () =>
    bookInstanceRepository.findAndCount({
        where: { status: BookInstanceStatus.AVAILABLE },
    });
