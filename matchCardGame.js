let cards = document.querySelectorAll("button");
let images = document.querySelectorAll("img");
let imgArray = Array.from(images);
let resultPara = document.querySelector("#result-para");
let sortedImgs = shuffleArray(imgArray);
let scorePara = document.querySelector('#scores-para');
let cardContainer = document.querySelector("#card-container");
let clickedCard;
let twocardsmatched = false;
let scores = {
    'points' : 0,
    'losses' : 0
};

let sortedImgSrc = sortedImgs.map((img)=>{
    return img.getAttribute('src');
});

images.forEach((img,i)=>{
    img.setAttribute('src',`${sortedImgSrc[i]}`);
    //card.dataset.value = card.children[0].src;   
    //.src returns the absolute URL , not the value stored in src attribuet
    img.dataset.value = img.getAttribute("src");
    img.setAttribute('src','QuestionMark.png');
});

cards.forEach((card,i)=>{

    card.disabled = false;


    card.addEventListener("click",()=>{

        clickedCard = card;
        card.classList.add('fliped');
        card.classList.add('css-flip');

        card.children[0].src = card.children[0].dataset.value;

        if(card.children[0].dataset.value === "devil.png"){
            resultPara.innerHTML = "You Lost";
            scores.losses++;
            scoreupdate();
            setTimeout(()=>{
                window.location.reload();
            },1000)

            cards.forEach((card)=>{
                card.disabled=true;
            })
        };

        cards.forEach((card1)=>{
            cards.forEach((card2)=>{
                if(card1.classList.contains('fliped') && card2.classList.contains('fliped') && card1 != card2){
                    if(card1.children[0].getAttribute('src') === card2.children[0].getAttribute('src')){
                        twocardsmatched = true;
                        card1.classList.remove('fliped'); //not the fact that their not fliped anymore
                        card2.classList.remove('fliped'); //but to make them not match again
                    }
                }
            });
        });
        if(twocardsmatched){
            scores.points++;
            scoreupdate();
            twocardsmatched =false;
        }
    });
});



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    return array;
};


function scoreupdate(){
    scorePara.innerHTML = `Your win points are ${scores.points} and you lost ${scores.losses} times`;
}


//old code down...

/*let cards = document.querySelectorAll("button");
let allSrcOfImages;
let oldImage;
let para = document.querySelector("#msg");
let pricidenceValues = [];
let sortedImgs = [];
let images = document.querySelectorAll("img");

shuffling();

cards.forEach((card)=>{

    //card.dataset.value = card.children[0].src;   
    //.src returns the absolute URL , not the value stored in src attribuet
    card.dataset.value = card.children[0].getAttribute("src");
    card.children[0].src = "Question Mark.png";

    card.addEventListener("click",()=>{
        card.children[0].src = card.dataset.value;
        console.log(card.dataset.value);

        if(card.dataset.value === "Devil.jpg"){
            para.innerHTML = "You Lost";
        }
        card.disabled=true;
    });
});

function shuffling(){
    cards.forEach((card)=>{
        card.dataset.pricidence = Math.random();
        pricidenceValues.push(card.dataset.pricidence);
    });

    pricidenceValues.sort((a,b)=> a-b);
    console.log(pricidenceValues);

    pricidenceValues.forEach((value,i)=>{
        sortedImgs.push(cards[i].children[0].dataset.pricidenceValues[i]);
    });
    console.log(sortedImgs);

    cards.forEach((card,i)=>{
        card.children[0].innerHTML ="<img src=>" ;
    });

};

*/
