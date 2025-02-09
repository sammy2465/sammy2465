var maxZ = 96;
const rownum = 7;
const colnum = 14;

document.addEventListener('DOMContentLoaded', function () {
  addCards();
  addListener(window, 'mousedown', onMousedown);
  addListener(window, 'touchstart', onMousedown);
});

function addListener(target, name, listener) {
  target.addEventListener(name, listener, {passive: false});
}

function removeListener(target, name, listener) {
  target.removeEventListener(name, listener, {passive: false});
}

function setSide(card, face) {
  card.setAttribute("data-faceup", face)
}

function onMousedown(d) {
  if (d.target === null || d.target.parentElement.parentElement === null) {
    return;
  }
  var card = d.target.parentElement.parentElement;
  var pos = {};
  var off = {};
  var starttime = Date.now();
  d.preventDefault();

  // get start coordinates and start listening window events
  if (d.type === 'mousedown') {
    pos.x = d.clientX;
    pos.y = d.clientY;
    off.x = (card.offsetLeft-pos.x);
    off.y = (card.offsetTop-pos.y)
    addListener(window, 'mousemove', onMousemove);
    addListener(window, 'mouseup', onMouseup);
  } else {
    pos.x = d.touches[0].clientX;
    pos.y = d.touches[0].clientY;
    off.x = (card.offsetLeft-pos.x);
    off.y = (card.offsetTop-pos.y)
    addListener(window, 'touchmove', onMousemove);
    addListener(window, 'touchend', onMouseup);
  }

  card.style.zIndex = ++maxZ;

  function onMousemove(m) {
    m.stopImmediatePropagation();
    if (m.type === 'mousemove') {
      pos.x = m.clientX;
      pos.y = m.clientY;
    } else {
      pos.x = m.touches[0].clientX;
      pos.y = m.touches[0].clientY;
    }

    // move card
    card.style.left = (off.x + pos.x) + 'px';
    card.style.top = (off.y + pos.y) + 'px';
  }

  function onMouseup(u) {
    u.stopImmediatePropagation();
    if (Date.now() - starttime < 180) {
      // flip sides
      self.setSide(card, card.getAttribute("data-faceup") === 'true'? 'false' : 'true');
    }
    if (u.type === 'mouseup') {
      removeListener(window, 'mousemove', onMousemove);
      removeListener(window, 'mouseup', onMouseup);
    } else {
      removeListener(window, 'touchmove', onMousemove);
      removeListener(window, 'touchend', onMouseup);
    }
    self.x = self.x - d.clientX +u.clientX;
    self.y = self.y - d.clientY +u.clientY;
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