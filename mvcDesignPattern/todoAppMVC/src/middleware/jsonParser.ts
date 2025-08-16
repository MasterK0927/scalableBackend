// import
import {Request, Response, NextFunction} from "express";

// logic
export const jsonParser = (req: Request, res: Response, next: NextFunction) => {
    let body = '';
    // listen on the 'data' event on the req stream
    req.on('data', (chunk) => {
        body+=chunk.toString();
    });

    // listen for 'end' event
    req.on('end', () => {
        try {
            if (body) {
                req.body = JSON.parse(body);
            }
        } catch(err) {
            console.error('Invalid JSON in request body');
        }
        // call next() to pass control to next middleware or route
        next();
    });
};