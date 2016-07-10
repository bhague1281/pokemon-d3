(function() {
  var height = 1000;
  var width = 800;
  var pokemonLimit = 151;
  var nodeWidth = 10;

  var pokeGraph = d3.select('#pokemon')
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width);

  function translateXY(x, y) {
    return 'translate(' + x + ',' + y + ')'
  }

  function randomColor() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
  }

  function drawPokemonNodes(json) {
    var pokemon = json.results.map(function(monster) {
      monster.x = Math.random() * (width - nodeWidth * 2) + nodeWidth;
      monster.y = Math.random() * (height - nodeWidth * 2) + nodeWidth;
      return monster;
    });

    // add node containers
    var nodes = pokeGraph.selectAll('.node')
      .data(pokemon)
      .enter().append('g')
      .attr('transform', function(d) { return translateXY(d.x, d.y) });

    // add circles
    nodes.append('svg:circle')
      .attr('class', 'node')
      .attr('r', nodeWidth)
      .attr('fill', function() { return randomColor(); });

    // add text
    nodes.append('text')
      .attr('dx', function(d) { return -nodeWidth; })
      .attr('dy', function(d) { return -nodeWidth; })
      .text(function(d) { return d.name; });
  }

  fetch('http://pokeapi.co/api/v2/pokemon/?limit=' + pokemonLimit, { cache: 'default' })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      drawPokemonNodes(json);
    });
}());
