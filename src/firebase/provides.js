import { firebaseAuth, firestoreDB } from './config';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore/lite';

// -----------------------------------------------------------------
// Auth

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;

    const { uid, displayName, email, photoURL } = user;

    return {
      ok: true,
      uid,
      displayName,
      email,
      photoURL,
    };
  } catch (error) {
    const { code, message } = error;

    return { ok: false, code, message };
  }
};

export const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, githubProvider);

    const user = result.user;

    const { uid, displayName, email, photoURL } = user;

    return {
      ok: true,
      uid,
      displayName,
      email,
      photoURL,
    };
  } catch (error) {
    const { code, message } = error;
    return { ok: false, code, message };
  }
};

export const registerUserWithEmailAndPassword = async ({ displayName, email, password }) => {
  try {
    const response = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const user = response.user;

    // Update user displayName on firebase
    await updateProfile(firebaseAuth.currentUser, { displayName });

    const { uid, photoURL } = user;

    return {
      ok: true,
      uid,
      email,
      displayName,
      photoURL,
    };
    //
  } catch (error) {
    console.log({ error });
    let { code, message } = error;

    if (code === 'auth/email-already-in-use') message = 'Email is already in use !';

    return { ok: false, code, message };
  }
};

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(firebaseAuth, email, password);

    const { uid, displayName, photoURL } = response.user;

    return {
      ok: true,
      uid,
      email,
      displayName,
      photoURL,
    };
  } catch (error) {
    // console.log({ error });
    let { code, message } = error;

    if (code === 'auth/wrong-password') {
      message = 'Incorrect password !';
    } else if (code === 'auth/user-not-found') {
      message = 'User does not exist !';
    }

    return { ok: false, code, message };
  }
};

export const firebaseSignOut = async () => {
  try {
    signOut(firebaseAuth);
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
};

// -----------------------------------------------------------------
// Journal and notes

export const setNewNote = async (newNote, path) => {
  try {
    const newNoteReference = doc(collection(firestoreDB, path));
    await setDoc(newNoteReference, newNote);

    return newNoteReference.id;
    //
  } catch (error) {
    console.log(error);
    // return { ok: false, error };
  }
};

export const getAllUserNotes = async (path) => {
  try {
    const querySnapshot = await getDocs(collection(firestoreDB, path));
    const notes = [];

    querySnapshot.forEach((firebaseNote) => {
      notes.push({
        id: firebaseNote.id,
        ...firebaseNote.data(),
      });
    });

    return notes;

    // console.log(notes);
  } catch (error) {
    console.log(error);
  }
};

export const saveNote = async (updatedNote, path) => {
  try {
    const noteReference = doc(firestoreDB, path);
    await updateDoc(noteReference, updatedNote);
  } catch (error) {
    console.log(error);
  }
};

export const deleteNote = async (path) => {
  try {
    const noteReference = doc(firestoreDB, path);
    await deleteDoc(noteReference);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllNotesFromAnUser = async (path) => {
  const querySnapshot = await getDocs(collection(firestoreDB, path));

  const deletePromises = [];

  querySnapshot.forEach((doc) => {
    deletePromises.push(deleteDoc(doc.ref));
  });

  await Promise.all(deletePromises);
};
