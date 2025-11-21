// src/pages/PanierPage.js
import React, { useEffect, useState } from "react";
import Panier from "../assets/components/layout/Entity/Panier";

function PanierPage() {
  const [panier, setPanier] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/paniers/1") // exemple clientId=1
      .then(res => res.json())
      .then(data => setPanier(data));
  }, []);

  const validerCommande = () => {
    fetch("http://localhost:8080/api/commandes/valider/1", { method: "POST" })
      .then(res => res.json())
      .then(data => alert("Commande validée !"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍️ Mon Panier</h2>
      {panier && <Panier panier={panier} />}
      <button onClick={validerCommande}>✅ Valider la commande</button>
    </div>
  );
}

export default PanierPage;
