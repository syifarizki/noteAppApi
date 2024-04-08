const baseUrl = "https://notes-api.dicoding.dev/v2";

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

function main() {
  const loading = document.getElementById("preloader");
  window.addEventListener("load", function () {
    loading.style.display = "none";
  });

  document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector("#inputNoteTitle");
    const description = document.querySelector("#inputNoteDes");
    const noteSubmit = document.querySelector("#noteSubmit");

    noteSubmit.addEventListener("click", function () {
      const note = {
        title: title.value,
        body: description.value,
      };
      insertNote(note);
    });

    getNote();
  });
}

const insertNote = async (note) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(`${baseUrl}/notes`, options);
    const responseJson = await response.json();
    showResponseMessage(responseJson.message);
    getNote();
  } catch (error) {
    showResponseMessage(error);
  }
};

const removeNote = (noteId) => {
  fetch(`${baseUrl}/notes/${noteId}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      showResponseMessage(responseJson.message);
      getNote();
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const renderAllNotes = (notes) => {
  const listNoteElement = document.querySelector("#listNote");
  listNoteElement.innerHTML = "";

  notes.forEach((note) => {
    listNoteElement.innerHTML += `
      <div class="card">
          <h2>${note.title}</h2>
          <small>${new Date(note.createdAt).toLocaleString()}</small>
          <p>${note.body}</p>
        <div>
    <button id="delete-${
      note.id
    }" type= "button" class="button btnDelete">Delete</button>
    </div>
        </div>
    `;
  });

  const buttons = document.querySelectorAll(".btnDelete");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const noteId = event.target.id.split("-")[1];
      removeNote(noteId);
    });
  });
};

const showResponseMessage = (message = "Check your internet connection") => {
  alert(message);
};

export { main, getNote };
