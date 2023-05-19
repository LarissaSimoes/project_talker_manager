const fs = require('fs').promises;
const { join } = require('path');

const readFile = async () => {
    const path = '/talker.json';
    try {
      const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
      return JSON.parse(contentFile);
    } catch (error) {
      return null;
    }
  };
  
  const getAllTalkers = async () => {
    const result = await readFile();
    return result;
  };

  const getTalkerById = async (id) => {
    const result = await readFile();
    const data = result.find((talker) => talker.id === Number(id));
    return data;
  };

  const generateRandomToken = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  module.exports = {
    getAllTalkers,
    getTalkerById,
    generateRandomToken,
    isEmailValid,
  };
