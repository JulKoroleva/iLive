import {MemoryRouter} from "react-router-dom";
import App from "../components/App";

export const renderWithRouter = (component, initialRoute = '/') => {
    return (
        <MemoryRouter initialEntries={[initialRoute]}>
            <App />
            {component}
        </MemoryRouter>
    )
}