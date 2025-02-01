import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import firebaseApp from '@/config/firebase-config';

export const uploadImageToFirebaseStorageAndReturnUrl = async (file: File) => {
  try {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadedImageResponse = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(uploadedImageResponse.ref);

    return downloadUrl;
  } catch (e) {

  }
}
