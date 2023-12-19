const {readFileSync} = require('fs');
const {resolve} = require('path');

module.exports = {
    init: (req, res) => {
        res.json({message: 'Connection established'});
    },
};