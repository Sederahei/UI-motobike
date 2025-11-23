import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import Home from "./pages/Home";
import CommandesPage from "./pages/CommandesPage";
import ProduitsPage from "./pages/ProduitsPage";
import PanierPage from "./pages/PanierPage";
import ClientsPage from "./pages/ClientsPage";
import HistoriquePage from "./pages/HistoriquePage";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🚀 MotoBike Store
          </Typography>
          <Button color="inherit" component={Link} to="/">Accueil</Button>
          <Button color="inherit" component={Link} to="/produits">Produits</Button>
          <Button color="inherit" component={Link} to="/panier">Panier</Button>
          <Button color="inherit" component={Link} to="/commandes">Commandes</Button>
          <Button color="inherit" component={Link} to="/clients">Clients</Button>
          <Button color="inherit" component={Link} to="/historique">Historique</Button>
        </Toolbar>
      </AppBar>

      {/* ✅ Routing vers les pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produits" element={<ProduitsPage />} />
        <Route path="/paniers" element={<PanierPage />} />
        <Route path="/commandes" element={<CommandesPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/historique" element={<HistoriquePage />} />
      </Routes>
    </Router>
  );
}

export default App;
