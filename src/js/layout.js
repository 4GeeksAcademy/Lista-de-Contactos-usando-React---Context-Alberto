import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";
import { Contact } from "./views/Contact.jsx";
import { AddContact } from "./views/AddContact.jsx";
import { ModContact } from "./views/ModContact.jsx";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/demo" element={<Demo />} />
						<Route path="/single/:theid" element={<Single />} />
						<Route path="/AddContact" element={<AddContact />} />
						<Route path="/contact" element={<Contact />} />	
						<Route path="/ModContact/:contactId" element={<ModContact />} />			
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);

//https://cautious-system-rw99pq9x94p2x6vw-3000.app.github.dev/
//wss://cautious-system-rw99pq9x94p2x6vw-3000.preview.app.github.dev