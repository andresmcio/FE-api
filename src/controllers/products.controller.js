const fs = require('fs');
const path = require('path');

function fetchAll (categories) {
    const all = [];
  
    for (const category in categories) {
      if (categories.hasOwnProperty(category)) {
        const productsInCategory = categories[category];
        all.push(...productsInCategory);
      }
    }
  
    return all;
  }

module.exports = {
    getAll: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const data = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const products = fetchAll(data);
        res.json(products);
    },
    getBySku: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const data = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const products = fetchAll(data);
        const product = products.find(product => product.sku == req.params.sku);
        res.json(product);
    }
}