$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});


var dataset = [];

 var w = 500;
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


var nodes = svg.append("g")
                .attr("class", "node")
                .selectAll("circle")
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
				var details = d3.select("#info")
						.attr("width", w)
						.attr("height", h);
			}


					
			function rollover(){
					console.log(this);
					d3.select(this).attr('fill-opacity',1.0)
								.attr("stroke-width",3.0)
								.attr("stroke", "black");
          d3.select(this).append("text")
            .attr("dx", function(d){return -20})
            .text(function(d){return d[0]})

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


			