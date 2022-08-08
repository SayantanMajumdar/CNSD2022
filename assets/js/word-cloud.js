// Word Cloud Inspired by https://codepen.io/stevn Example
var SciTerms = [
    "Dynamical Systems", 
    "Nonlinear Dynamics", 
    "Dynamics", 
    "Chaos", 
    "Stability",
    "Lyapunov",
    "Differential Equations",
    "Complex Systems",
    "Poincare Sections",
    "Maps",
    "Poincare Maps",
    "Turbulance",
    "Stochastic",
    "Stochastic Equations",
    "Time-Series",
    "Ordinary Differential Equations",
    "Partial Differential Equations",
];

SciTerms = SciTerms.map(function(word) {
    return {
        term: word,
        freq: Math.floor(Math.random() * 30) + 20
    }
})
SciTerms.sort(
    function (x, y) {
        return (y.freq - x.freq);
    }
)

var populatedTerms = [];

function createTermObj(word) {
    var newWordCont = document.createElement("div");
    newWordCont.style.position = "absolute";
    newWordCont.style.fontSize = word.freq + "px";
    newWordCont.style.lineHeight = 0.6;
    if (word.freq >= 40) {
        newWordCont.style.color = 'yellow';
    } else {
        newWordCont.style.color = 'white';
    }
    newWordCont.appendChild(document.createTextNode(word.term));
    return newWordCont;
}

function embedWord(term, x, y) {
    wordCloud.appendChild(term);
    term.style.left = x - term.offsetWidth / 2.0 + "px";
    term.style.top = y - term.offsetHeight / 2.0 + "px";
    populatedTerms.push(term.getBoundingClientRect());
}

function GeoCurve(theta, callback) {
    x = (1 + 1.5 * theta) * Math.cos(theta);
    y = (1 + 0.9 * theta) * Math.sin(theta);
    return callback ? callback() : null;
}


var wordCloud = document.getElementById("word-cloud");
wordCloud.style.position = "relative";

var origin = {
    x: wordCloud.offsetWidth / 2.0,
    y: wordCloud.offsetHeight / 2.0
};

function intersect(word, x, y) {
    wordCloud.appendChild(word);    
    
    word.style.left = x - word.offsetWidth/2 + "px";
    word.style.top = y - word.offsetHeight/2 + "px";
    
    var currentWord = word.getBoundingClientRect();
    
    wordCloud.removeChild(word);
    
    for(var i = 0; i < populatedTerms.length; i+=1){
        var comparisonWord = populatedTerms[i];
        
        if(!(currentWord.right + 0 < comparisonWord.left - 0 ||
             currentWord.left - 0 > comparisonWord.right + 0 ||
             currentWord.bottom + 3 < comparisonWord.top - 3 ||
             currentWord.top - 3 > comparisonWord.bottom + 3)){
            
            return true;
        }
    }
    
    return false;
}

(function placeWords() {
    for (var i = 0; i < SciTerms.length; i += 1) {

        var word = createTermObj(SciTerms[i]);

        for (var j = 0; j < 360 * 5; j++) {
            if (GeoCurve(j, function() {
                    if (!intersect(word, origin.x + x, origin.y + y)) {
                        embedWord(word, origin.x + x, origin.y + y);
                        return true;
                    }
                })) {
                break;
            }
        }
    }
})();