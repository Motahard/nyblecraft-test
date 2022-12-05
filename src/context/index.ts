import { createContext } from 'react';
import { INote } from '../models/notes';

export const NotesContext = createContext<[INote[], Function]>([[], ()=>{}])
export const TagsContext = createContext<[string[], Function]>([[], ()=>{}])