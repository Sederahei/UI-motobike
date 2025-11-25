// src/pages/ClientsPage.js
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

function ClientsPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/clients`) // ✅ getAll
      .then(res => {
        if (!res.ok) throw new Error("Erreur HTTP " + res.status);
        return res.json();
      })
      .then(data => setClients(Array.isArray(data) ? data : []))
      .catch(err => console.error("Erreur fetch clients:", err));
  }, []);

  if (!Array.isArray(clients) || clients.length === 0) {
    return <p>Aucun client trouvé...</p>;
  }

  return (
    <div style={{ padding: "20px" ,color:"var(--primary-color)"}}>
      <h2>👤 Liste des Clients</h2>
      {clients.map(client => (
        <Card key={client.id} sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 2,backgroundCli:"var(--primary-color)" }}>
          <CardContent>
            <Typography variant="h6">{client.nom}</Typography>
            <Typography variant="body2">Email : {client.email}</Typography>
            <Typography variant="body2">Téléphone : {client.telephone}</Typography>
            <Typography variant="body2">Adresse : {client.adresse}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ClientsPage;
