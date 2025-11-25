import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Chip, Divider } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;
//import "";

function CommandesPage() {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/commandes`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur HTTP " + res.status);
        return res.json();
      })
      .then(data => setCommandes(Array.isArray(data) ? data : []))
      .catch(err => console.error("Erreur fetch commandes:", err));
  }, []);

  const getColor = (statut) => {
    switch (statut) {
      case "en_attente": return "warning";
      case "valide": return "success";
      case "livree": return "info";
      default: return "default";
    }
  };

  if (!Array.isArray(commandes) || commandes.length === 0) {
    return <p>Aucune commande trouvée...</p>;
  }

  return (
    <div style={{ padding: "20px" , color: "var(--primary-color)" }}>
      <h2>📦 Liste des Commandes</h2>
      {commandes.map(cmd => (
        <Card key={cmd.id} className="card-hover" sx={{ borderRadius: 2, marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{  color: "var(--highlight)", fontWeight: "bold" }}>Commande : {cmd.id}</Typography>
             <Chip 
                    label={cmd.statut} 
                    className={cmd.statut === "en_attente" ? "status-waiting" : ""}
                    sx={{ mt: 1
                }} 
            /> 
            <Typography variant="body2">Client : {cmd.client.nom}</Typography>
            <Typography variant="body2">Date : {new Date(cmd.dateCommande).toLocaleString()}</Typography>
            <Typography variant="body2" sx={{ color: "var(--dark-color)" }}>Total : {cmd.total} Ar</Typography>
            <Chip label={cmd.statut} color={getColor(cmd.statut)} sx={{ mt: 1 }} />
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">🛒 Produits :</Typography>
            
            {Array.isArray(cmd.lignes) && cmd.lignes.map(ligne => (
              <Typography key={ligne.id} variant="body2">
                {ligne.produit.nom} ({ligne.produit.marque}) — {ligne.quantite} × {ligne.prixUnitaire} Ar = {ligne.sousTotal} Ar
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CommandesPage;
