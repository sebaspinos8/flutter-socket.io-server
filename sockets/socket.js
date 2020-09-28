const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Abuelo'));
bands.addBand( new Band('Sebas'));
bands.addBand( new Band('Juan'));
bands.addBand( new Band('Juanfer'));

//Mensajes de sockets

io.on('connection', client => {
    console.log('Cliente Conectado')
    
    client.emit('active-bands', bands.getBands());

        client.on('disconnect', () => {
            console.log('Cliente Desconectado');
        });
    
        client.on('mensaje', (payload) => {
            console.log('Mensaje', payload);
    
            io.emit('mensaje', {admin: 'Nuevo Mensaje'});
        });

        client.on('vote-band', (payload) => {
            bands.voteBand(payload.id);
            io.emit('active-bands', bands.getBands());
        });

        client.on('add-band', (payload)=>{
            const nueva = new Band(payload.name);
            bands.addBand(nueva);
            io.emit('active-bands', bands.getBands());
        });

        client.on('delete-band', (payload)=> {
            bands.deleteBand(payload.id);
            io.emit('active-bands', bands.getBands());
        })

});