import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const PLANTS_URL = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(PLANTS_URL)
      .then((response) => response.json())
      .then((data) =>
        setPlants(data.map((plant) => ({ ...plant, inStock: true })))
      );
  }, []);

  function handleAddPlant(newPlant) {
    fetch(PLANTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((savedPlant) =>
        setPlants((currentPlants) => [
          ...currentPlants,
          { ...savedPlant, inStock: true },
        ])
      );
  }

  function handleSearchChange(query) {
    setSearchQuery(query);
  }

  function handleToggleStock(id) {
    setPlants((currentPlants) =>
      currentPlants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
      )
    );
  }

  const visiblePlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <PlantList plants={visiblePlants} onToggleStock={handleToggleStock} />
    </main>
  );
}

export default PlantPage;
