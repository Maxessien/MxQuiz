import { randomBytes } from "crypto";


const bytes = randomBytes(32).toString("base64")

console.log(bytes)