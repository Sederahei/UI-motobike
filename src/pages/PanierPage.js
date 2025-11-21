import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

function PanierPage() {
  const [panier, setPanier] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/paniers/1`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur HTTP " + res.status);
        return res.json();
      })
      .then(data => setPanier(data))
      .catch(err => console.error("Erreur fetch panier:", err));
  }, []);

  const validerCommande = () => {
    fetch(`${API_URL}/commandes/valider/1`, { method: "POST" })
      .then(res => {
        if (!res.ok) throw new Error("Erreur HTTP " + res.status);
        return res.json();
      })
      .then(() => alert("Commande validée !"))
      .catch(err => console.error("Erreur validation commande:", err));
  };

  if (!panier || !Array.isArray(panier.lignes)) {
    return <p>Chargement du panier...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍️ Mon Panier</h2>
      <Card sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6">Panier #{panier.id}</Typography>
          {panier.lignes.map(ligne => (
            <Typography key={ligne.id} variant="body2">
              {ligne.produit.nom} x {ligne.quantite} = {ligne.sousTotal} Ar
            </Typography>
          ))}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Total : {panier.total} Ar
          </Typography>
          <Button variant="contained" color="success" onClick={validerCommande} sx={{ mt: 2 }}>
            ✅ Valider la commande
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default PanierPage;
