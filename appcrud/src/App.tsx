import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NuevaNoticia } from "./components/Noticias/NuevaNoticia";
import { EditarNoticia } from "./components/Noticias/EditarNoticia";
import { ListaPrueba } from "./components/Pruebas/ListaPrueba";
import { EditarPrueba } from "./components/Pruebas/EditarPrueba";
import { NuevaPrueba } from "./components/Pruebas/NuevaPrueba";
import { ListaNoticia } from "./components/Noticias/ListaNoticia";
import { Admin } from "./pages/Admin";
import AdminInicial from "./pages/AdminInicial";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Admin/>
        <Routes>
          <Route path="/" element={<AdminInicial/>}></Route>
          <Route path="/noticias" element={<ListaNoticia />} />
          <Route path="/noticias/nuevanoticia" element={<NuevaNoticia />} />
          <Route path="/noticias/editarnoticia/:id" element={<EditarNoticia />} />

          <Route path="/pruebas" element={<ListaPrueba />} />
          <Route path="/pruebas/nuevaprueba" element={<NuevaPrueba />} />
          <Route path="/pruebas/editarprueba/:id" element={<EditarPrueba />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
