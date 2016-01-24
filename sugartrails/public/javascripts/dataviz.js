$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    

});




var highColor = "#dc4f4f";
var mediumColor = "#82ccf3";
var lowColor = "#52b44a";
var size = 0;
var fillColor= "#ffffff"
var dataset=[]

var high = [];
var low = [];
var medium = [];

 var w = 1500;
			var h = 300;

 $.ajax({
  url:"https://jnj-dev.apigee.net/otr/v1/patient/-/healthdata/search?type=bloodGlucose,bolusInsulin,exercise,food&startDate=2016-01-01T00%3A00%3A00&endDate=2016-02-22T00%3A00%3A00&limit=5000&offset=0",
  beforeSend: function(xhr) { xhr.setRequestHeader('authorization', 'Bearer 0S6SM4v0ioevB4DcB6kGclazPAbh'); },
  success: function (response) {
  	for (var i = 0; i < response['bloodGlucose'].length; i++){
  		//high
	if(response['bloodGlucose'][i]['bgValue']['value'] > 180){
  		high.push([i*13, response['bloodGlucose'][i]['bgValue']['value'], "#dc4f4f"]);
  	}
  		// low
  	else if(response['bloodGlucose'][i]['bgValue']['value'] <70){
  		low.push([i*13, response['bloodGlucose'][i]['bgValue']['value'], "#52b44a"]);
  	}
  	else{
  		medium.push([i*13, response['bloodGlucose'][i]['bgValue']['value'], "#82ccf3"]);
  	}

  	dataset.push([i*13, response['bloodGlucose'][i]['bgValue']['value']]);
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
			.attr('fill', '#999')

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
			function test(d){

				$('#threevizzy').remove();

				size = d[1];
				console.log(dataset['d[r]']);
				if (d[1]>180){
					fillColor = "#0000ff";
					init();
					
				}

				else if (d[1]<70){
					fillColor = "#ff0000";
					init();
					}
				else {
					fillColor = "#00ff00"
					init();
				}

				
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
        }



			function rollaway(){


				d3.select(this).attr('fill-opacity',0.2)
				.attr("stroke","none");

				var s = d3.select('#active').attr("id","");



			}
  },
  error: function (xhr, status) {
    //handle errors
  }
});

function init(){
var SCREEN_WIDTH = window.innerWidth,
      SCREEN_HEIGHT = window.innerHeight/2,

      mouseX = 0, mouseY = 0,

      windowHalfX = window.innerWidth / 2,
      windowHalfY = window.innerHeight / 4,

      SEPARATION = 200,
      AMOUNTX = 10,
      AMOUNTY = 10,

      camera, scene, renderer;

      init();
      animate();

      function init() {

        var container, separation = 5, amountX = 50, amountY = 50,
        particles, particle;

        container = document.createElement('div');
        container.id = "threevizzy";
        document.getElementById("graph").appendChild(container);
        // higher initial number smaller it is
        camera = new THREE.PerspectiveCamera( size, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();

        renderer = new THREE.CanvasRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        renderer.setClearColorHex( 0x333333333, 1 );

        container.appendChild( renderer.domElement );

        // particles

        var PI2 = Math.PI * 2;
        var material = new THREE.SpriteCanvasMaterial( {

          color: fillColor,
          program: function ( context ) {

            context.beginPath();
            context.arc( 0, 0, 0.5, 0, PI2, true );
            context.fill();

          }

        } );

        for ( var i = 0; i < size; i ++ ) {

          particle = new THREE.Sprite( material );
          particle.position.x = Math.random() * 2 - 1;
          particle.position.y = Math.random() * 2 - 1;
          particle.position.z = Math.random() * 2 - 1;
          particle.position.normalize();
          particle.position.multiplyScalar( Math.random() * 10 + 450 );
          particle.scale.multiplyScalar(size/3);
          scene.add( particle );

        }

        // lines

        for (var i = 0; i < size; i++) {

          var geometry = new THREE.Geometry();

          var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
          vertex.normalize();
          vertex.multiplyScalar( 450 );

          geometry.vertices.push( vertex );

          var vertex2 = vertex.clone();
          vertex2.multiplyScalar( Math.random() * 0.3 + 1 );

          geometry.vertices.push( vertex2 );

          var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: fillColor, opacity: Math.random() } ) );
          scene.add( line );
        }

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );

        //

        window.addEventListener( 'resize', onWindowResize, false );

      }

      function onWindowResize() {

        windowHalfX = window.innerWidth / 4;
        windowHalfY = window.innerHeight / 4;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }

      //

      function onDocumentMouseMove(event) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      }

      function onDocumentTouchStart( event ) {

        if ( event.touches.length > 1 ) {

          event.preventDefault();

          mouseX = event.touches[ 0 ].pageX - windowHalfX;
          mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

      }

      function onDocumentTouchMove( event ) {

        if ( event.touches.length == 1 ) {

          event.preventDefault();

          mouseX = event.touches[ 0 ].pageX - windowHalfX;
          mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

      }

      //

      function animate() {

        requestAnimationFrame( animate );

        render();

      }

      function render() {

        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
        camera.lookAt( scene.position );

        renderer.render( scene, camera );

      }}
			