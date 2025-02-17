import React from "react";
import { useState } from "react";
import './foodItem.css';

const FoodItem = ({food, numFood, data, setter}) => {
    const [numItem, setNumItem] = useState(numFood);
    const [isClickable, setIsClickable] = useState(false);

    function makeClickable() {
        if (!isClickable) {
            setIsClickable(true);
        }
    }

    const foodAdd = () => {
        setter(() => ({
            ...data,
            [food]: 1
        }));
    };

    const editAddJSONVals = () => {
        if (!(food in data)) {
            foodAdd();
        }

        (data)[(food)] = (data)[(food)] + 1;
        console.log(data);
    }

    const editSubJSONVals = () => {
        if (!(food in data)) {
            foodAdd();
        }

        (data)[(food)] = (data)[(food)] - 1;
        console.log(data);
    }
    
    //   const foodRemove = () => {
    //     const updatedJson = { ...jsonData };
    //     delete updatedJson[props.food];
    //     props.setter(updatedJson);
    //   };

    function submitItemNumChangesToJSON() {
        setIsClickable(false);
        // let changed = {"props.food" : "itemChange"};

        fetch('http://127.0.0.1:5000/update', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle success actions here, such as updating the state to indicate success
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error actions here, such as displaying an error message to the user
        })
        .finally(() => {
            setter({});
        });
    }

    return (
        <div className="itemWrapper">
            <h3>{food}</h3>

            <div className="itemNumCtrl">
                <button className="changeNumBtn" onClick={() => {
                    makeClickable();
                    setNumItem(numItem - 1);
                    editSubJSONVals();
                    }}>-</button>
                <p>{numItem}</p>
                <button className="changeNumBtn" onClick={() => {
                    makeClickable();
                    setNumItem(numItem + 1);
                    editAddJSONVals();
                    }}>+</button>
                <button id="submitItemNumChangesToJSON" disabled={!isClickable} onClick={() => {submitItemNumChangesToJSON()}}>Submit Changes</button>
            </div>
        </div>
    )
}

export default FoodItem