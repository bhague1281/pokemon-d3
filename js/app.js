(function() {
  var height = 1000;
  var width = 800;
  var pokemonLimit = 151;
  var nodeWidth = 10;

  var pokeGraph = d3.select('#pokemon')
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width);

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
      .enter().append('g');

    // add circles
    nodes.append('svg:circle')
      .attr('class', 'node')
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .attr('r', nodeWidth)
      .attr('fill', function() { return randomColor(); });

    // add text
    nodes.append('text')
      .attr('dx', function(d) { return d.x - nodeWidth; })
      .attr('dy', function(d) { return d.y - nodeWidth; })
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
