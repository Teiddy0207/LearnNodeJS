const path = require('path')

const users = {
    username : 'quanh',
    password: '123456'
}


const showLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'test', 'index.html' ));
};

const handelLogin = (req, res) => {
    const {username, password} = req.body;

    if(username === users.username && password === users.password)
    {
        req.session.username = username; 

        // res.sendFile(path.join(__dirname, '..', 'views', 'test','welcome.html'));
        res.redirect('/welcome'); 
    }else
    {
        res.send(`<h2 style="color:red;">Sai tài khoản hoặc mật khẩu</h2><a href="/login">Thử lại</a>`);
    }
}

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

