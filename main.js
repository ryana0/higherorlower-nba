const start = document.querySelector('#start')
const imgLeft = document.querySelector('#img1')
const imgRight = document.querySelector('#img2')
let title = document.querySelector('#title')
let secndTitle = document.querySelector('#secndTitle')
let wallcover = document.querySelector('#wallcover')
const score = document.querySelector('#score')
start.addEventListener('click', () => {
    title.classList.add('fly-away')
    secndTitle.classList.add('fly-away')
    start.classList.add('fly-away')
    wallcover.classList.add('fly-away')
    score.classList.add('fly-away')
    imgLeft.classList.add('fade-in')
    imgRight.classList.add('fade-in')
    document.querySelector('#smallTitle').classList.add('fade-full')
    document.querySelector('#guess').style.display = 'grid'
    loadInit()
    

    setTimeout(() => {
        title.style.display = 'none'
        secndTitle.style.display = 'none'
        start.style.display = 'none'
        wallcover.style.display = 'none'
    }, 750);
    document.querySelector('#count').textContent = '0'
})

function randomPlayer() {
    return fetch('data.json')
    .then(res => res.json())
    .then(data => {
        return data[Math.round(Math.random() * 75)]
    })
    .catch(err => console.log(err))
}

const player1Name = document.querySelector('#player1Name')
const points1 = document.querySelector('#points1')
const player2Name = document.querySelector('#player2Name')
const points2 = document.querySelector('#points2')

function loadInit() {
    randomPlayer().then(data => {
        imgLeft.style.display = 'block'
        imgLeft.src = data.url
        let name = data.player
        name = name.split('-')
        name = name.join(' ')
        player1Name.textContent = name
        points1.textContent = data.points.toLocaleString()
    })
    randomPlayer().then(data => {
        if(data.player == player1Name.textContent) {
            randomPlayer().then(data => {
                imgRight.style.display = 'block'
                imgRight.src = data.url
                let name = data.player
                name = name.split('-')
                name = name.join(' ')
                player2Name.textContent = name
                points2.setAttribute('data-points', data.points.toLocaleString())
                points2.textContent = '???'
            })
                
        }
        imgRight.style.display = 'block'
        imgRight.src = data.url
        let name = data.player
        name = name.split('-')
        name = name.join(' ')
        player2Name.textContent = name
        points2.setAttribute('data-points', data.points.toLocaleString())
        points2.textContent = '???'
    })
}

const checkmark = document.querySelector('#correct')


function roundWin() {
    player1Name.textContent = player2Name.textContent
    imgLeft.src = imgRight.src
    points1.textContent = points2.getAttribute('data-points')
    randomPlayer().then(data => {
        if(data.player == player1Name.textContent) {
            randomPlayer().then(data => {
                imgRight.src = data.url
                let name = data.player
                name = name.split('-')
                name = name.join(' ')
                player2Name.textContent = name
                points2.setAttribute('data-points', data.points.toLocaleString())
                points2.textContent = '???'
            })
                
        }
        imgRight.src = data.url
        let name = data.player
        name = name.split('-')
        name = name.join(' ')
        player2Name.textContent = name
        points2.setAttribute('data-points', data.points.toLocaleString())
        points2.textContent = '???'
    })
    checkmark.style.clipPath = 'circle(100%)'
    setTimeout(() => {
        checkmark.style.clipPath = 'circle(0%)'
    }, 500);
    document.querySelector('#count').textContent = parseFloat(document.querySelector('#count').textContent) + 1
}

function roundLose() {
    title.style.display = 'inline-block'
    title.classList.remove('fly-away')
    secndTitle.style.display = 'inline-block'
    secndTitle.classList.remove('fly-away')
    wallcover.style.display = 'inline-block'
    wallcover.classList.remove('fly-away')
    start.style.display = 'grid'
    start.classList.remove('fly-away')
    document.querySelector('#smallTitle').classList.remove('fade-full')
    imgLeft.style.display = 'none'
    imgRight.style.display = 'none'
    points1.textContent = ''
    points2.textContent = ''
    player1Name.textContent = ''
    player2Name.textContent = ''
    if(parseFloat(document.querySelector('#count').textContent) > score.getAttribute('data-hs')) {
        score.setAttribute('data-hs', parseFloat(document.querySelector('#count').textContent))
        score.textContent = 'High-Score: ' + parseFloat(document.querySelector('#count').textContent)
    }
    score.classList.remove('fly-away')
    score.style.display = 'inline-block'
    document.querySelector('#guess').style.display = 'none'
}

const higher = document.querySelector('#higher') 
const lower = document.querySelector('#lower')
higher.addEventListener('click', () => {
    const playerPoints1 = points1.textContent
    const playerPoints2 = points2.getAttribute('data-points')
    if(playerPoints1 < playerPoints2) {
        roundWin()
    } else {
        roundLose()
    }
    console.log(playerPoints1, playerPoints2, playerPoints1 > playerPoints2)
})

lower.addEventListener('click', () => {
    const playerPoints1 = points1.textContent
    const playerPoints2 = points2.getAttribute('data-points')
    if(playerPoints1 > playerPoints2) {
        roundWin()
    } else {
        roundLose()
    }
    console.log(playerPoints1, playerPoints2, playerPoints1 > playerPoints2)
})