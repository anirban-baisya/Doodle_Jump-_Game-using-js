  document.addEventListener('DOMContentLoaded', () =>{
      const grid= document.querySelector('.grid')
      const doodler = document.createElement('div')
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint    
    let isGameOver= false
    let platformCount = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let isJumping = true //because only the object is jump again if isJumping is false
    let isGoingLeft = false //because we starting with it
    let isGoingRight = false
    let leftTimerId
    let rightTimerId
    let score = 0


      function createDoodler() {
          grid.appendChild(doodler)
          doodler.classList.add('doodler')
          doodlerLeftSpace = platforms[0].left
          doodler.style.left= doodlerLeftSpace +'px'
          doodler.style.bottom= doodlerBottomSpace + 'px'
          
      }

      class Platform{
          constructor(newPlatBottom){
              this.bottom = newPlatBottom
              this.left = Math.random() * 315
              this.visual = document.createElement('div')

              const visual = this.visual //before create classlist we have to store it as variable
              visual.classList.add('platform')
              visual.style.left = this.left + 'px'
              visual.style.bottom = this.bottom + 'px'

              grid.appendChild(visual)
          } 
      }

      function createPlatforms(){
          for (let i = 0; i < platformCount; i++) {
              let platGap = 600 / platformCount ; // creating the gap of each bar
              let newPlatBottom = 100 + i * platGap //creating the pateform
              let newPlatform = new Platform(newPlatBottom) 
             platforms.push(newPlatform) //every time the newPlatform is pushing into the newley created array 
             console.log(platforms)
            }
      }  

      function movePlatforms() {  //we need to move the platforms if the jumpaing charct. is in the same position 
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
              platform.bottom -= 4 // we accising the platform array to move the platforms
              let visual = platform.visual
              visual.style.bottom = platform.bottom + 'px' //each platform move 4px each time
    
              if(platform.bottom < 10) {  //removing previous platform & adding new one
                let firstPlatform = platforms[0].visual
                firstPlatform.classList.remove('platform')
                platforms.shift() // removing the element fom the platforms array
                console.log(platforms)
                score++
                let newPlatform = new Platform(600) //add new plat. ; previous platform is dezipering and new platform is creted one by one
                platforms.push(newPlatform)
              }
          }) 
        }
        
      }

      function jump() { // to jumping the object
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function () {
      //    console.log(startPoint)
        //  console.log('1', doodlerBottomSpace)
          doodlerBottomSpace += 20
          doodler.style.bottom = doodlerBottomSpace + 'px'
        //   console.log('2',doodlerBottomSpace)
        //   console.log('s',startPoint)
          if (doodlerBottomSpace > startPoint + 200) //as soon as we land any platform that gona change
           {
            fall()
        //     isJumping = false
          }
        },30) //invoking it on every 30 mili sec. 
      }

      function fall() { //object is falling down when it is reach 350 px
             isJumping = false
          clearInterval(upTimerId)
          downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0) {
              gameOver()
            }
            platforms.forEach(platform => { //if the object fall in any platform it jump again
              if (
                (doodlerBottomSpace >= platform.bottom) &&
                (doodlerBottomSpace <= (platform.bottom + 15)) &&
                ((doodlerLeftSpace + 60) >= platform.left) && 
                (doodlerLeftSpace <= (platform.left + 85)) &&
                !isJumping
                ) {
                 // console.log('tick')
                 console.log('landed') //object is landed on platform or not

                 startPoint = doodlerBottomSpace // start point is over writing by each time of changing doodlerBottomSpace
                  jump()
                  console.log('start', startPoint)
            //       isJumping = true
               }
             })
      
          },20)
      }

      function gameOver() {
          console.log('game over')
        isGameOver = true
        while (grid.firstChild) {
          console.log('remove')
          grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
      }


      //assign functions to keyCodes
  function control(e) {
    doodler.style.bottom = doodlerBottomSpace + 'px'
    if(e.key === 'ArrowLeft') { 
      moveLeft()
    } else if (e.key === 'ArrowRight') {
      moveRight()
    } else if (e.key === 'ArrowUp') {
      moveStraight()
    }
  }

  function moveLeft() {
    if (isGoingRight) {
        clearInterval(rightTimerId) ////because we have to clear rightTimerId other wise is giving error
        isGoingRight = false
    }
    isGoingLeft = true
    leftTimerId = setInterval(function () {
        if (doodlerLeftSpace >= 0) {  //because the object going out of the screen
          console.log('going left')
          doodlerLeftSpace -=5
           doodler.style.left = doodlerLeftSpace + 'px'
        } else moveRight()
    },20)
  }

  function moveRight() {
    if (isGoingLeft) {
        clearInterval(leftTimerId) //because we have to clear leftTimerId other wise is giving error
        isGoingLeft = false
    }
    isGoingRight = true
    rightTimerId = setInterval(function () {
      //changed to 313 to fit doodle image
      if (doodlerLeftSpace <= 313) {
        console.log('going right')
        doodlerLeftSpace +=5
        doodler.style.left = doodlerLeftSpace + 'px'
      } else moveLeft()
    },20)
  }
  
  function moveStraight() {
    isGoingLeft = false
    isGoingRight = false
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
  }



    function start() {
        if(!isGameOver){ //if(isGameOver == false)
            createPlatforms()//where the object is jump
            createDoodler()
            setInterval(movePlatforms,30) //plat forms are move or desepair on every 30 mili sec.
            jump() //startPoint)
            document.addEventListener('keyup', control) //add event/activety by pressing keyup ; we invoking keyup each time
    }
}
    start()
    
    })

