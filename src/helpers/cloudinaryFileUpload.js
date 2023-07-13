import { getEnvironments } from './getEnvironments';

const { VITE_CLOUDINARYUPLOADURL } = getEnvironments();

export const imageUpload = async (file) => {
  // if (!file) throw new Error('No file added');
  if (!file) return null;

  const cloudinaryUploadUrl = VITE_CLOUDINARYUPLOADURL;

  const formData = new FormData();

  formData.append('upload_preset', 'react-journal-app');
  formData.append('file', file);

  try {
    const fetchConfig = {
      method: 'POST',
      body: formData,
    };

    const response = await fetch(cloudinaryUploadUrl, fetchConfig);

    if (!response.ok) throw new Error('Could not upload image');

    // console.log(response);
    const cloudResponse = await response.json();
    // console.log(cloudResponse);

    return cloudResponse.secure_url;
  } catch (error) {
    console.log(error);
    // throw new Error(error.message);
    return null;
  }
};
