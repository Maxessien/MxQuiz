import dotenv from "dotenv";
import type { ServiceAccount } from "firebase-admin";

dotenv.config();

const serviceAccount: ServiceAccount = {
  type: process.env.TYPE || "",
  projectId: process.env.PROJECT_ID || "",
  privateKeyId: process.env.PRIVATE_KEY_ID || "",
  privateKey: (process.env.PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  clientEmail: process.env.CLIENT_EMAIL || "",
  clientId: process.env.CLIENT_ID || "",
  authUri: process.env.AUTH_URI || "",
  tokenUri: process.env.TOKEN_URI || "",
  authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL || "",
  clientX509CertUrl: process.env.CLIENT_X509_CERT_URL || "",
  universeDomain: process.env.UNIVERSE_DOMAIN || "",
} as ServiceAccount;

export default serviceAccount;
