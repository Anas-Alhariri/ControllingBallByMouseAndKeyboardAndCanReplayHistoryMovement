import Ball from './Ball.js';


const ball = new Ball(0, 0, "lightgreen", 100, 1);


const box = document.getElementById('box');
box.hidden = true

// let x = 0;
// box.addEventListener('drag', (e) => {
//     e.preventDefault()
//     x = e.clientX;
//     console.log(x)
// })

// // document.onmouseup = 
// document.onmousedown = 


// Make the DIV element draggable:
dragElement(ball.ball);

function dragElement(elementToBeDragged) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elementToBeDragged.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        console.log('pos3 :', pos3);
        pos4 = e.clientY;
        console.log('pos4 :', pos4);
        document.onmouseup = closeDragElement;

        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {

        e.preventDefault();
        // calculate the new cursor position:
        console.clear()
        pos1 = pos3 - e.clientX;
        console.log('pos1 :', pos1);
        pos2 = pos4 - e.clientY;
        console.log('pos2 :', pos2);
        pos3 = e.clientX;
        console.log('pos3 :', pos3);
        pos4 = e.clientY;
        console.log('pos4 :', pos4);

        // set the element's new position:
        elementToBeDragged.style.top = (elementToBeDragged.offsetTop - pos2) + "px";
        elementToBeDragged.style.left = (elementToBeDragged.offsetLeft - pos1) + "px";

        ball.movementArrayHistory.push({ x: (elementToBeDragged.offsetLeft - pos1), y: (elementToBeDragged.offsetTop - pos2) })
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}






// var pos1 = 0, pos2 = 0, mouseX = 0, mouseY = 0;
// box.onmousedown = (e) => {

//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     mouseX = e.clientX;
//     console.log('mouseX :', mouseX);
//     mouseY = e.clientY;
//     console.log('mouseY :', mouseY);

//     document.onmouseup = () => {
//         // stop moving when mouse button is released:
//         // document.onmouseup = null;
//         document.onmousemove = null;
//     }

//     // call a function whenever the cursor moves:
//     document.onmousemove = (e) => {

//         e.preventDefault();
//         // calculate the new cursor position:
//         // !pos1 and pos2 is the offset of how far the element has moved, and shows the steps direction using - or +, in addition,
//         //! to the value in pixels to be either added or removed to move the element.
//         pos1 = mouseX - e.clientX;
//         console.log('e.clientX :', e.clientX);
//         console.log('pos1 :', pos1);
//         pos2 = mouseY - e.clientY;
//         console.log('pos2 :', pos2);
//         mouseX = e.clientX;
//         console.log('mouseX :', mouseX);
//         mouseY = e.clientY;
//         console.log('mouseY :', mouseY);

//         // set the element's new position:
//         box.style.top = (box.offsetTop - pos2) + "px";
//         box.style.left = (box.offsetLeft - pos1) + "px";
//     };
// }
