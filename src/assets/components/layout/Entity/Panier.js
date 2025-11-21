// src/components/entity/Panier.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function Panier({ panier }) {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">Panier #{panier.id}</Typography>
        {panier.produits.map(pp => (
          <Typography key={pp.id} variant="body2">
            {pp.produit.nom} x {pp.quantite}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}

export default Panier;
