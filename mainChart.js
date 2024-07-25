const g = "#mainChart";
const graphWidth = window.innerWidth * .5;
const graphHeight = window.innerHeight * .6;
const margin = {left: "50px", right: "20px", top: "10px", bottom: "10px"};
let X_AXIS = 'Stress Level';
let X_TYPE = null;
let Y_AXIS = 'Quality of Sleep';
let Y_TYPE = null;
let Y_TYPES = new Set();
let svg;
let rawText;
let data;
let count;
let file = './Sleep_health_and_lifestyle_dataset.csv';

function initSVG() {
    svg = d3
        .select(g)
        .append("svg")
        .attr("width", "80vw")
        .attr("height", "95vh")
        .append("g")
        .attr("transform",
            "translate(" + 120 + "," + 50 + ")");
    addHover();
}

function resetSVG() {
  document.querySelector('svg').remove();
  svg = d3
        .select(g)
        .append("svg")
        .attr("width", "80vw")
        .attr("height", "95vh")
        .append("g")
        .attr("transform",
            "translate(" + 120 + "," + 50 + ")");
}

function weighData(data) {
  let weight = [{},{},{},{},{},{},{},{},{},{}];
  data.forEach((d) => {
    if(weight[d[Y_AXIS]][d[X_AXIS]] === undefined) {
      weight[d[Y_AXIS]][d[X_AXIS]] = 0;
    }
    weight[d[Y_AXIS]][d[X_AXIS]]++;
  })
  return weight;
}

function setDomainVariable() {
  let radios = document.querySelectorAll("input");
  radios.forEach((radio) => {
    if(radio.checked) {
      X_AXIS = radio.value;
    }
  });
}

function addHover() {
  document.addEventListener("mouseover", function(event) {
    if(event.target.tagName === 'circle') {
      let tooltip = document.createElement("div");
      let xVal = Math.round(event.target.getAttribute('data-x') * 10) / 10;
      let yVal = Math.round(event.target.getAttribute('data-y') * 10) / 10;
      let count = Math.round((event.target.r.baseVal.value / 3) ** 2)
      tooltip.setAttribute("id", "tooltip");
      tooltip.style.left = (event.clientX - 200) + "px";
      tooltip.style.top = (event.clientY - 90) + "px";
      tooltip.innerHTML = `${X_AXIS}: ${xVal} </br>${Y_AXIS}: ${yVal} </br>Count: ${count}`;
      document.body.appendChild(tooltip);
    }
  });
  document.addEventListener("mouseout", function(event) {
    if(event.target.tagName === 'circle') {
      document.body.removeChild(document.getElementById("tooltip"));
    }
  });
}

function dotplot() {
    if(svg === undefined) {
      initSVG();
    }
    else {
      resetSVG();
    }
    setDomainVariable();
    d3.csv(file).then(function(data) {
        let weight = weighData(data);
        let X_RANGE = d3.extent(data, d => +d[X_AXIS]);
        let Y_RANGE = d3.extent(data, d => +d[Y_AXIS]);
        const min = [X_RANGE[0] - 1, Y_RANGE[0] - 1];
        const max = [X_RANGE[1] + 1, Y_RANGE[1] + 1];
        const labelMargin = Y_AXIS.length * 5;
        
        var x = d3.scaleLinear()
          .domain([min[0], max[0]])
          .range([ 0, graphWidth ]);
        svg.append("g")
          .attr("transform", "translate(0," + graphHeight + ")")
          .call(d3.axisBottom(x));
          svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", graphWidth)
            .attr("y", graphHeight+30 )
            .text(""+X_AXIS)
            .attr("id", "X-AXIS")
    
        var y = d3.scaleLinear()
          .domain([min[1], max[1]])
          .range([ graphHeight, 0]);
        svg.append("g")
          .call(d3.axisLeft(y));

        svg.append('g')
          .selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
            .attr("cx", function (d) { return x(+d[X_AXIS]); } )
            .attr("cy", function (d) { return y(+d[Y_AXIS]); } )
            .attr("r", function(d) { return Math.sqrt(weight[+d[Y_AXIS]][+d[X_AXIS]]) * 3; })
            .transition()
            .duration(1000)
            .attr("stroke", "#ab992555")
            .attr("stroke-width", "2")
            .style("fill", "#dbc95555")
            .attr("data-x", function(d) { return +d[X_AXIS]; } )
            .attr("data-y", function(d) { return +d[Y_AXIS]; } );

        svg.append("text")
          .attr("text-anchor", "end")
          .attr("x", labelMargin)
          .attr("y", -15)
          .text(""+Y_AXIS)
          .attr("id", "Y-AXIS");
    });
}
