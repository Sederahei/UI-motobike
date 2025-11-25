// src/pages/PanierPage.js
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider, Button } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

function PanierPage() {
  const [produitsPanier, setProduitsPanier] = useState([]);
  const clientId = 1; // 🔑 à remplacer par l'id du client connecté

  // ✅ Charger les produits du panier
  const fetchPanier = () => {
    fetch(`${API_URL}/paniers/client/${clientId}/produits`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur HTTP " + res.status);
        return res.json();
      })
      .then(data => setProduitsPanier(Array.isArray(data) ? data : []))
      .catch(err => console.error("Erreur fetch produits du panier:", err));
  };

  useEffect(() => {
    fetchPanier();
  }, [clientId]);

  // ✅ Supprimer un produit du panier
  const supprimerProduit = (panierProduitId) => {
    fetch(`${API_URL}/panier-produits/${panierProduitId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur suppression produit");
        // recharger le panier après suppression
        fetchPanier();
      })
      .catch(err => console.error("Erreur suppression:", err));
  };

  if (!Array.isArray(produitsPanier) || produitsPanier.length === 0) {
    return <p>Aucun produit dans le panier...</p>;
  }

  
  const total = produitsPanier.reduce(
    (acc, pp) => acc + (pp.produit.prix * pp.quantite),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" sx={{ mb: 2, color: "var(--primary-color)" }}>
        🛍️ Mon Panier
      </Typography>

      {produitsPanier.map(pp => (
        <Card key={pp.id} sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 2, backgroundColor: "var(--light-bg)" }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: "var(--accent-color)" }}>
              {pp.produit.nom}
            </Typography>
            <Typography variant="body2">Type : {pp.produit.type}</Typography>
            <Typography variant="body2">Marque : {pp.produit.marque}</Typography>
            <Typography variant="body2">Prix unitaire : {pp.produit.prix} Ar</Typography>
            <Typography variant="body2">Quantité : {pp.quantite}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, color: "var(--success-color)" }}>
              Sous-total : {pp.produit.prix * pp.quantite} Ar
            </Typography>

            {/* ✅ Bouton Supprimer */}
            <Button
              variant="outlined"
              color="error"
              sx={{ mt: 1 }}
              onClick={() => supprimerProduit(pp.id)}
            >
              ❌ Supprimer dans les commandes
            </Button>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ color: "var(--highlight)" }}>
        💰 Total : {total} Ar
      </Typography>
    </div>
  );
}

export default PanierPage;
