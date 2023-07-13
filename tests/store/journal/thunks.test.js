import {deleteAllNotesFromAnUser, setNewNote} from '../../../src/firebase/provides';
import {
    addNewEmptyNote,
    deleteNoteByID,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
} from '../../../src/store/journal/index.js';
import {
    startCreatingNote,
    startDeletingNote,
    startLoadingNotes,
    startSavingNote
} from '../../../src/store/journal/thunks';
import {activeNote, emptyNote} from '../../fixtures/journalFixtures';

describe('Tests on Journal thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  // Real user UID from Firebase
  const testUID = '3d6558rf8AS46Fd5D46';

  beforeEach(() => jest.clearAllMocks());

  test('Should start creating new note', async () => {
    const testUID = 'ABCD1edheu2U';

    getState.mockReturnValue({ auth: { uid: testUID } });
    // getState.mockResolvedValue Just for resolve promise functions

    await startCreatingNote()(dispatch, getState);

    const mockedNote = { ...emptyNote, id: expect.any(String), date: expect.any(Number) };

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(mockedNote));
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(mockedNote));
    expect(dispatch).toHaveBeenCalledTimes(3);

    // Delete all notes after test
    await deleteAllNotesFromAnUser(`${testUID}/journal/notes`);
  });

  test('Should start loading notes', async () => {
    getState.mockReturnValue({ auth: { uid: testUID } });

    await startLoadingNotes()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setNotes(expect.any(Object)));
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test('Should start saving note', async () => {
    getState.mockReturnValue({ auth: { uid: testUID }, journal: { activeNote: activeNote } });

    await startSavingNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(updateNote(activeNote));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  test('Should start deleting note', async () => {
    const newNote = { title: '', body: '', date: new Date().getTime(), imagesUrls: [] };

    newNote.id = await setNewNote(newNote, `${testUID}/journal/notes`);

    getState.mockReturnValue({ auth: { uid: testUID }, journal: { activeNote: newNote } });

    await startDeletingNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(deleteNoteByID(expect.any(Object)));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
