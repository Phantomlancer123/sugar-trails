$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});


var dataset = [];

 var w = 1500;
			var h = 300;

 $.ajax({
  url:"https://jnj-dev.apigee.net/otr/v1/patient/-/healthdata/search?type=bloodGlucose,bolusInsulin,exercise,food&startDate=2016-01-01T00%3A00%3A00&endDate=2016-02-22T00%3A00%3A00&limit=5000&offset=0",
  beforeSend: function(xhr) { xhr.setRequestHeader('authorization', 'Bearer 0S6SM4v0ioevB4DcB6kGclazPAbh'); },
  success: function (response) {
  	for (var i = 0; i < response['bloodGlucose'].length; i++){
  		dataset.push([i*13, response['bloodGlucose'][i]['bgValue']['value']]);
   // console.log(i, response['bloodGlucose'][i]['bgValue']['value']);
}
var svg = d3.select("#graph")
            
						.append("svg")
						.attr("width", 1800)
						.attr("height", 500);

var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d){ return d[0]/13; })])
    .range([0, w]);

var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d){ return d[1]; })])
    .range([h, 0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .innerTickSize(-h)
    .outerTickSize(0)
    .tickPadding(10);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .innerTickSize(-w)
    .outerTickSize(0)
    .tickPadding(10);


svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis)

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

var nodes = svg.selectAll("circle")
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
			svg.selectAll('circle').on("mouseleave",rollaway);
			svg.selectAll('circle').on("click", test);

			function test(){
			 console.log('hey');
    };

			


					
			function rollover(){
					console.log(this);
					d3.select(this).attr('fill-opacity',1.0)
								.attr("stroke-width",3.0)
								.attr("stroke", "black")
								.attr("id","active");
          d3.select(svg).append("text")
            .attr("dx", function(d){return -20})
            .text(function(d){return d[0]})

					//console.log(this);
        }



			function rollaway(){
				/*details.selectAll("foreignObject").remove()
				svg.selectAll("rect.negative").remove()*/

												d3.select(this).attr('fill-opacity',0.2)
												.attr("stroke","none");

												var s = d3.select('#active').attr("id","");



				//console.log(this);
			}
  },
  error: function (xhr, status) {
    //handle errors
  }
});


			