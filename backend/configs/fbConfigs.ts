import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.js";
import type { Auth } from "firebase-admin/auth";

if (process.env.NODE_ENV === "development") {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth: Auth = admin.auth();

export { auth };

