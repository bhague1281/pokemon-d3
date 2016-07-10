(function() {
  var height = 1000;
  var width = 800;
  var pokemonId = 4;
  var nodeWidth = 100;
  var spriteHeight = 96;

  var pokeDetails = d3.select('#pokemon-details')
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width);

  function translateXY(x, y) {
    return 'translate(' + x + ',' + y + ')'
  }

  // set initial position for the main node
  function addStartPosition(pokemon, coordinates) {
    pokemon.x = coordinates[0];
    pokemon.y = coordinates[1];
  }

  // add stat nodes' x and y coordinates, then return the pokemon
  function formatStats(pokemon, statNodeWidth) {
    pokemon.stats = pokemon.stats.map(function(stat) {
      stat.x = Math.random() * width - statNodeWidth;
      stat.y = Math.random() * height - statNodeWidth;
      return stat;
    });
  }

  // using the pokemon, draw links from each pokemon's stats to the pokemon
  function drawLinks(pokemon) {
    var drawnLinks = pokeDetails.selectAll('.link')
      .data(pokemon.stats)
      .enter()
      .append('line')
      .attr('x1', function(d) { return d.x; })
      .attr('y1', function(d) { return d.y; })
      .attr('x2', pokemon.x)
      .attr('y2', pokemon.y)
      .style('stroke', 'black');

    return drawnLinks;
  }

  // add main pokemon node
  function drawMainNode(pokemon, size) {
    var node = pokeDetails.selectAll('.detail-node')
      .data([pokemon])
      .enter().append('g')
      .attr('transform', translateXY(pokemon.x, pokemon.y));

    // add node's circle
    node.append('svg:circle')
      .attr('class', 'detail-circle')
      .attr('r', size)
      .attr('fill', 'orange');

    // add node's text
    node.append('text')
      .attr('class', 'name')
      .attr('text-anchor', 'middle')
      .text(function(d) { return d.name; });

    // add node's image
    node.append('svg:image')
      .attr('class', 'sprite')
      .attr('xlink:href', function(d) { return d.sprites.front_default; })
      .attr('width', spriteHeight)
      .attr('height', spriteHeight);

    return node;
  }

  // add stat nodes, make stats draggable & update drawn links on drag
  function drawStatNodes(pokemon, statNodeWidth, drawnLinks) {
    var statNodes = pokeDetails.selectAll('.stat-node')
      .data(pokemon.stats)
      .enter().append('g')
      .attr('transform', function(d) { return translateXY(d.x, d.y) })
      .call(d3.drag().on('drag', function(d) {
        d.x = d3.event.x;
        d.y = d3.event.y;
        d3.select(this).attr('transform', translateXY(d.x, d.y));
        drawnLinks
          .attr('x1', function(d) { return d.x; })
          .attr('y1', function(d) { return d.y; });
      }));

    // add stat nodes' circles
    statNodes.append('svg:circle')
      .attr('class', 'stat-circle')
      .attr('r', statNodeWidth)
      .attr('fill', 'red');

    // add stat nodes' text
    statNodes.append('text')
      .attr('class', 'stat-name')
      .attr('text-anchor', 'middle')
      .text(function(d) { return d.stat.name + ' base:' + d.base_stat; });
  }

  // add start position, get stats, then draw the links, main node, and stat nodes
  function drawPokemonDetails(pokemon) {
    addStartPosition(pokemon, [width / 2, height / 2]);
    formatStats(pokemon, nodeWidth);
    var drawnLinks = drawLinks(pokemon);
    drawMainNode(pokemon, nodeWidth);
    drawStatNodes(pokemon, nodeWidth, drawnLinks);
  }

  fetch('http://pokeapi.co/api/v2/pokemon/' + pokemonId, { cache: 'default' })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      drawPokemonDetails(json);
    });
}());
