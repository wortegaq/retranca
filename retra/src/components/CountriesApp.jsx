import React, { useEffect, useState } from "react";
import "./Countries.css";

const CountriesApp = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all"); // Filtro por región
  const [selectedSubregion, setSelectedSubregion] = useState("all"); // Filtro por subregión
  const [subregions, setSubregions] = useState([]); // Subregiones dinámicas
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  // Consumir la API de países
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  // Actualizar subregiones cuando cambia la región seleccionada
  useEffect(() => {
    if (selectedRegion === "all") {
      setSubregions([]);
    } else {
      const regionSubregions = countries
        .filter((country) => country.region.toLowerCase() === selectedRegion.toLowerCase())
        .map((country) => country.subregion)
        .filter((subregion, index, self) => subregion && self.indexOf(subregion) === index); // Eliminar duplicados
      setSubregions(regionSubregions);
    }
    setSelectedSubregion("all"); // Restablecer el filtro de subregión
  }, [selectedRegion, countries]);

  // Filtrar países por término de búsqueda, región y subregión
  useEffect(() => {
    let filtered = countries;

    // Filtro por región
    if (selectedRegion !== "all") {
      filtered = filtered.filter(
        (country) => country.region.toLowerCase() === selectedRegion.toLowerCase()
      );
    }

    // Filtro por subregión
    if (selectedSubregion !== "all") {
      filtered = filtered.filter(
        (country) => country.subregion && country.subregion.toLowerCase() === selectedSubregion.toLowerCase()
      );
    }

    // Filtro por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
  }, [searchTerm, selectedRegion, selectedSubregion, countries]);

  if (loading) return <p className="loading">Loading...</p>;

  // Mostrar detalles de un país seleccionado
  if (selectedCountry) {
    return (
      <div className="detail-container">
        <img
          src={selectedCountry.flags.png}
          alt={`Flag of ${selectedCountry.name.common}`}
          className="image"
        />
        <h2 className="country-name">{selectedCountry.name.common}</h2>
        <p className="detail-text">
          <strong>Capital:</strong> {selectedCountry.capital?.[0] || "N/A"}
        </p>
        <p className="detail-text">
          <strong>Región:</strong> {selectedCountry.region}
        </p>
        <p className="detail-text">
          <strong>Subregión:</strong> {selectedCountry.subregion || "N/A"}
        </p>
        <p className="detail-text">
          <strong>Población:</strong> {selectedCountry.population.toLocaleString()}
        </p>
        <button className="back-button" onClick={() => setSelectedCountry(null)}>
          Volver
        </button>
      </div>
    );
  }

  // Mostrar lista de países con buscador y filtros
  return (
    <div>
      <header className="header">
        <h1>Lista de Países</h1>
      </header>

      {/* Buscador y Filtros */}
      <div className="filter-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar país..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="region-select"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="all">Todas las regiones</option>
          <option value="africa">África</option>
          <option value="americas">Américas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europa</option>
          <option value="oceania">Oceanía</option>
        </select>
        {subregions.length > 0 && (
          <select
            className="subregion-select"
            value={selectedSubregion}
            onChange={(e) => setSelectedSubregion(e.target.value)}
          >
            <option value="all">Todas las subregiones</option>
            {subregions.map((subregion) => (
              <option key={subregion} value={subregion.toLowerCase()}>
                {subregion}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Lista de países */}
      <div className="container">
        {filteredCountries.map((country) => (
          <div
            key={country.cca3}
            className="card"
            onClick={() => setSelectedCountry(country)}
          >
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="flag"
            />
            <h3 className="card-title">{country.name.common}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountriesApp;

