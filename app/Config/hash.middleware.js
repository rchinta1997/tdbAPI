var crypto = require('crypto');
const config = require("../../config/hash.config");

class hashMiddleWare {
    constructor() { }

    async encryptText(rawText) {
        const key = crypto.scryptSync(config.ENCRYPTION_KEY, 'salt', 32);
        let iv = crypto.randomBytes(config.IV_LENGTH);
        let cipher = crypto.createCipheriv(config.algorithm, key, iv);
        let encryptedData = cipher.update(rawText, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        return iv.toString('hex') + ':' + encryptedData.toString('hex');
    }

    async decryptText(text) {
        try {
            //const keyencrypt=this.encryptText('TrainDhaba@123');
            const key = crypto.scryptSync(config.ENCRYPTION_KEY, 'salt', 32);
            let textParts = text.split(':');
            let iv = Buffer.from(textParts.shift(), 'hex');
            let encryptedText = Buffer.from(textParts.join(':'), 'hex');
            let decipher = crypto.createDecipheriv(config.algorithm, key, iv);
            let decryptedData = decipher.update(encryptedText, "hex", "utf-8");

            decryptedData += decipher.final("utf-8");
            return decryptedData;
        } catch (error) {
            throw error;
        }

    }
}

module.exports = hashMiddleWare;
