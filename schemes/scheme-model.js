//* Import the database *// 
const db = require('../data/db-config'); 

//* define the exports *// 
//TODO MVP exports: find(), findById(id), findSteps(id), add(scheme), update(changes, id), remove(id)
module.exports = {
    find,
    findById,
    findSteps,
    add, 
    update, 
    remove,
    addStep
}; 

//! Functions Start !// 
//* finding functions *// ✅ - All working

function find() {
    return db('schemes'); 
}; 

function findById(id) {
    return db('schemes')
            .where({ id })
            .first();
};

//* To find the steps for a scheme we must: JOIN to the Steps table, they are linked by the SCHEME ID *// 
//TODO: First we need the Schemes table, then JOIN the Steps table, filtering the steps to each Scheme with the scheme.id and the Steps by steps.scheme_id. 
//TODO: Second we define the SELECT query to select the name, step number and step instruction WHERE the id matches the one fed into the function.
//TODO: Finally - order the steps by number
function findSteps(id) {
    return db('schemes')
            .join('steps', 'schemes.id', 'steps.scheme_id')
            .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
            .where({ scheme_id: id })
            .orderBy('steps.step_number');
};

//* manipulating functions *// 

//TODO: To ADD a Scheme we have to INSERT the scheme and generated ID into the Schemes table
//TODO: THEN we can use the ID of the new scheme to call the findById function and use the promise to return the newly added scheme and id number

//? Q: Because these functions call another function, and return a promise, what should we be doing with the .catch in these cases? What's best practice? 

function add(scheme) {
    return db('schemes')
            .insert(scheme, 'id')
            .then(([id]) => {
                return findById(id);
            })
            .catch(err => {
                console.log(err)
            });
};

function update(changes, id) {
    return db('schemes')
            .where({ id })
            .update(changes)
            .then(() => {
                return findById(id);
            })
            .catch(err => {
                console.log(err); 
            });
};

function remove(id) {
    return db('schemes')
            .where({ id })
            .del();
};

//TODO: To add a new step we need the new step to INSERT and the scheme_id to correctly link the step to a scheme, because we are NOT adding it to the Scheme table, we will call the Steps table instead 
// function addStep(step, scheme_id) {
//     step.scheme_id = scheme_id; 

//     return db('steps')
//             .insert(step, 'id')
//             .then(ids => {
//                 const [id] = ids;
//                 return db('steps')
//                     .where({ id }) 
//                     .first();
//             })
//             .catch(err => {
//                 console.log(err); 
//             });
// };

function addStep(step, schemeId) {
    step.scheme_id = schemeId;
    return db('steps')
      .insert(step, 'id')
      .then(ids => {
        const [ id ] = ids;
        return db('steps')
          .where({ id })
          .first();
      });
  }