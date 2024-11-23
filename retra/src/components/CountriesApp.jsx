import React, { useEffect, useState } from "react";

const CountriesApp = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  // Consumir la API de países
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data); // Guardar datos de los países
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={styles.loading}>Loading...</p>;

  // Mostrar detalles de un país seleccionado
  if (selectedCountry) {
    return (
      <div style={styles.detailContainer}>
        <button
          style={styles.backButton}
          onClick={() => setSelectedCountry(null)}
        >
          Volver
        </button>
        <img
          src={selectedCountry.flags.png}
          alt={`Flag of ${selectedCountry.name.common}`}
          style={styles.image}
        />
        <h2 style={styles.countryName}>{selectedCountry.name.common}</h2>
        <p style={styles.detailText}>
          <strong>Capital:</strong> {selectedCountry.capital?.[0] || "N/A"}
        </p>
        <p style={styles.detailText}>
          <strong>Región:</strong> {selectedCountry.region}
        </p>
        <p style={styles.detailText}>
          <strong>Subregión:</strong> {selectedCountry.subregion || "N/A"}
        </p>
        <p style={styles.detailText}>
          <strong>Población:</strong> {selectedCountry.population.toLocaleString()}
        </p>
      </div>
    );
  }

  // Mostrar lista de países
  return (
    <div style={styles.container}>
      {countries.map((country) => (
        <div
          key={country.cca3}
          style={styles.card}
          onClick={() => setSelectedCountry(country)}
        >
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            style={styles.flag}
          />
          <h3 style={styles.cardTitle}>{country.name.common}</h3>
        </div>
      ))}
    </div>
  );
};

// Estilos en línea mejorados
const styles = {
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#555",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    padding: "2rem",
    background: "#f8f9fa",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    textAlign: "center",
    background: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
    marginTop: "1rem",
  },
  flag: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  detailContainer: {
    textAlign: "center",
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  backButton: {
    marginBottom: "1rem",
    padding: "0.5rem 1.5rem",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background 0.2s",
  },
  backButtonHover: {
    background: "#0056b3",
  },
  countryName: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginTop: "1rem",
    color: "#333",
  },
  image: {
    width: "200px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  detailText: {
    fontSize: "1.2rem",
    margin: "0.5rem 0",
    color: "#555",
  },
};

export default CountriesApp;
