const fs = require('fs');

function getFurnitureData() {
        try {
                const jsonData = fs.readFileSync('furnitureData.json', 'utf-8');
                return JSON.parse(jsonData);
        } catch (error) {
                console.error('Data could not received: ', error.message);
                throw (error);
        }
}

module.exports = {
        getFurnitureData,
};