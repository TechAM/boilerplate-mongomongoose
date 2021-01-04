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
  done(null)
};

const createManyPeople = (arrayOfPeople, done) => {
  let people = [
    {
      name: "Mayank Mukesh",
      age: 14,
      favoriteFoods: ["chicken manchurian", "poo"]
    },
    {
      name: "Knob Muncher",
      age: 53,
      favouriteFoods: ["pasta sauce", "sunflower seeds", "grass"]
    }
  ]

  Person.create(people, (err, data)=>{
    if(err) return console.error(err)
    done(null, data)
  })
  done(null);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
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
