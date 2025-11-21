// src/pages/ProduitsPage.js
import React, { useEffect, useState } from "react";
import Produit from "../assets/components/layout/Entity/Produit";

function ProduitsPage() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/produits")
      .then(res => res.json())
      .then(data => setProduits(data));
  }, []);

  const addToCart = (produit) => {
    fetch(`http://localhost:8080/api/paniers/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produitId: produit.id, quantite: 1 })
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Catalogue Produits</h2>
      {produits.map(p => (
        <Produit key={p.id} produit={p} onAddToCart={addToCart} />
      ))}
    </div>
  );
}

export default ProduitsPage;
