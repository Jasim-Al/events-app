export default function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    res.status(201).json({ email });
  }

  res.redirect("/404", 404);
}
