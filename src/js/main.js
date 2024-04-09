import '../css/style.css'
import './components/index.js'
import { animate, scroll } from 'motion'

//  MOTION
document.querySelectorAll('main').forEach((item) => {
  scroll(animate(item, { opacity: [0, 1, 1, 0] }), {
    target: item,
    offset: ['start end', 'end end', 'start start', 'end start'],
  })
})

const baseUrl = 'https://notes-api.dicoding.dev/v2'

// GET NOTE
const getNote = async () => {
  try {
    const response = await fetch(`${baseUrl}/notes`)
    const responseJson = await response.json()

    if (responseJson.status === 'success') {
      renderAllNotes(responseJson.data)
    } else {
      showResponseMessage('Notes data not found in response.')
    }
  } catch (error) {
    showResponseMessage(error)
  }
}

// INSERT NOTE
async function insertNote(note) {
  try {
    const response = await fetch(`${baseUrl}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })

    const responseJson = await response.json()

    if (responseJson.error) {
      showResponseMessage(responseJson.message)
    } else {
      getNote()
    }
  } catch (error) {
    showResponseMessage(error)
  }
}

// REMOVE NOTE
const removeNote = async (noteId) => {
  try {
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
      method: 'DELETE',
    })
    const responseJson = await response.json()

    if (responseJson.status === 'success') {
      console.log('Delete success')
      await getNote()
      return true
    } else {
      throw new Error(responseJson.message)
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

// DISPLAY ALL NOTES
const renderAllNotes = (notes) => {
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

  notes.forEach((note) => {
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
      <h2>${note.title}</h2>
      <small>${new Date(note.createdAt).toLocaleString()}</small>
      <p>${note.body}</p>
      <div>
        <button id="${note.id}" type="button" class="button btnDelete">Delete</button>
      </div>
    `
    noteListContainer.appendChild(card)
  })

  // ADD EVENT LISTENERS FOR DELETE BUTTONS
  const deleteButtons = document.querySelectorAll('.btnDelete')
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          const buttonId = button.id
          removeNote(buttonId)
          Swal.fire({
            title: 'Deleted!',
            text: 'Your note has been deleted.',
            icon: 'success',
          })
        }
      })
    })
  })
}

const showResponseMessage = (message = 'Check your internet connection') => {
  alert(message)
}

// ADD EVENT LISTENERS FOR SUBMIT BUTTON
document.addEventListener('DOMContentLoaded', () => {
  const addNoteElement = document.querySelector('add-note')
  addNoteElement.addEventListener('note-added', (event) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Note Saved Successfully',
      showConfirmButton: false,
      timer: 1500,
    })
    insertNote(event.detail)
  })
})

// PRELOADER
showPreloader()
function showPreloader() {
  const preloader = document.createElement('pre-loading')
  document.body.appendChild(preloader)

  setTimeout(() => {
    hidePreloader()
  }, 2000)
}

function hidePreloader() {
  const preloader = document.querySelector('pre-loading')
  if (preloader) {
    preloader.remove()
  }
}

export default getNote
