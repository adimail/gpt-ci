import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import './styles.css';

class GptInstruction {
  constructor(title, user_profile, gpt_profile, description = "") {
    this.title = title;
    this.description = description;
    this.user_profile = user_profile;
    this.gpt_profile = gpt_profile;
    this.max_length = 1500;
  }
}

// POPUP FUNCTION
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
function Popup({ 
  handleImportFromJSON, 
  setEditingInstruction, 
  openEditPage, 
  deleteCustomInstruction, 
  handleExportToJSON,
  customInstructions = [] 
}) {
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedInstruction, setSelectedInstruction] = useState(null);

  const handleContextMenu = (event, instruction) => {
    event.preventDefault();
    setSelectedInstruction(instruction);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });

    const aboutYouTextArea = document.querySelector('#aboutYou');
    const responsePreferenceTextArea = document.querySelector('#responsePreference');

    if (aboutYouTextArea && responsePreferenceTextArea) {
      aboutYouTextArea.value = instruction.user_profile;
      responsePreferenceTextArea.value = instruction.gpt_profile;
    }

    const textAreas = document.querySelectorAll('textarea');
    for (const textArea of textAreas) {
      textArea.value = instruction.user_profile;
    }
  };


  const handleEdit = () => {
    console.log("Edit clicked for:", selectedInstruction);
    const updatedInstruction = { ...selectedInstruction, lastEditedDate: new Date() };
    setEditingInstruction(updatedInstruction);
    openEditPage();
  };  

  const handleDeleteFunction = () => {
    console.log("Delete clicked for:", selectedInstruction);
    deleteCustomInstruction(selectedInstruction);
    setSelectedInstruction(null);
  };

  const handleCreateNew = () => {
    openEditPage();
  };

  const handleDoubleClick = (instruction) => {
    setEditingInstruction(instruction);
    openEditPage();
  };

  return (
    <div className="popup">
      <h1 className="heading">GPT Custom Instructions</h1>
      <p style={{ color: '#fff'}}>Total saved instructions: {customInstructions.length}</p>
      <div className="scrollable-div">
        {customInstructions.map((obj, index) => (
          <div key={index} onContextMenu={(e) => handleContextMenu(e, obj)}>
            <button className="cibutton" onDoubleClick={() => handleDoubleClick(obj)}>
              <div className="title">{obj.title}</div>
              <div className="description">{obj.description}</div>
            </button>
          </div>
        ))}
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="button" onClick={handleCreateNew}>
          Create new
        </button>
        <button className="button" onClick={handleExportToJSON}>
          Export to JSON
        </button>
      
        <input
          type="file"
          accept=".json"
          onChange={handleImportFromJSON}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="button">
          Import from JSON
        </label>
      </div>

      {selectedInstruction && (
        <div style={{ position: 'fixed', top: contextMenuPosition.y, left: contextMenuPosition.x, background: 'white', display: "flex", flexDirection: "column", border: '1px solid #ccc', borderRadius: '4px', padding: '4px', margin:"5px", zIndex: 999 }}>
          <button style={{border:"none"}} onClick={handleEdit}>Edit</button>
          <button style={{border:"none"}} onClick={handleDeleteFunction}>Delete</button>
        </div>
      )}
    </div>
  );
}

