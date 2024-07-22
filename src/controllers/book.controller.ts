import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

import * as bookServices from '../services/book.services';
import * as authorServices from '../services/author.services';
import * as genreServices from '../services/genre.services';
import { BookInstanceStatus } from '../enums/BookInstanceStatus';
import { Genre } from '../entity/genre.entity';

type GenreChecked = Genre & { checked?: string };

async function validateGetBookById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        // log 404 Invalid book ID parameter
        req.flash('err_message', req.t('error.invalid_book_id', { ns: 'error' }));
        return res.redirect('/error');
    }

    const book = await bookServices.getBookById(id);
    if (book === null) {
        // log 404 Book not found
        req.flash('err_message', req.t('error.book_not_found', { ns: 'error' }));
        return res.redirect('/error');
    }

    return book;
}

const validateBookFields = [
    body('title')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage((value, { req }) =>
            req.t('book.field_empty', {
                field: req.t('detail.title', { ns: 'detail' }),
                ns: 'form',
            })
        ),
    body('author')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage((value, { req }) =>
            req.t('book.field_empty', {
                field: req.t('detail.author', { ns: 'detail' }),
                ns: 'form',
            })
        ),
    body('summary')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage((value, { req }) =>
            req.t('book.field_empty', {
                field: req.t('detail.summary', { ns: 'detail' }),
                ns: 'form',
            })
        ),
    body('isbn')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage((value, { req }) =>
            req.t('book.field_empty', {
                field: req.t('detail.isbn', { ns: 'detail' }),
                ns: 'form',
            })
        ),
    body('genre.*').escape(),
];

// Display list of all Books.
export const bookList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const books = await bookServices.getBookList();
    res.render('books/index', { books, title: req.t('list.book') });
});

// Display detail page for a specific Book.
export const bookDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book = await validateGetBookById(req, res, next);
    if (!book) return;

    res.render('books/detail', {
        title: req.t('detail.book_detail', { ns: 'detail' }),
        book,
        bookInstances: book?.bookInstances,
        bookGenres: book?.genres,
        BookInstanceStatus,
    });
});

// Display Book create form on GET.
export const bookCreateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        // Get all authors and genres, which we can use for adding to our book.
        const [allAuthors, allGenres] = await Promise.all([
            authorServices.getAuthorList(),
            genreServices.getGenreList(),
        ]);

        res.render('books/form', {
            title: req.t('sidebar.create_book'),
            authors: allAuthors,
            genres: allGenres,
        });
    }
);

// Handle Book create on POST.
export const bookCreatePost = [
    // Convert the genre to an array.
    (req: Request, res: Response, next: NextFunction) => {
        if (!Array.isArray(req.body.genres)) {
            req.body.genres = typeof req.body.genres === 'undefined' ? [] : [req.body.genres];
        }
        next();
    },

    // Validate and sanitize fields.
    ...validateBookFields,

    // Process request after validation and sanitization.
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const { title, author: authorId, summary, isbn, genres } = req.body;

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            const [allAuthors, allGenres] = await Promise.all([
                authorServices.getAuthorList(),
                genreServices.getGenreList() as Promise<GenreChecked[]>,
            ]);

            // Mark our selected genres as checked.
            for (const genre of allGenres) {
                if (genres.includes(genre.id.toString())) {
                    genre.checked = 'true';
                }
            }
            res.render('books/form', {
                title: req.t('sidebar.create_book'),
                authors: allAuthors,
                genres: allGenres,
                book: req.body,
                errors: errors.array(),
            });
        } else {
            // Data from form is valid. Save book.
            const genresOfBook = await Promise.all(
                genres.map((genreId: string) => {
                    return genreServices.getGenreById(parseInt(genreId));
                })
            );

            const authorOfBook = await authorServices.getAuthorById(parseInt(authorId));
            const book = await bookServices.createBook(
                title,
                authorOfBook!,
                summary,
                isbn,
                genresOfBook
            );
            res.redirect(`/books/${book.id}`);
        }
    }),
];

// Display Book delete form on GET.
export const bookDeleteGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const book = await validateGetBookById(req, res, next);
        if (!book) return;

        res.render('books/delete', {
            title: req.t('sidebar.delete_book'),
            book,
            bookInstances: book?.bookInstances,
            bookGenres: book?.genres,
            BookInstanceStatus,
        });
    }
);

// Handle Book delete on POST.
export const bookDeletePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const book = await validateGetBookById(req, res, next);
        if (!book) return;

        if (book.bookInstances.length > 0) {
            res.render('books/delete', {
                title: req.t('sidebar.delete_book'),
                book,
                bookInstances: book?.bookInstances,
                bookGenres: book?.genres,
                BookInstanceStatus,
            });
            return;
        } else {
            await bookServices.deleteBook(book.id);
            res.redirect('/books');
        }
    }
);

// Display Book update form on GET.
export const bookUpdateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const [book, allAuthors, allGenres] = await Promise.all([
            validateGetBookById(req, res, next),
            authorServices.getAuthorList(),
            genreServices.getGenreList() as Promise<GenreChecked[]>,
        ]);

        if (!book) return;

        const bookGenreIds = book.genres.map(genre => genre.id);

        // Mark our selected genres as checked.
        for (const genre of allGenres) {
            if (bookGenreIds.includes(genre.id)) {
                genre.checked = 'true';
            }
        }

        const bookForm = {
            title: book.title,
            author: book.author.id,
            summary: book.summary,
            isbn: book.isbn,
        };

        res.render('books/form', {
            title: req.t('sidebar.update_book'),
            authors: allAuthors,
            genres: allGenres,
            book: bookForm,
        });
    }
);

// Handle Book update on POST.
export const bookUpdatePost = [
    // Convert the genre to an array.
    (req: Request, res: Response, next: NextFunction) => {
        if (!Array.isArray(req.body.genres)) {
            req.body.genres = typeof req.body.genres === 'undefined' ? [] : [req.body.genres];
        }
        next();
    },

    // Validate and sanitize fields.
    ...validateBookFields,

    // Process request after validation and sanitization.
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const { title, author: authorId, summary, isbn, genres } = req.body;

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            const [allAuthors, allGenres] = await Promise.all([
                authorServices.getAuthorList(),
                genreServices.getGenreList() as Promise<GenreChecked[]>,
            ]);

            // Mark our selected genres as checked.
            for (const genre of allGenres) {
                if (genres.includes(genre.id.toString())) {
                    genre.checked = 'true';
                }
            }
            res.render('books/form', {
                title: req.t('sidebar.update_book'),
                authors: allAuthors,
                genres: allGenres,
                book: req.body,
                errors: errors.array(),
            });
        } else {
            // Data from form is valid. Save book.
            const genresOfBook = await Promise.all(
                genres.map((genreId: string) => {
                    return genreServices.getGenreById(parseInt(genreId));
                })
            );

            const authorOfBook = await authorServices.getAuthorById(parseInt(authorId));
            const book = await validateGetBookById(req, res, next);
            if (!book) return;

            await bookServices.updateBook(book, title, authorOfBook!, summary, isbn, genresOfBook);
            res.redirect(`/books/${book.id}`);
        }
    }),
];
