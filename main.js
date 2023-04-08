const start = document.querySelector('#start')
const imgLeft = document.querySelector('#img1')
const imgRight = document.querySelector('#img2')
start.addEventListener('click', () => {
    let title = document.querySelector('#title')
    let secndTitle = document.querySelector('#secndTitle')
    let wallcover = document.querySelector('#wallcover')
    title.classList.add('fly-away')
    secndTitle.classList.add('fly-away')
    start.classList.add('fly-away')
    wallcover.classList.add('fly-away')
    imgLeft.classList.add('fade-in')
    imgRight.classList.add('fade-in')
    document.querySelector('#smallTitle').classList.add('fade-full')
    loadInit()
    

    setTimeout(() => {
        title.remove()
        secndTitle.remove()
        start.remove()
        wallcover.remove()
    }, 750);
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
        imgLeft.src = data.url
        let name = data.player
        name = name.split('-')
        name = name.join(' ')
        player1Name.textContent = name
        points1.textContent = data.points.toLocaleString()
    })
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