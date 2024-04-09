import notesData from '../data/local/notes.js'

class ListNote extends HTMLElement {
  _shadowRoot = null
  _style = null
  _note = [
    {
      id: null,
      title: null,
      body: null,
      createdAt: null,
    },
  ]

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._style = document.createElement('style')
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ''
  }

  set note(value) {
    this._note = value

    this.render()
  }

  get note() {
    return this._note
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
          display: block;
        }

        .notes_list {
          display: grid;
          border: 1px solid black;
          border-radius: 10px;
          background-color: rgb(248, 246, 246);
          box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);
        }

        .notes_list h1 {
            text-align: center;
            font-size: 50px;
            color: #3a79ad;
            
        }
      
        .notes_list .note-list-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 40px;
            padding: 30px;
            margin-bottom: 30px;
        }
        
         .note-list-container  .card {
            width: 90%;
            height: 90%;
            background-color: white;
            border: 1px solid black;
            border-radius: 10px;
            box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);
            padding: 15px;
        }

          .note-list-container .card p {
          font-size: 18px;
        }
        
         .button {
          border-radius: 5px;
          color: white;
          font-weight: bold;
          margin: 5px;
          padding: 10px;
          border-style: none;
          cursor: pointer;
          font-size: 16px;
        }

        .btnDelete {
          background-color: #E72929;
        }
        
    `
  }

  render() {
    this._emptyContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)

    this._note.forEach((note) => {
      const listNoteElement = document.querySelector('#listNote')
      listNoteElement.innerHTML = ''

      const notesList = document.createElement('section')
      notesList.className = 'notes_list'
      listNoteElement.appendChild(notesList)

      const headerList = document.createElement('h1')
      headerList.textContent = 'NOTES LIST'
      notesList.appendChild(headerList)

      const noteListContainer = document.createElement('div')
      noteListContainer.className = 'note-list-container'
      notesList.appendChild(noteListContainer)

      const card = document.createElement('div')
      card.className = 'card'
      card.innerHTML = `
      <h2>${note.title}</h2>
      <small>${new Date(note.createdAt).toLocaleString()}</small>
      <p>${note.body}</p>
      <div>
        <button id="delete-${note.id}" type= "button" class="button btnDelete">Delete</button>
      </div>
    `

      this._shadowRoot.appendChild(card)
    })
  }
}

customElements.define('list-note', ListNote)
