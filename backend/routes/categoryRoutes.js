// routes/categoryRoutes.js
router.get("/:type", async (req, res) => {
  const { type } = req.params;

  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({ error: "Invalid category type" });
  }

  try {
    const categories = await Category.find({ type });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

