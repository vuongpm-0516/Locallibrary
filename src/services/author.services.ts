import { AppDataSource } from '../config/data-source';
import { Author } from '../entity/author.entity';

const authorRepository = AppDataSource.getRepository(Author);

export const getNumAuthors = async () => authorRepository.count();

export const getAuthorList = async () => {
    return authorRepository.find({
        order: { family_name: 'ASC' },
    });
};

export const getAuthorById = async (id: number) => {
    return authorRepository.findOne({
        where: { id },
        relations: ['books'],
    });
};

export const createAuthor = async (
    first_name: string,
    family_name: string,
    date_of_birth?: Date,
    date_of_death?: Date
) => {
    const author = new Author();
    author.first_name = first_name;
    author.family_name = family_name;
    author.name = family_name + ' ' + first_name;
    if (date_of_birth) author.date_of_birth = date_of_birth;
    if (date_of_death) author.date_of_death = date_of_death;

    return authorRepository.save(author);
};

export const deleteAuthor = async (id: number) => {
    return authorRepository.delete(id);
};

export const updateAuthor = async (
    author: Author,
    first_name: string,
    family_name: string,
    date_of_birth?: Date,
    date_of_death?: Date
) => {
    author.first_name = first_name;
    author.family_name = family_name;
    author.name = family_name + ' ' + first_name;
    if (date_of_birth) author.date_of_birth = date_of_birth;
    if (date_of_death) author.date_of_death = date_of_death;

    return authorRepository.save(author);
};
