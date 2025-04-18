const db = require('../db');
const Car = require('../models/Car');

exports.index = (req, res) => {
    res.render('cars/index');
}



exports.getCar = async (req, res) => {

    try {
        const cars = await Car.findAll();
        const carsData = cars.map(car => car.toJSON());
        res.json({ data: carsData });
    } catch (err) {
        console.error("Lỗi getCar:", err.message);
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu xe' });
    }
}

exports.insertCar = async (req, res) => {
    try {

        const { nameCar, brand, year, price } = req.body; 
        const car = await Car.create({
            name: nameCar,
            brand: brand,
            year: year,
            price: price
        })

        res.json({ message: 'Them xe thanh cong', data: car })

    } catch (err) {
        console.error('loi khi them xe', err.message);
        res.status(500).json({ error: err.message });

    }
}

exports.deleteCar = async (req, res) => {
    try {
        const carId = req.params.id;

        const car = await Car.destroy({
            where: { id: carId }
        });

        res.json({message: 'xe xoa thanh cong'});
    } catch {
        res.status(500).json({erroor: 'loi khi xoa xe'});
    }
}


exports.updateCar = async (req, res) =>
{
    try{
        const carID = req.params.id;
        const { nameCar, brand, year, price } = req.body;

        const car = await Car.findByPk(carID);


        car.name = nameCar || car.name; 
        car.brand = brand || car.brand;
        car.year = year || car.year;
        car.price = price || car.price;

        await Car.save();

        res.json({message: 'Cập nhật xe thành công' , data: car});
        
    }catch{
        res.status(500).json({error: 'Lỗi khi cập nhật xe'});
    }
}



