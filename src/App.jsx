import "./App.css";
import { useState } from "react";
import PagoExitoso from "./pages/PagoExitoso";

function App() {

  const currentPath = window.location.pathname;

  if (currentPath === "/pago-exitoso") {
    return <PagoExitoso />;
  }

  const [mostrarForm, setMostrarForm] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState("");

  const [formData, setFormData] = useState({
    empresa: "",
    nombre: "",
    apellido: "",
    email: "",
  });

  const abrirFormulario = (plan) => {
    setPlanSeleccionado(plan);
    setMostrarForm(true);
  };

  const cerrarModal = () => {
    setMostrarForm(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contratarPlan = async () => {
    try {
      const { empresa, nombre, apellido, email } = formData;

      if (!empresa || !nombre || !apellido || !email) {
        alert("⚠️ Completa todos los campos");
        return;
      }

      const response = await fetch(
        "https://tranform-cv-production.up.railway.app/api/pagos/crear-checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan: planSeleccionado,
            empresa,
            nombre,
            apellido,
            email,
          }),
        }
      );

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("❌ Error al iniciar el pago");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="container">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2>Transform CV</h2>
        <div className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#planes">Planes</a>
          <a href="#contacto">Contacto</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="inicio" className="hero-pro">
        <div className="hero-container">

          <div className="hero-left">
            <h1>
              Convierte cualquier CV en un formato profesional en segundos
            </h1>

            <p>
              Automatiza tu proceso con inteligencia artificial. 
              Ahorra horas de trabajo y genera CVs listos para enviar.
            </p>

            <button
              className="btn-primary"
              onClick={() =>
                document.getElementById("planes").scrollIntoView({ behavior: "smooth" })
              }
            >
              Comenzar ahora
            </button>
          </div>

          <div className="hero-right">
            <div className="hero-cards">

              <div className="floating-card">
                📄 CV Original
              </div>

              <div className="floating-card">
                🤖 Analizando con IA...
              </div>

              <div className="floating-card">
                ✅ CV Profesional listo
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 🔥 NUEVA SECCIÓN: CONFIANZA */}
      <section className="confianza">
        <p className="confianza-text">
          Usado por profesionales, reclutadores y empresas
        </p>

        <div className="confianza-logos">
          <span>🚀 +1.000 CVs procesados</span>
          <span>⭐ 4.9/5 satisfacción</span>
          <span>🏢 Empresas en crecimiento</span>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="planes">
        <h2>Encuentra el plan ideal para ti</h2>

        <div className="cards">

          <div className="card">
            <h3>Plan Básico</h3>
            <p className="desc">
              Ideal para personas que quieren transformar CVs de forma simple.
            </p>
            <h2>$9.990 CLP</h2>
            <ul>
              <li>✔ Hasta 10 CVs al mes</li>
              <li>✔ Formato profesional</li>
              <li>✔ Exportación PDF</li>
            </ul>
            <button onClick={() => abrirFormulario("basico")}>
              Empezar ahora
            </button>
          </div>

          <div className="card destacado">
            <span className="badge">Recomendado</span>
            <h3>Plan Avanzado</h3>
            <p className="desc">
              Perfecto para profesionales y equipos pequeños.
            </p>
            <h2>$19.990 CLP</h2>
            <ul>
              <li>✔ Hasta 50 CVs al mes</li>
              <li>✔ IA optimizada</li>
              <li>✔ Exportación PDF + Word</li>
            </ul>
            <button onClick={() => abrirFormulario("avanzado")}>
              Empezar ahora
            </button>
          </div>

          <div className="card">
            <h3>Plan Premium</h3>
            <p className="desc">
              Para empresas que necesitan alto volumen y automatización.
            </p>
            <h2>$29.990 CLP</h2>
            <ul>
              <li>✔ CVs ilimitados</li>
              <li>✔ IA avanzada</li>
              <li>✔ Soporte prioritario</li>
            </ul>
            <button onClick={() => abrirFormulario("premium")}>
              Empezar ahora
            </button>
          </div>

        </div>
      </section>

      {/* MODAL */}
      {mostrarForm && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>Completa tus datos</h2>

            <input
              type="text"
              name="empresa"
              placeholder="Nombre de la empresa"
              onChange={handleChange}
            />

            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              onChange={handleChange}
            />

            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={handleChange}
            />

            <div className="modal-buttons">
              <button onClick={contratarPlan}>
                Continuar al pago
              </button>

              <button className="cancel" onClick={cerrarModal}>
                Cancelar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CONTACTO */}
      <section id="contacto" className="contacto">
        <h2>Contacto</h2>
        <p>Escríbenos para más información</p>
      </section>

    </div>
  );
}

export default App;