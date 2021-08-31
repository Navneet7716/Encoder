const util = require("util");
const gc = require("../config/index");
const bucket = gc.bucket("shrtcast_test"); 


exports.uploadImage = (file) =>
  new Promise((resolve, reject) => {
    let filename = Date.now() + ".mp3";

    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.cloud.google.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(file);
  });
