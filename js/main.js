'use strict'

var gNums
var gLevel = 16
var gInterval = null
var gNextNum

function init() {
  // Proper convention is to firstly prepare any model/variables, then only access and update the DOM elements.
  clearInterval(gInterval)
  gNums = shuffle(resetNums())
  gNextNum = 1
  renderBoard()
  document.querySelector('.stopwatch').innerText = '0.000' // Instruct the students to avoid assigment of
  document.querySelector('.next-num').innerText = gNextNum // DOM elements to variables.
}

// Important to stress and explain about static and dynamic HTML elements,
// As in keeping static headers/content in HTML file, and dynamically rendering only the required.
function renderBoard() {
  var strHTML = ''
  const length = Math.sqrt(gNums.length)
  for (var i = 0; i < length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < length; j++) {
      const num = gNums.pop()
      strHTML += `<td data-num="${num}" onclick="cellClicked(${num})">${num}</td>` // Data attributes is learned today, encourage the use of it.
    }
    strHTML += '</tr>'
  }
  document.querySelector('.board').innerHTML = strHTML
}

function cellClicked(clickedNum) {
  if (clickedNum !== gNextNum) return
  document.querySelector(`[data-num="${clickedNum}"`).classList.add('clicked') // Make sure classes are preferred instead of direct style-sheet editing, where it's not a must.
  if (clickedNum === 1) startStopwatch()
  else if (clickedNum === gLevel) {
    clearInterval(gInterval)
    document.querySelector('.next-num').innerText = '😁'
    return
  }
  gNextNum++
  document.querySelector('.next-num').innerText = gNextNum
}

function startStopwatch() {
  var startTime = Date.now()
  gInterval = setInterval(function () {
    const elapsedTime = (Date.now() - startTime) / 1000
    document.querySelector('.stopwatch').innerText = elapsedTime.toFixed(3)
  })
}

function changeLevel(level = 16) {
  gLevel = level
  init()
}

function resetNums() {
  const nums = []
  for (var i = 0; i < gLevel; i++) {
    nums.push(i + 1)
  }
  return nums
}

// Possible to use native sort() with a custom function, though the following algorithm is better at proper randomizing.
function shuffle(items) {
  for (var i = items.length - 1; i > 0; i--) {
    const randIdx = getRandomInt(0, items.length - 1)
    const temp = items[i]
    items[i] = items[randIdx]
    items[randIdx] = temp
  }
  return items
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
