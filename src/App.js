import "./App.css";
import NET from "vanta/dist/vanta.net.min";
import { useEffect, useState, useRef } from "react";
import FirstStep from "./components/FirstStep/FirstStep";
import MintNFTData from "./components/MintNFTData/MintNFTData.jsx";

function App() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const [file, setFile] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          with: "100%",
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x9416dc,
          backgroundColor: 0x3e0a66,
          maxDistance: 29.0,
          spacing: 17.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="App">
      <div ref={myRef} className="App">
        {file ? (
          <div id="boxMint">
            {file.map((x, i) => (
              <MintNFTData image={x} key={i} />
            ))}
          </div>
        ) : (
          <FirstStep setFile={setFile} />
        )}
      </div>
    </div>
  );
}

export default App;
