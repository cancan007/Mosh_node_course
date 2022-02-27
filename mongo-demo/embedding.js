const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(JSON.stringify(course, null, 4));
}

async function listCourses() {
  const courses = await Course.find();
  console.log(JSON.stringify(courses, null, 4));
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}
/*
async function updateAuthor(courseId) {
  const course = await Course.update({ _id: courseId }, {
    //$set: {
    //'author.name': 'John Smith'
    //}
    $unset: {
      'author': ''
    }
  })
}*/

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

//createCourse('Node Course', [new Author({ name: 'Mosh' }), new Author({ name: 'John' })]);
//updateAuthor('621a4a130cfe6a60946f15a1');
//addAuthor('621ade836b7502734cc3bfda', new Course({ name: 'Amy' }))
removeAuthor('621ade836b7502734cc3bfda', '621ae012898bc68434751b7c')
