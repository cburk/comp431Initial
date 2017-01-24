window.onload = function() {
	var btn1 = document.getElementById("button1")
    var btn2 = document.getElementById("button2")
	var vicText = document.getElementById("victoryText")
    
    btn2.style.visibility="hidden"
    
    function setupGame(){
        btn1.value="Click me"
        btn2.value="Click me"
        vicText.style.visibility="hidden"
        frozen=false
        endgame=false
    }
    setupGame()
    
    btn1.onmouseover = function() {
        if (btn1.style.visbility != "hidden" && !frozen) {
            btn1.style.visibility = "hidden";
            btn2.style.visibility = "visible";
        }
    }
    
    btn2.onmouseover = function() {
        if (btn2.style.visbility != "hidden" && !frozen) {
            btn2.style.visibility = "hidden";
            btn1.style.visibility = "visible";
        }
    }
    
    window.addEventListener("keydown", function(pressed){
        if(pressed.keyCode == 16){
            frozen=true
        }
    })
    window.addEventListener("keyup", function(pressed){
        if(!endgame && pressed.keyCode == 16){
            frozen=false
        }
    })
    
    
	btn1.onclick = function() {
        vicText.style.visibility="visible"
        btn1.value="Play again?"
        frozen=true
        endgame=true
        btn1.onclick = function() {
            setupGame()
        }
	}
	btn2.onclick = function() {
        vicText.style.visibility="visible"
        btn2.value="Play again?"
        frozen=true
        endgame=true
        btn2.onclick = function() {
            setupGame()
        }
	}
}