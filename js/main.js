// Song's data
const songList = [
    {
        title: "Hardstyle track storm",
        file: "[Hardcore] - Stonebank - Stronger (feat. EMEL) [Monstercat Release].mp3",
        cover: "artworks-YNI0TA4r7ixczgFg-RUE3ng-t500x500(gray).jpg"
    },
    {
        title: "90s boombap instrumental",
        file: "1997 _ 90s Old School Boom Bap Freestyle Rap Type Beat.mp3",
        cover: "artworks-YNI0TA4r7ixczgFg-RUE3ng-t500x500.jpg"
    },
    {
        title: "To the starts",
        file: "Horyzon - To The Stars.mp3",
        cover: "artworks-YNI0TA4r7ixczgFg-RUE3ng-t500x500(bintage-orange).jpg"
    },
    {
        title: "House techtonic",
        file: "Nicky Romero - Toulouse.mp3",
        cover: "artworks-YNI0TA4r7ixczgFg-RUE3ng-t500x500(yellow).jpg"
    },
]

// Catchs dom's elements
const songs = document.getElementById("songsList")
const cover = document.getElementById("cover")
const audio = document.getElementById("audio")
const prev = document.getElementById("prev")
const play = document.getElementById("play")
const next = document.getElementById("next")
const progressContainer = document.getElementById("progress-container")
const progress = document.getElementById("progress")
const title = document.getElementById("title")
const volumeProgressContainer = document.getElementById("volume-progress-container")
const volumeProgress = document.getElementById("volume-progress")
const fullVolume = document.getElementById("full-volume")
const mute = document.getElementById("mute")

let actualSong = null

//( Listens pause or play song ) && ( play fisrt )
play.addEventListener("click", () => {
    //if( ( audio.paused ) && ( cover.src === "./img/default-cover.jpg" ) ){
      //  playFirst()
    //}else 
    if(audio.paused){
        playSong()
    }else{
        pauseSong()
    }
})

// Listen mute
mute.addEventListener("click", () => muteVolume())

// Listen full volume
fullVolume.addEventListener("click", () => fullVolumeFunction())

// Listen next and previous song
next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

// Listen progress title and update song
progressContainer.addEventListener("click", setProgress)
audio.addEventListener("timeupdate", updateProgress)

// Listen progress and previous song
volumeProgressContainer.addEventListener("click", setVolume)
audio.addEventListener("volumechange", updateVolume)

//Set progress volume duration
function setVolume(event){
    //console.log(event)
    let progressVolume = event.offsetX
    let totalVolume = (this.offsetWidth)
    let currentVolume = ( progressVolume * 1 ) / totalVolume 

    audio.volume = currentVolume
}

// Mute
function muteVolume(){
    audio.volume = 0;
}

// Full volume
function fullVolumeFunction(){
    audio.volume = 1;
}

// Update progress
function updateVolume(event){
    console.log(event)
    console.log(audio.volume)
    let currentProgressVolume = (audio.volume * 100) / 1
    console.log(currentProgressVolume)

    volumeProgress.style.width = currentProgressVolume + "%"
}

// Set progress frunciton
function setProgress(event){
    let progressAudio = event.offsetX // Click
    let totalAudio = (this.offsetWidth)
    let currentAudio = (progressAudio * audio.duration) / totalAudio
    audio.currentTime = currentAudio
} 

// Update progress
function updateProgress(event){
    let {duration, currentTime} = event.srcElement

    let progressPercentClicked = (currentTime * 100) / duration

    progress.style.width = progressPercentClicked + "%"
    //console.log(progress.style.width)
}

// Load songs
function loadSongs(){
    // Creas elementos en lista
    songList.forEach((song,index) => {
        // Creamos li
        const li = document.createElement("li")
        // Creamos a
        const a = document.createElement("a")
        // Hidratamos a
        a.textContent = song.title
        a.href = "#"
        // Escuchar a
        a.addEventListener("click", () => loadSong(index))
        // Agregar a a li
        li.appendChild(a)
        // Agregar li a ul
        songs.append(li)
    })
}

// Load selected song
function loadSong(songIndex){
    if(songIndex !== actualSong){ //---- Verificar que no este nulo
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex

        // Change title
        changeTitle(songIndex)

        // Turn on song
        audio.src = "./audio/" + songList[songIndex].file
        audio.play()
        console.log(audio.src)

        // Change cover
        changeCover(songIndex)

        // Update controls
        updateControls()
    }
}

// Change cover
function changeActiveClass(lastIndex, newIndex){
    const a = document.querySelectorAll("a")
    if(lastIndex !== null){
        a[lastIndex].classList.remove("activated")
    }
    
    if(!a[newIndex].classList.contains("activated")){
        a[newIndex].className += " activated"
    }
}

//Update controls function
function updateControls(){
    if(audio.paused){
        play.classList.add("fa-play")
        play.classList.remove("fa-pause")
    }else{
        play.classList.remove("fa-play")
        play.classList.add("fa-pause")
    }
}

// Previous song
function prevSong(){
    if(actualSong <= 0 ){
        loadSong(songList.length - 1)
    }else{
        loadSong(actualSong - 1)
    }
    updateControls()
}

// Play song
function playSong(){
    console.log(cover.src)
    if( (audio.paused) && (cover.src === "file:///C:/Users/PC/Desktop/projects/Music%20player%20project%20-%20Copy/img/default-cover.jpg") ){
        playFirst()
    }else if((audio.paused) && (cover.src === "http://127.0.0.1:5501/img/default-cover.jpg")){
        playFirst()
    }else{
        audio.play()
        updateControls()
    }
}

// Pause song
function pauseSong(){
    audio.pause()
    updateControls()
}

// Next song
function nextSong(){
    if(actualSong === songList.length-1){
        loadSong(0)
    }else{
        loadSong(actualSong + 1)
    }
    updateControls()
}

// Change cover
function changeCover(songIndex){
    cover.src = "./img/" +songList[songIndex].cover
}

// Title's change
function changeTitle(songIndex){
    title.innerHTML = songList[songIndex].title
}

// Play first
function playFirst(){
    console.log( "Play first" )
    if((audio.paused) && (cover.src === ("http://127.0.0.1:5501/img/default-cover.jpg"))){
        loadSong(0)
    }else if(( audio.paused ) && (cover.src === ("file:///C:/Users/PC/Desktop/projects/Music%20player%20project%20-%20Copy/img/default-cover.jpg"))){
        loadSong(0)
    }
}

// GO !
loadSongs()
audio.addEventListener("ended", () => nextSong())//----- Solo si sucede -> "() =>"