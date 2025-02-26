import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, Button, Alert, FileInput } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import Waypoint from "../shared/waypoint";
import ReactQuill from "react-quill";
export default function CreateTour() {
  const [file, setFile] = useState(null);  
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    days: 1,
    destinations: [],
    photo: "",
  });
 
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();


  // Handle waypoint changes
  const handleWaypointChange = (day, value) => {
    const updatedDestinations = [...formData.destinations];
    updatedDestinations[day - 1] = value; // Assign destination to the correct day
    setFormData((prev) => ({ ...prev, destinations: updatedDestinations }));
  };

  // Image upload functionality
  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("Please select an image.");
      return;
    }

    try {
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(Math.round(progress));
        },
        () => {
          setImageUploadError("Image upload failed.");
          setImageUploadProgress(null);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUploadProgress(null);
          setFormData((prev) => ({ ...prev, photo: downloadURL }));
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed.");
      setImageUploadProgress(null);
      console.error(error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, desc, days, destinations, photo } = formData;

    if (!title || !desc || !days || destinations.length < days || !photo) {
      setPublishError("Please fill in all required fields and upload an image.");
      return;
    }

    try {
      const res = await fetch("/api/tours/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message || "Failed to create tour.");
      } else {
        setPublishError(null);
        navigate("/tours");
      }
    } catch (error) {
      setPublishError("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-bold">
        Add a <span className="text-[#F4AC20]">Tour</span>
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Tour Title"
          required
          className="flex-1"
          style={{ borderColor: "#F4AC20" }}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <TextInput
          type="number"
          placeholder="Number of Days"
          required
          min="1"
          className="flex-1"
          style={{ borderColor: "#F4AC20" }}
          onChange={(e) =>
            setFormData({ ...formData, days: parseInt(e.target.value, 10) })
          }
        />
        <Waypoint
          days={formData.days}
          onChange={handleWaypointChange}
        />
        <div className="flex gap-4 items-center justify-between border-4 border-dotted p-3 border-[#F4AC20]">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            className="bg-[#F4AC20] text-white"
            onClick={handleUploadImage}
            disabled={!!imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError &&( <Alert color="failure">{imageUploadError}</Alert>)}
        {formData.photo && (
          <img
            src={formData.photo}
            alt="Tour"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          type="snow"
          placeholder="Write tour description..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, desc: value })}
        />
        <Button type="submit" className="bg-[#F4AC20] text-white">
          Create Tour
        </Button>
        {publishError && <Alert color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
}
