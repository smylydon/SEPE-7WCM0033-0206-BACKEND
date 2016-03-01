var _ = require('lodash-node');
var models = require('./models');

var makes = [{
    'name': 'Alpha Romeo'
}, {
    'name': 'Audi'
}, {
    'name': 'BMW'
}, {
    'name': 'Chrysler'
}, {
    'name': 'Citroen'
}, {
    'name': 'Fiat'
}, {
    'name': 'Ford'
}, {
    'name': 'GM'
}, {
    'name': 'Hyundai'
}, {
    'name': 'Mercedes'
}, {
    'name': 'Saab'
}, {
    'name': 'Toyota'
}, {
    'name': 'Volks Wagon'
}, {
    'name': 'Volvo'
}];
var cars = [{
    model: 'Accent',
    year: 2010,
    milage: 110000,
    chassis_number: '1934ABHY',
    licence_plate: 'HYU123ABC',
    body_type: 'Hatchback',
    description: 'Aasdjfas ad asdkf asdlf',
    make: 'Hyundai'
}, {
    model: 'Accent',
    year: 2009,
    milage: 110000,
    chassis_number: '12356ABCE',
    licence_plate: 'HYUZ123ATC',
    body_type: 'Hatchback',
    description: 'Aasdjfas ad asdkf asdlf',
    make: 'Hyundai'
}, {
    model: 'Accent',
    year: 2010,
    milage: 120000,
    chassis_number: '12347ABCE',
    licence_plate: 'HYUD123PHY',
    body_type: 'Coupe',
    description: 'Aasdjfas ad asdkf asdlf',
    make: 'Hyundai'
}, {
    model: 'Focus',
    year: 2009,
    milage: 135000,
    chassis_number: '8234ABCE',
    licence_plate: 'FORD123ABC',
    body_type: 'Hatchback',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Ford'
}, {
    model: 'F250',
    year: 2009,
    milage: 160000,
    chassis_number: '77234ABCE',
    licence_plate: 'FORD333ABC',
    body_type: 'Pickup',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Ford'
}, {
    model: 'F450',
    year: 2011,
    milage: 60000,
    chassis_number: '9734ABCE',
    licence_plate: 'FORD676ABC',
    body_type: 'Pickup',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Ford'
}, {
    model: 'Explorer',
    year: 2011,
    milage: 150000,
    chassis_number: '9799ABCE',
    licence_plate: 'FORD676SUV',
    body_type: 'SUV',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Ford'
},{
    model: 'Expedition',
    year: 2012,
    milage: 100000,
    chassis_number: '9799VSU',
    licence_plate: 'FORD9988SUV',
    body_type: 'SUV',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Ford'
},{
    model: 'Carolla',
    year: 2013,
    milage: 30000,
    chassis_number: '9734ABTY',
    licence_plate: 'TOY676ABC',
    body_type: 'Coupe',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Toyota'
},{
    model: 'Camry',
    year: 2014,
    milage: 30000,
    chassis_number: '109X34ABTY',
    licence_plate: 'TOY9989',
    body_type: 'Coupe',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Toyota'
}, {
    model: 'Saxo',
    year: 2015,
    milage: 11000,
    chassis_number: 'FRA1234XSX',
    licence_plate: 'CITZ123ATC',
    body_type: 'Hatchback',
    description: 'Aasdjfas ad asdkf asdlf',
    make: 'Citroen'
}, {
    model: 'C5',
    year: 2015,
    milage: 5000,
    chassis_number: 'FRA1234CC5',
    licence_plate: 'CIT5CC77',
    body_type: 'Coupe',
    description: 'Aasdjfas ad asdkf asdlf',
    make: 'Citroen'
}];

function insertCars() {
    var Make = models.Make;
    Make.findAll({}).then(function(allMakes) {
        makes = allMakes;
        _.forEach(cars, function(aCar) {
            var Car = models.Car;
            var aMake = _.find(makes, {
                'name': aCar.make
            });
            aCar.make_id = aMake.id;
            //delete aCar.make;
            //console.log('AvCar:', aCar);
            Car.create(aCar);
        });
    });
}

function insertMakes() {
    var aMake = makes.shift();
    var Make = models.Make;
    Make.create(aMake)
        .then(function(make) {
            if (makes.length) {
                insertMakes();
            } else if (cars.length > 0) {
                insertCars();
            }
        });
}

module.exports = insertMakes;
