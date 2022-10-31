const bcrypt = require("bcrypt");

function carViewModel(car) {
  const model = {
    id: car._id,
    name: car.name,
    price: car.price,
    imageUrl: car.imageUrl,
    description: car.description,
    accessories: car.accessories,
  };

  if (model.accessories.length && model.accessories[0].name) {
    model.accessories = model.accessories.map(accessoryViewModel);
  }

  return model;
}

function accessoryViewModel(accessory) {
  return {
    id: accessory._id,
    name: accessory.name,
    price: accessory.price,
    imageUrl: accessory.imageUrl,
    description: accessory.description,
  };
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function comparePassword(password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
}

module.exports = {
  carViewModel,
  accessoryViewModel,
  hashPassword,
  comparePassword,
};