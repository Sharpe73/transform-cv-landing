import React from "react";
import "../App.css";

const ComoFunciona = () => {
  return (
    <section className="como-funciona">
      <div className="como-container">

        <h2>¿Cómo funciona?</h2>
        <p className="como-sub">
          Automatiza la transformación de CVs en segundos con inteligencia artificial
        </p>

        <div className="como-steps">

          <div className="step">
            <div className="step-number">1</div>
            <h3>Sube el CV</h3>
            <p>Arrastra o selecciona el archivo PDF o Word</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Procesamiento IA</h3>
            <p>Analizamos y estructuramos la información automáticamente</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Descarga</h3>
            <p>Obtén el CV listo en PDF o Word profesional</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ComoFunciona;