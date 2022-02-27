const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((error) => console.error('Could not connect to MongoDB...', error));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlengt: 255 },  // required: true => you can't add data without name
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],   // enum: you have to fill one of these values.
        lowercase: true,  // turn value with lower letters
        //uppercase: true
        trim: true  // to convert ' hello' or 'hello ' into 'hello'
    },
    author: String,
    tags: {
        type: Array,
        validate: {  // Async validation
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    // Do some async work
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000)
            },
            message: 'A course should have at least one tag.'  // when it is invalid, this message is displayed
        }

    },
    data: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished },
        min: 10,
        max: 200,
        get: v => Math.round(v),  // when you read the value, this is called
        set: v => Math.round(v)   // when you set the value, this is called
    }
});

const Course = mongoose.model('Course', courseSchema);  // You create Courses in the database you connected on default

// Classes, objects
async function createCourse() {
    const course = new Course({
        name: "Angular Course",
        category: 'WEB',
        author: "Mosh",
        tags: ["angular", "frontend"],
        isPublished: true,
        price: 15.8
    });

    try {
        //await course.validate();
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        //console.log(exp.message);
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}



async function getCourses() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than ot eual to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // or
    // and

    // Starts with Mosh
    // End with Hamedani
    // Contains Mosh

    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
        .find({ _id: "6219d7dd590d6f1038db1c9f" })
        //.find({ author: 'Mosh', isPublished: true })
        //.find({ price: { $gt: 10, $lte: 20 } })
        //.find({ price: { $in: [10, 15, 20] } }) // when price is equal to 10, 15 or 20
        //.find({ author: /^Mosh/ }) // starts with Mosh
        //.find({ author: /Hamedani$/ }) // ends with Hamedani
        //.find({ author: /.*Mosh.*/ }) // contains Mosh
        //.or([{ name: 'Mosh' }, { isPublished: true }])
        //.skip((pageNumber - 1) * pageSize)
        //.limit(pageSize)
        .sort({ name: 1 }) // 1: ascending, -1: descending
        .select({ name: 1, tags: 1, price: 1 }); // show only name and tags params
    //.count();
    console.log(courses[0].price);
}

async function updateCourse(id) {
    // Approach: Query first
    // findById()
    // Modify its properties
    // save()

    // Approach: Update first
    // Update directory
    // Optionally: get the updated document
    /*
        const result = await Course.update({ _id: id }, {
            $set: {
                author: 'Jason',
                isPublished: false
            }
        });
    */
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    }, { new: true });  // new: true => get the updated document

    /*
    const course = await Course.findById(id);
    if (!course) return;
    //course.isPublished = true;
    //course.author = 'Another author';
    await course.set({
        isPublished: true,
        author: 'Another author'
    });
    const result = await course.save();
    */
    console.log(result);
}

async function removeCourse(id) {
    //const result = await Course.deleteOne({ _id: id });  // deleteMany: you can delete multiple
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

//createCourse();

getCourses();

//updateCourse("6219788e43c26c80f8693914");

//removeCourse("6219788e43c26c80f8693914");