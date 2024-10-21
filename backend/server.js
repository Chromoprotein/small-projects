require("dotenv").config()
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all requests
app.use(cors());

// PEXEL

app.get("/api/image", async (req, res) => {
  const id = parseInt(req.query.id);

  try {
    const pexelsKey = process.env.PEXELS_KEY;

    const response = await axios.get(`https://api.pexels.com/v1/photos/${id}`, { 
      headers: {
        "Authorization": pexelsKey
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.get("/api/images", async (req, res) => {
  const query = req.query.query || "nature"; // Default query if none provided
  const page = req.query.page || 1;

  try {
    const pexelsKey = process.env.PEXELS_KEY;

    const response = await axios.get("https://api.pexels.com/v1/search", { 
        headers: {
        "Authorization": pexelsKey
        },
        params: {
            query: query,
            page: page
        },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
