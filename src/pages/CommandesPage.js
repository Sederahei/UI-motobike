import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Chip, Divider, Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_API_URL;

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
      case "valider": return "success";
      case "annuler": return "error";
      case "epuiser": return "default";
      default: return "default";
    }
  };

  const updateStatut = async (id, statut) => {
    try {
      const res = await fetch(`${API_URL}/commandes/${id}/statut?statut=${statut}`, {
        method: "PUT"
      });
      if (!res.ok) throw new Error("Erreur HTTP " + res.status);
      const updated = await res.json();

      // Mettre à jour la liste localement
      setCommandes(prev =>
        prev.map(cmd => (cmd.id === id ? updated : cmd))
      );

      toast.success(`Commande ${id} ${statut} avec succès ✅`);
    } catch (err) {
      console.error("Erreur update statut:", err);
      toast.error("❌ Erreur lors de la mise à jour du statut");
    }
  };

  if (!Array.isArray(commandes) || commandes.length === 0) {
    return <p>Aucune commande trouvée...</p>;
  }

  return (
    <div style={{ padding: "20px", color: "var(--primary-color)" }}>
      <h2>📦 Liste des Commandes</h2>
      {commandes.map(cmd => (
        <Card key={cmd.id} className="card-hover" sx={{ borderRadius: 2, marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: "var(--highlight)", fontWeight: "bold" }}>
              Commande : {cmd.id}
            </Typography>

            <Chip label={cmd.statut} color={getColor(cmd.statut)} sx={{ mt: 1 }} />

            <Typography variant="body2">Client : {cmd.client.nom}</Typography>
            <Typography variant="body2">Date : {new Date(cmd.dateCommande).toLocaleString()}</Typography>
            <Typography variant="body2" sx={{ color: "var(--dark-color)" }}>
              Total : {cmd.total} Ar
            </Typography>

            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">🛒 Produits :</Typography>
            {Array.isArray(cmd.lignes) && cmd.lignes.map(ligne => (
              <Typography key={ligne.id} variant="body2">
                {ligne.produit.nom} ({ligne.produit.marque}) — {ligne.quantite} × {ligne.prixUnitaire} Ar = {ligne.sousTotal} Ar
              </Typography>
            ))}

            {/* Boutons d’action visibles uniquement si commande en attente */}
            {cmd.statut === "en_attente" && (
              <div style={{ marginTop: "15px" }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mr: 2 }}
                  onClick={() => updateStatut(cmd.id, "valider")}
                >
                  Valider
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => updateStatut(cmd.id, "annuler")}
                >
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

export default CommandesPage;
