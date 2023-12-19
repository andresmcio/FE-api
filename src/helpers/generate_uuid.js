function generateUUID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let uuid = '';
  
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      uuid += characters.charAt(randomIndex);
    }
  
    return uuid;
  }  

  module.exports = generateUUID;