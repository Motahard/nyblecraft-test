import { INote } from "../models/notes";

export const getNotesFromLocalStorage = (): INote[] | null => {
    const data = localStorage.getItem("notes")
    let notes: INote[] | null = null
    if (data) notes = JSON.parse(data)
    return notes
}

export const setNotesToLocalStorage = (notes: INote[]): void => {
    const data = JSON.stringify(notes)
    localStorage.setItem("notes", data)
}

export const getTagsFromLocalStorage = (): string[] | null => {
    const data = localStorage.getItem("tags")
    let tags: string[] | null = null
    if (data) tags = JSON.parse(data)
    return tags
}

export const setTagsToLocalStorage = (tags: string[]): void => {
    const data = JSON.stringify(tags)
    localStorage.setItem("tags", data)
}