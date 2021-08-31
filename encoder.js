const fs = require("fs");
const fsp = require("fs-extra");

const Lame = require("node-lame").Lame;

const helpers = require("./helpers/helpers");

exports.Encode = async (audioFileBuffer) => {
  try {
    const encoder = new Lame({
      output: "buffer",
      bitrate: 128,
    }).setBuffer(audioFileBuffer);

    await encoder.encode();
  } catch (e) {
    console.log(e);
  }
};
