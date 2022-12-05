import React, { FC } from 'react'

import AddNote from '../AddNote'
import NoteList from '../NoteList'
import SearchBar from '../SearchBar'

import { INote } from '../../models/notes'

import './style.scss'

interface IProps {
  notes: INote[];
  filteringNotes: Function
}

const Layout: FC<IProps> = ({ notes, filteringNotes }) => {
  return (
    <>
      <div className="container">
        <SearchBar notes={notes} filteringNotes={filteringNotes}/> 
        <NoteList />
      </div>
      <AddNote />
    </>
  )
}

export default Layout