import firebaseAdmin from "src/server/serverUtils/firebaseAdmin";

const sendPushNotification = async (message, tokens) => {
  let fcm_tokens = [];
  return new Promise((resolve, reject) => {
    try {
      if (typeof tokens == "string") {
        fcm_tokens = [tokens];
      } else {
        // if we are getting array of objects
        // e.g tokens = [{token: "abc..."}, ...]
        // extract token from that array
        for (const data of tokens) {
          fcm_tokens = [...fcm_tokens, data.token];
        }
      }

      const firebaseMessage = {
        ...message,
        tokens: fcm_tokens,
      };

      firebaseAdmin
        .messaging()
        .sendMulticast(firebaseMessage)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export default sendPushNotification;
