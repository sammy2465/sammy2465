
/* global Deck */

var prefix = Deck.prefix

var transform = prefix('transform')

var translate = Deck.translate

var $container = document.getElementById('container')
var $topbar = document.getElementById('topbar')

var $sort = document.createElement('button')
var $shuffle = document.createElement('button')
var $fan = document.createElement('button')
var $flip = document.createElement('button')

$shuffle.textContent = 'Shuffle'
$sort.textContent = 'Sort'
$fan.textContent = 'Fan'
$flip.textContent = 'Flip'

$topbar.appendChild($flip)
$topbar.appendChild($shuffle)
$topbar.appendChild($fan)
$topbar.appendChild($sort)

var deck = Deck()

deck.cards.forEach(function (card, i) {
    card.enableDragging()
    card.enableFlipping()
  })

$shuffle.addEventListener('click', function () {
  deck.shuffle()
  deck.shuffle()
})
$sort.addEventListener('click', function () {
  deck.sort()
})
$fan.addEventListener('click', function () {
  deck.fan()
})
$flip.addEventListener('click', function () {
  deck.flip()
})

deck.mount($container)

deck.shuffle();