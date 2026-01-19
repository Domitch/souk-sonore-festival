import Server from "./core/server";

const server = new Server().start();

// démarrer le server
// process.env.VAR : accéder aux variables d'envirennement
server.listen(process.env.PORT);
