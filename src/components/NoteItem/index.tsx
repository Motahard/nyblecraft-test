import React, { FC, MouseEvent, useState, ChangeEventHandler, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { TagsContext } from '../../context';

import Modal from '../Modal';
import TagList from '../TagList'
import ModalTitle from '../ModalTitle'
import TextareaGroup from '../TextareaGroup'

import { searchEnteredTags } from '../../utils/tags.utils';
import { INote } from '../../models/notes'

import './style.scss'

interface IProps {
  note: INote;
  handleNotesChange: Function;
}

const NoteItem: FC<IProps> = ({ note, handleNotesChange }) => {
  const [, handleTagsChange] = useContext(TagsContext)
  const { tags, description } = note
  const [isOpen, setIsOpen] = useState(false)
  const [currentDescription, setCurrentDescription] = useState(description)
  const [currentTags, setCurrentTags] = useState<string[]>(tags)

  const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
    const idButton = e.currentTarget.id
    switch(idButton) {
      case 'edit':
        handleEditNote()
        break;
      case 'delete': 
        handleNotesChange(note, 'delete')
    }
  }

  const handleEditNote = () => {
    setIsOpen(true)
  }

  const onDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const { value } = e.target
    setCurrentDescription(value)
    if (value === '' || !value.includes('#')) setCurrentTags([])
    const enteredTags = searchEnteredTags(value)
    if(enteredTags.length > 0) setCurrentTags(enteredTags)
  }

  const handleSave = () => {
    if(currentDescription.length < 5) return
    const editedNote = {
      ...note,
      description: currentDescription,
      tags: currentTags
    }
    
    const uniqTags = Array.from(new Set(tags))
    const uniqCurrentTags = Array.from(new Set(currentTags))

    const filteredDeleted = uniqTags.filter(i => !uniqCurrentTags.includes(i))
    const filteredVarios = uniqCurrentTags.filter(i => !uniqTags.includes(i))

    if (filteredDeleted.length > 0)  handleTagsChange(filteredDeleted, 'delete')

    handleTagsChange(filteredVarios)
    handleNotesChange(editedNote, 'edit')
    setIsOpen(false)
  }

  const handleCancel = () => {
    setCurrentDescription(description)
    setCurrentTags(tags)
    setIsOpen(false)
  }

  return (
    <div className='note-item'>
      <div className="note-item-content">
        <p>{note.description}</p>
        <div className="action-button-container">
          <span id='edit' onClick={handleClick}>
            <FontAwesomeIcon  icon={faEdit} />
          </span>
          <span id='delete' onClick={handleClick}>
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
        <i className="fa-solid fa-file-pen"></i>
      </div>
      <TagList tags={note.tags}/>
      <Modal isOpen={isOpen} handleClose={handleCancel}>
      <ModalTitle title='Editing a note'/>
        <TextareaGroup 
          name='description' 
          description='Description' 
          value={currentDescription} 
          handleChange={onDescriptionChange}
        />
        <TagList tags={currentTags} color='white'/>
        <div className='button-container'>
          <button className='button button-save' onClick={handleSave}>Save</button>
          <button className='button button-cancel' onClick={handleCancel}>Cancel</button>
        </div>
      </Modal>
    </div>
  )
}

export default NoteItem