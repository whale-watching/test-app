export const imageURLTest = 'https://res.cloudinary.com/dmnasx5sb/image/upload/v1664315699/journal-app-vite/nelb6gm77lmwujeeksir.png';

export const initialState = {
  isSaving: false,
  finishedMessage: '',
  notes: [],
  activeNote: null,
};

export const emptyNote = { id: 'PQOiaZSkHjz2ESIB9byw', title: '', body: '', date: new Date().getTime(), imagesUrls: [] };

export const activeNote = {
  id: 'e052HNtZ08cKVnKqO0mM',
  title: 'Test note Title',
  body: 'Test note body',
  date: 1663166809949,
  imagesUrls: [imageURLTest],
};

export const testNotes = [{
    id: 'PQOiaZSkHjz2ESIB9byw',
    title: 'Test note title 1',
    body: 'Test note BodY 1',
    date: 1650552108843,
    imagesUrls: [imageURLTest, imageURLTest],
  },
  {
    id: 'Mwq9m0NJRxCWkF094lgV',
    title: 'Test note title 2',
    body: 'Test note BodY 2',
    date: 1645635478420,
    imagesUrls: [],
  },
  {
    id: 'e052HNtZ08cKVnKqO0mM',
    title: 'Test note title 3',
    body: 'Test note BodY 3',
    date: 1663166809949,
    imagesUrls: [imageURLTest, imageURLTest, imageURLTest, imageURLTest],
  },
  {
    id: 'qUe0payrZWEMLU9GoCKJ',
    title: 'Test note title 4',
    body: 'Test note BodY 4',
    date: 1643420910333,
    imagesUrls: [imageURLTest],
  }];

export const stateWithNotes = {
  isSaving: false,
  finishedMessage: '',
  notes: testNotes,
  activeNote: null,
};

export const updatedNoteState = {
  isSaving: false,
  finishedMessage: 'Note successfully saved',
  notes: Object.assign([], testNotes, { 2: activeNote }),
  activeNote: null,
};

export const deletedNoteState = {
  isSaving: false,
  finishedMessage: 'Note deleted',
  notes: [...testNotes.slice(0, 2), ...testNotes.slice(-1)],
  activeNote: null,
};

export const fullState = {
  isSaving: true,
  finishedMessage: 'Finished Message',
  notes: testNotes,
  activeNote: activeNote,
};
