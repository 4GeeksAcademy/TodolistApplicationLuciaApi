import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState([])


	const mitarea = "sacar basura"

	async function crearUsuario() {
		try {
			let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/lucia', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([]),
			})
			let data = await response.json()
			console.log(data.msg) // se creo un usuario en esa url usando el metodo post, al crear ese usuario el console.log de data 
			//que es un objeto, me trae una propiedad msg, de que se creo el usuario
			if (data.msg === "The user exist") { //si ese mensaje dice que el usuario se creo, me trae las tares que existan
				obtenertareas()
			}
		} catch (error) {
			console.log(error);

		}

	}


	async function obtenertareas() {
		try {
			let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/lucia');
			let data = await response.json()
			setLista(data);
			console.log(data)

		} catch (error) {
			console.log(error);

		}
	}



	async function ActualizarLista(toDolist) {
		try {
			let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/lucia', {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(toDolist),//mando la nueva tarea para que la actualice en la appi
			})
			let data = await response.json()
			if (response.status === 200) {
				alert("se acutalizo") //el 200 es un numero que da si todo salio bien, si response(que es resuesta).status da 200

			}
			console.log(response)

		} catch (error) {
			console.log(error);

		}

	}

	async function borrarLista() {
		try {
			let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/lucia', {
				method: 'DELITE',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ label: tarea }),//borro la nueva tarea para que la actualice en la appi
			})
			let data = await response.json()
			//me falta que hace la funcion creo

		} catch (error) {
			console.log(error);

		}

	}



	function handletarea(e) {
		setTarea(e.target.value)

	}



	function handleSubmit(e) {
		e.preventDefault()
		setTarea("")
	}
	const agregarTareas = (event) => {

		if (event.key === 'Enter') {
			let nuevoarray = lista.concat({ label: tarea })
			setLista(nuevoarray)
			setTarea("") //luego de dar enter el espacio del input vuelve a quedar en blanco

		}

	};



	const borrar = (tarea) => {
		console.log(lista.length)
		if (lista.length > 1) {
			let nuevoarr = lista.filter(item => item !== tarea)
			setLista(nuevoarr)
			borrarLista(nuevoarr)
		}
		else {
			alert("no puedes eliminar la unica tarea")
		}
	}

	useEffect(() => {
		obtenertareas()//se ejecuta si la condicion (data.msg === "The user exist") de la funcion crearuruario es verdadera

	}, [])
	useEffect(() => {
		ActualizarLista(lista)//se ejecuta si la condicion (data.msg === "The user exist") de la funcion crearuruario es verdadera

	}, [lista])



	return (
		<div className="vh-100 bg-success">
			<div className="text-center position-relative my-0">
				<div className=" w-50 position-relative top-0 start-50 translate-middle-x my-0 ">
					<label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm fst-italic text-light" style={{ fontSize: "50px" }}>Lista</label>
					<div className="col-sm-10d-block">
						{<input onChange={handletarea} value={tarea} onKeyDown={agregarTareas} type="email" className="form-control form-control-sm w-100 d-block bg-light border-0" style={{ height: "60px", fontFamily: "inherit", fontSize: "30px" }} id="colFormLabelSm" />}
						{/* 
					<input st
						
						onChange={e => setTarea(e.target.value)}
						onKeyDown={handleKeyDown}
					// /> */}
					</div>
				</div>
				<ul className="mb-3 w-50 position-relative top-0 start-50 translate-middle-x my-0 px-0" style={{ listStyle: "none" }}>
					{lista.map(tarea => (<li className="form-control form-control-sm w-100 d-flex justify-content-between bg-light bg-gradient border-1 my-0" style={{ height: "40px", fontFamily: "inherit", fontSize: "30px" }}>{tarea.label}
						<span onClick={() => borrar(tarea)} > x </span></li>))}
				</ul>

			</div>
		</div>

	);
};

export default Home;



