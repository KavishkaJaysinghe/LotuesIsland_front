import { useState, useEffect } from "react";
import { Alert, Button, TextInput, FileInput } from "flowbite-react";
import ReactQuill from "react-quill";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateDestination() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({ additionalImages: [] });
  const [publishError, setPublishError] = useState(null);
  const [activities, setActivities] = useState([]); // Added for activities
  const [activityInput, setActivityInput] = useState(""); // Input for activities
  const { destId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchDestinations = async () => {
        const res = await fetch(`/api/destination/get-dest?destId=${destId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.destinations[0]);
          setActivities(data.destinations[0].activities || []); // Set activities from API response
        }
      };

      fetchDestinations();
    } catch (error) {
      console.log(error.message);
    }
  }, [destId]);

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (
      activityInput.trim() !== "" &&
      !activities.includes(activityInput.trim())
    ) {
      setActivities([...activities, activityInput.trim()]);
      setActivityInput("");
    }
  };

  const handleRemoveActivity = (activityToRemove) => {
    setActivities(
      activities.filter((activity) => activity !== activityToRemove)
    );
  };

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image!");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        () => {
          setImageUploadError("Image uploading failed!");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, destImage: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload Failed!");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData, activities }; // Include activities in the form data
    try {
      const res = await fetch(`/api/destination/update-dest/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/destinations/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update the Destination
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="justify-between">
          <TextInput
            type="text"
            placeholder="Destination Name"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, destinationName: e.target.value })
            }
            value={formData.destinationName}
          />
        </div>
        <div className="flex gap-4 items-center justify-between border-4 p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile) {
                setFile(selectedFile);
                // Start upload process immediately
                const storage = getStorage(app);
                const fileName = new Date().getTime() + "-" + selectedFile.name;
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(
                  storageRef,
                  selectedFile
                );

                uploadTask.on(
                  "state_changed",
                  (snapshot) => {
                    const progress =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                  },
                  (error) => {
                    setImageUploadError("Image uploading failed!");
                    setImageUploadProgress(null);
                  },
                  () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                      (downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, destImage: downloadURL });
                      }
                    );
                  }
                );
              }
            }}
          />
          {imageUploadProgress && (
            <div className="w-16 h-16">
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress || 0}%`}
              />
            </div>
          )}
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.destImage && (
          <img
            src={formData.destImage}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        {/* Additional Images Section */}
        <div className="flex flex-col gap-4 border-4 p-3">
          <label className="font-bold">Upload Additional Images (Max 5)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile && formData.additionalImages.length < 5) {
                const storage = getStorage(app);
                const fileName = new Date().getTime() + "-" + selectedFile.name;
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(
                  storageRef,
                  selectedFile
                );

                uploadTask.on(
                  "state_changed",
                  null,
                  () => setImageUploadError("Upload failed!"),
                  () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                      (downloadURL) => {
                        setFormData({
                          ...formData,
                          additionalImages: [
                            ...formData.additionalImages,
                            downloadURL,
                          ],
                        });
                      }
                    );
                  }
                );
              }
            }}
          />
        </div>
        {formData.additionalImages && (
          <div className="grid grid-cols-3 gap-2">
            {formData.additionalImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={`upload-${index}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      additionalImages: formData.additionalImages.filter(
                        (_, i) => i !== index
                      ),
                    });
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        <ReactQuill
          theme="snow"
          placeholder="Description"
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, description: value });
          }}
          value={formData.description}
        />

        {/* Activities section */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <TextInput
              type="text"
              placeholder="Add an activity (e.g., Hiking, Swimming)"
              value={activityInput}
              onChange={(e) => setActivityInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddActivity(e)}
              className="flex-1"
            />
            <button
              type="button"
              className="bg-[#ffffff] text-black py-2 px-6 rounded-lg hover:bg-[#f7dcbc] w-40 border-2 border-[#F4AC20]"
              onClick={handleAddActivity}
            >
              Add Activity
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {activity}
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveActivity(activity)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" color="warning">
          Update Destination
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
