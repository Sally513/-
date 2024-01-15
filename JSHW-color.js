
// 宣告
let startPage = document.querySelector('.startPage');
let btnStart = document.querySelector('.btnStart');
let mask = document.querySelector('.mask');
let btnGo = document.querySelector('.btnGo');
let containerPage = document.querySelector('.containerPage');
let score = document.querySelector('.score');
let timer = document.querySelector('.timer');
let btnHelp = document.querySelector('.btnHelp');
let btnStop = document.querySelector('.btnStop');
let endPage = document.querySelector('.endPage');
let showScore = document.querySelector('.showScore');
let btnAgain = document.querySelector('.btnAgain');
const boxes = document.querySelectorAll('.plate');
const plate = document.querySelector('.plate');

// 設定等級
let level = 1;
let count = 0;
let ansOpacity = 0.3;
let totalTime = 29;
let flag = true;
let timerA;


//遊戲開始介面
btnStart.addEventListener('click', function () {
    startPage.style.display = 'none';
    containerPage.style.display = 'flex';
})


//暫停按鈕點擊事件
btnStop.addEventListener('click', function () {
    mask.style.display = 'flex';
    startTimer();
    if (flag) return;
    console.log(flag);
    clearInterval(timerA);
    flag = true;
})


//繼續按鈕點擊事件
btnGo.addEventListener('click', function () {
    mask.style.display = 'none';
    startTimer();
    if (totalTime <= 0) {
        clearInterval(timerA);
    }
})


//提示按鈕點擊事件
btnHelp.addEventListener('click', function () {
    let ansBox = document.querySelector('.ans')
    ansBox.classList.add('ans-hint');
})

//遊戲結束&重來介面
btnAgain.addEventListener('click', function () {
    startPage.style.display = 'flex';
    endPage.style.display = 'none';

    score = 0;
    level = 1;
    totalTime = 30;
    addBoxes();
})




// querySelector 單一元素
// querySelectorAll 符合CSS選擇器的多個元素
// 陣列序號從0開始  所以四個方塊的索引詞是0,1,2,3
//for (let i = 0; i < 4; i++) {
//console.log(boxes[3]);
// boxes是多個box的大集合，不屬於元素，不能做(點擊事件)功能
// 所以要指定其中的box，用[i]
//boxes[i].addEventListener('click', function () {
//console.log('點到了');
//}) }

console.log(plate);
plate.addEventListener('click', function (event) {
    //點擊事件會獲得event，要自己寫變數去取得
    //console.log(event);
    //event.target 會是個元素
    //可以依據此元素是否含有box來決定要不要繼續往下執行

    if (!event.target.classList.contains('box')) return;

    //點到答案含有ans的箱子
    if (event.target.classList.contains('ans')) {
        addBoxes();
        count = count + 1;
        score.innerHTML = `得分: ${count}`;
        startTimer();
    } else {
        alert('錯了!  錯了!');
    }
    if (ansOpacity < 0.6) {
        ansOpacity += 0.08;
    }
    //% 符號代表取餘數的運算符號
    //當 count 能夠被 3 整除時，條件式的結果就是 true，否則為 false
    //如果 count 是 3 的倍數，就表示點擊的次數是 3 的倍數
    if (count % 2 === 0) {
        level++;
    }
});
//增加盒子 
addBoxes();
function addBoxes() {
    const boxCount = getBoxCount(level);
    const ansNumber = getRandomInt(boxCount, 0);
    let r = getRandomInt(220, 0);
    let g = getRandomInt(220, 0);
    let b = getRandomInt(220, 0);

    plate.innerHTML = '';

    let width = getWidth(level);

    for (let i = 0; i < boxCount; i++) {
        if (i == ansNumber) {
            plate.innerHTML +=
                `<div class="box ans" style="width: ${width}px; height: ${width}px ; opacity: ${ansOpacity}; background-color: rgb(${r}, ${g}, ${b})"></div>`;
        } else {
            plate.innerHTML +=
                `<div class="box" style="width: ${width}px; height: ${width}px ; background-color: rgb(${r}, ${g}, ${b})"></div>`;
        }
    }
}

//隨機亂數
function getRandomInt(max, min) {
    return Math.floor(Math.random() * max) + min;
};

//等級依據邊長
function getWidth(level) {
    return (570 - 15 * level) / (level + 1);
}

//取得等級依據方格數
//lv1 => 4 => 2*2
//lv2 => 9 => 3*3
//lv3 => 16 => 4*4
//lvn => (n+1)*(n+1)
function getBoxCount(level) {
    return (level + 1) * (level + 1);
}

// 計時
startTimer();
function startTimer() {
    if (!flag) return;
    timerA = setInterval(function () {
        console.log(timerA);
        if (totalTime <= 0) {
            clearInterval(timerA);
            endPage.style.display = 'flex';
            containerPage.style.display = 'none';
            showScore.innerHTML = `得分: ${count}`;
        }
        timer.textContent = `計時:${totalTime}`;
        totalTime--;
    }, 1000);
    flag = false;
}