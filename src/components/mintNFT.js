export default async function mintNFT(image, nftData, setEstado, setId) {
  setEstado("cargando");
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-client-secret": process.env.REACT_APP_CROSSMINT_TOKEN,
      "x-project-id": "e5a97e39-a4be-4846-b24e-87fe48c223fa",
    },
    body: JSON.stringify({
      recipient: "email:" + nftData.email + ":solana",
      metadata: {
        name: nftData.title,
        image: image,
        description: nftData.description,
        animation_url: "string",
        attributes: [{ display_type: "boost_number", trait_type: "string", value: "string" }],
      },
    }),
  };

  return fetch("https://staging.crossmint.com/api/2022-06-09/collections/default-solana/nfts", options)
    .then((response) => response.json())
    .then((response) => {
      if (response.error) setEstado("error");
      else {
        setEstado("minteando");
        setId(response.id);
      }
      return response;
    })
    .catch((err) => err);
}
