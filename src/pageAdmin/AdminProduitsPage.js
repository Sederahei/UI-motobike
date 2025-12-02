// src/pages/admin/AdminProduitsPage.js
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
const API_URL = process.env.REACT_APP_API_URL;

export default function AdminProduitsPage() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/produits`)
      .then(r => r.json())
      .then(d => setProduits(Array.isArray(d) ? d : []))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>📦 Admin — Produits</Typography>
      {produits.map(p => (
        <Card key={p.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{p.nom}</Typography>
            <Typography variant="body2">Marque: {p.marque}</Typography>
            <Typography variant="body2">Prix: {p.prix} Ar</Typography>
            <Typography variant="body2">Stock réel: {p.stock}</Typography>
            <Typography variant="body2">Stock réservé: {p.stockReserve ?? 0}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
