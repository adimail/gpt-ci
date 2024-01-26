chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.instruction) {
      setInstructionInTextAreas(message.instruction.user_profile);
    }
  });
  
  function setInstructionInTextAreas(userProfile) {
    const textAreas = document.querySelectorAll('textarea');
    for (const textArea of textAreas) {
      textArea.value = userProfile;
    }
  }
  