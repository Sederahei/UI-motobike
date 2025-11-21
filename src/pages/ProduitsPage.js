import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

function ProduitsPage() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/produits`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur HTTP " + res.status);
        return res.json();
      })
      .then(data => setProduits(Array.isArray(data) ? data : []))
      .catch(err => console.error("Erreur fetch produits:", err));
  }, []);

  if (!Array.isArray(produits) || produits.length === 0) {
    return <p>Aucun produit trouvé...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Catalogue Produits</h2>
      {produits.map(p => (
        <Card key={p.id} sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h6">{p.nom}</Typography>
            <Typography variant="body2">Type : {p.type}</Typography>
            <Typography variant="body2">Marque : {p.marque}</Typography>
            <Typography variant="body2">Prix : {p.prix} Ar</Typography>
            <Typography variant="body2">Stock : {p.stock}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ProduitsPage;
