// src/components/Navbar.js
import { Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Récupère l'utilisateur connecté via backend (/user)
  useEffect(() => {
    axios.get("http://localhost:8080/user", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/logout";
  };

  return (
    <div style={{ display: "flex", gap: 8, padding: 12, alignItems: "center" }}>
      {user ? (
        <>
          {user.role === "CLIENT" && (
            <>
              <Button onClick={() => navigate("/")}>Accueil</Button>
              <Button onClick={() => navigate("/produits")}>Produits</Button>
              <Button onClick={() => navigate("/panier")}>Panier</Button>
              <Button onClick={() => navigate("/commandes")}>Mes commandes</Button>
            </>
          )}

          {user.role === "ADMIN" && (
            <>
              <Button onClick={() => navigate("/admin/commandes")}>Admin Commandes</Button>
              <Button onClick={() => navigate("/admin/produits")}>Admin Produits</Button>
            </>
          )}

          {/* Affichage profil Google */}
          <Avatar src={user.picture} alt={user.name} />
          <span>{user.name}</span>
          <Button variant="outlined" onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <Button variant="contained" onClick={handleGoogleLogin}>
          Login avec Google
        </Button>
      )}
    </div>
  );
}
