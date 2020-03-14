console.log("script loaded")
var em;

var checkArray = [];
var foundCardArr = [];

function turn() {
    this.style.transform = "rotateY(180deg)";
}

/* function startGame(event) {
    event.preventDefault();
    var new_game = new Vue({
        template: `
        <div class="start">
        Hi Welcome, click to start
        </div>`
        
    }, */

/* 
function checkFinished() {
    if (foundCardArr.length == 16) {
        var winnerDiv = document.createElement("div");

        // winnerDiv.appendChild(newContent);
        winnerDiv.innerHTML = "Player ? won this time. Press S to restart.";
        winnerDiv.style.width = '100px';
        winnerDiv.style.height = '100px';
        winnerDiv.style.background = 'red';
        windowDiv.style.color = 'white';

        document.getElementById("main").appendChild(winnerDiv);

    }
} */

//setTimeout(disableCards() { alert("Hello"); }, 3000);

function checkCards() {
    // if (checkArray.length < 2) {}
    if (checkArray.length === 2) {
        card_1 = checkArray[0];
        card_2 = checkArray[1];

        if (card_1.img === card_2.img) {
            this.flipped = true;
            this.matched = true;
            console.log("yessssiiiir")
            card_1.removed = true;
            card_2.removed = true;
            // checkArray[0]._vnode.elm
        }
        if (card_1.flipped == true && card_2.flipped == true) {
            //1 sec
            setTimeout(function() { card_1.flipped = false }, 500);
            setTimeout(function() { card_2.flipped = false }, 500);


        }

        // setTimeout(waitAbit0(), 1000);
        // setTimeout(waitAbit1(), 2000);
        foundCardArr.push(card_1.img);
        foundCardArr.push(card_2.img);
        //checkFinished();
        checkArray = [];


    }

}

function layCards() {

    let board = document.querySelector("#cardboard");
    var imglist = ['break_git.png', 'css.jpg', 'error_git.png', 'ninja_git.jpg', 'lol_git.png', 'homer_git.png', 'dec_git.png', 'zombie_git.jpg', 'break_git.png', 'css.jpg', 'error_git.png', 'ninja_git.jpg', 'lol_git.png', 'homer_git.png', 'dec_git.png', 'zombie_git.jpg'];
    board.innerHTML = "";

    //shuffle imglist, gets shuffled for every new game. 
    let arrayShuffle = function(arr) {
        let newPos, temp;

        for (let i = arr.length - 1; i > 0; i--) {
            newPos = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[newPos];
            arr[newPos] = temp;
        }
        return arr;
    };

    // let newShuffledArr = arrayShuffle(imglist);


    for (let i = 0; i < 16; i++) {
        //for every 16 cards 


        let card = document.createElement("div");
        //https://stackoverflow.com/questions/34950867/vue-js-how-to-set-a-unique-id-for-each-component-instance
        var new_cards = new Vue({
            template: `
            <div class="cardboard">
                <div class="outer" v-on:click="flip($event)">
                    <div class="card front" v-bind:style="{ transform:flipped? 'rotateZ(1080deg)': 'none', display: removed? 'none': ''}">
                        <img :src="img">
                    </div>
                    <div class="card back" v-bind:style="{ transform: flipped? 'rotateY(-180deg)': 'none', display: removed? 'none':''}"></div>
                </div>
            </div>
            `,
            data: function() {
                return {
                    img: imglist[i],
                    flipped: false,
                    matched: false,
                    removed: false,


                };

            },

            methods: {
                flip: function(o) {
                    em = o;

                    //console.log(em.target);

                    if (this.flipped) {
                        this.flipped = false;
                    } else {
                        this.flipped = true;
                        checkArray.push(this);
                        checkCards();
                        console.log(checkArray)
                    }

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
    }
})