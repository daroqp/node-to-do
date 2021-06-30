const Tarea = require('./tarea');

class Tareas {

	_listado = {  };

	get listadoArr(  ) {
	
		const listado = [];

		Object.keys(this._listado).forEach( key => {
			const tarea = this._listado[ key ];
			listado.push( tarea );
		})

		return listado;
	}

	constructor() {
		this._listado = {  };
	}
	
	cargarTareasFromArray( tareas = [] ) {
		tareas.forEach(tarea => {
			this._listado[tarea.id] = tarea;
		})
	}

	crearTarea( desc = '' ) {

		const tarea = new Tarea( desc );
		this._listado[tarea.id] = tarea;

	}

	listadoCompleto() {
		//<!----- USAR DESTRUCTURACION!!!! --->
		this.listadoArr.forEach((tarea, index) => {
			let i = `${index + 1}`.green;
			const { desc, completadoEn } = tarea;
			const estado = completadoEn 
								? 'Completada'.green
								: 'Pendiente'.red
			console.log(`${i}. ${desc} :: ${estado}`);
		});
	}

	listarPendientesCompletadas( completadas = true) {
		let contador = 0;
		this.listadoArr.forEach( tarea => {
			const {desc, completadoEn} = tarea;
			const estado = completadoEn
								? 'Completada'.green
								: 'Pendiente'.red
			if(completadas){
				if( completadoEn ){
					contador+=1;
					console.log(`${(contador + '.').green} ${desc} :: ${completadoEn}`)
				} 
			} else {
				if( !completadoEn ){
					contador+=1;
					console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
				}
			}
		})
	}
}



module.exports = Tareas;
