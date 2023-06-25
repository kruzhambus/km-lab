import axios from 'axios';
import _forEach from 'lodash/forEach.js'
import Table from 'cli-table';

// Генеруємо випадкове число від 1 до 100
const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

// Генеруємо випадкове айді
const generateId = () => {
  const id = getRandomNumber();
  const data = { id };

  return id;
};

// Виводимо дані в консоль
const printData = (data) => {
  const table = new Table();

  _forEach(data, (value, key) => {
    if (Array.isArray(value)) {
      value = value.join(', ');
    }
    table.push({ [key]: value });
  });
  
  console.log(table.toString());
};

// Отримуємо дані з API за айді
const fetchData = async (id) => {
  try {
    const response = await axios.get(`https://anapioficeandfire.com/api/characters/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.log('Помилка під час отримання даних з API:', error.message);
    process.exit(1);
  }
};

// Головна функція
const main = async ()  => {
  const id = generateId();
  const data = await fetchData(id);
  printData(data)
};

// Запускаємо програму
main();
