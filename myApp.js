require('dotenv').config();
var mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:false})

const personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})

//creating a model from a schema
const Person = mongoose.model('Person', personSchema);

//NOTE: for this stuff to work when deployed to heroku, remove the quote marks from the URL in the config vars in heroku
const createAndSavePerson = (done) => {
  //an instance of a model is called a document
  const me = new Person({
    name: "Avi",
    age: 20,
    favoriteFoods: ["cheese string", "fridge raiders", "apple"]
  })
  me.save((err, data)=>{
    if (err) return console.error(err)
    done(null, data)
  })
  // done(null)
};

// let people = [
//   {
//     name: "Mayank Mukesh",
//     age: 14,
//     favoriteFoods: ["chicken manchurian", "poo"]
//   },
//   {
//     name: "Knob Muncher",
//     age: 53,
//     favouriteFoods: ["pasta sauce", "sunflower seeds", "grass"]
//   }
// ]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, peopleFound)=>{
    if(err) return console.error(err)
    done(null, peopleFound)
  })
  // done(null);
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, people)=>{
    if(err) return console.error(err)
    done(null, people)
  })
  // done(null , data);
};

const findOneByFood = (food, done) => {
  //finds person if the array favoriteFoods contains food
  Person.findOne({favoriteFoods:food}, (err, person)=>{
    if(err) return console.error(err)
    done(null, person)
  })
  // done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person)=>{
    if(err) return console.error(err)
    done(null, person)
  })
  // done(null /*, data*/);
};

//classic method for updating documents
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person)=>{
    if(err) return console.error(err)
    person.favoriteFoods.push(foodToAdd)
    person.save((err, data)=>{
      if(err) return console.error(err)
      console.log(data)
      done(null, data)
    })
  })

  // done(null /*, data*/);
};

//recent versions of Mongoose have simplified document updating
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // Person.findOne({name:personName}, (err, person)=>{
  //   if(err) return console.error(err)
  //   person.age = ageToSet
  //   console.log(person)
  //   person.save((err, data)=>{
  //     if(err) return console.error(err)
  //     done(null, data)
  //   })
  // })

  //the newer way of doing it
  //3rd argment specifies that I want the version of the document AFTER updating
  //(but from my quick testing, omitting this argument doesn't make a difference, so idk...)
  Person.findOneAndUpdate({name:personName}, {age: ageToSet}, {new:true}, (err, updatedPerson)=>{
    if(err) return console.error(err)
    console.log("returning updated geezer")
    done(null, updatedPerson)
  })
  // done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person)=>{
    if(err) return console.error(err)
    console.log(person)
    done(null, person);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
