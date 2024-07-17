import { AppDataSource } from '../config/data-source';
import { Author } from '../entity/author.entity';

const authorRepository = AppDataSource.getRepository(Author);

export const getNumAuthors = async () => authorRepository.count();

export const getAuthorList = async () => {
    return authorRepository.find({
        order: { family_name: 'ASC' },
    });
};
