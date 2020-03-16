console.log("script loaded")
var e;
let foundCardArr = [];
let choiceA;

let ChangePlayer = 0;


function turn() {
    this.style.transform = "rotateY(180deg)";
}



function checkFinished() {
    if (foundCardArr.length == 8) {
        console.log("Game finished")
        if (player1.count1 < player2.count2) {
            alert("Player 2 won this time!")
        } else {
            alert("Player 1 won this time!")
        }


    }

}

//shuffle imglist 
function arrayShuffle(arr) {
    let newPos, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        newPos = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[newPos];
        arr[newPos] = temp;
    }
    return
};

function layCards() {
    let AmountFlip = 0;
    let board = document.querySelector("#cardboard");
    const choices = ['break_git.png', 'css.jpg', 'error_git.png', 'ninja_git.jpg', 'lol_git.png', 'homer_git.png', 'dec_git.png', 'zombie_git.jpg']
    let imglist = [...choices, ...choices]; //spread array in one array (...)
    board.innerHTML = "";

    arrayShuffle(imglist); //comment out for unshuffle 


    var score = new Vue({
        el: "#amount-flip",

        data: {
            AmountFlip: 0
        }
    });
    for (let i = 0; i < 16; i++) {
        //for every 16 cards 


        let card = document.createElement("div");
        //https://stackoverflow.com/questions/34950867/vue-js-how-to-set-a-unique-id-for-each-component-instance
        var new_cards = new Vue({
            template: `
            <div class="cardboard">
                <div class="outer" v-on:click="flip($event)">
                    <div class="card front" v-bind:style="{ transform:flipped ? 'rotateZ(1080deg)': 'none', display: removed ? 'none': ''}">
                        <img :src="img">
                    </div>
                    <div class="card back" v-bind:style="{ transform : flipped? 'rotateY(-180deg)': 'none', display : removed ? 'none':''}"></div>
                </div>
            </div>
            `,
            data: function() {
                return {
                    id: i,
                    img: imglist[i],
                    flipped: false,
                    matched: false,
                    removed: false

                };

            },

            methods: {
                flip: function(o) {
                    if (choiceA === undefined) {
                        this.flipped = true;
                        choiceA = this;
                    } else {
                        if (choiceA.id == this.id) { // Hvis bruker trykker på samme kort skal det kortet bare snu seg.
                            this.flipped = false;

                        } else {
                            this.flipped = true;
                            if (choiceA.img === this.img) { // Hvis bruker gjetter riktig, fjern kort med SetTimeout

                                if (player1.turn) {
                                    player1.count1++;

                                } else if (player2.turn) {
                                    player2.count2++;

                                }

                                score.AmountFlip++;

                                foundCardArr.push(choiceA.img); //legger til listen min slikt at jeg kan se når spillet er ferdig 
                                //console.log(foundCardArr)

                                setTimeout((x) => {
                                    x.removed = true;
                                    this.removed = true;
                                }, 500, choiceA);

                                //console.log(players[0])
                                checkFinished();
                            } else { // Hvis bruker gjetter feil, snu kortet
                                setTimeout((x) => {
                                    x.flipped = false;
                                    this.flipped = false;
                                }, 800, choiceA);
                                score.AmountFlip++;
                                if (player1.turn) {
                                    player1.turn = false;
                                    player2.turn = true;
                                } else if (player2.turn) {
                                    player1.turn = true;
                                    player2.turn = false;

                                }
                            }
                        }


                        choiceA = undefined; // reset choiceA
                        console.log("Amount of flips during this game: " + AmountFlip);
                    }

                    //do checkFinished() here 
                    this.function(o.target)

                },


            }
        });
        board.appendChild(card);
        new_cards.$mount(card);
    }

    board.style.width = 115 * 4 + 'px';
}

window.addEventListener("keyup", ev => {
    if (ev.keyCode === 83) {
        layCards();
        //score.AmountFlip = 0; //prøver å resette amount of flipped cards
    }
})