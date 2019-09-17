// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");

// Import other required libraries
const fs = require("fs");
const util = require("util");
const text = require("fs").readFileSync("/dev/stdin", "utf8");

async function main() {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();

  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML Voice Gender (optional)
    voice: { languageCode: "ja-JP", ssmlGender: "NEUTRAL" },
    // Select the type of audio encoding
    audioConfig: {
      audioEncoding: "OGG_OPUS",
      speakingRate: 4,
      volumeGainDb: 10
    }
  };

  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("tmp/output.ogg", response.audioContent, "binary");
}
main();
