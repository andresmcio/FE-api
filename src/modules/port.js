module.exports = {
    port: process.env.PORT || 2023,
    callback: (port)=>{console.log('Server listening on port ' + port)}
};