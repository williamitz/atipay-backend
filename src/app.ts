import Server from './classes/server.class';


const appServer = Server.instance;

appServer.onListen( ( e: any ) => {
    console.clear();

    if( e ) console.log('Error al correr servidor 🚨🚨🚨', e);

    console.log('App corriendo en puerto ✅ ::: ', appServer.port);

} );
