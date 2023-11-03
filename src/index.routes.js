import connectDB from "../DB/connection.js";
import { globalErrorHandling } from "./utils/errorHandling.js";

const initApp = (app, express) => {
  app.use(express.json());
  // app.use('/user', useRouter)
  app.use(globalErrorHandling);
  connectDB();
};

export default initApp;
