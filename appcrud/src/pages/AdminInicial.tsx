
import 'bootstrap/dist/css/bootstrap.min.css';

export function AdminInicial() {
    return (
        <div 
            className="d-flex justify-content-center align-items-center vh-100" 
            style={{ 
                backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20231218/pngtree-roller-skating-track-red-synthetic-background-image_15519043.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative'
            }}
        >
            <div 
                className="position-absolute top-0 start-0 w-100 h-100" 
                style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    zIndex: 1
                }}
            ></div>
            <div 
                className="position-relative text-center" 
                style={{ 
                    zIndex: 2 
                }}
            >
                <h1 className="text-white">Azociación de Patinaje del Azuay</h1>
            </div>
        </div>
    );
}

export default AdminInicial;

