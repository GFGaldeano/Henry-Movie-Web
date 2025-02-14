function addHoverEffect(card, movie) {
  const legendContainer = document.createElement("div");
  legendContainer.classList.add("legend-container");
  legendContainer.innerHTML = movie.createLegend();

  card.appendChild(legendContainer);

 
  legendContainer.style.position = "absolute";
  legendContainer.style.top = "0";
  legendContainer.style.left = "0";
  legendContainer.style.height = "100%";
  legendContainer.style.width = "100%";
  legendContainer.style.color = "#fff";
  legendContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  legendContainer.style.padding = "10px";
  legendContainer.style.borderRadius = "5px";
  legendContainer.style.boxSizing = "border-box";
  legendContainer.style.display = "flex";
  legendContainer.style.flexDirection = "column";
  legendContainer.style.justifyContent = "center";
  legendContainer.style.alignItems = "center";
  legendContainer.style.textAlign = "center";
  legendContainer.style.display = "none";


  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px) scale(1.05)";
    card.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
    card.style.backgroundColor = "#f0f0f0";
  
    
    const img = card.querySelector("img");
    img.style.opacity = "0.3";

    legendContainer.style.display = "flex";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
    card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

    const img = card.querySelector("img");
    img.style.opacity = "1";

    legendContainer.style.display = "none";
  });

}

module.exports = addHoverEffect;
