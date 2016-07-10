(function() {
  var height = 1000;
  var width = 1200;
  var pokemonLimit = 151;
  var nodeWidth = 20;

  var pokeGraph = d3.select('#pokemon')
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width);

  function translateXY(x, y) {
    return 'translate(' + x + ',' + y + ')';
  }

  function randomColor() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
  }

  function drawPokemonNodes(json) {
    var pokemon = json.results.map(function(monster) {
      monster.x = Math.random() * (width - nodeWidth * 3) + nodeWidth * 2;
      monster.y = Math.random() * (height - nodeWidth * 3) + nodeWidth * 2;
      return monster;
    });

    // add node containers
    var nodes = pokeGraph.selectAll('.node')
      .data(pokemon)
      .enter().append('g')
      .attr('transform', function(d) { return translateXY(d.x, d.y); });

    // add circles
    nodes.append('svg:circle')
      .attr('class', 'node')
      .attr('r', nodeWidth)
      .attr('fill', function() { return randomColor(); })
      .attr('stroke', 'red');

    // add text
    nodes.append('text')
      .attr('class', 'name')
      .attr('dx', -nodeWidth)
      .attr('dy', -nodeWidth)
      .text(function(d) { return d.name; });
  }

  fetch('http://pokeapi.co/api/v2/pokemon/?limit=' + pokemonLimit, { cache: 'default' })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log('done');
      drawPokemonNodes(json);
    });
}());
