import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingNote } from '../../store/journal/thunks';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

const JournalPage = () => {
  const dispatch = useDispatch();
  const {
    journal: { isSaving, activeNote, finishedMessage },
  } = useSelector((state) => state);

  const onClickNewNote = () => dispatch(startCreatingNote());

  // Use effect to watch for new message (error or success)
  useEffect(() => {
    if (finishedMessage.length > 0) {
      Swal.fire({
        text: finishedMessage,
        icon: 'success',
        timer: 2000,
      });
    }
  }, [finishedMessage]);

  return (
    <JournalLayout>
      {/* Is there an active note ? yes-noteview, not yet-nothing selected */}
      {activeNote ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        onClick={onClickNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          position: 'fixed',
          bottom: 50,
          right: 50,
          ':hover': { backgroundColor: 'error.main', opacity: 0.85 },
        }}
        disabled={isSaving}
      >
        <AddOutlined />
      </IconButton>
    </JournalLayout>
  );
};

export default JournalPage;
