function Panier({ panier }) {
  if (!panier || !panier.lignes) {
    return <p>Chargement du panier...</p>;
  }

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">Panier #{panier.id}</Typography>
        {panier.lignes.map(ligne => (
          <Typography key={ligne.id} variant="body2">
            {ligne.produit.nom} x {ligne.quantite} = {ligne.sousTotal} Ar
          </Typography>
        ))}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Total : {panier.total} Ar
        </Typography>
      </CardContent>
    </Card>
  );
}
