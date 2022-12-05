import React, { useState, FC, useContext, ChangeEventHandler } from 'react'
import { TagsContext } from '../../context';
import TagList from '../TagList';
import { INote } from '../../models/notes';
import './style.scss'

interface IProps {
  notes: INote[];
  filteringNotes: Function
}

const SearchBar: FC<IProps> = ({ notes, filteringNotes }) => {
  const [searchText, setSearchText] = useState('')
  const [tags, _] = useContext(TagsContext)

  const handleChangeSearch:  ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value)
    const filteredNotes: INote[] = []
    notes.forEach(note => {
      const foundedNoteTags = note.tags.find(tag => tag.includes(e.target.value))
      if (foundedNoteTags) filteredNotes.push(note)
    })
    filteringNotes(filteredNotes)
  }

  return (
    <div className='search-bar'>
      <input type="text" value={searchText} onChange={handleChangeSearch} placeholder='Enter a tag name for filtering...'/>
      <TagList tags={tags}/>
    </div>
  )
}

export default SearchBar