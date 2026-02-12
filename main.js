let playerHP = 30;
let enemyHP = 0;
let enemyMaxHP = 0;
let inBattle = false;
let storyStep = 0;

const log = document.getElementById("log");
const nextBtn = document.getElementById("nextBtn");
const attackBtn = document.getElementById("attackBtn");
const runBtn = document.getElementById("runBtn");

const playerHPText = document.getElementById("playerHPText");
const playerHPBar = document.getElementById("playerHPBar");

const enemyStatus = document.getElementById("enemyStatus");
const enemyHPText = document.getElementById("enemyHPText");
const enemyHPBar = document.getElementById("enemyHPBar");

function writeLog(text) {
    log.textContent += text + "\n";
    log.scrollTop = log.scrollHeight;
}

function clearLog() {
    log.textContent = "";
}

function updateHPBars() {
    // プレイヤー
    playerHPText.textContent = playerHP;
    const playerPercent = Math.max(playerHP / 30, 0);
    playerHPBar.style.width = (playerPercent * 100) + "%";

    // 敵
    enemyHPText.textContent = enemyHP;
    const enemyPercent = Math.max(enemyHP / enemyMaxHP, 0);
    enemyHPBar.style.width = (enemyPercent * 100) + "%";
}

// ストーリー進行
function nextStory() {
    clearLog();
    inBattle = false;
    attackBtn.disabled = true;
    runBtn.disabled = true;

    switch (storyStep) {
        case 0:
            writeLog("──暗闇の中、誰かの声が聞こえる。");
            writeLog("「起きろ……まだ終わっていない……」");
            writeLog("あなたは飛び起きた。外から叫び声が聞こえる。");
            writeLog("幼馴染のリオが駆け込んでくる。");
            writeLog("リオ:「お、おい！ 外に……変なのがいる！」");
            writeLog("敵があらわれた！");
            startBattle(1);
            break;

        case 1:
            writeLog("リオ:「お前……なんでそんなに強いんだよ……？」");
            writeLog("村長:「……また“災厄”が近づいているのか」");
            writeLog("村長は何かを隠しているようだ。");
            break;

        case 2:
            writeLog("村長の家に呼ばれた。");
            writeLog("村長:「お前は赤ん坊の頃、村の外で倒れていた」");
            writeLog("村長:「お前は“拾い子”だ。それ以上は……言えん」");
            writeLog("リオ:「どんな過去があっても、俺はお前の味方だよ」");
            break;

        case 3:
            writeLog("その夜、あなたは“白い部屋”の夢を見る……");
            writeLog("白い部屋。白衣の男が立っている。");
            writeLog("白衣の男:「……完成体……起動……」");
            writeLog("胸が焼けるように熱くなり、あなたは目を覚ました。");
            break;

        case 4:
            writeLog("翌朝。リオと外で会う。");
            writeLog("リオ:「昨日のお前……本当に怖かった」");
            writeLog("リオ:「でも……俺はお前の味方でいたい」");
            break;

        case 5:
            writeLog("村の外れから、不気味な叫び声が響く。");
            writeLog("2体目のアダプトが現れた！");
            startBattle(2);
            break;

        default:
            writeLog("ストーリーはここまで（プロトタイプ）。");
    }

    storyStep++;
}

// 戦闘開始
function startBattle(enemyType) {
    inBattle = true;
    attackBtn.disabled = false;
    runBtn.disabled = false;

    if (enemyType === 1) {
        enemyHP = 15;
    } else if (enemyType === 2) {
        enemyHP = 30;
    }

    enemyMaxHP = enemyHP;
    enemyStatus.style.display = "block";
    updateHPBars();
}

// 敵ターン
function enemyTurn() {
    if (!inBattle) return;
    const dmg = Math.floor(Math.random() * 5) + 2;
    playerHP -= dmg;
    writeLog(`敵の攻撃！ あなたは${dmg}のダメージを受けた！（HP: ${playerHP}）`);
    updateHPBars();

    if (playerHP <= 0) {
        writeLog("あなたは倒れてしまった……");
        attackBtn.disabled = true;
        runBtn.disabled = true;
        inBattle = false;
    }
}

// プレイヤー攻撃
attackBtn.onclick = () => {
    if (!inBattle) return;
    const dmg = Math.floor(Math.random() * 6) + 3;
    enemyHP -= dmg;
    writeLog(`あなたの攻撃！ 敵に${dmg}のダメージ！（敵HP: ${enemyHP}）`);
    updateHPBars();

    if (enemyHP <= 0) {
        writeLog("敵を倒した！");
        attackBtn.disabled = true;
        runBtn.disabled = true;
        inBattle = false;

        setTimeout(() => {
            nextStory();
        }, 800);
        return;
    }

    enemyTurn();
};

// 逃げる
runBtn.onclick = () => {
    if (!inBattle) return;
    const success = Math.random() < 0.5;
    if (success) {
        writeLog("あなたは逃げ出した！");
        attackBtn.disabled = true;
        runBtn.disabled = true;
        inBattle = false;
        setTimeout(() => {
            nextStory();
        }, 800);
    } else {
        writeLog("逃げられなかった！");
        enemyTurn();
    }
};

// 次へ進む
nextBtn.onclick = () => {
    if (inBattle) return;
    nextStory();
};

// 起動時
writeLog("【ダークRPG プロトタイプ】");
writeLog("「次へ進む」を押して物語を始めよう。");