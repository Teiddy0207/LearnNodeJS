const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_crud', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('✅ Đã kết nối MySQL');
} catch (err) {
  console.error('❌ Lỗi kết nối MySQL:', err);
}

module.exports = sequelize;
