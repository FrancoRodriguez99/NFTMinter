import "./MintNFTData.css";
import mintNFT from "../mintNFT.js";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import NFTStatus from "../NFTStatus/NFTStatus";

export default function MintNFTData({ image }) {
  const [nftData, setNFTData] = useState({ title: "Unamed", description: "None", email: false });
  const [estado, setEstado] = useState("modificando");
  const [id, setId] = useState(null);

  return estado === "modificando" ? (
    <div className="generalbox">
      <div className="optionsContainer">
        <img src={image} alt="nft_to_mint" className="imagenesToMint"></img>
        <div className="textOptions">
          <label>Title</label>
          <input type="text" onChange={(e) => setNFTData({ ...nftData, title: e.target.value })}></input>
          <label>Description</label>
          <input type="text" onChange={(e) => setNFTData({ ...nftData, description: e.target.value })}></input>
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => {
              //eslint-disable-next-line
              if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) setNFTData({ ...nftData, email: e.target.value });
              else setNFTData({ ...nftData, email: false });
            }}
          ></input>
        </div>
      </div>
      <button
        onClick={() => {
          mintNFT(image, nftData, setEstado, setId);
        }}
        disabled={!nftData.email}
        className="button-63"
      >
        Upload
      </button>
    </div>
  ) : estado === "cargando" ? (
    <div className="generalbox">
      <BeatLoader color={"#5c16cf"} size={50} />
    </div>
  ) : estado === "minteando" ? (
    <div className="generalbox">
      <NFTStatus id={id} />
    </div>
  ) : (
    <div className="generalbox">"Error, intete denuevo mas tarde"</div>
  );
}
