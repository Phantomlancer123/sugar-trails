$(document.ready(function() { 
  document.getElementById("textbox").addEventListener("keydown", function(e) {
      if (!e) { e = window.event; }
      e.preventDefault(); // sometimes useful
  
      // Enter is pressed
      if (e.keyCode == 13) { submitFunction(); }
  }, false);
});
