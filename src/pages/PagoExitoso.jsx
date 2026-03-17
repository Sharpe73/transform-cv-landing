import { useEffect, useState } from "react";

const PagoExitoso = () => {
  const [mensaje, setMensaje] = useState("Procesando pago...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const verificarPago = async () => {
      try {
        const params = new URLSearchParams(window.location.search);

        // 🔥 SOPORTAR AMBOS CASOS (MUY IMPORTANTE)
        const paymentId =
          params.get("payment_id") || params.get("collection_id");

        if (!paymentId) {
          setError("No se encontró el payment_id");
          return;
        }

        const response = await fetch(
          "https://tranform-cv-production.up.railway.app/api/pagos/verificar",
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

        
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Error verificando pago");
        }

        const data = await response.json();

        console.log("Respuesta backend:", data);

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