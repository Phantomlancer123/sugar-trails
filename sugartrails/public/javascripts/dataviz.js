$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});

/*var dataset = {
  apples: [30000, 28479, 19697, 24037, 40245],
};

var width = 460,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);

var svg = d3.select("#info").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svg.selectAll("path")
    .data(pie(dataset.apples))
  .enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc);
*/

var dataset = [];

 var w = 8000;
			var h = 200;

 $.ajax({
  url:"https://jnj-dev.apigee.net/otr/v1/patient/-/healthdata/search?type=bloodGlucose,bolusInsulin,exercise,food&startDate=2016-01-01T00%3A00%3A00&endDate=2016-02-22T00%3A00%3A00&limit=5000&offset=0",
  beforeSend: function(xhr) { xhr.setRequestHeader('authorization', 'Bearer 0S6SM4v0ioevB4DcB6kGclazPAbh'); },
  success: function (response) {
  	for (var i = 0; i < response['bloodGlucose'].length; i++){
  		dataset.push([i*10, response['bloodGlucose'][i]['bgValue']['value']]);
   // console.log(i, response['bloodGlucose'][i]['bgValue']['value']);
}
var svg = d3.select("#graph")

						.append("svg")
						.attr("width", 1000)
						.attr("height", 300);

console.log(dataset);


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

var details = d3.select("#info")
						.attr("width", w)
						.attr("height", h);
					
			function rollover(){
					console.log(this);
					d3.select(this).attr('fill-opacity',1.0)
								.attr("stroke-width",3.0)
								.attr("stroke", "black");

					console.log(this);}



			function rollaway(){
				/*details.selectAll("foreignObject").remove()
				svg.selectAll("rect.negative").remove()*/

												d3.select(this).attr('fill-opacity',0.2)
												.attr("stroke","none");



				console.log(this);
			}
  },
  error: function (xhr, status) {
    //handle errors
  }
});


			
		
			//Create SVG element
			
			

			

			


/*


(function(d3) {
        'use strict';

        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;
        var legendSpacing = 4;

        var color = d3.scale.category20c();

        var svg = d3.select('#info')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);

        var pie = d3.layout.pie()
          .value(function(d) { return d.count; })
          .sort(null);

        var tooltip = d3.select('#chart')
          .append('div')
          .attr('class', 'tooltip');
        
        tooltip.append('div')
          .attr('class', 'label');

        tooltip.append('div')
          .attr('class', 'count');

        tooltip.append('div')
          .attr('class', 'percent');

        d3.csv('weekdays.csv', function(error, dataset) {
          dataset.forEach(function(d) {
            d.count = +d.count;
            d.enabled = true;                                         
          });

          var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) { 
              return color(d.data.label); 
            })                                                        
            .each(function(d) { this._current = d; });                

          path.on('mouseover', function(d) {
            var total = d3.sum(dataset.map(function(d) {
              return (d.enabled) ? d.count : 0;                       
            }));
            var percent = Math.round(1000 * d.data.count / total) / 10;
            tooltip.select('.label').html(d.data.label);
            console.log(d.data.label);
            tooltip.select('.count').html(d.data.count); 
            tooltip.select('.percent').html(percent + '%'); 
            tooltip.style('display', 'block');
          });
          
          path.on('mouseout', function() {
            tooltip.style('display', 'none');
          });

          /* OPTIONAL 
          path.on('mousemove', function(d) {
            tooltip.style('top', (d3.event.pageY + 10) + 'px')
              .style('left', (d3.event.pageX + 10) + 'px');
          });
          
            
          var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
              var height = legendRectSize + legendSpacing;
              var offset =  height * color.domain().length / 2;
              var horz = -2 * legendRectSize;
              var vert = i * height - offset;
              return 'translate(' + horz + ',' + vert + ')';
            });

          legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)                                   
            .style('fill', color)
            .style('stroke', color)                                  
            .on('click', function(label) {                            
              var rect = d3.select(this);                             
              var enabled = true;                                    
              var totalEnabled = d3.sum(dataset.map(function(d) {     
                return (d.enabled) ? 1 : 0;                           
              }));                                                    
              
              if (rect.attr('class') === 'disabled') {              
                rect.attr('class', '');                               // NEW
              } else {                                                // NEW
                if (totalEnabled < 2) return;                         // NEW
                rect.attr('class', 'disabled');                       // NEW
                enabled = false;                                      // NEW
              }                                                       // NEW

              pie.value(function(d) {                                 // NEW
                if (d.label === label) d.enabled = enabled;           // NEW
                return (d.enabled) ? d.count : 0;                     // NEW
              });                                                     // NEW

              path = path.data(pie(dataset));                         // NEW

              path.transition()                                       // NEW
                .duration(750)                                        // NEW
                .attrTween('d', function(d) {                         // NEW
                  var interpolate = d3.interpolate(this._current, d); // NEW
                  this._current = interpolate(0);                     // NEW
                  return function(t) {                                // NEW
                    return arc(interpolate(t));                       // NEW
                  };                                                  // NEW
                });                                                   
            });                                                       
            
          legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });

        });

      })(window.d3);


					
					/*details.append("foreignObject")
									.attr("color","rgba(0,0,0,.45)")
									.style("font-family","helvetica neue")
										.style("font-weight","100")

.style("font-size","25px")
.style("width","100px")
.style("letter-spacing","5px")
.attr('x', 0)
.attr('y', 0)
.attr("width", 390)
.attr("height", 400)
.append("xhtml:p")
.attr('style','word-wrap: break-word;')
.html("text");*/



/*
svg.append("foreignObject")
.attr("color","rgba(0,0,0,.45)")
.style("font-family","helvetica neue")
.style("font-weight","100")
.style("font-size","25px")
.style("width","100px")
.style("letter-spacing","5px")
.attr('x', 350)
.attr('y', 140)
.attr("width", 390)
.attr("height", 400)
.append("xhtml:p")
.attr('style','word-wrap: break-word;')
.html("text");*/


								/// WHAT S HAPPENING //


								// i hate these people 
			