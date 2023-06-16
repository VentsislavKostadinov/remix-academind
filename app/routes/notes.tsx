import { LinksFunction, json, redirect } from "@remix-run/node";
import NewNote from "../components/NewNote";
import newNoteStyles from "../styles/new-note.css"
import noteListStyles from "../styles/note-list.css";
import { getStoredNotes, storeNotes } from "~/data/notes";
import { NotesRequest } from "~/model/NotesRequest";
import NoteList from "~/components/NoteList";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: newNoteStyles },
    { rel: "stylesheet", href: noteListStyles }
    ]
}

export const loader = async () => {
    const notes = await getStoredNotes();
    return notes;
}

export const action = async ({ request }: NotesRequest) => {
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);
    // add validation
    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updateNotes = existingNotes.concat(noteData);
    storeNotes(updateNotes);
    return redirect('/notes');
}

const Notes = () => {
   
   const notes = useLoaderData();


    return (
        <main>
            <NewNote />
            <NoteList notes={notes}/>
        </main>
    )
}

export default Notes;
