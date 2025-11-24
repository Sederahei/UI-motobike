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
      <h2 style={{ textAlign:"center", color:"#3c74c2ff"}}>🛒 Catalogue Produits</h2>
      {produits.map(p => (
        <Card key={p.id} sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 3, 
            backgroundColor: "#f9f9f9", 
            transition: "background-color 0.3s ease" }}>
          <CardContent>
            <Typography variant="h6"sx={{ color: "#37b13dff" }}>{p.nom}</Typography>
            <Typography variant="body2">Type : {p.type}</Typography>
            <Typography variant="body2">Marque : {p.marque}</Typography>
            <Typography variant="body2">Prix : <span style={{ color: "#d32f2f" }}>{p.prix} Ar</span></Typography>
            <Typography variant="body2">Stock : {p.stock}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ProduitsPage;