const resultSort = ["스트라이크", "볼", "안타", "아웃"];
const resultCount = {
  "스트라이크": 0,
  "볼": 0,
  "안타": 0,
  "아웃": 0
};

function gamePlaying(){
  resultNum = Math.floor(Math.random() * 4);
  result = resultSort[resultNum];
  resultCount[result] = resultCount[result] + 1;
  console.log(`${result}!`);
  console.log(`${resultCount["스트라이크"]}S ${resultCount["볼"]}B ${resultCount["아웃"]}O`);
}

function gameStart(){
  console.log("신나는 야구 게임!");
  console.log("첫 번째 타자가 타석에 입장했습니다. \n");
}

function gameOver(){
  console.log(`최종 안타수: ${resultCount.안타}`);
  console.log("GAME OVER");
};

function main(){
  gameStart();
  while (resultCount["아웃"]<3){
    gamePlaying();
  }
  gameOver();
}

main();