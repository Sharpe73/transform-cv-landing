import "./App.css";
import { useState } from "react";
import PagoExitoso from "./pages/PagoExitoso";
import ComoFunciona from "./components/ComoFunciona";

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
        <h2>🚀 Transform CV</h2>
        <div className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#planes">Planes</a>
          <a href="#contacto">Contacto</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="inicio" className="hero-pro-dark">
        <div className="hero-container">

          <div className="hero-left">

            <span className="hero-badge">
              ⚡ Automatización con IA
            </span>

            <h1>
              Automatiza CVs profesionales <br />
              <span className="gradient-text">en segundos con IA</span>
            </h1>

            <p>
              Transforma CVs desordenados en documentos profesionales listos para enviar. 
              Ahorra horas de trabajo y destaca frente a reclutadores.
            </p>

            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() =>
                  document.getElementById("planes").scrollIntoView({ behavior: "smooth" })
                }
              >
                Transformar mi CV 🚀
              </button>

              <button
                className="btn-secondary"
                onClick={() =>
                  document.getElementById("como-funciona").scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver cómo funciona
              </button>
            </div>

          </div>

          <div className="hero-right">
            <div className="hero-cards">

              <div className="floating-card glow">
                📄 CV Original
              </div>

              <div className="floating-card glow">
                🤖 Analizando con IA...
              </div>

              <div className="floating-card glow success">
                ✅ CV Profesional listo
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CONFIANZA */}
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

      {/* COMO FUNCIONA */}
      <div id="como-funciona">
        <ComoFunciona />
      </div>

      {/* PLANES PRO 🔥 */}
      <section id="planes" className="planes">
        <h2>Elige cómo quieres transformar tus CVs</h2>

        <div className="cards">

          {/* BASICO */}
          <div className="card">
            <span className="badge">Para empezar</span>
            <h3>Plan Básico</h3>
            <p className="desc">
              Ideal si quieres probar la plataforma y generar tus primeros CVs profesionales.
            </p>
            <h2>$9.990 CLP</h2>
            <ul>
              <li>✔ Genera hasta 10 CVs profesionales al mes</li>
              <li>✔ Formato listo para enviar a reclutadores</li>
              <li>✔ Exportación en PDF optimizado</li>
            </ul>
            <button onClick={() => abrirFormulario("basico")}>
              Quiero este plan 🚀
            </button>
          </div>

          {/* AVANZADO */}
          <div className="card destacado">
            <span className="badge">🔥 Más vendido</span>
            <h3>Plan Avanzado</h3>
            <p className="desc">
              Perfecto si postulas constantemente o trabajas con múltiples CVs.
            </p>
            <h2>$19.990 CLP</h2>
            <ul>
              <li>✔ Hasta 50 CVs optimizados con IA al mes</li>
              <li>✔ Mejora automática del contenido</li>
              <li>✔ Descarga en PDF y Word profesional</li>
            </ul>
            <button onClick={() => abrirFormulario("avanzado")}>
              Empezar ahora 🚀
            </button>
          </div>

          {/* PREMIUM */}
          <div className="card">
            <span className="badge">Para empresas</span>
            <h3>Plan Premium</h3>
            <p className="desc">
              Para equipos, reclutadores o alto volumen de procesamiento.
            </p>
            <h2>$29.990 CLP</h2>
            <ul>
              <li>✔ Hasta 100 CVs mensuales automatizados</li>
              <li>✔ IA avanzada para mejores resultados</li>
              <li>✔ Soporte prioritario</li>
            </ul>
            <button onClick={() => abrirFormulario("premium")}>
              Activar plan 🚀
            </button>
          </div>

        </div>
      </section>

      {/* MODAL */}
      {mostrarForm && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>Completa tus datos</h2>

            <input type="text" name="empresa" placeholder="Nombre de la empresa" onChange={handleChange} />
            <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
            <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} />
            <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} />

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