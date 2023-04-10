import { useMemo } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import { routes } from './routes';

export const AppRouter = () => {
	const appRoutes = useMemo(() => routes.map(
		({ path, element }) => <Route
			key={path}
			path={path}
			element={element}
		/>
	), [])

	return (
		<Router>
			<Routes>
				{appRoutes}
			</Routes>
		</Router>
	)
}
