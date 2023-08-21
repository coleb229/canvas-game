const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2

// creates a class for the player/enemy
class Sprite {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.height = 150
    this.lastkey
  }

  draw() {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.position.x, this.position.y, 50, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity
    }
  }
}

//initializes the player
const player = new Sprite({
  position: {
    x: 100,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
})

//initializes the enemy
const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
})

console.log(player)

// creates pressed property for keys to smooth movement
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
}

let lastkey

// mainloop for the game
function animate() {
  window.requestAnimationFrame(animate)
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0

  //player movement
  if (keys.a.pressed && lastkey === 'a') {
    player.velocity.x = -1
  } else if (keys.d.pressed && lastkey === 'd') {
    player.velocity.x = 1
  }

  enemy.velocity.x = 0

  //enemy movement
  if (keys.left.pressed && enemy.lastkey === 'left') {
    enemy.velocity.x = -1
  } else if (keys.right.pressed && enemy.lastkey === 'right') {
    enemy.velocity.x = 1
  }
}

animate()

// listens for keypresses
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      lastkey = 'd'
      break
    case 'a':
      keys.a.pressed = true
      lastkey = 'a'
      break
    case 'w':
      player.velocity.y = -10
      break

    case 'ArrowRight':
      keys.right.pressed = true
      enemy.lastkey = 'right'
      break
    case 'ArrowLeft':
      keys.left.pressed = true
      enemy.lastkey = 'left'
      break
    case 'ArrowUp':
      enemy.velocity.y = -10
      break
  }
  console.log(event.key)
})

// listens for key releases
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break

    // enemy
    case 'ArrowRight':
      keys.right.pressed = false
      break
    case 'ArrowLeft':
      keys.left.pressed = false
      break
  }
  console.log(event.key)
})
