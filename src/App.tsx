import React, { Component } from 'react';

import Layout from './components/Layout';
import { NotesContext, TagsContext } from './context'
import { getNotesFromLocalStorage, getTagsFromLocalStorage, setNotesToLocalStorage, setTagsToLocalStorage } from './utils/localstorage.utils';

import Notes from './mock/notes.json'
import Tags from './mock/tags.json'
import { INote } from './models/notes';

import './App.scss'

interface IProps {}
interface IState {
  notes: INote[];
  notesToShow: INote[];
  tags: string[];
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      notes: [],
      notesToShow: [],
      tags: []
    }
  }
  componentDidMount(): void {
    let notesMock: INote[];
    let tagsMock: string[];

    const notesLS = getNotesFromLocalStorage()
    const tagsLS = getTagsFromLocalStorage()

    if(notesLS) notesMock = notesLS
    else notesMock = Notes.notes
    if(tagsLS) tagsMock = tagsLS
    else tagsMock = Tags.tags

    this.setState({
      notes: notesMock,
      notesToShow: notesMock,
      tags: tagsMock
    })
  }

  componentDidUpdate(): void {
    setNotesToLocalStorage(this.state.notes)
    setTagsToLocalStorage(this.state.tags)
  }

  handleTagsChange = (newTags: string[], operation: string): void => {
    if(operation && operation === 'delete') {
      newTags.forEach(newTag => {
        this.setState(prevState => {
          const { tags,  } = prevState
          const filteredTags = tags.filter(tag => tag !== newTag)
          return {
            ...prevState,
            tags: [...filteredTags]
          }
        })
      })
      return
    }

    this.setState(prevState => {
      const { tags } = prevState
      newTags.forEach(newTag => {
        !tags.includes(newTag) && tags.push(newTag) 
      })

      return {
        ...prevState,
        tags: [...tags]
      }
    })
  }
  handleNotesChange = (note: INote, operation: string): void => {
    switch(operation) {
      case 'add':
        this.setState(prevState => {
          const { notes } = prevState
          return {
            ...prevState,
            notes: [...notes, note],
            notesToShow: [...notes, note],
          }
        })
        break
      case 'edit':
        this.setState(prevState => {
          const { notes } = prevState
          const filteredNotes = notes.map(n => n.id === note.id ? note: n)
          return {
            ...prevState,
            notes: filteredNotes,
            notesToShow: filteredNotes
          }
        })
        break
      case 'delete':
        this.setState(prevState => {
          const { notes } = prevState
          let { tags } = prevState
          const filteredNotes = notes.filter(n => n.id !== note.id)
          if (filteredNotes.length === 0) tags = []

          note.tags.forEach(tagOfDeletingNote => {
            let includesTag = false
            filteredNotes.forEach(n => {
              if(n.tags.includes(tagOfDeletingNote)) {
                includesTag = true
              } 
            })
            if (!includesTag) {
              tags = tags.filter(tag => tag !== tagOfDeletingNote)
            } else includesTag = false
          })

          return {
            tags,
            notes: filteredNotes,
            notesToShow: filteredNotes
          }
        })
        break
      default:
        return
    }
  }

  filteringNotes = (newNotes: INote[]) => {
    this.setState(prevState => ({
      ...prevState,
      notesToShow: newNotes
    }))
  }

  render(): React.ReactNode {
    const { tags, notesToShow, notes } = this.state
    return (
      <>
      <NotesContext.Provider value={[notesToShow, this.handleNotesChange]}>
        <TagsContext.Provider value={[tags, this.handleTagsChange]}>
          <Layout notes={notes} filteringNotes={this.filteringNotes}/>
        </TagsContext.Provider>
      </NotesContext.Provider>
      </>
    );
  }
}

export default App;