// src/pages/admin/AdminCommandesPage.js
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Chip, Divider, Button } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

const badgeColor = s => {
  switch (s) {
    case "en_attente": return "warning";
    case "valider": return "success";
    case "annuler": return "error";
    case "epuiser": return "default";
    default: return "default";
  }
};

export default function AdminCommandesPage() {
  const [commandes, setCommandes] = useState([]);

  const fetchAll = () => {
    fetch(`${API_URL}/commandes`)
      .then(r => r.json())
      .then(d => setCommandes(Array.isArray(d) ? d : []))
      .catch(console.error);
  };

  useEffect(() => { fetchAll(); }, []);

  const updateStatut = async (id, statut) => {
    try {
      const res = await fetch(`${API_URL}/commandes/${id}/statut?statut=${statut}`, { method: "PUT" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const updated = await res.json();
      setCommandes(prev => prev.map(c => (c.id === id ? updated : c)));
    } catch (e) {
      console.error(e);
      alert("Erreur mise à jour statut");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>🛠️ Admin — Commandes</Typography>
      {commandes.map(cmd => (
        <Card key={cmd.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Commande #{cmd.id}</Typography>
            <Chip label={cmd.statut} color={badgeColor(cmd.statut)} sx={{ mt: 1 }} />
            <Typography variant="body2">Client: {cmd.client?.nom}</Typography>
            <Typography variant="body2">Date: {new Date(cmd.dateCommande).toLocaleString()}</Typography>
            <Typography variant="body2">Total: {cmd.total} Ar</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Produits:</Typography>
            {cmd.lignes?.map(l => (
              <Typography key={l.id} variant="body2">
                {l.produit.nom} — {l.quantite} × {l.prixUnitaire} Ar
              </Typography>
            ))}

            {cmd.statut === "en_attente" && (
              <div style={{ marginTop: 12 }}>
                <Button sx={{ mr: 1 }} variant="contained" color="success"
                  onClick={() => updateStatut(cmd.id, "valider")}>
                  Valider
                </Button>
                <Button variant="contained" color="error"
                  onClick={() => updateStatut(cmd.id, "annuler")}>
                  Annuler
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
