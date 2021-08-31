const multer = require("multer");
const Lame = require("node-lame").Lame;

const Helpers = require("../helpers/helpers");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("audio")) {
    cb(null, true);
  } else {
    cb(new Error("Not an Audio! Please upload only audio", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserAudio = upload.single("file");

const Encode = async (audioFileBuffer) => {
  try {
    const encoder = new Lame({
      output: "buffer",
      bitrate: 128,
    }).setBuffer(audioFileBuffer);

    let val = await encoder.encode();

    if (val.status.finished) {
      let url = await Helpers.uploadImage(encoder.getBuffer());

      return url;
    }
  } catch (e) {
    console.log(e);

    return null;
  }
};

exports.callencode = async (req, res) => {
  try {
    let url = await Encode(req.file.buffer);

    if (url !== null) {
      res.status(200).json({
        status: 200,
        message: "Success",
        url,
      });
    } else {
      throw Error("Couldn't Encode the file");
    }
  } catch (e) {
    console.log(e);

    res.status(500).json({
      message: "Failed",
    });
  }
};
