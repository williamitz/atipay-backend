import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';

import rootRouter from '../routes/root.routes';
import { envs } from '../config';

class Server {

    private static _instance: Server;

    private _app: Application;
    private _port: number;

    constructor() {
        this._app = express();
        this._port = envs.port;
        this._onLoadMiddlewares();
        this._onLoadRoutes();
    }

    private _onLoadMiddlewares() {
        // cors
        this._app.use( cors() );
        
        //body parser
        this._app.use( express.json() );

        // static content
        this._app.use( express.static( path.resolve( __dirname, '../../public' ) ) );

    }

    private _onLoadRoutes() {
        this._app.use( rootRouter );
    }
    
    onListen( callback: Function ) {
        this._app.listen( this._port, callback() );
    }

    static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    get port(): Number {
        return this._port;
    }

}

export default Server;