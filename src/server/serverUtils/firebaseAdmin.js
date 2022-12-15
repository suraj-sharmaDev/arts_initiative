import admin from "firebase-admin";
import { serviceAccount } from "src/server/serverConfig/firebaseConstants";

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Initialized firebase admin");
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}
const firebaseAdmin = admin;

export default firebaseAdmin;
