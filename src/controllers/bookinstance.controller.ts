import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

import * as bookinstanceServices from '../services/bookinstance.services';
import * as bookServices from '../services/book.services';
import { BookInstanceStatus } from '../enums/BookInstanceStatus';

async function validateGetBookinstanceById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        // log 404 Invalid book instance ID parameter
        req.flash('err_message', req.t('error.invalid_bookinstance_id', { ns: 'error' }));
        return res.redirect('/error');
    }

    const bookInstance = await bookinstanceServices.getBookinstanceById(id);
    if (bookInstance === null) {
        // log 404 Book instance not found
        req.flash('err_message', req.t('error.bookinstance_not_found', { ns: 'error' }));
        return res.redirect('/error');
    }

    return bookInstance;
}

const validateBookinstanceFields = [
    body('book')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage((value, { req }) =>
            req.t('bookinstance.field_specified', {
                field: req.t('book.choose_book', { ns: 'form' }),
                ns: 'form',
            })
        ),
    body('imprint')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage((value, { req }) =>
            req.t('bookinstance.field_specified', {
                field: req.t('detail.imprint', { ns: 'detail' }),
                ns: 'form',
            })
        ),
    body('status')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage((value, { req }) =>
            req.t('bookinstance.field_specified', {
                field: req.t('detail.status', { ns: 'detail' }),
                ns: 'form',
            })
        ),
    body('due_back')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate()
        .withMessage((value, { req }) => req.t('bookinstance.invalid_due_back', { ns: 'form' })),
];

// Display list of all BookInstances.
export const bookinstanceList = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const bookInstances = await bookinstanceServices.getBookinstanceList();

        res.render('bookinstances/index', {
            bookInstances,
            title: req.t('list.bookinstance'),
            BookInstanceStatus,
        });
    }
);

// Display detail page for a specific BookInstance.
export const bookinstanceDetail = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const bookInstance = await validateGetBookinstanceById(req, res, next);
        if (!bookInstance) return;

        res.render('bookinstances/detail', {
            title: req.t('detail.bookinstance_detail', { ns: 'detail' }),
            bookinstance: bookInstance,
            BookInstanceStatus,
        });
    }
);

// Display BookInstance create form on GET.
export const bookinstanceCreateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const allBooks = await bookServices.getBookList();

        res.render('bookinstances/form', {
            title: req.t('sidebar.create_bookinstance'),
            book_list: allBooks,
            BookInstanceStatus,
        });
    }
);

// Handle BookInstance create on POST.
export const bookinstanceCreatePost = [
    // Validate and sanitize fields.
    ...validateBookinstanceFields,

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const { book: bookId, imprint, status, due_back } = req.body;

        if (!errors.isEmpty()) {
            // There are errors.
            // Render form again with sanitized values and error messages.
            const allBooks = await bookServices.getBookList();

            res.render('bookinstances/form', {
                title: req.t('sidebar.create_bookinstance'),
                book_list: allBooks,
                selected_book: bookId,
                errors: errors.array(),
                bookinstance: req.body,
                BookInstanceStatus,
            });
            return;
        } else {
            // Data from form is valid
            const book = await bookServices.getBookById(parseInt(bookId));
            const bookInstance = await bookinstanceServices.createBookinstance(
                book!,
                imprint,
                status,
                due_back
            );
            res.redirect(`/bookinstances/${bookInstance.id}`);
        }
    }),
];

// Display BookInstance delete form on GET.
export const bookinstanceDeleteGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const bookInstance = await validateGetBookinstanceById(req, res, next);
        if (!bookInstance) return;

        res.render('bookinstances/delete', {
            title: req.t('sidebar.delete_bookinstance'),
            bookinstance: bookInstance,
            BookInstanceStatus,
        });
    }
);

// Handle BookInstance delete on POST.
export const bookinstanceDeletePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const bookInstance = await validateGetBookinstanceById(req, res, next);
        if (!bookInstance) return;

        await bookinstanceServices.deleteBookinstance(bookInstance.id);
        res.redirect('/bookinstances');
    }
);

// Display BookInstance update form on GET.
export const bookinstanceUpdateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const allBooks = await bookServices.getBookList();
        const bookInstance = await validateGetBookinstanceById(req, res, next);
        if (!bookInstance) return;

        res.render('bookinstances/form', {
            title: req.t('sidebar.update_bookinstance'),
            book_list: allBooks,
            selected_book: bookInstance.id,
            bookinstance: bookInstance,
            BookInstanceStatus,
        });
    }
);

// Handle BookInstance update on POST.
export const bookinstanceUpdatePost = [
    // Validate and sanitize fields.
    ...validateBookinstanceFields,

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const { book: bookId, imprint, status, due_back } = req.body;

        if (!errors.isEmpty()) {
            // There are errors.
            // Render form again with sanitized values and error messages.
            const allBooks = await bookServices.getBookList();

            res.render('bookinstances/form', {
                title: req.t('sidebar.update_bookinstance'),
                book_list: allBooks,
                selected_book: bookId,
                errors: errors.array(),
                bookinstance: req.body,
                BookInstanceStatus,
            });
            return;
        } else {
            // Data from form is valid
            const book = await bookServices.getBookById(parseInt(bookId));
            const bookInstance = await validateGetBookinstanceById(req, res, next);
            if (!bookInstance) return;

            await bookinstanceServices.updateBookinstance(
                bookInstance,
                book!,
                imprint,
                status,
                due_back
            );
            res.redirect(`/bookinstances/${bookInstance.id}`);
        }
    }),
];
