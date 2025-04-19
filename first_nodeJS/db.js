require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, 
    dialect: 'mysql',
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Đã kết nối MySQL');
  } catch (err) {
    console.error('❌ Lỗi kết nối MySQL:', err);
  }
}

// Gọi hàm để kết nối cơ sở dữ liệu
connectDB();

module.exports = sequelize;
