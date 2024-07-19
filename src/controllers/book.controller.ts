import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import * as bookServices from '../services/book.services';
import { BookInstanceStatus } from '../enums/BookInstanceStatus';

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
        res.send('NOT IMPLEMENTED: Book is created with method GET');
    }
);

// Handle Book create on POST.
export const bookCreatePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send('NOT IMPLEMENTED: Book is created with method POST');
    }
);

// Display Book delete form on GET.
export const bookDeleteGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Book ${req.params.id} is deleted with method GET`);
    }
);

// Handle Book delete on POST.
export const bookDeletePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Book ${req.params.id} is deleted with method POST`);
    }
);

// Display Book update form on GET.
export const bookUpdateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Book ${req.params.id} is updated with method GET`);
    }
);

// Handle Book update on POST.
export const bookUpdatePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Book ${req.params.id} is updated with method POST`);
    }
);
