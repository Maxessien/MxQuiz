import { config } from "dotenv";
config()

import app from './configs/serverConfig.js';
import logger from "./utils/logger.js";



const PORT = process.env.PORT || 5050

app.listen(Number(PORT), "0.0.0.0", ()=>{
    logger.info("App listening on", PORT)
})