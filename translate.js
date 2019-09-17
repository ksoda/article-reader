/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = process.env.PROJECT_ID;
const location = "global";
const text = require("fs").readFileSync("/dev/stdin", "utf8");

// Imports the Google Cloud Translation library
const { TranslationServiceClient } = require("@google-cloud/translate").v3beta1;

// Instantiates a client
const translationClient = new TranslationServiceClient();
async function translateText() {
  // Construct request
  const request = {
    parent: translationClient.locationPath(projectId, location),
    contents: [text],
    mimeType: "text/plain", // mime types: text/plain, text/html
    sourceLanguageCode: "en-US",
    targetLanguageCode: "ja-JP"
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  for (const translation of response.translations) {
    console.log(translation.translatedText);
  }
}

translateText();
