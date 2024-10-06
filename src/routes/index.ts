import userrouter from "./user.routes";

import express from "express";

const routes = express.Router();

routes.use('/api/users', userrouter);
export default routes