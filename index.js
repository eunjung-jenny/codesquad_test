const resultSort = ["스트라이크", "볼", "안타", "아웃"];
const resultCount = {
  "스트라이크": 0,
  "볼": 0,
  "안타": 0,
  "아웃": 0
};

function getResult(){
  resultNum = Math.floor(Math.random() * 4);
  result = resultSort[resultNum];
  return result;
}

function counting(){
  resultCount[result] = resultCount[result] + 1;
}

function judge(result){
  if (result === "스트라이크" || result === "볼"){
    console.log(`${result}!`);
    if(resultCount["스트라이크"] === 3 || resultCount["볼"] === 4){
      resultCount["아웃"] = resultCount["아웃"] + 1;
      judge("아웃");
    }
  } else if (result === "안타"){
    console.log("안타! 다음 타자가 타석에 입장했습니다.");
  } else if (result === "아웃"){
    resultCount["스트라이크"] = 0;
    resultCount["볼"] = 0;
    if (resultCount["아웃"] < 3){
      console.log("아웃! 다음 타자가 타석에 입장했습니다.");
    } else {
      console.log("아웃!");
    }
  }
}

function showCount(){
  console.log(`${resultCount["스트라이크"]}S ${resultCount["볼"]}B ${resultCount["아웃"]}O \n`) 
}


function gamePlaying(){
  result = getResult();
  counting(result);
  judge(result);
  showCount();
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