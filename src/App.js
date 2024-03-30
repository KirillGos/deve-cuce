import React, { useState, useEffect } from "react";

const DeveCuceOyunu = () => {
  const [target, setTarget] = useState(""); // Hedef (Deve veya Cüce)
  const [score, setScore] = useState(0); // Puan
  const [userInput, setUserInput] = useState(""); // Kullanıcının girişi
  const [color, changeColor] = useState("");
  // Her 2 saniyede bir yeni hedef belirleme
  useEffect(() => {
    const interval = setInterval(() => {
      setTarget(Math.random() < 0.5 ? "Deve" : "Cüce");
      const deve = document.querySelector('#deve');
      const cuce = document.querySelector('#cuce');
      deve.disabled = false;
      cuce.disabled = false;
      changeColor(randomColor());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  function randomColor() {
    let rb = Math.floor(Math.random() * 255);
    let rr = Math.floor(Math.random() * 255);
    let rg = Math.floor(Math.random() * 255);

    return `rgb(${rr}, ${rg}, ${rb}, 0.5)`
  }
  // Kullanıcının girişini kontrol etme
  const handleClick = (event) => {
    const input = event.target.dataset.name;
    if (input === "Deve" || input === "Cüce") {
      setUserInput(input);
      const deve = document.querySelector('#deve');
      const cuce = document.querySelector('#cuce');
      deve.disabled = true;
      cuce.disabled = true;
    }
  };

  // Her kullanıcı girişi için kontrol yapma
  useEffect(() => {
    if (userInput === "") return;

    if (userInput === target) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
    setUserInput("");
  }, [userInput]);

  return (
    <div className="m-3 p-3  w-50" style={{backgroundColor: color}}>
      <h1>Deve Cüce Oyunu</h1>
      <p id="hedef">Hedef: {target}</p>
      <p>Puan: {score}</p>
      <button id="deve" data-name="Deve" className="btn btn-secondary m-2" onClick={handleClick} >Deve</button>
      <button id="cuce" data-name="Cüce" className="btn btn-secondary" onClick={handleClick}>Cüce</button>
    </div>
  );
};

export default DeveCuceOyunu;
