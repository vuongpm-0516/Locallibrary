import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

import * as authorServices from '../services/author.services';

async function validateGetAuthorById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        // log 404 Invalid author ID parameter
        req.flash('err_message', req.t('error.invalid_author_id', { ns: 'error' }));
        return res.redirect('/error');
    }

    const author = await authorServices.getAuthorById(id);
    if (author === null) {
        // log 404 Author not found
        req.flash('err_message', req.t('error.author_not_found', { ns: 'error' }));
        return res.redirect('/error');
    }

    return author;
}

const validateAuthorFields = [
    body('first_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage((value, { req }) => req.t('author.empty_first_name', { ns: 'form' }))
        .isAlphanumeric()
        .withMessage((value, { req }) => req.t('author.invalid_first_name', { ns: 'form' })),
    body('family_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage((value, { req }) => req.t('author.empty_family_name', { ns: 'form' }))
        .isAlphanumeric()
        .withMessage((value, { req }) => req.t('author.invalid_family_name', { ns: 'form' })),
    body('date_of_birth')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate()
        .withMessage((value, { req }) => req.t('author.invalid_date_of_birth', { ns: 'form' })),
    body('date_of_death')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate()
        .withMessage((value, { req }) => req.t('author.invalid_date_of_birth', { ns: 'form' })),
];

// Display list of all Authors.
export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authors = await authorServices.getAuthorList();
    res.render('authors/index', { authors, title: req.t('list.author') });
});

// Display detail page for a specific Author.
export const authorDetail = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const author = await validateGetAuthorById(req, res, next);
        if (!author) return;

        res.render('authors/detail', {
            title: req.t('detail.author_detail', { ns: 'detail' }),
            author,
            author_books: author?.books,
        });
    }
);

// Display Author create form on GET.
export const authorCreateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.render('authors/form', { title: req.t('sidebar.create_author') });
    }
);

// Handle Author create on POST.
export const authorCreatePost = [
    // Validate and sanitize fields.
    ...validateAuthorFields,

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const { first_name, family_name, date_of_birth, date_of_death } = req.body;

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('authors/form', {
                title: req.t('sidebar.create_author'),
                author: req.body,
                errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid.
            const author = await authorServices.createAuthor(
                first_name,
                family_name,
                date_of_birth,
                date_of_death
            );
            // Redirect to new author record.
            res.redirect(`/authors/${author.id}`);
        }
    }),
];

// Display Author delete form on GET.
export const authorDeleteGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const author = await validateGetAuthorById(req, res, next);
        if (!author) return;

        res.render('authors/delete', {
            title: req.t('sidebar.delete_author'),
            author: author,
            author_books: author.books,
        });
    }
);

// Handle Author delete on POST.
export const authorDeletePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const author = await validateGetAuthorById(req, res, next);
        if (!author) return;

        if (author.books.length > 0) {
            // Author has books. Render in same way as for GET route.
            res.render('authors/delete', {
                title: req.t('sidebar.delete_author'),
                author: author,
                author_books: author.books,
            });
            return;
        } else {
            // Author has no books. Delete object and redirect to the list of authors.
            await authorServices.deleteAuthor(author.id);
            res.redirect('/authors');
        }
    }
);

// Display Author update form on GET.
export const authorUpdateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const author = await validateGetAuthorById(req, res, next);
        if (!author) return;

        res.render('authors/form', {
            title: req.t('sidebar.update_author'),
            author: author,
        });
    }
);

// Handle Author update on POST.
export const authorUpdatePost = [
    // Validate and sanitize fields.
    ...validateAuthorFields,

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const { first_name, family_name, date_of_birth, date_of_death } = req.body;

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('authors/form', {
                title: req.t('sidebar.update_author'),
                author: req.body,
                errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid.
            const author = await validateGetAuthorById(req, res, next);
            if (!author) return;

            await authorServices.updateAuthor(
                author,
                first_name,
                family_name,
                date_of_birth,
                date_of_death
            );
            // Redirect to new author record.
            res.redirect(`/authors/${author.id}`);
        }
    }),
];
