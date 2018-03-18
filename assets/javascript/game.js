var words = {
    1 : { word: 'rottweiler', description: 'Type of Dog', img: 'assets/images/rottweiler.jpg', mp3: 'assets/images/barking.mp3', url: 'https://en.wikipedia.org/wiki/List_of_dog_breeds'},
    2 : { word: 'beagle', description : 'Type of Dog', img: 'assets/images/beagle.jpg', mp3: 'assets/images/barking.mp3', url: 'https://en.wikipedia.org/wiki/List_of_dog_breeds'},
    3 : { word: 'bulldog', description : 'Type of Dog', img: 'assets/images/bulldog.jpg', mp3: 'assets/images/barking.mp3', url: 'https://en.wikipedia.org/wiki/List_of_dog_breeds'},
    4 : { word: 'poodle', description : 'Type of Dog', img: 'assets/images/poodle.jpg', mp3: 'assets/images/barking.mp3', url: 'https://en.wikipedia.org/wiki/List_of_dog_breeds'},
    5 : { word: 'doberman', description : 'Type of Dog', img: 'assets/images/doberman.jpg', mp3: 'assets/images/barking.mp3', url: 'https://en.wikipedia.org/wiki/List_of_dog_breeds'},
    6 : { word: 'chihuahua', description : 'Type of Dog', img: 'assets/images/chihuahua.jpeg', mp3: 'assets/images/barking.mp3', url: 'https://en.wikipedia.org/wiki/List_of_dog_breeds'},
    7 : { word: 'boxer', description : 'Type of Dog', img: 'assets/images/boxer.jpg', mp3: 'assets/images/barking.mp3', url: 'https://en.wikipedia.org/wiki/List_of_dog_breeds'}
};

var images = {
    1: "assets/images/hangman-10.png",
    2: "assets/images/hangman-9.png",
    3: "assets/images/hangman-8.png",
    4: "assets/images/hangman-7.png",
    5: "assets/images/hangman-6.png",
    6: "assets/images/hangman-5.png",
    7: "assets/images/hangman-4.png",
    8: "assets/images/hangman-3.png",
    9: "assets/images/hangman-2.png",
    10: "assets/images/hangman-1.png"
}

var alphabet = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"];
var wordArray  = Object.keys(words);
var wordIndex  = Math.floor(Math.random() * wordArray.length);
var randomKey    = wordArray[wordIndex];

var randomWord  = words[randomKey]; 
var remainingGuessValue = 10;
var lettersAlreadyGuessed = [];

document.getElementById('hiddenWord').innerHTML = '_'.repeat(randomWord.word.length);
document.getElementById('hint').innerHTML = randomWord.description
document.getElementById('remainingGuesses').innerHTML = remainingGuessValue.toString();
document.getElementById("play").disabled = true;


alphabet.forEach(function(event){
    html = "<button id=" + event.toLowerCase() + ' class="btn btn-default" onclick=letterPressed(' + '"' + event.toLowerCase() +'"' + ')>' + event + "</button>";
    document.getElementById('keyboard').innerHTML += html;
    if(event === 'P'){
        document.getElementById('keyboard').innerHTML += "<br>";
    }
    else if(event === 'L'){
        document.getElementById('keyboard').innerHTML += "<br>";
    }
});

function letterPressed(letter) {
    document.getElementById(letter).style.color = "black";

    // if letter was not already guessed, continue
    if(lettersAlreadyGuessed.indexOf(letter) === -1){

        // correct guess :)
        if(randomWord.word.indexOf(letter) >=0){
            for(i=0;i<randomWord.word.length;i++){
                if(randomWord.word.charAt(i) === letter){
                    var tempWord = document.getElementById('hiddenWord').innerHTML;
                    document.getElementById('hiddenWord').innerHTML = tempWord.substr(0, i) + letter+ tempWord.substr(i + 1);
                }
            }
            // you win :(
            if(document.getElementById('hiddenWord').innerHTML.indexOf('_') === -1){
                alert("You win!");
                document.getElementById("hangman-img").src= randomWord.img;
                var audio = new Audio(randomWord.mp3);
                audio.play();
                document.getElementById("learnplacement").innerHTML += '<a href="' + randomWord.url + '"><button id="learn" type="button" class="btn btn-primary">Learn More</button></a>'
                document.getElementById("play").disabled = false;
            }
        }
        // incorrect guess :(
        else{

            document.getElementById('wrongGuesses').innerHTML+= "<span>" + letter + " </span>";
            remainingGuessValue--;
            
            remainingGuesses.innerHTML = remainingGuessValue.toString();
            document.getElementById("hangman-img").src= images[remainingGuessValue+1];
            
            // you lose :(
                if(remainingGuessValue === 0){
                alert("You Lose!");
                document.getElementById('hiddenWord').innerHTML = randomWord.word;
                document.getElementById("learnplacement").innerHTML += '<a href="' + randomWord.url + '"><button id="learn" type="button" class="btn btn-primary">Learn More</button></a>'
                document.getElementById("play").disabled = false;
            }
        }

        lettersAlreadyGuessed.push(letter);
        document.getElementById(letter).style.backgroundColor = "#385077";
        document.getElementById(letter).disabled = true;

    }
    else{
        alert("You have already guessed this letter. Please choose a letter that has not already been chosen.")
    } 
}


document.onkeydown = function(e) {
    var key = e.key;
    var keyCode = e.keyCode; 

    if(event.shiftKey){
        var key = e.key.toLowerCase();
    }
    else{
        var key = e.key;
    }

    if((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)){
        document.getElementById(key).style.color = "red";
    }
};

// keyboard event registered
document.onkeyup = function(event) {
    var keyCode = event.keyCode;
    if(event.shiftKey){
        var key = event.key.toLowerCase();
    }
    else{
        var key = event.key;
    }
    
    // keyboard event is a letter 
    if((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)){
        letterPressed(key); 
    }  
}