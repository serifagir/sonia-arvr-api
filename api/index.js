const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const furnitureDataModule = require('./furnitureDataModule');
const axios = require('axios');

const ESP32_API_URL = 'http://192.168.1.184/data';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());


app.get('/api/furniture', (req, res) => {
        const furnitureData = furnitureDataModule.getFurnitureData();
        res.json(furnitureData);
});

app.get('/api/furniture/:id', (req, res) => {
        const furnitureData = furnitureDataModule.getFurnitureData();
        const id = parseInt(req.params.id);
        const furniture = furnitureData.find(item => item.id === id);
        if (furniture) {
                res.json(furniture);
        } else {
                res.status(404).json({ error: 'Item not found.' });
        }
});

app.post('/api/furniture', (req, res) => {
        const furnitureData = furnitureDataModule.getFurnitureData();
        const newFurniture = req.body;
        newFurniture.id = furnitureData.length + 1;
        furnitureData.push(newFurniture);
        res.status(201).json(newFurniture);
});

app.get('/api/esp32data', async (req, res) => {
        try {
                const response = await axios.get(ESP32_API_URL);
                res.json(response.data);
        } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Data could not received." });
        }
});

app.listen(PORT, () => {
        console.log(`Server running on: http://localhost:${PORT}`);
});