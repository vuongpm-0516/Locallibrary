import { AppDataSource } from '../config/data-source';
import { Genre } from '../entity/genre.entity';

const genreRepository = AppDataSource.getRepository(Genre);

export const getNumGenres = async () => genreRepository.count();

export const getGenreList = async () => {
    return genreRepository.find({
        order: { name: 'ASC' },
        relations: ['books'],
    });
};
