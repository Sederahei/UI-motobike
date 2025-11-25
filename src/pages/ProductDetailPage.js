// src/pages/ProductDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

function ProductDetailPage() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/produits/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur HTTP " + res.status);
        return res.json();
      })
      .then(data => setProduit(data))
      .catch(err => console.error("Erreur fetch produit:", err));
  }, [id]);

  const ajouterAuPanier = () => {
    fetch(`${API_URL}/paniers/client/1/ajouter/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantite: 1 })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur ajout panier");
        return res.json();
      })
      .then(() => alert("✅ Produit ajouté au panier !"))
      .catch(err => console.error("Erreur:", err));
  };

  if (!produit) return <p>Chargement...</p>;

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" sx={{ mb: 2, color: "var(--primary-color)" }}>
        Détail produit
      </Typography>
      <Card sx={{ backgroundColor: "var(--light-bg)", borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <img
            src={produit.image || "/images/placeholder.jpg"}
            alt={produit.nom}
            style={{ width: "100%", maxWidth: 500, borderRadius: 8 }}
          />
          <Typography variant="h6" sx={{ mt: 2, color: "var(--accent-color)" }}>{produit.nom}</Typography>
          <Typography variant="body2">Type: {produit.type}</Typography>
          <Typography variant="body2">Marque: {produit.marque}</Typography>
          <Typography variant="body2" sx={{ color: "var(--accent-color)" }}>
            Prix: {produit.prix} Ar
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--success-color)" }}>
            Stock: {produit.stock}
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={ajouterAuPanier}>
            🛒 Ajouter au panier
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductDetailPage;
