import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import * as genreServices from '../services/genre.services';

async function validateGetGenreById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        // log 404 Invalid genre ID parameter
        req.flash('err_message', req.t('error.invalid_genre_id', { ns: 'error' }));
        return res.redirect('/error');
    }

    const genre = await genreServices.getGenreById(id);
    if (genre === null) {
        // log 404 Genre not found
        req.flash('err_message', req.t('error.genre_not_found', { ns: 'error' }));
        return res.redirect('/error');
    }

    return genre;
}

// Display list of all Genres.
export const genreList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genres = await genreServices.getGenreList();
    res.render('genres/index', { genres, title: req.t('list.genre') });
});

// Display detail page for a specific Genre.
export const genreDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = await validateGetGenreById(req, res, next);
    if (!genre) return;

    res.render('genres/detail', {
        title: req.t('detail.genre_detail', { ns: 'detail' }),
        genre: genre,
        genre_books: genre?.books,
    });
});

// Display Genre create form on GET.
export const genreCreateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send('NOT IMPLEMENTED: Genre create GET');
    }
);

// Handle Genre create on POST.
export const genreCreatePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send('NOT IMPLEMENTED: Genre create POST');
    }
);

// Display Genre delete form on GET.
export const genreDeleteGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Genre delete GET ${req.params.id}`);
    }
);

// Handle Genre delete on POST.
export const genreDeletePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Genre delete POST ${req.params.id}`);
    }
);

// Display Genre update form on GET.
export const genreUpdateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Genre update GET ${req.params.id}`);
    }
);

// Handle Genre update on POST.
export const genreUpdatePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Genre update POST ${req.params.id}`);
    }
);
