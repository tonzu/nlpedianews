console.log('Background script loaded');

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "summarizeText") {
        // Send the text to the Flask server
        fetch('http://tonzu.pythonanywhere.com/summarize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: request.text }),
        })
        .then(response => response.json())
        //.then(summary => {
          // Handle the summary received from the server
          // console.log('Summary:', summary);
  
          // You can now do something with the summary, like displaying it in a notification
          /*
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'nlpedianews-main/icon16.png',
            title: 'Text Summarized!',
            message: summary,
          });
          */
        //})
        .then(data => {
          // console.log('Summary:', data.summary);
          /*
          console.log('Before creating notification');
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon16.png',
            title: 'Text Summarized!',
            message: data.summary,
          });
          console.log('After creating notification');
          
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { action: 'updateSummary', summary: data.summary, originalText: request.text });
          });
          */
          //chrome.tabs.sendMessage(activeTab.id, { action: 'updateSummary', summary: data.summary, originalText: response.content });
          chrome.runtime.sendMessage({ action: 'updatePopup', data: { summary: data.summary } });
          /*
          setTimeout(function() {
            const simulatedData = { summary: 'This is a summary.' };
            console.log('Summary:', data.summary);
            // Send a message to the popup
            chrome.runtime.sendMessage({ action: 'updatePopup', data: { summary: data.summary } });
      
            // Send the response to the content script
            sendResponse({ success: true });
          }, 2000);
          */
        })
        .catch(error => {
          console.error('Error:', error);
        });
        

        return true;
      }
    }
  );