var w = 500;
			var h = 200;
			
			var dataset = [
							[4, 20], [480, 90], [250, 50], [100, 33], [330, 95],
							[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
						  ];
	
			//Create SVG element
			var svg = d3.select("#graph")

						.append("svg")
						.attr("width", w)
						.attr("height", h);

			svg.selectAll("circle")
			   .data(dataset)
			   .enter()

			   .append("circle")
			   .attr('fill-opacity', 0.2)
			.attr('fill', 'red')
			   .attr("cx", function(d) {
			   		return d[0];
			   })
			   .attr("cy", function(d) {
			   		return d[1];
			   })
			   .attr("r", function(d) {
			   		return Math.sqrt(h - d[1]);
			   });

			

			svg.selectAll('circle').on("mouseover", rollover);
			svg.selectAll('circle').on("mouseleave",rollaway)

			function rollover(){
					d3.select(this).attr('fill-opacity',1.0)
								.attr("stroke-width",3.0)
								.attr("stroke", "black");

					document
					console.log(this);


								/// WHAT S HAPPENING //


								// i hate these people 
			}

			function rollaway(){

												d3.select(this).attr('fill-opacity',0.2)
												.attr("stroke","none");

				console.log(this);
			}