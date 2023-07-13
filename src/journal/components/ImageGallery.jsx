import { ImageList, ImageListItem } from '@mui/material';

export const ImageGallery = ({ images = [] }) => {
  return (
    <ImageList sx={{ width: '100%', height: 380 }} cols={6}>
      {images.map((iimage, index) => (
        <ImageListItem key={iimage}>
          <img
            src={`${iimage}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${iimage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={`Note image ${index}`}
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
