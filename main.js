document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("Enter your name");
    if (yourName === null || yourName === "") {
        document.querySelector(".info-container .name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".info-container .name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
};


// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    
    block.addEventListener("click", function () {
        // trigger the flip Block function
        flipBlock(block);
    });
});



function flipBlock(selectedBlock) {
    //Add Class is-flipped
    selectedBlock.classList.add("is-flipped");
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
    if (allFlippedBlocks.length === 2) {
        noClicking();
        checkMatchBlocks(allFlippedBlocks[0] , allFlippedBlocks[1]);
    }
}


function noClicking(){
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, duration);
}
function checkMatchBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
    }
}
function shuffle(array) {
    let current = array.length,
        temp,
        random;
    
    while (current > 0) {
        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;
    }
    return array;
}
