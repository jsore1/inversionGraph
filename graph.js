var parseData = JSON.parse('{"data":[{"time":0,"height":[0,100,200,300,400,500,600,700,800,900,1000],"temperature":[2.1,2.5,1.7,1.4,1,1.4,0.9,0.6,0.3,0,0.4]},{"time":30,"height":[0,100,200,300,400,500,600,700,800,900,1000],"temperature":[2.5,2.1,2.7,2.3,2,1.8,2.2,1.9,1.4,1,0.6]},{"time":60,"height":[0,100,200,300,400,500,600,700,800,900,1000],"temperature":[4.1,4.5,3.7,3.4,3,3.4,2.9,2.6,2.3,2,2.4]}]}');
var parseInv = JSON.parse('{"data":[{"time":0,"height":[0,100,400,500,900,1000],"temperature":[2.1,2.5,1,1.4,0,0.4]},{"time":30,"height":[100,200,500,600],"temperature":[2.1,2.7,1.8,2.2]},{"time":60,"height":[0,100,400,500,900,1000],"temperature":[4.1,4.5,3,3.4,2,2.4]}]}');

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
    mode: 'lines',
    line: {
      color: 'rgb(250, 0, 0)',
      width: 2
    },
    name: name
  }
}

function createInv(data, xaxis) {
  var shapes = [];
  for (var i = 0; i < (data.height.length / 2); i++) {
    shapes.push(
      {
        type: 'line',
        xref: xaxis,
        yref: 'y',
        x0: data.temperature[i * 2],
        y0: data.height[i * 2],
        x1: data.temperature[i * 2 + 1],
        y1: data.height[i * 2 + 1],
        line: {
          color: 'rgba(255, 255, 0, 1)',
          width: 3
        }
      }
    );
  }
  return shapes;
}

var graph = [];

for (var i = 0; i < parseData.data.length; i++) {
  graph.push(createGraph(parseData.data[i], ('Время - ' + parseData.data[i].time), ('x' + (i + 1))));
}

var inv0 = createInv(parseInv.data[0], 'x');
var inv1 = createInv(parseInv.data[1], 'x2');
var inv2 = createInv(parseInv.data[2], 'x3');

var data = graph;

var layout = {
  grid: {subplots:[['xy', 'x2y', 'x3y']]},
  title: 'График распределения температуры по высоте',
  xaxis: {
    title: 'Температура'
  },
  yaxis: {
    title: 'Высота'
  },
  shapes: [inv0[0], inv0[1],inv0[2], inv1[0], inv1[1], inv2[0], inv2[1], inv2[2]]
};

var gd = document.getElementById('myDiv')
Plotly.newPlot(gd, data, layout, {showSendToCloud: true});

gd.on('plotly_selected', function(eventData) {
  console.log(eventData);
})
