import { useState } from "react";
import { useEffect } from "react";

export default function NFTStatus({ id }) {
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-client-secret": process.env.REACT_APP_CROSSMINT_TOKEN,
        "x-project-id": "e5a97e39-a4be-4846-b24e-87fe48c223fa",
      },
    };

    fetch("https://staging.crossmint.com/api/2022-06-09/collections/default-solana/nfts/" + id, options)
      .then((response) => response.json())
      .then((response) => setEstado(response))
      .catch((err) => console.error(err));
  }, [id]);

  console.log(estado);

  return (
    <div>
      <p>Chain: {estado?.onChain?.chain}</p>
      <p> Mint Hash: {estado?.onChain?.mintHash}</p>
      <p>Owner: {estado?.onChain?.owner}</p>
      <p>Status: {estado?.onChain?.status}</p>
    </div>
  );
}
