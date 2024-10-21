const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const productsRoutes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);

// Définir les routes API
app.get("/api/example", (req, res) => {
  res.json({ message: "Hello from the API!" });
});
// Servir les fichiers statiques de React
app.use(express.static(path.join(__dirname, "public")));

// Route pour tout le reste renvoyant l'application React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// MongoDB connection
const mongoURI = process.env.MONGO_URI; // Récupérer l'URI de connexion depuis les variables d'environnement

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
