import { deleteNote, getAllUserNotes, saveNote, setNewNote } from '../../firebase/provides';
import { imageUpload } from '../../helpers/cloudinaryFileUpload';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote, setImagesUrls, deleteNoteByID } from './journalSlice';

export const startCreatingNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const newNote = { title: '', body: '', date: new Date().getTime(), imagesUrls: [] };

    const { auth } = getState();
    const { uid } = auth;

    const newNoteID = await setNewNote(newNote, `${uid}/journal/notes`);

    newNote.id = newNoteID;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const notes = await getAllUserNotes(`${uid}/journal/notes`);

    // Load notes on redux store:
    dispatch(setNotes({ notes }));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    const noteToFirebase = { ...activeNote };
    delete noteToFirebase.id;

    // Save note updates on firebase
    await saveNote(noteToFirebase, `${uid}/journal/notes/${activeNote.id}`);

    // Update note on redux store for UI
    dispatch(updateNote(activeNote));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    await deleteNote(`${uid}/journal/notes/${activeNote.id}`);

    // Update redux notes store for delete visually the note
    dispatch(deleteNoteByID({ noteID: activeNote.id }));
  };
};

// ----------------- Cloudinary --------------------

export const startUploadingImagesToCloudinary = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    // Code to "launch" all promises or al image uploads at the same time instead of one to one
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(imageUpload(file));
    }

    const imagesUrls = await Promise.all(fileUploadPromises);
    // console.log(photoUrls);
    // Set the new images links to redux store
    dispatch(setImagesUrls(imagesUrls));
  };
};
