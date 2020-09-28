
const{v4: uuidV4} = require('uuid'); // Se necesita importacion con npm i uuid en consola

class Band{

    constructor(name){

        this.id = uuidV4(); //Identificador unico
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;