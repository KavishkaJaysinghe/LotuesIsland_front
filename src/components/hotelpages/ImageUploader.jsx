import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import { Alert } from "flowbite-react";

function ImageUploader({ setImageURL, label, id }) {
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file)
        .then((url) => {
          setImageURL(url);
          console.log(`${label} URL:`, url);
          setUploadError(null);
        })
        .catch((error) => {
          setUploadError(`Error uploading file: ${error.message}`);
          console.log(`${label} upload error:`, error);
        });
    }
  };

  const uploadImage = (imageFile) => {
    const storage = getStorage(app);
    const imageName = `${new Date().getTime()}_${imageFile.name}`;
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setUploadError(
            "Could not upload image. Ensure the file size is under the limit."
          );
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="file"
        accept="image/*"
        id={id}
        onChange={handleImageChange}
        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-full file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        required
      />
      {uploadProgress && <div>Upload progress: {uploadProgress}%</div>}
      {uploadError && <Alert color="failure">{uploadError}</Alert>}
    </div>
  );
}

export default ImageUploader;