// CUSTOM INSTRUCTION FUNCTION
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
function CustomInstructionMenu({ onClose, addCustomInstruction, customInstruction }) {
  const [title, setTitle] = useState(customInstruction ? customInstruction.title : "");
  const [description, setDescription] = useState(customInstruction ? customInstruction.description : "");
  const [aboutYou, setAboutYou] = useState(customInstruction ? customInstruction.user_profile : "");
  const [responsePreference, setResponsePreference] = useState(customInstruction ? customInstruction.gpt_profile : "");

  const handleSave = () => {
    console.log("About You:", aboutYou);
    console.log("Response Preference:", responsePreference);
  
    const newInstruction = {
      title: title,
      description: description,
      user_profile: aboutYou,
      gpt_profile: responsePreference,
    };
  
    addCustomInstruction(newInstruction);
    onClose();
  };
  
  const isFormValid = () => {
    console.log('Checking form validity...');
    return title.trim() !== '' && aboutYou.trim() !== '' && responsePreference.trim() !== '';
  };
  

  return (
    <div className="popup">
      <label htmlFor="title" className="label">Title</label>
      <input type="text" id="title" name="title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label htmlFor="description" className="label">Description (Optional)</label>
      <input type="text" id="description" name="description" className="input" value={description} onChange={(e) => setDescription(e.target.value)} />

      <label htmlFor="aboutYou" className="label">What would you like ChatGPT to know about you to provide better responses?</label>
      <textarea style={{ resize: 'vertical' }} id="aboutYou" name="aboutYou" className="textarea" value={aboutYou} onChange={(e) => setAboutYou(e.target.value)}></textarea>

      <label htmlFor="responsePreference" className="label">How would you like ChatGPT to respond?</label>
      <textarea style={{ resize: 'vertical' }} id="responsePreference" name="responsePreference" className="textarea" value={responsePreference} onChange={(e) => setResponsePreference(e.target.value)}></textarea>
      
      <br />
      <div className="button-container">
        <button className="button" onClick={handleSave} disabled={!isFormValid()}>
          Save
        </button>
        <button className="button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

// APP ENTRY-POINT
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
function App() {
  const [customInstructions, setCustomInstructions] = useState([]);
  const [currentPage, setcurrentPage] = useState("Popup");
  const [editingInstruction, setEditingInstruction] = useState(null);

  const deleteCustomInstruction = (instructionToDelete) => {
    chrome.storage.sync.get(['customInstructions'], (result) => {
      const storedInstructions = result.customInstructions || [];
      const updatedInstructions = storedInstructions.filter(
        (instruction) => instruction.title !== instructionToDelete.title
      );
  
      chrome.storage.sync.set({ customInstructions: updatedInstructions }, () => {
        setCustomInstructions(updatedInstructions);
      });
    });
  };
  

  const loadCustomInstructionsFromStorage = () => {
    chrome.storage.sync.get(['customInstructions'], (result) => {
      const storedInstructions = result.customInstructions || [];
      setCustomInstructions(storedInstructions);
    });
  };  

  useEffect(() => {
    loadCustomInstructionsFromStorage();
  }, []);

  const addCustomInstruction = (newInstruction) => {
    chrome.storage.sync.get(['customInstructions'], (result) => {
      const storedInstructions = result.customInstructions || [];
  
      const updatedInstructions = editingInstruction
        ? storedInstructions.map((instruction) =>
            instruction.title === editingInstruction.title
              ? { ...instruction, ...newInstruction, lastEditedDate: new Date() }
              : instruction
          )
        : [
            ...storedInstructions,
            {
              ...newInstruction,
              createdDate: new Date(),
              lastEditedDate: new Date(),
            },
          ];
  
      chrome.storage.sync.set({ customInstructions: updatedInstructions }, () => {
        setCustomInstructions(updatedInstructions);
        setEditingInstruction(null);
        closeEditPage();
      });
    });
  };
  
  
  
  const openEditPage = () => {
    setcurrentPage("CustomInstructionMenu")
  }

  const closeEditPage = () => {
    setcurrentPage("Popup")
  }

  const handleExportToJSON = () => {
    const orderedInstructions = customInstructions.map(({ title, description, user_profile, gpt_profile, createdDate, lastEditedDate }) => ({
      title,
      description,
      user_profile,
      gpt_profile,
      createdDate,
      lastEditedDate,
    }));
  
    const jsonContent = JSON.stringify(orderedInstructions, null, 2);
  
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customInstructions.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportFromJSON = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];
  
    if (!file) {
      console.error("No file selected.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedInstructions = JSON.parse(e.target.result);
  
        if (Array.isArray(importedInstructions)) {
          const uniqueImportedInstructions = importedInstructions.filter((importedInstr) => {
            return !customInstructions.some((existingInstr) =>
              areInstructionsEqual(existingInstr, importedInstr)
            );
          });
  
          if (uniqueImportedInstructions.length > 0) {
            const mergedInstructions = [...customInstructions, ...uniqueImportedInstructions];
            setCustomInstructions(mergedInstructions);
            chrome.storage.sync.set({ customInstructions: mergedInstructions });
          } else {
            console.error("All imported instructions are duplicates.");
          }
        } else {
          console.error("Invalid JSON format. Expected an array.");
        }
      } catch (error) {
        console.error("Error parsing JSON file.", error);
      }
  
      fileInput.value = "";
    };
  
    reader.readAsText(file);
  };
  
  // Helper function
  const areInstructionsEqual = (instr1, instr2) => {
    return (
      instr1.title === instr2.title &&
      instr1.description === instr2.description &&
      instr1.user_profile === instr2.user_profile &&
      instr1.gpt_profile === instr2.gpt_profile
    );
  };
  
  return (
    <div>
      {currentPage === "Popup" && 
        <Popup 
          customInstructions={customInstructions} 
          deleteCustomInstruction={deleteCustomInstruction}
          openEditPage={openEditPage}
          setEditingInstruction={setEditingInstruction}
          handleImportFromJSON={handleImportFromJSON}
          handleExportToJSON={handleExportToJSON}
        />
      }
      {currentPage === "CustomInstructionMenu" && 
        <CustomInstructionMenu 
          onClose={closeEditPage}
          addCustomInstruction={addCustomInstruction}
          customInstruction={editingInstruction}
        />
      }
    </div>
  );
}

render(<App />, document.getElementById("react-target"));
