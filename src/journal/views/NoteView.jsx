import { useMemo } from 'react';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingImagesToCloudinary } from '../../store/journal';

import { SaveOutlined, AddPhotoAlternateRounded, DeleteForeverTwoTone } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';

export const NoteView = () => {
  const dispatch = useDispatch();
  const { activeNote, isSaving } = useSelector((state) => state.journal);

  // Se toma la nota activa como el estado inicial del formulario useForm
  const { title, body, date, onInputChange, formState } = useForm(activeNote);

  // We use useMemo hook because body and title changes frequently and will refresh date as well
  const dateString = useMemo(() => {
    const reFormattedDate = new Date(date);
    return reFormattedDate.toUTCString();
  }, [date]);

  const onFileInputChange = (event) => {
    const { files } = event.target;

    if (files.length === 0) return;

    // dispatch(setActiveNote) for avoid the form to clear and loose what the user has written
    dispatch(setActiveNote(formState));

    dispatch(startUploadingImagesToCloudinary(files));
  };

  const onClickSaveNote = () => {
    // Update de redux activeNote when the user clicks on save note
    dispatch(setActiveNote(formState));
    // Save new content of note on firebase
    dispatch(startSavingNote());
  };

  const onClickDeleteNote = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid container justifyContent='space-between' alignItems='center' sx={{ mb: 1 }} className='animate__animated animate__zoomIn'>
      <Grid item justifySelf='center'>
        <Typography fontSize={25} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>

      <Grid item>
        <IconButton color='primary' aria-label='upload pictures' component='label' size='large' disabled={isSaving}>
          <input type='file' multiple accept='image/*' hidden onChange={onFileInputChange} />
          <AddPhotoAlternateRounded />
        </IconButton>
      </Grid>

      <Grid item>
        <Button size='large' variant='contained' endIcon={<SaveOutlined />} onClick={onClickSaveNote} disabled={isSaving}>
          Save
        </Button>
      </Grid>

      <Grid item>
        <IconButton color='error' aria-label='delete note for ever' size='large' disabled={isSaving} onClick={onClickDeleteNote}>
          <DeleteForeverTwoTone />
        </IconButton>
      </Grid>

      <Grid container sx={{ mb: 3 }}>
        <TextField
          type='text'
          variant='standard'
          label='Note title'
          placeholder='My personal note'
          fullWidth
          sx={{ mt: 6 }}
          name='title'
          value={title}
          onChange={onInputChange}
        ></TextField>

        <TextField
          type='text'
          multiline
          placeholder='Content of the note'
          fullWidth
          sx={{ mt: 4 }}
          minRows={7}
          name='body'
          value={body}
          onChange={onInputChange}
        ></TextField>
      </Grid>

      <ImageGallery images={activeNote.imagesUrls} />
    </Grid>
  );
};
