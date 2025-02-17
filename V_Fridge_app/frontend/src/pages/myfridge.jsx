import React, { useState, useEffect } from 'react';
import FoodItem from "../components/foodItem";
import DropdownMenu from "../components/dropDown";

const MyFridge = () => {
  const [foodItems, setFoodItems] = useState({});
  const [jsonData, setJsonData] = useState({});

  useEffect(() => {
    // Replace the URL with the actual API endpoint
    fetch('http://127.0.0.1:5000/get-fridge') // Placeholder API endpoint
      .then(response => response.json())
      .then(data => {
        // Assuming data is in the format {"name": amount, "name": amount}
        setFoodItems(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredFoodItems = Object.entries(foodItems).filter(([key]) => key !== '_id');

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', padding: '20px', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', height: '100%' }}>
        <div style={{ width: '100%' }}>
          <h3>Fridge Inventory</h3>
          <DropdownMenu opt1="Upload a Photo" opt2="Add Manually" />
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredFoodItems.map(([name, amount]) => (
            <FoodItem key={name} food={name} numFood={amount} data={jsonData} setter={setJsonData} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyFridge;
