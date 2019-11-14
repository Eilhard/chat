<template lang="html">
  <div class="stats">
    <Loader v-show="!simulationReady" />
    <div ref="svgContainer" v-show="simulationReady"></div>
  </div>
</template>

<script>
  import * as d3 from 'Plugins/d3.min.js';
  import Loader from 'Components/Loader.vue';

  export default {
    components: {
      Loader
    },
    data() {
      return {
        svg: null,
        width: 1000,
        height: 1000,
        radius: 8,
        msgRadius: 5,
        backgroundColor: "",
        simulation: null,
        alphaDecay: 0.3,
        simulationReady: false,
        nodeGroup: {},
        linkGroup: {},
        labelGroup: {},
        nodeCoordinates: {}
      }
    },
    computed: {
      nodes() {
        return this.$store.state.stats.nodes;
      },
      links() {
        return this.$store.state.stats.links;
      },
      messages() {
        return this.$store.state.stats.messages;
      }
    },
    watch: {
      nodes() {
        this.simulationUpdate();
      },
      links() {
        this.simulationUpdate();
      },
      messages() {
        this.messages.forEach(msg => {
          this.messageTracking(msg.source, msg.target);
          this.$store.commit('stats/deleteMessage', msg);
        });
      }
    },
    methods: {
      simulationInitiate() {
        this.simulation = d3.forceSimulation()
          .alphaDecay(this.alphaDecay)
          .force('center', d3.forceCenter(this.width / 2, this.height / 2))
          .force('charge', d3.forceManyBody().strength(0))
          .force('link', d3.forceLink().id(function(d) { return d.id; }).distance(150));

        this.svg = d3.select(this.$refs.svgContainer)
          .append('svg')
          .attr('width', this.width)
          .attr('height', this.height);

        if (this.backgroundColor.length > 0){
          this.svg.append('rect')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('fill', this.backgroundColor);
        }

        this.simulation.nodes(this.nodes);
        this.simulation.force('link').links(this.links);

        this.drawEntities(true);

        this.simulation.on('tick', this.simulationTick);
        this.simulation.on('end', this.simulationEnd);
      },
      simulationTick() {
        let radius = this.radius;
        console.log("Tick");
        this.linkGroup.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; })

        this.nodeGroup.attr("r", this.radius)
          .attr("cx", function (d) { return d.x; })
          .attr("cy", function(d) { return d.y; });

        this.labelGroup.attr("x", function(d) {
          return d.x + radius + 3; })
          .attr("y", function (d) { return d.y + radius / 2 - 5; });
      },
      simulationEnd() {
        this.simulationReady = true;
        this.loadNodeCoordinates();
      },
      simulationUpdate() {
        this.simulationReady = false;
        this.simulation.nodes(this.nodes);
        this.simulation.force('link').links(this.links);
        this.drawEntities();
        this.simulation.restart().alpha(this.alphaDecay);
      },
      drawEntities(isInitial = false) {
        if (!isInitial) {
          this.linkGroup.remove();
          this.nodeGroup.remove();
          this.labelGroup.remove();
        }
        this.linkGroup = this.svg.append("g")
          .selectAll("line")
          .data(this.links)
          .enter()
          .append("line")
          .attr('class', 'sim-link');

        this.nodeGroup = this.svg.append("g")
          .selectAll("circle")
          .data(this.nodes)
          .enter()
          .append("circle")
          .attr('class', 'sim-node')
          .attr("r", this.radius);

        this.labelGroup = this.svg.append("g")
          .selectAll("text")
          .data(this.nodes)
          .enter()
          .append("text")
          .text(function(d) { return d.firstname; })
          .attr('class', 'sim-label');
      },
      loadNodeCoordinates() {
        let coordinates = {}
        this.linkGroup.each(function(d) {
          coordinates[d.source.id] = [ d.source.x, d.source.y ]
          coordinates[d.target.id] = [ d.target.x, d.target.y ]
        });
        this.nodeCoordinates = coordinates;
      },
      messageTracking(sourceId, targetId) {
        this.svg.append("circle")
          .attr("r", this.msgRadius)
          .attr('class', 'sim-message')
          .attr("transform", "translate(" + this.nodeCoordinates[sourceId] + ")")
          .transition()
          .duration(800)
          .attr("transform", "translate(" + this.nodeCoordinates[targetId] + ")")
          .remove();
      },
      setWindowSize() {
        this.width = window.innerWidth - 20;
        this.height = window.innerHeight - 100;
      }
    },
    mounted() {
      this.setWindowSize();
      this.simulationInitiate();
    }
  }

</script>

<style lang="scss" scoped>
</style>
