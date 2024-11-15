"use client";
import { useEffect, useState } from "react";

const Home = () => {
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Gather all button and anchor elements in the viewport
  const gatherElements = () => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const links = Array.from(document.querySelectorAll("a"));
    setElements([...buttons, ...links]);
  };

  useEffect(() => {
    // Gather elements on mount and on window resize
    gatherElements();
    window.addEventListener("resize", gatherElements);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", gatherElements);
    };
  }, []);

  // Update selected index based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientY } = e;
      const indexHeight = 60; // You can adjust this based on your styling
      const currentIndex = Math.floor(clientY / indexHeight);

      if (
        currentIndex >= 0 &&
        currentIndex < elements.length
      ) {
        setSelectedIndex(currentIndex);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup event listener
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [elements]);

  // Handle click event (This simulates clicking the selected element)
  const handleClick = () => {
    const selectedElement = elements[selectedIndex];
    if (selectedElement) {
      selectedElement.click(); // Simulate a click on the selected element
      alert(`You clicked on: ${selectedElement.textContent?.trim()}`);
    }
  };

  return (
    <div style={{ height: "100vh", position: "relative", overflowY: "auto", padding: '20px' }}>
      <h1 style={{ position: "absolute", top: "20px", left: "20px", zIndex: 1 }}>
        Click Selector
      </h1>

      {/* Invisible overlay to catch clicks */}
      <div
        onClick={handleClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      />

      {/* Sample header with buttons and links */}
      <header style={{ marginBottom: '20px' }}>
        <button>Header Button 1</button>
        <button>Header Button 2</button>
        <a href="#link1">Header Link 1</a>
        <a href="#link2">Header Link 2</a>
      </header>

      {/* A sample of more buttons on the page */}
      {Array.from({ length: 10 }, (_, index) => (
        <button key={index} style={{ display: "block", margin: "10px 0", padding: "10px 20px" }}>
          Button {index + 1}
        </button>
      ))}

      {/* Outline or highlight div to represent the selection box */}
      <div
        style={{
          position: "absolute",
          top: selectedIndex * 60 + 100, // Adjust for header and button heights dynamically
          left: 0,
          width: "90%",
          height: "60px", // Adjust height if you change button/link styling
          border: "2px solid blue", // Style the outline
          pointerEvents: "none", // Prevent mouse events on this div
          zIndex: 1, // On top of buttons for visibility
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

export default Home;