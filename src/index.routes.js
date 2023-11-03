import connectDB from "../DB/connection.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import AuthRouter from  "./modules/auth/auth.routes.js"

const initApp = (app, express) => {
  app.use(express.json());
  app.use('/auth', AuthRouter)
  app.use(globalErrorHandling);
  app.use("/*", (req, res, next) => {
    return res.json({ message: "in_valid routing" })
})
  connectDB();
};

export default initApp;
