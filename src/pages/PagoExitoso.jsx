import { useEffect, useState } from "react";

const PagoExitoso = () => {
  const [mensaje, setMensaje] = useState("Procesando pago...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const verificarPago = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const paymentId = params.get("payment_id");

        if (!paymentId) {
          setError("No se encontró el payment_id");
          return;
        }

        const response = await fetch(
          "https://tranform-cv-production.up.railway.app/pago/verificar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payment_id: paymentId,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error verificando pago");
        }

        setMensaje("✅ Pago realizado con éxito. Revisa tu correo para acceder.");

      } catch (err) {
        console.error(err);
        setError("❌ Error procesando el pago");
      }
    };

    verificarPago();
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Pago exitoso</h1>

      {!error && <p>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PagoExitoso;