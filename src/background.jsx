chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['customInstructions'], (result) => {
      const storedInstructions = result.customInstructions || [];
      if (storedInstructions.length === 0) {
        chrome.storage.sync.set({ customInstructions: [ReactDeveloper, deepLearningExpert, golangLearner] });
      }
    });
  });
  