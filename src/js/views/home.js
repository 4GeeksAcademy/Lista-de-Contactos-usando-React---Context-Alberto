import React, {useEffect, useContext} from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext";



export const Home = () => {
	const {store, actions}= useContext(Context);
	
	useEffect(() => {
			actions.crearAgenda();
			actions.getContactos();
	}, []);

	return(<div className="text-center mt-5">
		<h1>Hello Rigo!</h1>
		<p>
			<img src={rigoImage} />
		</p>
		<a href="#" className="btn btn-success">
			If you see this green button, bootstrap is working
		</a>
	</div>);
	
};
