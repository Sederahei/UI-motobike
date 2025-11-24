import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

function PanierPage() {
  const [paniers, setPaniers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/paniers`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur HTTP " + res.status);
        return res.json();
      })
      .then(data => setPaniers(Array.isArray(data) ? data : []))
      .catch(err => console.error("Erreur fetch paniers:", err));
  }, []);

  if (!Array.isArray(paniers) || paniers.length === 0) {
    return <p>Aucun panier trouvé...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍️ Liste des Paniers</h2>
      {paniers.map(panier => (
        <Card key={panier.id} sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6"> Panier : {panier.id}</Typography>
            {Array.isArray(panier.lignes) && panier.lignes.map(ligne => (
              <Typography key={ligne.id} variant="body2">
                {ligne.produit.nom} x {ligne.quantite} = {ligne.sousTotal} Ar
              </Typography>
            ))}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Total : {panier.total} Ar
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default PanierPage;
