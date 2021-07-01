const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { places,descriptors } = require('./seedHelper');
const Campground = require('../models/campground');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/camp-site', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log('Database connected');
});

const sampTitle = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i < cities.length-1; i++){
        const randomize = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 20) + 10;
        const randomCity = new Campground({
            location: `${cities[randomize].city}, ${cities[randomize].state}`,
            title: `${sampTitle(descriptors)} ${sampTitle(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nihil id rem sed dicta velit consequatur accusamus accusantium nesciunt hic facilis nulla, eius sint est dolorum sunt eum libero quis magni animi, quos explicabo repudiandae? Cumque, dolores doloremque fugit ab, quibusdam aliquid blanditiis voluptas iusto excepturi provident minima aut id.",
            price
        });
        await randomCity.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
});