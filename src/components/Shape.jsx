import React, { useState, useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import mySvg from "/India_State_Boundary.svg";
import "./Shape.css";

const stateData = [
  "Andaman-Nicobar",
  "Chandigarh",
  "Dadra Nagar Haveli",
  "Delhi",
  "Haryana",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Puducherry",
  "Tamil Nadu",
  "Chhattisgarh",
  "Telangana",
  "Andhra Pradesh",
  "Goa",
  "Himachal Pradesh",
  "Punjab",
  "Rajasthan",
  "Gujarat",
  "Uttrakhand",
  "Uttar Pradesh",
  "Sikkim",
  "Assam",
  "Arunachal Pradesh",
  "Nagaland",
  "Manipur",
  "Mizoram",
  "Tripura",
  "Meghalaya",
  "West Bengal",
  "Bihar",
  "Ladakh",
  "Kashmir",
];

const Shape = () => {
  const [clickedStates, setClickedStates] = useState([]);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const savedStates = localStorage.getItem("clickedStates");
    if (savedStates) {
      setClickedStates(JSON.parse(savedStates));
    }
  }, []);

  const handleClick = (state) => {
    const updatedStates = [...clickedStates];
    if (updatedStates.includes(state)) {
      const index = updatedStates.indexOf(state);
      updatedStates.splice(index, 1);
    } else {
      updatedStates.push(state);
    }
    setClickedStates(updatedStates);
    localStorage.setItem("clickedStates", JSON.stringify(updatedStates));
  };

  const handleClearSelections = () => {
    setClickedStates([]);
    localStorage.removeItem("clickedStates");
  };

  return (
    <>
      <header className="readme-header">
        <a href="https://iipmaps.com/" target="_blank">
          <img src="/iip_logo.jpg" alt="iip logo" width="50px" />
        </a>
        <div>
          <a href="http://github.com/mspatel18/india-map-react" target="_blank">
            Github
          </a>
          <a href="mailto:mannpatel3118@gmail.com">Contact</a>
        </div>
      </header>
      <ReactSVG
        src={mySvg}
        beforeInjection={(svg) => {
          const paths = svg.querySelectorAll("path");

          svg.setAttribute("height", "80vh");

          svg.addEventListener("click", (event) => {
            const clickedPath = event.target.closest("path");
            if (clickedPath) {
              const stateName = clickedPath.getAttribute("data-index");
              if (stateName) {
                handleClick(stateName);
              }
            }
          });

          paths.forEach((path, index) => {
            const stateName = stateData[index] || "";
            path.setAttribute("data-index", stateName);
            path.style.fill = clickedStates.includes(stateName)
              ? "red"
              : "white";

            const tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.innerHTML = `
              <span class="tooltip-text">${path.getAttribute(
                "data-index"
              )}</span>
              <div class="triangle"></div>
            `;

            path.addEventListener("mouseenter", (event) => {
              const pathRect = path.getBoundingClientRect();
              tooltip.style.left = `${pathRect.left + pathRect.width / 2}px`;
              tooltip.style.top = `${pathRect.top + pathRect.height / 2}px`;
              if (!tooltipRef.current) {
                document.body.appendChild(tooltip);
                tooltipRef.current = tooltip;
              }
            });

            path.addEventListener("mouseleave", () => {
              if (tooltipRef.current) {
                tooltipRef.current.parentNode.removeChild(tooltipRef.current);
                tooltipRef.current = null;
              }
            });
          });
        }}
      />
      <div>
        <button onClick={handleClearSelections}>Clear Selections</button>
      </div>
      <footer>Made with ❤️ by <a href="http://github.com/mspatel18">Mann Patel</a></footer>
    </>
  );
};

export default Shape;
