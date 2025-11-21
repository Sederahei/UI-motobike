// src/pages/CommandesPage.js
import React, { useEffect, useState } from "react";
import Commande from "../assets/components/layout/Entity/Commande";

function CommandesPage() {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/commandes")
      .then(res => res.json())
      .then(data => setCommandes(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Liste des Commandes</h2>
      {commandes.map(cmd => (
        <Commande key={cmd.id} commande={cmd} />
      ))}
    </div>
  );
}

export default CommandesPage;
