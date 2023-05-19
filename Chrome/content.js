// Function to add the upload button
function addButton() {
    // Targeting the specific element on the page where we want to add our button
    const target = document.querySelector('.flex.flex-col.w-full.py-2.flex-grow.md\\:py-3.md\\:pl-4');

    // Check if the target exists and if the upload button isn't already added
    if (target && !document.querySelector('#uploadButton')) {
        // Create outer and inner div elements
        const outerDiv = document.createElement('div');
        const innerDiv = document.createElement('div');
        innerDiv.className = 'h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center';

        // Create the button and add some classes and an ID
        const button = document.createElement('button');
        button.className = 'btn relative btn-neutral border-0 md:border';
        button.disabled = false;
        button.id = 'uploadButton';

        // Create a div for the button text and append it to the button
        const buttonText = document.createElement('div');
        buttonText.className = 'flex w-full gap-2 items-center justify-center';
        buttonText.textContent = 'Upload File';
        button.appendChild(buttonText);

        // Append the button to the divs and then insert it into the page
        innerDiv.appendChild(button);
        outerDiv.appendChild(innerDiv);
        target.parentElement.insertBefore(outerDiv, target);

        let isUploading = false;

        // Event listener for the button click
        button.addEventListener('click', async () => {
            // Check if a file is not currently being uploaded
            if (!isUploading) {
                // Create a file input element and trigger the file selection dialog
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = '.txt,.js,.py,.html,.css,.json,.csv,.java,.class,.php,.cpp,.c,.rb,.swift,.go,.ts,.jsx,.tsx,.sh,.pl,.lua,.r,.scala,.vb,.asm,.sass,.scss,.h,.m,.kt,.groovy,.tsv,.yml,.xml,.sql,.dart,.dockerfile,.ini,.bat,.jsx,.tsx,.md';
                fileInput.click();

                // Handle the file selection
                fileInput.onchange = async (e) => {
                    isUploading = true;
                    buttonText.textContent = 'Stop Upload | 0%';
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsText(file);

                    // Handle the file load
                    reader.onload = async () => {
                        const text = reader.result;
                        const chunks = text.match(/[\s\S]{1,15000}/g); // split text into chunks

                        // Process and upload each chunk
                        for (let i = 0; i < chunks.length; i++) {
                            if (!isUploading) {
                                break;
                            }
                            await submitConversation(chunks[i], i + 1, file.name);
                            buttonText.textContent = `Stop Upload | ${Math.round(((i + 1) / chunks.length) * 100)}%`; // update progress text
                        }

                        buttonText.textContent = 'Upload File';
                        isUploading = false;
                    }
                };
            } else {
                // Stop the upload if it's in progress
                isUploading = false;
                buttonText.textContent = 'Upload File';
            }
        });

        // Function to submit each chunk of the file to the chat
        async function submitConversation(text, part, filename) {
            const textarea = document.querySelector("textarea[tabindex='0']");
            const enterKeyEvent = new KeyboardEvent("keydown", {
                bubbles: true,
                cancelable: true,
                keyCode: 13,
            });
            
            textarea.value = `Part ${part} of ${filename}: \n\n ${text}`;
            textarea.dispatchEvent(enterKeyEvent);

            // Wait for the AI to respond before proceeding
            let chatgptReady = false;
            while (!chatgptReady) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                chatgptReady = !document.querySelector(".text-2xl > span:not(.invisible)");
            }
        }
    }
}

// Call the addButton function when the content script is injected
addButton();

// Instantiate a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(() => {
    addButton();
});

// Start observing the body element for changes in its child elements and their descendants
observer.observe(document.body, { childList: true, subtree: true });
