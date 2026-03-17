import "./App.css";

function App() {

  // 🔥 FUNCIÓN PARA CONTRATAR (AHORA CON PAGO REAL)
  const contratarPlan = async (plan) => {
    try {
      console.log("💸 Iniciando pago plan:", plan);

      const response = await fetch("https://tranform-cv-production.up.railway.app/api/pagos/crear-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: plan,
          email: "cliente@test.com", // 🔜 después lo pedimos en un formulario
        }),
      });

      const data = await response.json();

      console.log("Respuesta MercadoPago:", data);

      if (data.init_point) {
        // 🚀 REDIRECCIÓN A MERCADOPAGO
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
      <section id="inicio" className="hero">
        <h1>Transforma CVs en segundos con IA</h1>
        <p>Automatiza, optimiza y profesionaliza tus currículums.</p>
        <button
          className="btn-primary"
          onClick={() => document.getElementById("planes").scrollIntoView({ behavior: "smooth" })}
        >
          Ver Planes
        </button>
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
            <button onClick={() => contratarPlan("basico")}>
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
            <button onClick={() => contratarPlan("avanzado")}>
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
            <button onClick={() => contratarPlan("premium")}>
              Empezar ahora
            </button>
          </div>

        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="contacto">
        <h2>Contacto</h2>
        <p>Escríbenos para más información</p>
      </section>

    </div>
  );
}

export default App;