require('colors');

const { inquirerMenu, 
		pausa,
		leerInput
} = require('./helpers/inquirer');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const Tareas = require('./models/tareas');

const main = async() => {

	let opt = '';
	const tareas = new Tareas();
	
	const tareaDB = leerDB();

	if(tareaDB){
		tareas.cargarTareasFromArray(tareaDB);
	}

	do {
		
		opt = await inquirerMenu();

		switch( opt ) {
			case '1': 
				const desc = await leerInput('Descripcion:');
				tareas.crearTarea( desc );

				break;
			case '2': 
				console.log( tareas.listadoArr);

				break;
			case '3': 

				break;
			case '4': 

				break;
			case '5': 

				break;
			case '6': 

				break;
			case '0': 

				break;
		}

		guardarDB( tareas.listadoArr );

		await pausa();

	}while(opt !== '0');
	

}



main();
