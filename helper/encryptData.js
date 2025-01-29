import CryptoJs from 'crypto-js'
export default async function encryptData(data) {
    
    const encrypt=await CryptoJs.AES.encrypt(data,process.env.SECRET_KEY).toString()
    return encrypt
    
}