import "../css/style.css";
const loading = document.getElementById("preloader");
window.addEventListener("load", function () {
  loading.style.display = "none";
});
const baseUrl = "https://notes-api.dicoding.dev/v2";

async function insertNote(note) {
  try {
    const response = await fetch(`${baseUrl}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const responseJson = await response.json();

    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      renderAllNotes(responseJson.data);
      getNote();
    }
  } catch (error) {
    showResponseMessage(error);
  }
}

const getNote = async () => {
  try {
    const response = await fetch(`${baseUrl}/notes`);
    const responseJson = await response.json();

    if (responseJson.status === "success") {
      renderAllNotes(responseJson.data);
    } else {
      showResponseMessage("Notes data not found in response.");
    }
  } catch (error) {
    showResponseMessage(error);
  }
};

// const insertNote = async (note) => {
//   try {
//     const response = await fetch(`${baseUrl}/notes`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({note}),
//     });

//     const responseJson = await response.json();

//     if (responseJson.error) {
//       showResponseMessage(responseJson.message);
//     } else {
//       getNote();
//     }
//   } catch (error) {
//     showResponseMessage(error);
//   }
// };

const removeNote = async (noteId) => {
  try {
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
      method: "DELETE",
    });
    const responseJson = await response.json();

    if (responseJson.status === "success") {
      console.log("Delete success");
      // Wait for the deletion to complete before fetching updated notes
      await getNote();
      return true;
    } else {
      throw new Error(responseJson.message);
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};



// Display all notes
const renderAllNotes = (notes) => {
  const listNoteElement = document.querySelector("#listNote");
  listNoteElement.innerHTML = "";

  const notesList = document.createElement("section");
  notesList.className = "notes_list";
  listNoteElement.appendChild(notesList);

  const headerList = document.createElement("h1");
  headerList.textContent = "NOTES LIST";
  notesList.appendChild(headerList);

  const noteListContainer = document.createElement("div");
  noteListContainer.className = "note-list-container";
  notesList.appendChild(noteListContainer);

  notes.forEach((note) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${note.title}</h2>
      <small>${new Date(note.createdAt).toLocaleString()}</small>
      <p>${note.body}</p>
      <div>
        <button id="delete-${
          note.id
        }" type="button" class="button btnDelete">Delete</button>
      </div>
    `;
    noteListContainer.appendChild(card);
  });

  // Add event listeners for delete buttons
  const deleteButtons = document.querySelectorAll(".btnDelete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const noteId = button.id.split("-")[1];
      if (confirm("Are you sure you want to delete this note?")) {
        removeNote(noteId);
      }
    });
  });
};

const showResponseMessage = (message = "Check your internet connection") => {
  alert(message);
};

document.addEventListener("DOMContentLoaded", () => {
  const addNoteElement = document.querySelector("add-note");
  addNoteElement.addEventListener("note-added", (event) => {
    insertNote(event.detail);
  });
});


// document.addEventListener("DOMContentLoaded", () => {
//  const inputNote = document.getElementById("inputNote");
//  inputNote.addEventListener("submit", (event) => {
//    event.preventDefault();
//    const noteTitle = document.getElementById("inputNoteTitle").value;
//    const noteBody = document.getElementById("inputNoteDes").value;
//    const newNote = {
//      title: noteTitle,
//      body: noteBody,
//    };
//    insertNote(newNote);
//  });
// });

export default getNote;
