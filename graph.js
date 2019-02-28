var trace1 = {
  x: [1, 2, 3],
  y: [4, 5, 6],
  type: 'scatter'
};

var trace2 = {
  x: [20, 30, 40],
  y: [50, 60, 70],
  type: 'scatter',
  xaxis: 'x2',
  yaxis: 'y',
};

var data = [trace1, trace2];

var layout = {
  grid: {subplots:[['xy', 'x2y']]},
};

var gd = document.getElementById('myDiv')
Plotly.newPlot(gd, data, layout, {showSendToCloud: true});

gd.on('plotly_selected', function(eventData) {
  console.log(eventData);
})
