import { v2 as cloudinary } from 'cloudinary';
import { imageUpload } from '../../src/helpers/cloudinaryFileUpload';
import { getEnvironments } from '../../src/helpers/getEnvironments';

const { VITE_CLOUDNAME, VITE_CLOUDINARY_APIKEY, VITE_APISECRET } = getEnvironments();

// Cloudinary admin config
cloudinary.config({
  cloud_name: VITE_CLOUDNAME,
  api_key: VITE_CLOUDINARY_APIKEY,
  api_secret: VITE_APISECRET,
  secure: true,
});

describe('Tests on cloudinary image upload', () => {
  test('Test image upload to cloudinary', async () => {
    const imageUrl = 'https://res.cloudinary.com/dmnasx5sb/image/upload/v1644623071/samples/ecommerce/shoes.png';

    const response = await fetch(imageUrl);
    const blob = await response.blob(); // Image bytes

    const file = new File([blob], 'testingphoto.png');

    const cloudinaryUrl = await imageUpload(file);

    const regex = new RegExp('https://res.cloudinary.com/' + VITE_CLOUDNAME + '/image/upload/v\\d*/journal-app-vite/\\w*.png');

    expect(cloudinaryUrl).toMatch(regex);

    // Delete resource after test
    const urlSegments = cloudinaryUrl.split('/');
    const imageId = urlSegments.at(-1).replace('.png', '');

    await cloudinary.uploader.destroy(`journal-app-vite/${imageId}`); //Using cloudinary sdk to delete resource
  });

  test('Should return null', async () => {
    const file = new File([], 'testingphoto.png');
    const cloudinaryUrl = await imageUpload(file);

    expect(cloudinaryUrl).toBe(null);
  });
});
