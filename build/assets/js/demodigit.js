window.onload = function () {
  
    var seconds = 00; 
    var tiga = 00;
    var tens = 00; 
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var appendTiga = document.getElementById("tiga")
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var Interval ;
  
    buttonStart.onclick = function() {
      
      clearInterval(Interval);
       Interval = setInterval(startTimer, 10);
    }
    
    function startTimer () {
      tens++; 
      
      if(tens <= 9){
        appendTens.innerHTML = "0" + tens;
      }
      
      if (tens > 9){
        appendTens.innerHTML = tens;
        
      } 
      
      if (tens > 99) {
        console.log("seconds");
        seconds++;
        tiga++;
        tens++;
        appendSeconds.innerHTML = seconds;
        appendTiga.innerHTML = tiga;
        
        appendTens.innerHTML = ten;
      }
      
    
    
    }
    
  
  }