import { Request, Response } from "express";

const userCreate = ( req: Request, res: Response ) => {
    try {

        const { nameUser } = req.body as any;

        res.json({
            ok: true,
            message: `Create user ${ nameUser }`,
        });
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({
            ok: false,
            message: error
        })
    }
}

const userFindAll = ( req: Request, res: Response ) => {
    const { page, limit } = req.query;

    res.json({
        ok: true,
        message: `List Users`
    });
}

export {
    userCreate,
    userFindAll
};