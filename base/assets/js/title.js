 
  var i = 0;
  var txt = "Welcome to my Coding Portfolio..."
  var speed = 100;
  
  function typeWriter() {
      if (i < txt.length) {
          document.getElementById("typing").innerHTML += txt.charAt(i);
          i++;
          setTimeout(typeWriter, speed)
      }
  }
  
  window.onload = function() {
    typeWriter();
  };