import { LinksFunction, json, redirect } from "@remix-run/node";
import NewNote from "../components/NewNote";
import newNoteStyles from "../styles/new-note.css"
import noteListStyles from "../styles/note-list.css";
import { getStoredNotes, storeNotes } from "~/data/notes";
import { NotesRequest } from "~/model/NotesRequest";
import NoteList from "~/components/NoteList";
import { useLoaderData } from "@remix-run/react";

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

  if (noteData.title.length < 5) {
    return { message: "Invalid title - must be at least 5 characters long!" };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updateNotes = existingNotes.concat(noteData);
  storeNotes(updateNotes);
  // await new Promise<void>((resolve, reject) => setTimeout(() => resolve(), 2000));
  return redirect('/notes');
}

export const meta = () => {
  return [{
    title: "All Notes",
    description: "Manage you notes with ease."
  }]
}

const Notes = () => {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  )
}

export default Notes;
