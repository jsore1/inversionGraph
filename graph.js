var parseData = JSON.parse('{"data":[{"time":0,"height":[0,100,200,300,400,500,600,700,800,900,1000],"temperature":[2.1,2.5,1.7,1.4,1,1.4,0.9,0.6,0.3,0,0.4]},{"time":30,"height":[0,100,200,300,400,500,600,700,800,900,1000],"temperature":[2.5,2.1,2.7,2.3,2,1.8,2.2,1.9,1.4,1,0.6]},{"time":60,"height":[0,100,200,300,400,500,600,700,800,900,1000],"temperature":[4.1,4.5,3.7,3.4,3,3.4,2.9,2.6,2.3,2,2.4]}]}');

function createGraph(data, name, xaxis) {
  var x = [];
  var y = [];
  for (var i = 0; i < data.height.length; i++) {
    y.push(data.height[i]);
    x.push(data.temperature[i]);
  }
  return {
    x: x,
    y: y,
    type: 'scatter',
    xaxis: xaxis,
    yaxis: 'y',
    name: name
  }
}

var time0 = createGraph(parseData.data[0], 'Время - 0', 'x');
var time1 = createGraph(parseData.data[1], 'Время - 30', 'x2');
var time2 = createGraph(parseData.data[2], 'Время - 60', 'x3');

var data = [time0, time1, time2];

var layout = {
  grid: {subplots:[['xy', 'x2y', 'x3y']]},
};

var gd = document.getElementById('myDiv')
Plotly.newPlot(gd, data, layout, {showSendToCloud: true});

gd.on('plotly_selected', function(eventData) {
  console.log(eventData);
})
