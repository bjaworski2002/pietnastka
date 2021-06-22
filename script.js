function losuj(max) {
    return Math.floor((Math.random() * max) + 1);
}
function checkOtoczkas(object, blackHeight, blackWidth) {
    if (object.posHeight - 1 == blackHeight && object.posWidth == blackWidth) return true;
    else if (object.posHeight == blackHeight && object.posWidth - 1 == blackWidth) return true;
    else if (object.posHeight == blackHeight && object.posWidth + 1 == blackWidth) return true;
    else if (object.posHeight + 1 == blackHeight && object.posWidth == blackWidth) return true;
    else return false;
}
function swapElements() {

    let black = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].blackElement == true) black = i;
    }

    arr[this.id].blackElement = true;
    arr[black].blackElement = false;

    let cont = arr[this.id].tempID;
    arr[this.id].tempID = arr[black].tempID;
    arr[black].tempID = cont;

    reloadElements();
    let flag = true;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].tempID != arr[i].constID) flag = false;
    }
    if (flag == true) winGame();
}
function winGame() {
    let image = document.getElementById("image");
    clearInterval(dataInterval);
    for (let i = 0; i < image.children.length; i++) {
        image.children[i].removeEventListener("click", swapElements);
    }
    window.alert("BIG WINNER!\n Twój czas to: " + timerData);
}
function reloadOtoczka() {
    let blackHeight = 0;
    let blackWidth = 0;
    for (let i = 0; i < arr.length; i++) {
        //        console.log(arr[i])
        if (arr[i].blackElement == true) {
            blackHeight = arr[i].posHeight;
            blackWidth = arr[i].posWidth
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (checkOtoczkas(arr[i], blackHeight, blackWidth) == true) {
            arr[i].otoczka = true;
        }
        else {
            arr[i].otoczka = false;
        }
    }
}
function reloadElements() {

    let image = document.getElementById("image");
    image.innerHTML = '';

    reloadOtoczka();

    for (let i = 0; i < arr.length; i++) {
        const div = document.createElement("DIV");
        div.style.width = arr[i].elWidth;
        div.style.height = arr[i].elHeight;
        div.style.float = "left";
        div.style.backgroundColor = "blue";
        div.style.backgroundImage = "url('psy/pies" + currentImage + ".png')"
        div.style.backgroundPositionX = -1 * (arr[i].tempID % Math.sqrt(arr.length)) * 600 / Math.sqrt(arr.length) + "px"
        div.style.backgroundPositionY = -1 * Math.floor(arr[i].tempID / Math.sqrt(arr.length)) * 600 / Math.sqrt(arr.length) + "px"
        div.style.outline = "1px solid black"
        div.id = arr[i].constID;
        if (arr[i].otoczka == true)
            div.addEventListener("click", swapElements);

        if (arr[i].blackElement) {
            div.style.backgroundImage = "none";
            div.style.backgroundColor = "black";
        }
        if (arr[i].otoczka == true) div.style.backgroundColor = "purple";

        image.appendChild(div);
    }
}
function updateTimer() {
    let getData = new Date(Date.now() - startData);
    timerData = "";

    timerData += getData.getMilliseconds();
    if (Math.ceil(Math.log10(getData.getMilliseconds() + 1)) < 3) {
        timerData = "0" + timerData;
    }
    if (Math.ceil(Math.log10(getData.getMilliseconds() + 1)) < 2) {
        timerData = "0" + timerData;
    }
    timerData = getData.getSeconds() + ":" + timerData;
    if (Math.ceil(Math.log10(getData.getSeconds() + 1)) < 2) {
        timerData = "0" + timerData;
    }
    timerData = getData.getMinutes() + ":" + timerData;
    if (Math.ceil(Math.log10(getData.getMinutes() + 1)) < 2) {
        timerData = "0" + timerData;
    }
    timerData = (getData.getHours() - 1) + ":" + timerData;
    if (Math.ceil(Math.log10(getData.getHours() + 1)) < 2) {
        timerData = "0" + timerData
    }
    let timer = document.getElementById("timer");
    timer.innerHTML = "";
    for (let i = 0; i < timerData.length; i++) {
        if (timerData.charAt(i) == ":") {
            timer.innerHTML += '<img src="cyferki/column.png">';
        }
        else timer.innerHTML += '<img src="cyferki/' + timerData.charAt(i) + '.png">';
    }
}
function startGame() {
    startData = new Date(Date.now());
    dataInterval = setInterval(updateTimer, 1);
}
function prepareGame(x) {

    setTimeout(function () {
        if (x > 0) {
            let kx;
            let ky;
            let czyPoprawne;


            let black = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].blackElement == true) black = i;
            }

            czyPoprawne = false;
            kx = 0;
            ky = 0;
            while (czyPoprawne == false) {
                kx = (losuj(3) - 2);
                ky = (losuj(3) - 2);
                if (ky == 0 && kx == 0) czyPoprawne = false;
                else if (kx != 0 && ky != 0) czyPoprawne = false;
                else if ((arr[black].posWidth + 1 + kx) > Math.sqrt(arr.length) || (arr[black].posWidth + kx) < 0) czyPoprawne = false;
                else if ((arr[black].posHeight + 1 + ky) > Math.sqrt(arr.length) || (arr[black].posHeight + ky) < 0) czyPoprawne = false;
                else czyPoprawne = true;
            }
            //console.log(black + " " + kx + " " + ky);

            let newBlack = black + kx + (ky * Math.sqrt(arr.length));
            arr[newBlack].blackElement = true;
            arr[black].blackElement = false;

            let cont = arr[newBlack].tempID;
            arr[newBlack].tempID = arr[black].tempID;
            arr[black].tempID = cont;

            reloadElements();
            prepareGame(x - 1);
        }
    }, 10);
    if (x == 0) startGame();
}
function createObjects() {
    arr = [];
    idCount = 0;
    buttonLVL = this.value;
    currentImage = gameImage;
    for (var i = 0; i < this.value; i++) {
        for (var j = 0; j < this.value; j++) {
            let elem = {
                constID: idCount,
                tempID: idCount,
                posHeight: i,
                posWidth: j,
                elHeight: 600 / this.value + "px",
                elWidth: 600 / this.value + "px",
                otoczka: false,
                blackElement: false,
            }
            if (i == (this.value - 1) && j == (this.value - 1))
                elem.blackElement = true;
            arr.push(elem);
            idCount++;
            //console.log(div.style.height + " " + div.style.width);
        }
    }
    reloadElements();
    prepareGame(400);
}
function swipeLeft() {
    let sliderImage = document.getElementById("sliderimg");
    switch (gameImage) {
        case 1:
            document.getElementById("img4").scrollIntoView({ behavior: "auto" })
            document.getElementById("img3").scrollIntoView({ behavior: "smooth" })
            break;
        case 2:
            document.getElementById("img1").scrollIntoView({ behavior: "smooth" })
            break;
        case 3:
            document.getElementById("img2").scrollIntoView({ behavior: "smooth" })
            break;
    }
    gameImage--;
    if (gameImage == 0) gameImage = 3;
}
function swipeRight() {
    let sliderImage = document.getElementById("sliderimg");
    switch (gameImage) {
        case 1:
            document.getElementById("img1").scrollIntoView({ behavior: "auto" })
            document.getElementById("img2").scrollIntoView({ behavior: "smooth" })
            break;
        case 2:
            document.getElementById("img3").scrollIntoView({ behavior: "smooth" })
            break;
        case 3:
            document.getElementById("img4").scrollIntoView({ behavior: "smooth" })
            break;
    }
    gameImage++;
    if (gameImage == 4) gameImage = 1;
}
function createButtons() {
    let buttonVal = 3;
    for (let i = 0; i < 4; i++) {

        const guzik = document.createElement("BUTTON");
        guzik.id = "btn" + buttonVal;
        guzik.innerText = buttonVal + ' x ' + buttonVal;
        guzik.addEventListener("click", createObjects);
        guzik.value = buttonVal;

        let navbar = document.getElementById("navbar");
        navbar.appendChild(guzik);
        buttonVal++;
    }
    let leftButton = document.getElementById("leftbtn")
    leftButton.addEventListener("click", swipeLeft)
    let rightButton = document.getElementById("rightbtn")
    rightButton.addEventListener("click", swipeRight)
}
let gameImage = 1;
let currentImage;
let level = 0;
let arr = [];
let timerData;
let startData;
let dataInterval;
let swapCount = 0;
createButtons();
document.getElementById("img1").scrollIntoView({ behavior: "auto" });