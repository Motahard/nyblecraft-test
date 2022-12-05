import React, { useContext } from 'react'
import { NotesContext } from '../../context'
import NoteItem from '../NoteItem'
import './style.scss'

const NoteList = () => {
  const [notes, handleNotesChange] = useContext(NotesContext)
  return (
    <div className='note-list'>
      {notes.map(note => (
        <NoteItem key={note.id} note={note} handleNotesChange={handleNotesChange}/>
      ))}
    </div>
  )
}

export default NoteList
