export default function handler(req, res) {
  if (req.method === !"POST") {
    res.status("405").send({ message: "Only post requests allowed" });
  }
  res.json(req.body);
}
