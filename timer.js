// 設定期限為 3 月 8 日 00:00 台北時區
var deadline = new Date("2024-03-08T00:00:00+08:00").getTime();

// 更新倒計時的函數
function updateCountdown() {
  // 取得現在時間
  var now = new Date().getTime();

  // 計算剩餘時間（以毫秒為單位）
  var distance = deadline - now;

  if (distance > 0) {
    // 計算剩餘的小時、分鐘和秒數
    var remainingHours = Math.floor(distance / (1000 * 60 * 60));
    var remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);

    // 在 HTML 中顯示剩餘時間
    document.getElementById("countdown").innerHTML = "距離發售剩餘時間：" + remainingHours + " 小時 " + remainingMinutes + " 分 " + remainingSeconds + " 秒";
  } else {
    // 如果期限已到，顯示消息
    document.getElementById("countdown").innerHTML = "聖獸之王發售啦！！";
  }
}

// 每秒更新倒計時
setInterval(updateCountdown, 1000);
