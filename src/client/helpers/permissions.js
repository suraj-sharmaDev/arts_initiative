export const checkAudioPermission = () => {
  return new Promise((resolve, reject) => {
    try {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          resolve(true);
        })
        .catch(function (err) {
          reject({error: true});
        });
    } catch (error) {
      reject({error: true});
    }
  });
};
