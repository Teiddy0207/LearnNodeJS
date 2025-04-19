const { User, Role, Permission } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const path = require('path');
require('dotenv').config();



const showLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'test', 'index.html' ));
};

const handelLogin = async (req, res) => {
  console.log("Debugging login process"); // Dùng console.log thay vì alert

  const { username, password } = req.body;

  try {
    // Tìm người dùng từ database, bao gồm thông tin về role và quyền
    const user = await User.findOne({
      where: { username },
      include: {
        model: Role,
        include: {
          model: Permission, // Bao gồm thông tin về quyền của người dùng
          as: 'Permissions', 
          through: { attributes: [] } 
        }
      }
    });

    console.log("User:", JSON.stringify(user, null, 2));

    if (!user) {
      return res.send(`<h2 style="color:red;">Không tìm thấy tài khoản</h2><a href="/login">Thử lại</a>`);
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send(`<h2 style="color:red;">Sai mật khẩu</h2><a href="/login">Thử lại</a>`);
    }

    // Kiểm tra quyền truy cập của user
    const permissions = user.Role?.Permissions?.map(permission => permission.name) || [];

    console.log("User Permissions:", permissions); // In ra quyền của người dùng

    const payload = {
      userId: user.id,
      username: user.username,
      role: user.Role?.name, 
      permissions: user.Role.Permissions.map(permission => permission.name)
    };

    const token = jwt.encode(payload, process.env.JWT_SECRET, 'HS256'); // 'HS256' là thuật toán mã hóa, có thể thay đổi
    console.log('token là', token);

    req.session.token = token; 
    req.session.username = user.username;
    console.log('được lưu',req.session.token)

    res.redirect('/welcome'); 

  } catch (err) {
    console.error("Error during login:", err); 
    res.status(500).send('Lỗi máy chủ: ' + err);
  }
};



const getWelcome = (req, res) => {
    const username = req.session.username;
    
    if (username) {
        res.render('test/welcome', { username });  
    } else {
        res.redirect('/login');
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Logout failed");
        }
        res.clearCookie('connect.sid'); 
        res.redirect('/'); 
    });
};



module.exports = { showLogin, handelLogin, getWelcome , logout };

