//* Import the database *// 
const db = require('../data/db-config'); 

//* define the exports *// 
//TODO MVP exports: find(), findById(id), findSteps(id), add(scheme), update(changes, id), remove(id)
module.exports = {
    find,
    findById,
    findSteps
}; 

//! Functions Start !// 
//* finding functions *// 
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
