Env: Ubuntu, GCP

```bash
export GOOGLE_APPLICATION_CREDENTIALS=path/to/key.json
export PROJECT_ID=your_id
export __DEV__=1
echo 'https://v8.dev/blog/v8-lite' | node scrape.js | go run score.go | node translate.js | node speech.js && open tmp/output.ogg
```
