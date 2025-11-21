// src/components/entity/Commande.js
import React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";

function Commande({ commande }) {
  const getColor = (statut) => {
    switch (statut) {
      case "en_attente": return "warning";
      case "valide": return "success";
      case "livree": return "info";
      default: return "default";
    }
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">Commande #{commande.id}</Typography>
        <Typography variant="body2">Client : {commande.client.nom}</Typography>
        <Typography variant="body2">Date : {new Date(commande.dateCommande).toLocaleString()}</Typography>
        <Typography variant="body2">Total : {commande.total} Ar</Typography>
        <Chip label={commande.statut} color={getColor(commande.statut)} sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
}

export default Commande;
