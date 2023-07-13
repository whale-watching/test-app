import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

import { TurnedInNotOutlined } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export const NoteItem = ({ id, title = '', body, ...rest }) => {
  const dispatch = useDispatch();
  const { activeNote } = useSelector((state) => state.journal);

  const onNoteClick = () => {
    // console.log({ id, title });
    dispatch(setActiveNote({ id, title, body, ...rest }));
  };

  const newTitle = useMemo(() => {
    return title.length > 35 ? title.substring(0, 35) + '...' : title;
  }, [title]);

  const newBody = useMemo(() => (body.length > 50 ? body.substring(0, 50) + '...' : body), [body]);

  const activeNoteID = useMemo(() => (activeNote ? activeNote.id : -1), [activeNote]);
  const isSelected = useMemo(() => activeNoteID === id, [activeNoteID]);

  return (
    <ListItem onClick={onNoteClick}>
      <ListItemButton selected={isSelected}>
        <ListItemIcon>
          <TurnedInNotOutlined />
        </ListItemIcon>
        <Grid container direction='column'>
          <ListItemText primary={newTitle} />

          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
