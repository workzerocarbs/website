import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import '../diet/style.scss';

function Diet() {
  const calories = 589;
  const protein = 39.8;
  const carbs = 109.2;
  const fats = 4.2;
  const percentage = (calories / 2000) * 100; // Assuming 2000 kcal is the target

  const recentMeals = [
    { name: 'Exotic Oats Meal Bowl', kcal: 589 },
    { name: 'Oats Chilla with Mixed Egg', kcal: 589 },
    { name: 'Fajita Chicken Salad', kcal: 589 },
  ];

  return (
    <div className="app">
      <header className="header">
        <img src="/logo.png" alt="Zero Carbs Logo" className="logo" />
        <h2>Hi Arun,</h2>
        <h1>Calories Intake</h1>
      </header>

 

<div className="progress-section">
  <div className="progress-container"> {/* Container to control responsiveness */}
    <CircularProgressbar
      value={percentage}
      text={`${calories} kcal`}
      strokeWidth={13}
      styles={buildStyles({
        strokeLinecap: 'round',

        pathColor: '#40D340',
        textColor: '#000',
        trailColor: '#A3E3A3',
        
        textSize: '1.0rem',  // Use rem units for responsive font size
      })}
    />
  </div>
</div>


      <div className="nutrition-info">
        <div className="info-item">
          <span>{protein}g</span>
          <p>Protein</p>
        </div>
        <div className="info-item">
          <span>{carbs}g</span>
          <p>Carbs</p>
        </div>
        <div className="info-item">
          <span>{fats}g</span>
          <p>Fats</p>
        </div>
      </div>

      <div className="recent-meals">
        <h3 className='recent-meal-heading' >Recent Meals</h3>
        <div className='recent-meals-list-container'>
        <ul>
          {recentMeals.map((meal, index) => (
            <li key={index} className="meal-item">
              <span className='meal-item-name'>{meal.name}</span>
              <span className='meal-item-kcal'>{meal.kcal} kcal</span>
            </li>
          ))}
        </ul>
        </div>
        
      </div>
    </div>
  );
}

export default Diet;
