// src/pages/Home.js
import React from "react";
import { Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <Typography variant="h4" gutterBottom>
        🏠 Bienvenue sur MotoBike App
      </Typography>
      <Typography variant="body1" gutterBottom>
        Choisissez une section pour commencer :
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">🛒 Produits</Typography>
              <Button variant="contained" onClick={() => navigate("/produits")} sx={{ mt: 1 }}>
                Voir Produits
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">🛍️ Panier</Typography>
              <Button variant="contained" onClick={() => navigate("/panier")} sx={{ mt: 1 }}>
                Voir Panier
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">📦 Commandes</Typography>
              <Button variant="contained" onClick={() => navigate("/commandes")} sx={{ mt: 1 }}>
                Voir Commandes
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">👤 Clients</Typography>
              <Button variant="contained" onClick={() => navigate("/clients")} sx={{ mt: 1 }}>
                Voir Clients
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">📜 Historique</Typography>
              <Button variant="contained" onClick={() => navigate("/historique")} sx={{ mt: 1 }}>
                Voir Historique
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
