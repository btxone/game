import { Request, Response } from 'express';

const getUsuarios = (req: Request , res: Response) => {

res.json({
    msg: 'getUsuarios'
});

}



const getUsuario = (req: Request , res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'getUsuarios',
        id
    });

    }

    const postUsuario = (req: Request , res: Response) => {

        const { body } = req;
    
        res.json({
            msg: 'postUsuarios',
            body
        });
    
        }


        const putUsuario = (req: Request , res: Response) => {
            
            const { id } = req.params;
            const { body } = req;
        
            res.json({
                msg: 'putUsuarios',
                body,
                id
            });
        
            }

            const deleteUsuario = (req: Request , res: Response) => {

                const { id } = req.params;
            
                res.json({
                    msg: 'deleteUsuarios',
                    id
                });
            
                }
    
    export {
        getUsuarios,
        getUsuario,
        postUsuario,
        putUsuario,
        deleteUsuario
    }