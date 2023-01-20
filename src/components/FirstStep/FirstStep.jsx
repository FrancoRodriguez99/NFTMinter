import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import "./FirstStep.css";

export default function FirstStep({ setFile }) {
  const [cargando, setCargando] = useState(false);

  return (
    <div className="FirstStepHome">
      {cargando ? (
        <BeatLoader color={"#5c16cf"} size={50} />
      ) : (
        <div>
          <h1 className="titleFirstStepHome">
            To create your own Non-Fungible Token (NFT), the first step is to upload all the files you want to mint. You can upload multiple files at once, which is a great way to save time. After the files are uploaded, you can then proceed to the
            next step in the minting process.
          </h1>
          <input
            type="file"
            id="file"
            multiple="multiple"
            accept="image/png,image/jpeg/gif/gbl/mp4/jpg"
            onChange={async (e) => {
              const archivos = e.target.files.length;
              setCargando(true);

              let array = [];
              for (let i = 0; i < archivos; i++) {
                const imageData = new FormData();
                imageData.append("file", e.target.files[i]);
                imageData.append("upload_preset", "skaneetk");

                await fetch("https://api.cloudinary.com/v1_1/dhyz4afz7/image/upload", {
                  method: "POST",
                  body: imageData,
                })
                  .then((response) => response.json())
                  .then((data) => array.push(data.secure_url));
              }
              setCargando(false);
              setFile(array);
            }}
          />
        </div>
      )}
    </div>
  );
}
