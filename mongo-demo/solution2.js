const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
        //.or([{ tags: 'frontend', tags: 'backend' }])
        .sort({ price: -1 }) // '-name': descending
        .select({ name: 1, author: 1, price: 1 });  // == 'name author'
}

async function run() {
    const courses = await getCourses(); // automatically this function is wrapped with Promise by javascropt engine.
    console.log(courses);
}

run();