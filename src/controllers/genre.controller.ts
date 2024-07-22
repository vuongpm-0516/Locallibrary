import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

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

const validateGenreFields = [
    body('name')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage((value, { req }) => {
            return req.t('genre.name_max', { ns: 'form' });
        }),
];

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
        res.render('genres/form', { title: req.t('sidebar.create_genre') });
    }
);

// Handle Genre create on POST.
export const genreCreatePost = [
    // Validate and sanitize the name field.
    ...validateGenreFields,

    // Process request after validation and sanitization.
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('genres/form', {
                title: req.t('sidebar.create_genre'),
                genre: req.body,
                errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            const genreExists = await genreServices.checkGenreExists(req.body.name);
            if (genreExists) {
                // Genre exists, redirect to its detail page.
                res.redirect(`/genres/${genreExists.id}`);
            } else {
                const genre = await genreServices.createGenre(req.body.name);
                // New genre saved. Redirect to genre detail page.
                res.redirect(`/genres/${genre.id}`);
            }
        }
    }),
];

// Display Genre delete form on GET.
export const genreDeleteGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const genre = await validateGetGenreById(req, res, next);
        if (!genre) return;

        res.render('genres/delete', {
            title: req.t('sidebar.delete_genre'),
            genre: genre,
            genre_books: genre?.books,
        });
    }
);

// Handle Genre delete on POST.
export const genreDeletePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const genre = await validateGetGenreById(req, res, next);
        if (!genre) return;

        await genreServices.deleteGenre(genre.id);
        res.redirect('/genres');
    }
);

// Display Genre update form on GET.
export const genreUpdateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const genre = await validateGetGenreById(req, res, next);
        if (!genre) return;

        res.render('genres/form', {
            title: req.t('sidebar.update_genre'),
            genre: genre,
        });
    }
);

// Handle Genre update on POST.
export const genreUpdatePost = [
    // Validate and sanitize the name field.
    ...validateGenreFields,

    // Process request after validation and sanitization.
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('genres/form', {
                title: req.t('sidebar.update_genre'),
                genre: req.body,
                errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            const genreExists = await genreServices.checkGenreExists(req.body.name);
            if (genreExists) {
                // Genre exists, redirect to its detail page.
                res.redirect(`/genres/${genreExists.id}`);
            } else {
                const genre = await validateGetGenreById(req, res, next);
                if (!genre) return;

                await genreServices.updateGenre(genre, req.body.name);
                // New genre saved. Redirect to genre detail page.
                res.redirect(`/genres/${genre.id}`);
            }
        }
    }),
];
