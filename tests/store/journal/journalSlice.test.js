import {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteByID,
  journalSlice,
  savingNewNote,
  setActiveNote,
  setImagesUrls,
  setNotes,
  setSaving,
  updateNote,
} from '../../../src/store/journal/index.js';

import {
  activeNote,
  deletedNoteState,
  emptyNote,
  fullState,
  imageURLTest,
  initialState,
  stateWithNotes,
  testNotes,
  updatedNoteState,
} from '../../fixtures/journalFixtures';

describe('Tests on journal slice', () => {
  beforeEach(() => jest.clearAllMocks());

  test('Slice name should be "journal" and return initialState', () => {
    expect(journalSlice.name).toBe('journal');
    expect(journalSlice.getInitialState()).toEqual(initialState);
  });

  test('Should add a new empty note to the notes list and set saving to false', () => {
    const state = journalSlice.reducer(initialState, addNewEmptyNote(emptyNote));

    expect(state.notes.length).toBeGreaterThanOrEqual(1);
    expect(state.notes).toContainEqual(emptyNote);
    expect(state.isSaving).toBe(false);
  });

  test('Should set active note', () => {
    const state = journalSlice.reducer(initialState, setActiveNote(activeNote));

    expect(state.activeNote).not.toEqual({});
    expect(state.activeNote).toEqual(activeNote);
    expect(state.finishedMessage).toBe('');
  });

  test('Should set notes', () => {
    const state = journalSlice.reducer(initialState, setNotes({ notes: testNotes }));

    expect(state.notes).toHaveLength(testNotes.length);
    expect(state.notes.length).toBeGreaterThan(1);
    expect(state.notes).toEqual(testNotes);
  });

  test('Should update note', () => {
    const state = journalSlice.reducer(stateWithNotes, updateNote(activeNote));

    expect(state).toEqual(updatedNoteState);
    expect(state.notes).not.toEqual(testNotes);
    expect(state.notes).toHaveLength(testNotes.length);
  });

  test('Should delete note by ID', () => {
    const state = journalSlice.reducer(stateWithNotes, deleteNoteByID({ noteID: activeNote.id }));

    expect(state).toEqual(deletedNoteState);
    expect(state.notes).not.toEqual(testNotes);
    expect(state.notes).toHaveLength(testNotes.length - 1);
    expect(state.notes.length).toBeLessThan(testNotes.length);
  });

  test('Should call savingNewNote and setSaving', () => {
    const state = journalSlice.reducer(initialState, savingNewNote());
    expect(state.isSaving).toBe(true);

    const secondState = journalSlice.reducer(updatedNoteState, setSaving());
    expect(secondState.isSaving).toBe(true);
    expect(secondState.finishedMessage).toBe('');
  });

  test('Should set images array urls', () => {
    const state = journalSlice.reducer(fullState, setImagesUrls([imageURLTest, imageURLTest]));

    expect(state.isSaving).toBe(false);

    expect(state.activeNote.imagesUrls).toHaveLength(3);
    expect(state.activeNote.imagesUrls).toEqual[(imageURLTest, imageURLTest, imageURLTest)];
    expect(state.activeNote.imagesUrls.length).toBeGreaterThan(fullState.activeNote.imagesUrls.length);
  });

  test('Should clear notes on logout', () => {
    const state = journalSlice.reducer(fullState, clearNotesLogout());
    expect(state).toStrictEqual(initialState);
  });
});
