import connectDB from "../DB/connection.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import AuthRouter from  "./modules/auth/auth.routes.js"
import slotRouter from "./modules/slot/slot.routes.js";
import UserRouter from "./modules/user/user.routes.js"
import appointmentRouter from "./modules/appointment/appointment.routes.js"
import messageRouter from "./modules/message/message.routes.js";


const initApp = (app, express) => {
  app.use(express.json());
  app.use('/auth', AuthRouter)
  app.use('/slot',slotRouter)
  app.use('/user',UserRouter)
  app.use('/appointment',appointmentRouter)
  app.use('/message',messageRouter)


  app.use(globalErrorHandling);
  app.use("/*", (req, res, next) => {
    return res.json({ message: "in_valid routing" })
})
  connectDB();
};

export default initApp;
