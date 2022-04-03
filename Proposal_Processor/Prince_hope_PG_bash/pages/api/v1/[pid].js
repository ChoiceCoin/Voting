export default function handler(req, res) {
  const { pid } = req.query;
  
  res.end(`${req.method}: ${pid}`);
}
