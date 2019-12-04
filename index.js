const resultCount = {
  "스트라이크": 0,
  "볼": 0,
  "안타": 0,
  "아웃": 3
};

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
    
  }
  gameOver();
}

main();