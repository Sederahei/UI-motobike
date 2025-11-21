// src/components/entity/Produit.js
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

function Produit({ produit, onAddToCart }) {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{produit.nom}</Typography>
        <Typography variant="body2">Marque : {produit.marque}</Typography>
        <Typography variant="body2">Type : {produit.type}</Typography>
        <Typography variant="body2">Prix : {produit.prix} Ar</Typography>
        <Typography variant="body2">Stock : {produit.stock}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => onAddToCart(produit)}
          sx={{ mt: 1 }}
        >
          Ajouter au panier
        </Button>
      </CardContent>
    </Card>
  );
}

export default Produit;
