/* when a web page sends a message that says "summarize," this code collects all the words
 from that page and sends them to another part of the extension that knows how to make a summary */

console.log('Content script loaded');


chrome.runtime.onMessage.addListener( //when you get message from page, do something!
    function(request, sender, sendResponse) { //setting up a special ear/place to listen
      if( request.message === "summarize" ) { //checks if message is asking for summary
        // Extract text from the webpage (you may need to customize this)
        
        var bodyText = document.body.innerText; //reading all the text on a page and putting it in bodyText

        console.log('Body:', bodyText);
        // Send the text to the background script for summarization
        // chrome.runtime.sendMessage({"message": "summarizeText", "text": bodyText}); //sends collected text to another part of the extension for summarizing
        chrome.runtime.sendMessage({ message: "summarizeText", "text": bodyText }, function(response) {
          // Handle the response from the background script (if needed)
          console.log(response);
        }); // TESTING

        /*
        const readabilityScript = chrome.runtime.getURL('Readability.js');
        fetch(readabilityScript)
            .then(response => response.text())
            .then(scriptText => {
                const scriptBlob = new Blob([scriptText], { type: 'text/javascript' });
                const scriptURL = URL.createObjectURL(scriptBlob);

                // Inject the script into the page
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = scriptURL;

                script.onerror = function() {
                    console.error('Error loading Readability.js');
                };

                document.getElementsByTagName('head')[0].appendChild(script);

                // Wait for the script to be loaded before using it
                script.onload = function() {
                    // Use Readability to extract main content
                    var article = new Readability(document).parse();
                    var mainText = article ? article.textContent : '';
                    console.log('Main text:', mainText);

                    // Now you can send the mainText to other parts of your extension or perform further actions
                    // For example, send it to the background script for summarization
                    chrome.runtime.sendMessage({ "message": 'summarizeText', "text": mainText });
                };
            })
            .catch(error => {
                console.error('Error fetching Readability.js:', error);
            });
        */
        return true;
      }
    }
  );