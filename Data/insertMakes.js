var _ = require('lodash-node');
var randomstring = require('randomstring');
var models = require('./../models');

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
    'name': 'GMC'
}, {
    'name': 'Hyundai'
}, {
    'name': 'Isuzu'
}, {
    'name': 'KIA'
}, {
    'name': 'Mercedes Benz'
}, {
    'name': 'Mazda'
}, {
    'name': 'Mitsubishi'
}, {
    'name': 'Nissan'
}, {
    'name': 'Rolls-Royce'
} ,{
    'name': 'Saab'
}, {
    'name': 'Suzuki'
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
}, {
    model: 'Expedition',
    year: 2012,
    milage: 100000,
    chassis_number: '9799VSU',
    licence_plate: 'FORD9988SUV',
    body_type: 'SUV',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Ford'
}, {
    model: 'Carolla',
    year: 2013,
    milage: 30000,
    chassis_number: '9734ABTY',
    licence_plate: 'TOY676ABC',
    body_type: 'Coupe',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Toyota'
}, {
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
},{
    model: 'Alantra',
    year: 2011,
    milage: 115100,
    chassis_number: '1934ABHY',
    licence_plate: 'HYU123ABC',
    body_type: 'Coupe',
    description: 'Aasdjfas ad asdkf asdlf',
    make: 'Hyundai'
}, {
    model: 'Sonata',
    year: 2009,
    milage: 110000,
    chassis_number: '12356ABCE',
    licence_plate: 'HYUZ123ATC',
    body_type: 'Coupe',
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
    model: 'Fusion',
    year: 2008,
    milage: 160000,
    chassis_number: '8234ABCE',
    licence_plate: 'FORD123ABC',
    body_type: 'Hatchback',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Ford'
}, {
    model: 'F450',
    year: 2007,
    milage: 200000,
    chassis_number: '77234ABCE',
    licence_plate: 'FORD333ABC',
    body_type: 'Pickup',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Ford'
}, {
    model: 'F450',
    year: 2011,
    milage: 175000,
    chassis_number: '9734ABCE',
    licence_plate: 'FORD676ABC',
    body_type: 'Pickup',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Ford'
}, {
    model: 'Explorer',
    year: 2013,
    milage: 100000,
    chassis_number: '9799ABCE',
    licence_plate: 'FORD676SUV',
    body_type: 'SUV',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Ford'
}, {
    model: 'Expedition',
    year: 2012,
    milage: 100000,
    chassis_number: '9799VSU',
    licence_plate: 'FORD9988SUV',
    body_type: 'SUV',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Ford'
}, {
    model: 'Carolla',
    year: 2013,
    milage: 30000,
    chassis_number: '9734ABTY',
    licence_plate: 'TOY676ABC',
    body_type: 'Coupe',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'Toyota'
}, {
    model: 'Z3',
    year: 2015,
    milage: 10000,
    chassis_number: '109X34ABTY',
    licence_plate: 'TOY9989',
    body_type: 'Coupe',
    description: 'Adlkfas asldkf Olkasd asodf',
    make: 'BMW'
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
    model: 'C',
    year: 2015,
    milage: 5000,
    chassis_number: 'FRA1234CC5',
    licence_plate: 'CIT5CC77',
    body_type: 'Coupe',
    description: 'Aasdjfas ad asdkf asdlf',
    make: 'Mercedes Benz'
}
];

function insertCars() {
    var Make = models.Make;
    Make.findAll({}).then(function(allMakes) {
        makes = allMakes;
        _.forEach(cars, function(aCar) {
            var Car = models.Car;
            var make = aCar.make;
            var aMake = _.find(makes, {
                'name': make
            });
            var licencePlate = randomstring.generate({
                length: 8,
                readable: true,
                charset: 'alphanumeric'
            });
            var chassisNumber = randomstring.generate({
                length: 8,
                charset: 'alphanumeric'
            });
            chassisNumber = (make.substr(0,3) + chassisNumber).toUpperCase();
            aCar.chassis_number = chassisNumber;
            aCar.licence_plate = licencePlate.toUpperCase();

            aCar.make_id = aMake.id;

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
