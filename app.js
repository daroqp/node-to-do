require('colors');

const { inquirerMenu, 
		pausa,
		leerInput,
		listadoTareaBorrar,
		confirmar,
		mostrarListadoCheckList
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
				tareas.listadoCompleto();
				break;
			case '3': 
				tareas.listarPendientesCompletadas();
				break;
			case '4': 
				tareas.listarPendientesCompletadas(false);
				break;
			case '5': 
				const ids = await mostrarListadoCheckList(tareas.listadoArr)
				tareas.toggleCompletadas(ids);
				break;
			case '6': 
				const id = await listadoTareaBorrar(tareas.listadoArr);
				if(id !== '0'){
					const ok = await confirmar('Estas seguro?');
					if( ok ){
						tareas.borrarTarea(id);
						console.log('Tarea borrada');
					}
				}
				break;
			case '0': 

				break;
		}

		guardarDB( tareas.listadoArr );

		await pausa();

	}while(opt !== '0');
	

}



main();
