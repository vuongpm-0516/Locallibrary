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

export const getGenreById = async (id: number) => {
    return genreRepository.findOne({
        where: { id },
        relations: ['books'],
    });
};

export const checkGenreExists = async (name: string) => {
    return genreRepository.findOne({ where: { name } });
};

export const createGenre = async (name: string) => {
    const genre = new Genre();
    genre.name = name;

    return genreRepository.save(genre);
};

export const deleteGenre = async (id: number) => {
    return genreRepository.delete(id);
};

export const updateGenre = async (genre: Genre, name: string) => {
    genre.name = name;
    return genreRepository.save(genre);
};
