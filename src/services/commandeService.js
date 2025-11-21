export async function getCommandes() {
  const res = await fetch("http://localhost:8080/api/commandes");
  return res.json();
}
