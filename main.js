var maxZ = 96;
const rownum = 7;
const colnum = 14;

document.addEventListener('DOMContentLoaded', function () {
  addCards();
});

function addListener(target, name, listener) {
  target.addEventListener(name, listener);
}

function removeListener(target, name, listener) {
  target.removeEventListener(name, listener);
}

function setSide(card, face) {
  card.setAttribute("data-faceup", face)
}

function onMousedown(e) {
  var card = e.currentTarget
  var pos = {};
  var off = {};
  var starttime = Date.now();

  e.preventDefault();

  // get start coordinates and start listening window events
  if (e.type === 'mousedown') {
    pos.x = e.clientX;
    pos.y = e.clientY;
    off.x = (card.offsetLeft-pos.x);
    off.y = (card.offsetTop-pos.y)
    addListener(window, 'mousemove', onMousemove);
    addListener(window, 'mouseup', onMouseup);
  } else {
    pos.x = e.touches[0].clientX;
    pos.y = e.touches[0].clientY;
    off.x = (card.offsetLeft-pos.x);
    off.y = (card.offsetTop-pos.y)
    addListener(window, 'touchmove', onMousemove);
    addListener(window, 'touchend', onMouseup);
  }

  card.style.zIndex = ++maxZ;

  function onMousemove(e) {
    if (e.type === 'mousemove') {
      pos.x = e.clientX;
      pos.y = e.clientY;
    } else {
      pos.x = e.touches[0].clientX;
      pos.y = e.touches[0].clientY;
    }

    // move card
    card.style.left = (off.x + pos.x) + 'px';
    card.style.top = (off.y + pos.y) + 'px';
  }

  function onMouseup(e) {
    if (Date.now() - starttime < 180) {
      // flip sides
      self.setSide(card, card.getAttribute("data-faceup") === 'true'? 'false' : 'true');
    }
    if (e.type === 'mouseup') {
      removeListener(window, 'mousemove', onMousemove);
      removeListener(window, 'mouseup', onMouseup);
    } else {
      removeListener(window, 'touchmove', onMousemove);
      removeListener(window, 'touchend', onMouseup);
    }    
  }
}

function addCards() {
  for (let index = 94; index >= 0; index--) {
    document.body.appendChild(getCard(index));    
  }
}

function rowColIndex(index) {
  return {row: Math.floor(index/colnum), col: index%colnum};
}

function getCard(index) {
  // create a new div element
  let i = rowColIndex(index);

  // card
  const card = document.createElement("div");
  card.classList.add("tarotcard");
  card.setAttribute("data-faceup", "false");
  card.style.zIndex = Math.ceil(Math.random()*95);
  
  addListener(card, 'mousedown', onMousedown);
  addListener(card, 'touchstart', onMousedown);

  // inner div
  const inner = document.createElement("div");
  inner.classList.add("flip-card-inner");
  card.append(inner);

  // front
  const front = document.createElement("div");
  front.classList.add("flip-card-front");
  front.style = "--row:-" + i.row + ";--col:-" +i.col;
  inner.append(front);

  // back
  const back = document.createElement("div");
  back.classList.add("flip-card-back");
  inner.append(back);

  return card;
}