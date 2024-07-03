import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Admin() {
    const location = useLocation();
    
    return (
        <div>
            <header className="bg-danger text-white p-4 text-center">
                <h1>Panel de Administración</h1>
            </header>
            <nav className="bg-light p-2">
                <ul className="list-unstyled d-flex justify-content-center">
                    <li className={`me-3 ${location.pathname === '/noticias' ? 'active' : ''}`}>
                        <a href="/noticias" className="text-dark text-decoration-none">Noticias</a>
                    </li>
                    <li className={`${location.pathname === '/pruebas' ? 'active' : ''}`}>
                        <a href="/pruebas" className="text-dark text-decoration-none">Pruebas</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Admin;

