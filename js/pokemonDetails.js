(function() {
  var height = 1000;
  var width = 800;
  var pokemonId = 4;
  var pokemonNodeWidth = 100;

  var pokeDetails = d3.select('#pokemon-details')
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width);

  function drawPokemonDetails(json) {
    var node = pokeDetails.selectAll('.detail-node')
      .data([json])
      .enter().append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    console.log(node);

    // add main node circle
    node.append('svg:circle')
      .attr('class', 'detail-node')
      .attr('r', pokemonNodeWidth)
      .attr('fill', 'orange');

    // add main node's text
    node.append('text')
      .attr('class', 'name')
      .attr('text-anchor', 'middle')
      .text(function(d) { return d.name; });
  }

  fetch('http://pokeapi.co/api/v2/pokemon/' + pokemonId, { cache: 'default' })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      drawPokemonDetails(json);
    });
}());
