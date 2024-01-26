import React, { useState } from "react";
import { render } from "react-dom";

const popupStyle = {
  padding: '5px 5px',
  width: '380px',
};

const headingStyle = {
  color: '#158c6f',
  textAlign: 'center',
};

const inputStyle = {
  width: "100%",
  marginBottom: "16px",
  padding: "8px",
  borderRadius: "4px",
  boxSizing: "border-box",
};

const labelStyle = {
  color: "white",
  marginBottom: "8px",
  display: "block",
};

const textareaStyle = {
  width: "100%",
  height: "100px",
  marginBottom: "16px",
  padding: "8px",
  borderRadius: "4px",
  boxSizing: "border-box",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
};

const buttonStyle = {
  marginLeft: "8px",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  backgroundColor: "#4a6f9e",
  color: "white",
  border: "none",
};

const scrollableDivStyle = {
  maxHeight: '158px',
  overflowY: 'auto',
  scrollbarColor: 'white #363636',
  scrollbarWidth: 'thin',
  scrollbarThumbRadius: '8px', 
  scrollbarTrackWidth: '0',
  scrollbarThumbBackground: '#363636',
  scrollbarButtonDisplay: 'none',
};

const cibuttonStyle = {
  width: '95%',
  textAlign: 'left',
  padding: '6px 12px',
  marginBottom: '6px',
  backgroundColor: '#158c6f',
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  overflow: 'hidden',
};

const titleStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '4px',
};

const descriptionStyle = {
  fontSize: '10px',
};

function gpt_ci(title, user_profile, gpt_profile, description="") {
  this.title = title;
  this.description = description;
  this.user_profile = user_profile;
  this.gpt_profile = gpt_profile;
  this.max_tength = 1500;
}

let ReactDeveloper = new gpt_ci(
  "React Developer", 
  "I am an student learning frontend development. I have previous experience in typescript javascript and python. ", 
  "You are an react developer with a decade year of experience and you have built multiple products using react and you have worked in companies like Facebook stripe Microsoft.", 
  "For learning frontend development");

let deepLearningExpert = new gpt_ci(
  "Deep Learning Expert",
  "I am a seasoned professional specializing in deep learning and artificial intelligence.",
  "You are a highly skilled deep learning expert with decades of experience.",
  "deep learning (tf and cnn)"
);

let golangLearner = new gpt_ci(
  "Golang",
  "I am an enthusiastic learner Go programming language from scratch. I have previous background of C++ and python.",
  "You are a go developer with many years of experience and knows all best practices for programming in golang, including concurrency, code scructure. For deepening my understanding of Go, provide code examples for common challenges, and ensure the programs are optimized. Share insights on best practices, concurrency, and effective use of Go features.",
  "For learning go"
);


// POPUP FUNCTION
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
function Popup({customInstructions = []}) {
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedInstruction, setSelectedInstruction] = useState(null);

  const handleContextMenu = (event, instruction) => {
    event.preventDefault();
    setSelectedInstruction(instruction);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleEdit = () => {
    console.log("Edit clicked for:", selectedInstruction);
    setSelectedInstruction(null);
  };

  const handleDelete = () => {
    console.log("Delete clicked for:", selectedInstruction);
    setSelectedInstruction(null);
  };

  return (
    <div style={popupStyle}>
      <h1 style={headingStyle}>GPT Custom Instructions</h1>
      <p style={{ color: '#fff'}}>Total saved instructions: {customInstructions.length}</p>
      <div style={scrollableDivStyle}>
        {customInstructions.map((obj, index) => (
          <div key={index} onContextMenu={(e) => handleContextMenu(e, obj)}>
            <button style={cibuttonStyle}>
              <div style={titleStyle}>{obj.title}</div>
              <div style={descriptionStyle}>{obj.description}</div>
            </button>
          </div>
        ))}
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end"}}>
        <button style={buttonStyle}>Create new</button>
      </div>

      {selectedInstruction && (
        <div style={{ position: 'fixed', top: contextMenuPosition.y, left: contextMenuPosition.x, background: 'white', display: "flex", flexDirection: "column", border: '1px solid #ccc', borderRadius: '4px', padding: '4px', margin:"5px", zIndex: 999 }}>
          <button style={{border:"none"}} onClick={handleEdit}>Edit</button>
          <button style={{border:"none"}} onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

// CUSTOM INSTRUCTION FUNCTION
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
function CustomInstructionMenu(obj) {
  return (
    <div style={popupStyle}>
      <label htmlFor="title" style={labelStyle}>Title</label>
      <input type="text" id="title" name="title" style={inputStyle} />

      <label htmlFor="description" style={labelStyle}>Description (Optional)</label>
      <input type="text" id="description" name="description" style={inputStyle} />

      <label htmlFor="aboutYou" style={labelStyle}>What would you like ChatGPT to know about you to provide better responses?</label>
      <textarea id="aboutYou" name="aboutYou" style={textareaStyle}></textarea>

      <label htmlFor="responsePreference" style={labelStyle}>How would you like ChatGPT to respond?</label>
      <textarea id="responsePreference" name="responsePreference" style={textareaStyle}></textarea>
      
      <br />
      <div style={buttonContainerStyle}>
        <button style={buttonStyle}>Save</button>
        <button style={buttonStyle}>Cancel</button>
      </div>
    </div>
  );
}


function App() {
  const [customInstructions, setCustomInstructions] = useState([
    golangLearner,
    ReactDeveloper,
    deepLearningExpert,
  ]);

  const [selectedInstruction, setSelectedInstruction] = useState(null);
  const [currentPage, setcurrentPage] = useState("Popup");

  const addCustomInstruction = (newInstruction) => {
    setCustomInstructions((prevInstructions) => [...prevInstructions, newInstruction]);
  };

  const deleteCustomInstruction = (instructionToDelete) => {
    setCustomInstructions((prevInstructions) =>
      prevInstructions.filter((instruction) => instruction !== instructionToDelete)
    );
  };

  const editCustomInstruction = (editedInstruction) => {
    setCustomInstructions((prevInstructions) =>
      prevInstructions.map((instruction) =>
        instruction === selectedInstruction ? editedInstruction : instruction
      )
    );
  };

  const handleEdit = () => {
    console.log("Edit clicked for:", selectedInstruction);
  };

  const changePage = (newPage) => {
    setcurrentPage(newPage);
  };

  const handleDelete = () => {
    console.log("Delete clicked for:", selectedInstruction);
    deleteCustomInstruction(selectedInstruction);
    setSelectedInstruction(null);
  };

  return (
    <div>
      {currentPage === "Popup" && 
        <Popup 
          customInstructions={customInstructions} 
          
        />
        }
      {currentPage === "CustomInstructionMenu" && 
        <CustomInstructionMenu />
        }
    </div>
  );
}


render(<App />, document.getElementById("react-target"));
