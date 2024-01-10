import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UpdateNew = ({ inputs, title }) => {
  const { newId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);

  useEffect(() => {
    const fetchNewData = async () => {
      try {
        const newsDoc = await getDoc(doc(db, "news", newId));
        setData({ ...newsDoc.data() });
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNewData();
  }, [newId]);

  useEffect(() => {
    const uploadFile = async () => {
      if (file) {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, "news/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setPerc(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setData((prev) => ({ ...prev, image: downloadURL }));
            });
          }
        );
      }
    };

    uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const newsRef = doc(db, "news", newId);
      await updateDoc(newsRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });

      navigate("/news");
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1> {title} </h1>{" "}
        </div>{" "}
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>{" "}
          <div className="right">
            <form onSubmit={handleUpdate}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>{" "}
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />{" "}
              </div>{" "}
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label> {input.label} </label>{" "}
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={data[input.id] || ""}
                    onChange={handleInput}
                  />{" "}
                </div>
              ))}{" "}
              <button disabled={per != null && per < 100} type="submit">
                {" "}
                Update{" "}
              </button>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default UpdateNew;
