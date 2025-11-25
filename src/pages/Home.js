// src/pages/Home.js
import React from "react";
import { Typography, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../pagesStyle/Home.css";

function Home() {
  const navigate = useNavigate();

  const ajouterAuPanier = (produitId) => {
    fetch(`${process.env.REACT_APP_API_URL}/paniers/client/1/ajouter/${produitId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantite: 1 })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur ajout panier");
        return res.json();
      })
      .then(() => alert("✅ Produit ajouté au panier !"))
      .catch(err => console.error("Erreur:", err));
  };

  const produits = [
    { id: 1, nom: "Yamaha MT-07", type: "moto", marque: "Yamaha", prix: 7500, stock: 10, image: "/images/yamaha-mt07.jpg" },
    { id: 2, nom: "KTM Duke 390", type: "moto", marque: "KTM", prix: 5200, stock: 12, image: "/images/ktm-duke390.jpg" },
    { id: 3, nom: "Giant Escape 3", type: "bicyclette", marque: "Giant", prix: 450, stock: 20, image: "/images/giant-escape3.jpg" },
    { id: 4, nom: "Trek Marlin 7", type: "bicyclette", marque: "Trek", prix: 800, stock: 15, image: "/images/trek-marlin7.jpg" },
    { id: 5, nom: "Casque intégral Shark", type: "accessoire", marque: "Shark", prix: 250, stock: 30, image: "/images/casque-shark.jpg" },
    { id: 6, nom: "Antivol Kryptonite", type: "accessoire", marque: "Kryptonite", prix: 60, stock: 50, image: "/images/antivol-kryptonite.jpg" },
    { id: 7, nom: "Honda CB500F", type: "moto", marque: "Honda", prix: 6800, stock: 8, image: "/images/honda-cb500f.jpg" },
    { id: 8, nom: "PeterMotor CB500F", type: "moto", marque: "Honda", prix: 6800, stock: 8, image: "/images/petermotor-cb500f.jpg" }
  ];

  return (
    <div style={{ padding: "40px" }}>
      <Typography variant="h4" gutterBottom>
        🏠 Bienvenue sur MotoBike App
      </Typography>
      <Typography variant="body1" gutterBottom>
        Choisissez une section pour commencer :
      </Typography>

      {/* ✅ Section menu classique */}
      <div style={{ marginBottom: "40px" }}>
        <Button variant="contained" onClick={() => navigate("/produits")} sx={{ mr: 2 }}>Voir Produits</Button>
        <Button variant="contained" onClick={() => navigate("/panier")} sx={{ mr: 2 }}>Voir Panier</Button>
        <Button variant="contained" onClick={() => navigate("/commandes")} sx={{ mr: 2 }}>Voir Commandes</Button>
        <Button variant="contained" onClick={() => navigate("/clients")} sx={{ mr: 2 }}>Voir Clients</Button>
        <Button variant="contained" onClick={() => navigate("/historique")}>Voir Historique</Button>
      </div>

      {/* ✅ Section produits défilants */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        🌟 Nos Produits
      </Typography>
      <div className="product-carousel">
        {produits.map(p => (
          <Card key={p.id} className="product-card">
            <CardContent>
              <img src={p.image} alt={p.nom} style={{ width: "100%", borderRadius: "8px" }} />
              <Typography variant="h6" sx={{ mt: 1 }}>{p.nom}</Typography>
              <Typography variant="body2">{p.type} — {p.marque}</Typography>
              <Typography variant="body2" sx={{ color: "var(--accent-color)" }}>Prix : {p.prix} Ar</Typography>
              <Typography variant="body2" sx={{ color: "var(--success-color)" }}>Stock : {p.stock}</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => ajouterAuPanier(p.id)}>
                🛒 Ajouter au panier
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
