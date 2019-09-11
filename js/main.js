const stageH = 500;
const stageW = stageH * .8;
const scale = 2;
const brickArray = [
  [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  [
    [1, 1],
    [1, 1]
  ],
];

class Stage {
  constructor () {
    this.init();
    this.renderMainBoard();
    this.renderHoldBoard();
    this.renderBulletBoard();
    this.renderNextBoard();
    this.renderScoreBoard();
  }

  init () {
    this.container = document.getElementById('stage');
    this.canvasEl = document.createElement('canvas');
    this.canvasEl.width = stageW * scale;
    this.canvasEl.height = stageH * scale;
    this.canvasEl.style.width = stageW + 'px';
    this.canvasEl.style.height = stageH + 'px';
    this.canvasEl.style.backgroundColor = '#1ee4c7';
    this.container.append(this.canvasEl);
    this.ctx = this.canvasEl.getContext('2d');
    this.ctx.scale(scale, scale);
  }
  
  renderMainBoard () {
    const { ctx } = this;
    const boardH = this.boardH = stageH;
    const boardW = this.boardW = boardH * (10 / 20);
    const boardX = this.boardX = (stageW - boardW) / 2;
    const bgColor = 'hsla(0 , 0%, 10%, 1)';
    const gridColor = 'hsla(0 , 0%, 24%, 1)';

    // render bg
    ctx.fillStyle = bgColor;
    ctx.fillRect(boardX, 0, boardW, boardH);

    // draw horizontal
    const gapH = boardH / 20;
    for (let i = 1; i < 20; i++) {
      drawLine(ctx, {
        lineWidth: 1,
        strokeStyle: gridColor,
        from: {
          x: boardX,
          y: gapH * i
        },
        to: {
          x: boardW + boardX,
          y: gapH * i
        }
      });
    }
    // draw vertical
    const gapW = boardW / 10;
    for (let i = 1; i < 10; i++) {
      drawLine(ctx, {
        lineWidth: 1,
        strokeStyle: gridColor,
        from: {
          x: gapW * i + boardX,
          y: 0
        },
        to: {
          x: gapW * i + boardX,
          y: boardH
        }
      });
    }
  }

  renderHoldBoard () {
    const { ctx } = this;

    ctx.fillStyle = 'hsla(0 , 0%, 10%, 1)';
    ctx.font='14px Arial';
    ctx.fillText('HOLD', 20, 20);
    ctx.beginPath();
    ctx.moveTo(7, 30);
    ctx.lineTo(7 + 62, 30);
    ctx.lineTo(7 + 62, 100);
    ctx.lineTo(7, 100);
    ctx.fill();
    ctx.closePath();
  }

  renderBulletBoard () {
    const { ctx } = this;

    ctx.fillStyle = 'hsla(0 , 0%, 10%, 1)';
    ctx.beginPath();
    ctx.moveTo(36, 106);
    ctx.lineTo(36 + 33, 106);
    ctx.lineTo(36 + 33, 495);
    ctx.lineTo(36, 495);
    ctx.fill();
    ctx.closePath();
  }

  renderNextBoard () {
    const { ctx } = this;

    ctx.fillStyle = 'hsla(0 , 0%, 10%, 1)';
    ctx.font='14px Arial';
    ctx.fillText('NEXT', this.boardX + this.boardW + 20, 20);
    ctx.beginPath();
    ctx.moveTo(this.boardX + this.boardW + 6, 30);
    ctx.lineTo(this.boardX + this.boardW + 6 + 62, 30);
    ctx.lineTo(this.boardX + this.boardW + 6 + 62, 300);
    ctx.lineTo(this.boardX + this.boardW + 6, 300);
    ctx.fill();
    ctx.closePath();
  }

  renderScoreBoard () {
    const { ctx } = this;

    ctx.fillStyle = 'hsla(0 , 0%, 10%, 1)';
    ctx.font='14px Arial';
    ctx.fillText('SCORE', this.boardX + this.boardW + 12, 330);
    ctx.beginPath();
    ctx.moveTo(this.boardX + this.boardW + 6, 340);
    ctx.lineTo(this.boardX + this.boardW + 6 + 62, 340);
    ctx.lineTo(this.boardX + this.boardW + 6 + 62, 495);
    ctx.lineTo(this.boardX + this.boardW + 6, 495);
    ctx.fill();
    ctx.closePath();
  }

  renderBricks (matrix) {
    const { ctx } = this;
    const rectW = this.boardW / 10;

    for (let i = 0, lenH = matrix.length; i < lenH; i++) {
      for (let j = 0, lenW = matrix[i].length; j < lenW; j++) {
        if (matrix[i][j] !== 0) {
          ctx.fillStyle = 'red';
          const pos = {
            x: this.boardX + rectW * j,
            y: rectW * i
          };
          ctx.fillRect(pos.x, pos.y, rectW, rectW);
        }
      }
    }
  }

  clear () {
    this.ctx.clearRect(0, 0, stageW, stageH);
    this.renderMainBoard();
    this.renderHoldBoard();
    this.renderBulletBoard();
    this.renderNextBoard();
    this.renderScoreBoard();
  }

  refresh (matrix) {
    this.clear();
    this.renderBricks(matrix);
  }
}

class Brick {
  constructor (opts) {
    this.game = opts.game;
    this.ctx = opts.ctx;
    this.type = opts.type;
    this.matrix = _.cloneDeep(brickArray[this.type]);
    this.matrix0 = _.cloneDeep(brickArray[this.type]);
    console.log(this.matrix, this.matrix0)
    this.lenH = this.matrix.length;
    this.lenW = this.matrix[0].length;
    this.originalDots = [];
    this.dots = [];
    this.dots0 = [];
    this.pos0 = {
      x: 3,
      y: -2
    };
    this.pos = {
      x: 3,
      y: -2
    }
    this.pos0.x = this.pos.x;
    this.pos0.y = this.pos.y;
    this.status = {
      reachBottom: false,
      reachTop: true,
      reachLeft: false,
      reachRight: false,
    };
    console.log('init', this, this.type, this.matrix);
    this.updateSolidDot();
    this.updateCollisionBounds();
  }

  move (direction) {
    switch (direction) {
      case 'down':
        if (this.boundV.max < 19 && !this.status.reachBottom) {
          this.pos0.x = this.pos.x;
          this.pos0.y = this.pos.y;
          this.pos.y++;
          this.updateSolidDot();
        } else {
          this.game.settle();
        }
        break;
      case 'up':
        if (this.boundV.max < 19) {
          this.pos0.x = this.pos.x;
          this.pos0.y = this.pos.y;
          this.pos.y = 19 - this.boundHOrigin.max;
          this.updateSolidDot();
          this.game.settle()
        }
        break;
      case 'left':
        if (!this.status.reachLeft) {
          this.pos0.x = this.pos.x;
          this.pos0.y = this.pos.y;
          this.pos.x--;
          this.updateSolidDot();
        }
        break;
      case 'right':
        if (!this.status.reachRight) {
          this.pos0.x = this.pos.x;
          this.pos0.y = this.pos.y;
          this.pos.x++;
          this.updateSolidDot();
        }
        break;
      default:
        break;
    }
  }

  rotate () {
    // let matrix0Cache = cloneDeep(this.matrix0);
    let newMatrix = [];
    for (let i = 0; i < this.lenH; i++) {
      newMatrix.push(new Array(this.lenH).fill(0));
    }
    let last = this.lenH - 1;
    for (let i = 0; i < this.lenW; i++) {
      for (let j = 0; j < this.lenH; j++) {
        newMatrix[last - j][i] = this.matrix[i][j];
        this.matrix0[i][j] = this.matrix[i][j];
      }
    }
    this.matrix = newMatrix;
    this.updateCollisionBounds();
    this.updateSolidDot();
  }

  updateSolidDot (lazy) {
    let dotsX = [];
    let dotsY = [];
    let originalDotsX = [];
    let originalDotsY = [];
    this.originalDots = [];
    if (!lazy) {
      this.dots0 = [...this.dots];
    }
    this.dots = [];
    for (let i = 0; i < this.lenW; i++) {
      for (let j = 0; j < this.lenH; j++) {
        if (this.matrix[i][j] !== 0) {
          this.originalDots.push([i, j]);
          this.dots.push([this.pos.y + i, this.pos.x + j]);
          dotsX.push(this.pos.x + j);
          dotsY.push(this.pos.y + i);
          originalDotsX.push(j);
          originalDotsY.push(i);
        }
      }
    }
    this.boundH = {
      min: Math.min(...dotsX),
      max: Math.max(...dotsX)
    }
    this.boundV = {
      min: Math.min(...dotsY),
      max: Math.max(...dotsY)
    }
    this.boundHOrigin = {
      min: Math.min(...originalDotsY),
      max: Math.max(...originalDotsY)
    }
    this.boundVOrigin = {
      min: Math.min(...originalDotsX),
      max: Math.max(...originalDotsX)
    }

    if (this.boundH.min < 0) {
      this.pos.x += (0 - this.boundH.min);
      this.updateSolidDot(true);
      return;
    }

    if (this.boundH.max >= 10) {
      this.pos.x -= (this.boundH.max - 9);
      this.updateSolidDot(true);
      return;
    }

    this.game.update();
    this.detectCollision();
  }

  updateCollisionBounds () {
    this.collisionBounds = {
      up: [],
      bottom: [],
      left : [],
      right: []
    }
    this.originalDots.forEach(dot => {
      if (this.matrix[dot[0] - 1] && this.matrix[dot[0] - 1][dot[1]] === 0) {
        this.collisionBounds.up.push(dot);
      }
      if (this.matrix[dot[0] + 1] && this.matrix[dot[0] + 1][dot[1]] === 0) {
        this.collisionBounds.bottom.push(dot);
      }
      if (this.matrix[dot[0]][dot[1] - 1] === 0 || dot[1] === 0) {
        this.collisionBounds.left.push(dot);
      }
      if (this.matrix[dot[0]][dot[1] + 1] === 0 || dot[1] === this.lenW - 1) {
        this.collisionBounds.right.push(dot);
      }
    })
    this.colliBoundsNeedUpdate = false;
    console.log(this.collisionBounds)
  }

  detectCollision () {
    if (!this.collisionBounds) {
      return;
    }
    this.status.reachBottom = false;
    this.status.reachLeft = false;
    this.status.reachRight = false;

    for (let i = 0, len = this.collisionBounds.bottom.length; i < len; i++) {
      const originalDot = this.collisionBounds.bottom[i];
      const dot = [originalDot[0] + this.pos.y, originalDot[1] + this.pos.x];
      if (this.game.matrix[dot[0] + 1] !== undefined && this.game.matrix[dot[0] + 1][dot[1]] === 0) {
        continue;
      } else {
        console.log('detect reach bottom!!');
        this.status.reachBottom = true;
        break;
      }
    }

    for (let i = 0, len = this.collisionBounds.left.length; i < len; i++) {
      const originalDot = this.collisionBounds.left[i];
      const dot = [originalDot[0] + this.pos.y, originalDot[1] + this.pos.x];
      if (this.game.matrix[dot[0]] !== undefined) {
        if (this.game.matrix[dot[0]][dot[1] - 1] === 0) {
          continue;
        } else {
          console.log('detect reach left!!');
          this.status.reachLeft = true;
          break;
        }
      } else {
        console.log('detect reach left!!');
        this.status.reachLeft = true;
        break;
      }
    }
    console.log(this.collisionBounds)

    for (let i = 0, len = this.collisionBounds.right.length; i < len; i++) {
      const originalDot = this.collisionBounds.right[i];
      let dot = [originalDot[0] + this.pos.y, originalDot[1] + this.pos.x];
      if (this.game.matrix[dot[0]] !== undefined) {
        if (this.game.matrix[dot[0]][dot[1] + 1] === 0) {
          continue;
        } else {
          console.log('detect reach right!!');
          this.status.reachRight = true;
          break;
        }
      } else {
        console.log('detect reach right!!');
        this.status.reachRight = true;
        break;
      }
    }

    console.log('detectCollision', this.status);
  }
}

class Game {
  constructor () {
    this.matrix = [];
    for (let i = 0; i < 20; i++) {
      this.matrix.push(new Array(10).fill(0));
    }

    this.stage = new Stage();
    this.controller = new Controller({
      game: this
    });

    this.brickMoving = new Brick({
      game: this,
      ctx: this.stage.ctx,
      type: 0
    });

    this.time = new Date().getTime();
    window.requestAnimationFrame(this.tick.bind(this));
  }

  tick () {
    const now = new Date().getTime();
    if (now - this.time > 1000) {
      if (this.brickMoving) {
        this.brickMoving.move('down');
      }
      this.time = now;
    }
    window.requestAnimationFrame(this.tick.bind(this));
  }
  
  update () {
    if (this.brickMoving) {
      this.brickMoving.dots0.forEach(item => {
        if (this.matrix[item[0]]) {
          this.matrix[item[0]][item[1]] = 0;
        }
      });
      this.brickMoving.dots.forEach(item => {
        if (this.matrix[item[0]]) {
          this.matrix[item[0]][item[1]] = 1;
        }
      });
    }

    // console.table(this.matrix);
    this.stage.refresh(this.matrix);
  }

  settle () {
    // settle bricks
    this.matrix.forEach(row => {
      row.forEach((dot, index) => {
        if (row[index] !== 0) {
          row[index] = 2; 
        }
      })
    })

    // create new brick
    this.brickMoving = null;
    this.brickMoving = new Brick({
      game: this,
      ctx: this.stage.ctx,
      type: 0
    });
  }
}

class Controller {
  constructor (opts) {
    this.game = opts.game;

    this.init();
  }
  
  init () {
    document.onkeydown = (event) => {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode === 38 || e.keyCode === 87) {
        this.game.brickMoving.move('up');
      }
      if (e && e.keyCode === 39 || e.keyCode === 68) {
        this.game.brickMoving.move('right');
      }
      if (e && e.keyCode === 37 || e.keyCode === 65) {
        this.game.brickMoving.move('left');
      }
      if (e && e.keyCode === 32) {
        this.game.brickMoving.rotate();
      }
    };
  }
}

const game = new Game();

function drawLine (ctx, opts) {
  ctx.lineWidth = opts.lineWidth || 1;
  ctx.strokeStyle = opts.strokeStyle || 'red';
  ctx.moveTo(opts.from.x, opts.from.y);
  ctx.lineTo(opts.to.x, opts.to.y);
  ctx.stroke();
}

// utils
function sumArr (arr){
  return arr.reduce(function(prev, cur){
      return prev + cur;
  },0);
}

function cloneDeep (value) {
  let result;
  const isArr = Array.isArray(value);

  if (isArr) {
    result = initCloneArray(value)
  }

  value.forEach((subValue, key) => {
    result[key] = subValue;
  })
  return result;
}

function initCloneArray (array) {
  const { length } = array
  const result = new array.constructor(length)

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index
    result.input = array.input
  }
  return result
}
