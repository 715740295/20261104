let stopSprite; // 儲存角色站立動畫的精靈圖片。
let walkSprite; // 儲存角色行走動畫的精靈圖片。
let characterX; // 儲存角色目前在畫布上的水平位置。
let facingDirection = 1; // 設定角色初始朝向右方。
const STOP_FRAME_COUNT = 5; // 設定站立精靈圖的影格數量。
const WALK_FRAME_COUNT = 8; // 設定行走精靈圖的影格數量。
const FRAME_DURATION = 120; // 設定每張動畫影格顯示的毫秒數。
const MOVE_SPEED = 240; // 設定角色每秒移動的像素數。

function preload() { // 在建立畫布前載入角色圖片。
  stopSprite = loadImage("1/stop/stop.png"); // 載入包含五張影格的站立精靈圖。
  walkSprite = loadImage("1/walk/walk.png"); // 載入包含八張影格的行走精靈圖。
} // 結束圖片載入函式。

function setup() { // 設定畫布與角色的初始狀態。
  createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布。
  imageMode(CENTER); // 讓精靈影格以指定位置為中心繪製。
  characterX = width / 2; // 將角色初始位置放在畫布水平中央。
} // 結束初始設定函式。

function draw() { // 每個動畫影格更新角色並繪製畫面。
  background("#fefae0"); // 使用指定的淡黃色填滿背景。
  let movement = 0; // 設定本影格的水平移動方向為靜止。
  if (keyIsDown(RIGHT_ARROW)) { // 檢查使用者是否按住鍵盤右方向鍵。
    movement = 1; // 設定角色向右移動。
    facingDirection = 1; // 讓角色面向右方。
  } else if (keyIsDown(LEFT_ARROW)) { // 檢查使用者是否按住鍵盤左方向鍵。
    movement = -1; // 設定角色向左移動。
    facingDirection = -1; // 讓角色面向左方。
  } // 結束方向鍵判斷。
  const isWalking = movement !== 0; // 根據移動方向判斷是否播放行走動畫。
  const currentSprite = isWalking ? walkSprite : stopSprite; // 移動時使用行走圖，否則使用站立圖。
  const frameCount = isWalking ? WALK_FRAME_COUNT : STOP_FRAME_COUNT; // 選擇目前精靈圖的影格數量。
  const frameWidth = currentSprite.width / frameCount; // 根據圖片總寬度計算單張影格寬度。
  const frameHeight = currentSprite.height; // 使用精靈圖片的完整高度作為影格高度。
  const frameIndex = floor(millis() / FRAME_DURATION) % frameCount; // 依時間循環播放目前動畫的影格。
  characterX += movement * MOVE_SPEED * deltaTime / 1000; // 依經過時間平順地移動角色。
  characterX = constrain(characterX, frameWidth / 2, width - frameWidth / 2); // 避免角色移出畫布左右邊界。
  push(); // 暫存畫布狀態，避免角色變形影響其他繪圖。
  translate(characterX, height / 2); // 將繪圖原點移到角色目前位置與畫布垂直中央。
  scale(facingDirection, 1); // 面向左方時水平翻轉角色圖片。
  image(currentSprite, 0, 0, frameWidth, frameHeight, frameIndex * frameWidth, 0, frameWidth, frameHeight); // 繪製目前精靈圖中的單張影格。
  pop(); // 還原畫布狀態。
} // 結束每影格繪製函式。

function keyPressed() { // 在按下方向鍵時阻止瀏覽器執行預設捲動。
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) { // 確認按下的是左方向鍵或右方向鍵。
    return false; // 停止方向鍵造成的網頁預設行為。
  } // 結束方向鍵檢查。
} // 結束按鍵事件函式。

function windowResized() { // 在瀏覽器視窗尺寸改變時同步調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布繼續填滿整個瀏覽器視窗。
} // 結束視窗尺寸調整函式。
