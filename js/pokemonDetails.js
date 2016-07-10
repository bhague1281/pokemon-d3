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

  function drawPokemonDetails(json) {
    // add stat nodes' x and y coordinates
    json.stats = json.stats.map(function(stat) {
      stat.x = Math.random() * width - nodeWidth;
      stat.y = Math.random() * height - nodeWidth;
      return stat;
    });

    // generate links between stats and main node
    var links = json.stats.map(function(stat) {
      return { source: stat, target: json }
    });

    // add links
    var drawnLinks = pokeDetails.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('x1', function(d) { return d.source.x })
      .attr('y1', function(d) { return d.source.y })
      .attr('x2', width / 2)
      .attr('y2', height / 2)
      .style('stroke', 'black')

    // add main node
    var node = pokeDetails.selectAll('.detail-node')
      .data([json])
      .enter().append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    // add main node's circle
    node.append('svg:circle')
      .attr('class', 'detail-circle')
      .attr('r', nodeWidth)
      .attr('fill', 'orange')

    // add main node's text
    node.append('text')
      .attr('class', 'name')
      .attr('text-anchor', 'middle')
      .text(function(d) { return d.name; });

    // add main node's image
    node.append('svg:image')
      .attr('class', 'sprite')
      .attr('xlink:href', function(d) { return d.sprites.front_default; })
      .attr('width', spriteHeight)
      .attr('height', spriteHeight)

    // add stat nodes
    var stats = pokeDetails.selectAll('.stat-node')
      .data(json.stats)
      .enter().append('g')
      .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')' })
      .call(d3.drag().on('drag', function(d) {
        d.x = d3.event.x;
        d.y = d3.event.y;
        d3.select(this).attr('transform', 'translate(' + d.x + ',' + d.y + ')');
        drawnLinks
          .attr('x1', function(d) { return d.source.x })
          .attr('y1', function(d) { return d.source.y })
          .attr('x2', width / 2)
          .attr('y2', height / 2)
      }))

    // add stat nodes' circles
    stats.append('svg:circle')
      .attr('class', 'stat-circle')
      .attr('r', nodeWidth)
      .attr('fill', 'red')

    // add stat nodes' text
    stats.append('text')
      .attr('class', 'stat-name')
      .attr('text-anchor', 'middle')
      .text(function(d) { return d.stat.name + ' base:' + d.base_stat })
  }

  fetch('http://pokeapi.co/api/v2/pokemon/' + pokemonId, { cache: 'default' })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      drawPokemonDetails(json);
    });
}());
