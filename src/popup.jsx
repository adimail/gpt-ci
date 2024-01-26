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

let ReactDeveloper = new GptInstruction(
  "React Developer",
  "I am an student learning frontend development. I have previous experience in typescript javascript and python. ",
  "You are an react developer with a decade year of experience and you have built multiple products using react and you have worked in companies like Facebook stripe Microsoft.",
  "For learning frontend development"
);

let deepLearningExpert = new GptInstruction(
  "Deep Learning Expert",
  "I am a seasoned professional specializing in deep learning and artificial intelligence.",
  "You are a highly skilled deep learning expert with decades of experience.",
  "deep learning (tf and cnn)"
);

let golangLearner = new GptInstruction(
  "Golang",
  "I am an enthusiastic learner Go programming language from scratch. I have previous background of C++ and python.",
  "You are a go developer with many years of experience and knows all best practices for programming in golang, including concurrency, code structure. For deepening my understanding of Go, provide code examples for common challenges, and ensure the programs are optimized. Share insights on best practices, concurrency, and effective use of Go features.",
  "For learning go"
);


// POPUP FUNCTION
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
function Popup({setEditingInstruction, openEditPage , deleteCustomInstruction, customInstructions = []}) {
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedInstruction, setSelectedInstruction] = useState(null);

  const handleContextMenu = (event, instruction) => {
    event.preventDefault();
    setSelectedInstruction(instruction);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };


  const handleEdit = () => {
    console.log("Edit clicked for:", selectedInstruction);
    setEditingInstruction(selectedInstruction);
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

  return (
    <div className="popup">
      <h1 className="heading">GPT Custom Instructions</h1>
      <p style={{ color: '#fff'}}>Total saved instructions: {customInstructions.length}</p>
      <div className="scrollable-div">
        {customInstructions.map((obj, index) => (
          <div key={index} onContextMenu={(e) => handleContextMenu(e, obj)}>
            <button className="cibutton">
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
      <textarea id="aboutYou" name="aboutYou" className="textarea" value={aboutYou} onChange={(e) => setAboutYou(e.target.value)}></textarea>

      <label htmlFor="responsePreference" className="label">How would you like ChatGPT to respond?</label>
      <textarea id="responsePreference" name="responsePreference" className="textarea" value={responsePreference} onChange={(e) => setResponsePreference(e.target.value)}></textarea>
      
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

function App() {
  const [customInstructions, setCustomInstructions] = useState([
    ReactDeveloper,
    deepLearningExpert,
    golangLearner
  ]);
  const [currentPage, setcurrentPage] = useState("Popup");
  const [editingInstruction, setEditingInstruction] = useState(null);

  const deleteCustomInstruction = (instructionToDelete) => {
    chrome.storage.sync.get(['customInstructions'], (result) => {
      const storedInstructions = result.customInstructions || [];
      const updatedInstructions = storedInstructions.filter((instruction) => instruction !== instructionToDelete);

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
            instruction === editingInstruction ? { ...instruction, ...newInstruction } : instruction
          )
        : [...storedInstructions, newInstruction];

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

  return (
    <div>
      {currentPage === "Popup" && 
        <Popup 
          customInstructions={customInstructions} 
          deleteCustomInstruction={deleteCustomInstruction}
          openEditPage={openEditPage}
          setEditingInstruction={setEditingInstruction}
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
