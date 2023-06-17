import { Link, useLoaderData } from "@remix-run/react";
import styles from "../styles/note-details.css";
import { LinksFunction } from "@remix-run/node";
import { getStoredNotes } from "~/data/notes";
import { NoteId } from "~/model/NoteId";
import { NotesData } from "~/model/NotesData";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: styles }
    ]
}

export const loader = async ({ params }: NoteId) => {
    const notes = await getStoredNotes();
    const noteId = params.noteId;
    const selectedNote = notes.find((note: NotesData) => note.id === noteId);
    return selectedNote;
}

export const meta = () => {
    return [{
      title: "Note Id",
      description: "Note Id details"
    }]
  }
  

const NoteDetailsPage = () => {
    const note = useLoaderData();

    return (
        <main id="note-details">
            <header>
                <nav>
                    <Link to="/notes">Back to all Notes</Link>
                </nav>
                <h1>{note.title}</h1>
            </header>
            <p id="note-details-content">{note.content}</p>
        </main>
    )
}

export default NoteDetailsPage;