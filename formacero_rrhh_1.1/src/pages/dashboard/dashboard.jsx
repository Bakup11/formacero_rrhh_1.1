import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 🔹 agregamos useNavigate
import "../../layout.css";
import "./dashboard.css";

function Dashboard() {

  const navigate = useNavigate(); // 🔹 hook para navegar
  const [totalEmpleados, setTotalEmpleados] = useState(0);
  const [cumpleaneros, setCumpleaneros] = useState([]); 
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔹 Función en tiempo real para el buscador
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/empleados/search?q=${value}`);
      const data = await res.json();

      setResults(data);
      setShowDropdown(true);

    } catch (error) {
      console.error("Error buscando:", error);
    }
  };

  // 🔹 Obtener total de empleados y cumpleaños
  useEffect(() => {
    const getTotal = async () => {
      try {
        const res = await fetch("http://localhost:3001/empleados/count");
        const data = await res.json();
        setTotalEmpleados(data.total);
      } catch (error) {
        console.error("Error obteniendo total de empleados:", error);
      }
    };

    const getCumpleaneros = async () => {
      try {
        const res = await fetch("http://localhost:3001/empleados/cumpleaneros");
        const data = await res.json();
        setCumpleaneros(data);
      } catch (error) {
        console.error("Error obteniendo cumpleaños:", error);
      }
    };

    getTotal();
    getCumpleaneros();
  }, []);

  return (
    <div className="app-container">

      {/* HEADER */}
      <header className="header">
        <div className="logo">Formacero</div>

        <div className="search-bar" style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Buscar empleados..."
            value={search}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />

          {showDropdown && results.length > 0 && (
            <div className="search-dropdown">
              {results.map(emp => (
                <div
                  key={emp.id}
                  className="search-item"
                  onMouseDown={() => navigate(`/empleado/${emp.id}`)} // 🔹 reemplazamos window.location.href
                >
                  <strong>{emp.nombre}</strong>
                  <p>{emp.cargo}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="user-profile">
          <img src="https://i.pravatar.cc/40" alt="Usuario"/>
          <span>Usuario</span>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1>Panel de Gestión de Recursos Humanos</h1>
      </section>

      {/* MENÚ */}
      <nav className="main-menu">
        <Link to="/organizacion" className="menu-btn">Organización</Link>
        <Link to="/informacion-empleados" className="menu-btn">Empleados</Link>
        <Link to="/lista-exempleados" className="menu-btn">Lista Exempleados</Link>
        <Link to="/nomina" className="menu-btn">Nómina</Link>
        <Link to="/registrar-empleados" className="menu-btn">Registro de Empleados</Link>
        <Link to="/certificado-laboral" className="menu-btn">Certificado Laboral</Link>
        <Link to="/vacaciones" className="menu-btn">Vacaciones</Link>
        <Link to="/reportes" className="menu-btn">Reportes</Link>
      </nav>

      {/* CONTENIDO */}
      <main className="dashboard-content">
        <div className="card">
          <h3>Total Empleados</h3>
          <p>{totalEmpleados}</p>
        </div>

        <div className="card">
          <h3>Nuevas Contrataciones</h3>
          <p>8</p>
        </div>

        <div className="card">
          <h3>Vacaciones Activas</h3>
          <p>12</p>
        </div>

        <div className="card">
          <h3>Cumpleaños del Mes</h3>
          <p>{cumpleaneros.length}</p>
          <div style={{ fontSize: "0.85rem", marginTop: "5px" }}>
            {cumpleaneros.length === 0 ? (
              <p>No hay cumpleaños</p>
            ) : (
              cumpleaneros.map(emp => {
                const fecha = new Date(emp.fecha_nacimiento);
                const opciones = { day: "2-digit", month: "long" };
                const fechaFormateada = fecha.toLocaleDateString("es-CO", opciones);
                return (
                  <p key={emp.id}>
                    {emp.nombre} - {fechaFormateada}
                  </p>
                );
              })
            )}
          </div>
        </div>

        <div className="card alert">
          <h3>Alertas Pendientes</h3>
          <p>3</p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Formacero RRHH | Política de Privacidad | Soporte
      </footer>

    </div>
  );
}

export default Dashboard;