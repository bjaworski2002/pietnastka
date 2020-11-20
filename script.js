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
    if (flag == true) window.alert("BIG WINNER!");
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
        div.style.backgroundImage = "url('image.png')"
        div.style.backgroundPositionX = -1 * (arr[i].tempID % Math.sqrt(arr.length)) * 600 / Math.sqrt(arr.length) + "px"
        div.style.backgroundPositionY = -1 * Math.floor(arr[i].tempID / Math.sqrt(arr.length)) * 600 / Math.sqrt(arr.length) + "px"
        div.style.outline = "1px solid black"
        div.id = arr[i].constID;
        div.innerHTML += arr[i].tempID + " " + arr[i].constID;
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
function startGame() {
    console.log("gra zaczeta")
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
    prepareGame(1);
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
}
let level = 0;
let arr = [];
let swapCount = 0;
createButtons();