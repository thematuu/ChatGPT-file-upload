# ChatGPT-file-upload
This is a browser extension that adds an "Upload File" button to the OpenAI ChatGPT page. It allows users to upload text-based files directly into the chat, which is useful for sharing code snippets, logs, or other data during a chat session.

## Features

- Adds an "Upload File" button to the chat interface.
- Supports various file types, including .txt, .js, .py, .html, .css, .json, .csv, .java, .class, .php, .cpp, .c, .rb, .swift, .go, .ts, .jsx, .tsx, .sh, .pl, .lua, .r, .scala, .vb, .asm, .sass, .scss, .h, .m, .kt, .groovy, .tsv, .yml, .xml, .sql, .dart, .dockerfile, .ini, .bat, .jsx, .tsx, .md (All file types are not tested)
- File content is chunked into manageable pieces for seamless upload.

## Installation

### Firefox

1. Download or clone this repository to your local machine.
2. Open the Firefox browser and navigate to `about:debugging`.
3. Click on "This Firefox".
4. Click on "Load Temporary Add-on...".
5. Open any file in your extension's directory to install the entire extension.

The extension should now be installed and ready for use. Navigate to https://chat.openai.com/ and you should see the "Upload File" button.

### Chrome

1. Download or clone this repository to your local machine.
2. Open the Chrome browser and navigate to `chrome://extensions`.
3. Enable the "Developer mode" toggle on the top right corner.
4. Click on "Load unpacked" and select the extension's directory.

The extension should now be installed and ready for use. Navigate to https://chat.openai.com/ and you should see the "Upload File" button.

## Usage

Click on the "Upload File" button, select a file from your system, and the content of the file will be uploaded into the chat.

## Contributing

You are welcome to add more supported file types if desired.

## License

[MIT](https://choosealicense.com/licenses/mit/)
