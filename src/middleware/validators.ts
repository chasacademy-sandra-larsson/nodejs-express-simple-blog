import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';



export const validateUser = [
  body('username')
    .isString().withMessage('Username must be a string')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .trim().escape(),
  body('email')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .trim().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validatePost = [
  body('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long')
    .trim().escape(),
  body('content')
    .isString().withMessage('Content must be a string')
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters long')
    .trim().escape(),
  body('published')
    .optional()
    .isBoolean().withMessage('Published must be a boolean'),
  param('userId')
    .optional()
    .isInt().withMessage('User ID must be an integer'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateQuery = [
    query('limit')
      .optional()
      .isNumeric().withMessage('Limit must be a number')
      .toInt(), // Converts limit to integer
  
    query('sort')
      .optional()
      .isAlpha().withMessage('Sort must be alphabetic'),
  
    query('order')
      .optional()
      .isIn(['asc', 'desc']).withMessage('Order must be either asc or desc')
  ];


