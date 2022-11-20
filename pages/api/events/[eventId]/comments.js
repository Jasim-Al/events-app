export default function handler(req, res) {
  if (req.method === "POST") {
    const { comment } = req.body;
    res.status(201).json({ comment });
  }
}
