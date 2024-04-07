import "./js/components/index.js";
import notesData from "./js/data/local/notes.js";
import "./css/style.css";
import main from "./js/main.js";

main();

const listNote = document.querySelector("list-note");
listNote.note = notesData;

document.querySelector("add-note").addEventListener("note-added", (event) => {
  notesData.push(event.detail);

  const listNote = document.querySelector("list-note");
  listNote.note = notesData;
});
