// src/components/entity/Client.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function Client({ client }) {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{client.nom}</Typography>
        <Typography variant="body2">Email : {client.email}</Typography>
        <Typography variant="body2">Téléphone : {client.telephone}</Typography>
      </CardContent>
    </Card>
  );
}

export default Client;
