import React, { useState, ChangeEventHandler, useContext } from 'react'
import { v4 as uuid  } from 'uuid'
import { NotesContext, TagsContext } from '../../context'

import TextareaGroup from '../TextareaGroup'
import Modal from '../Modal'
import ModalTitle from '../ModalTitle'
import TagList from '../TagList'

import { searchEnteredTags } from '../../utils/tags.utils'

import './style.scss'

const AddNote = () => {
  const [, handleNotesChange] = useContext(NotesContext)
  const [, handleTagsChange] = useContext(TagsContext)
  const [isOpen, setIsOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const handleAddNote = () => {
    setIsOpen(true)
  }

  const onDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const { value } = e.target
    setDescription(value)
    if (value === '' || !value.includes('#')) setTags([])
    const enteredTags = searchEnteredTags(value)
    if(enteredTags.length > 0) setTags(enteredTags)
  }

  const handleSave = () => {
    if(description.length < 5) return
    const newNote = {
      id: uuid(),
      description,
      tags
    }
    handleNotesChange(newNote, 'add')
    handleTagsChange(tags)
    handleCancel()
  }

  const handleCancel = () => {
    setIsOpen(false)
    setDescription('')
    setTags([])
  }

  return (
    <div className='add-note'>
      <button className='add-note-button' onClick={handleAddNote}>+</button>
      <Modal isOpen={isOpen} handleClose={handleCancel}>
        <ModalTitle title='Adding a new note'/>
        <TextareaGroup 
          name='description' 
          description='Description' 
          value={description} 
          handleChange={onDescriptionChange}
        />
        <TagList tags={tags} color='white'/>
        <div className='button-container'>
          <button className='button button-save' onClick={handleSave}>Save</button>
          <button className='button button-cancel' onClick={handleCancel}>Cancel</button>
        </div>
      </Modal>
    </div>
  )
}

export default AddNote