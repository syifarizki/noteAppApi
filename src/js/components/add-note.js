class AddNote extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }
            
      .input_section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8%;
      }

      .input_section .form_note {
        border: 1px solid black;
        border-radius: 10px;
        background-color: rgb(248, 246, 246);
        box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);
        width: 600px;
        height: 380px;
        padding: 20px;
        margin-top: 50px;
      }

      .input_section  h2 {
        text-align: center;
        color: #3a79ad;
        margin-bottom: 15px;
        margin-top: 5px;
        font-size: 40px;
      }

      .input_section  form  .input {
        margin: 18px 0;
      }

      .input_section  form  button {
        background-color: #9bb0c1;
        color: black;
        border: 0;
        font-size: 18px;
        font-weight: 600;
        border-radius: 5px;
        display: block;
        width: 100%;
        padding: 8px;
        cursor: pointer;
      }

      .input_section  form  .input  input {
        display: block;
        width: 90%;
        height: 25px;
        padding: 8px;
        border-radius: 5px;
        margin-top: 10px;
        margin-left: 20px;
      }

      .input_section  form  .input  textarea {
        display: block;
        width: 90%;
        height: 100px;
        padding: 8px;
        border-radius: 5px;
        margin-top: 10px;
        margin-left: 20px;
      }
      .input_section  form  .input  label {
        color: #3a79ad;
        font-weight: bold;
        margin-left: 5px;
        font-size: 17px;
        margin-left: 20px;
      }

      @media screen and (max-width: 768px) {
   .input_section{
        padding-top: 20%;
    }

    
  }

  @media screen and (max-width: 576px) {
    .input_section {
        padding-top: 30%;
    }

    .input_section .form_note {
      width: 70%;
    }

    .input_section  form  .input  input {
      margin-left : 5px;
    }

    .input_section  form  .input  label {
      margin-left : 5px;
    }

    .input_section  form  .input  textarea {
       margin-left : 5px;
    }
  }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
    this._shadowRoot
      .querySelector("#inputNote")
      .addEventListener("submit", this._noteSubmit.bind(this));
  }

  _noteSubmit(event) {
    event.preventDefault();

    const title = this._shadowRoot.querySelector("#inputNoteTitle").value;
    const description = this._shadowRoot.querySelector("#inputNoteDes").value;

    const newNote = {
      id: `notes-${Math.random().toString(36).substring(2, 9)}`,
      title: title,
      body: description,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.dispatchEvent(new CustomEvent("note-added", { detail: newNote }));

    this._shadowRoot.querySelector("#inputNoteTitle").value = "";
    this._shadowRoot.querySelector("#inputNoteDes").value = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
       <section class="input_section" id="addNote">
        <div class="form_note">
          <h2>ADD NOTE</h2>
          <form id="inputNote">
            <div class="input">
              <label for="inputNoteTitle">Title</label>
              <input
                id="inputNoteTitle"
                name="inputNoteTitle"
                type="text"
                required
                placeholder="Title..."
              />
            </div>
            <div class="input">
              <label for="inputNoteDes">Description</label>
              <textarea
                name="inputNoteDes"
                id="inputNoteDes"
                placeholder="Description..."
                required
              ></textarea>
            </div>
            <button id="noteSubmit" type="submit">Add Note</button>
          </form>
        </div>
      </section>
    `;
  }
}
customElements.define("add-note", AddNote);
