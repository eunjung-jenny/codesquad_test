
const resultSort = ["스트라이크", "볼", "안타", "아웃"];
/*
function gamePlaying(){
  result = getResult();
  counting(result);
  judge(result);
  showCount();
}
*/

const INPUT_GUIDE = "\n타자 정보는 \n'타자 이름, 타율'\n형식으로 입력해주세요.\n타율은 0.1 초과 0.5 미만의 값으로 소수 셋째자리까지 입력해주세요.\n"

//let teams = [];
let teams = [
  {name: "코드",
  members: 
    [{name: "윤지수", prob: 0.100},
     {name: "김정", prob: 0.482}, {name: "박서준", prob: 0.421}, {name: "김정", prob: 0.482}, {name: "박서준", prob: 0.421}, {name: "김정", prob: 0.482}, {name: "박서준", prob: 0.421}, {name: "김정", prob: 0.482}, {name: "박서준", prob: 0.421}
    ]
  },
  {name: "스쿼드",
  members: 
    [{name: "정호영", prob: 0.490},
     {name: "피오", prob: 0.452}, {name: "공유", prob: 0.382}, {name: "김정", prob: 0.482}, {name: "박서준", prob: 0.421}, {name: "김정", prob: 0.482}, {name: "박서준", prob: 0.421}, {name: "김정", prob: 0.482}, {name: "박서준", prob: 0.421}
    ]
  }
];

function gameStart(){
  console.log("신나는 야구시합\n1.데이터 입력\n2.데이터 출력\n");
}

function getTeamName(i){
  const teamName = prompt(`${i+1}팀의 이름을 입력하세요`); 
  return teamName;
}

function inputError(j){
  console.log(INPUT_GUIDE);
  getMember(j);
}

function getMember(j){
  member = {};
  const memberData= prompt(`${j+1}번 타자 정보 입력`);
  if (!memberData.includes(",")){
    inputError(j);
  } 
  name = memberData.split(',')[0];
  prob = Number(memberData.split(',')[1]);
  if (!(prob > 0.1 && prob < 0.5)) {
    inputError(j);
  }
  member.name = name;
  member.prob = prob;  
  return member;
}

function inputTeamData(){
  teams = [];
  for (let i=0; i<2; i++){
    members = [];
    teamName = getTeamName(i);
    console.log(INPUT_GUIDE);
    for (let j=0; j<9; j++){
      members.push(getMember(j));
    }
    team = {};
    team.name = teamName;
    team.members = members;
    teams.push(team);
    console.log("");
  }
  console.log("팀 데이터 입력이 완료되었습니다.\n");
  selectMenu();
}

function showTeamData(){
  for (let i=0; i<2; i++){
    team = teams[i];
    console.log(`${team.name} 팀 정보`)
    for (let j=0; j<9; j++){
      member = team.members[j]
      console.log(`${j+1}번 ${member.name}, ${member.prob}`)
    }
    console.log("");
  }
  console.log("팀 데이터 출력이 완료되었습니다.\n");
  selectMenu();
}

function selectMenu(){
  const x=prompt("메뉴선택 (1 - 3)");
  if (x === "1"){
    inputTeamData();
  } else if (x === "2"){
    showTeamData();
  } else if (x === "3"){
    gamePlaying();
  } else {
    console.log("다시 선택해주세요.")
    selectMenu();
  }

}
/*
function gameOver(){
  console.log(`최종 안타수: ${resultCount.안타}`);
  console.log("GAME OVER");
};
*/

function determineTurn(round){
  halfList = ["초", "말"];
  console.log(`${Math.floor(round/2)+1}회${halfList[round%2]} ${teams[round%2].name} 공격\n`);
  return teams[round%2];
}

function setup(){
  const resultCount = {"스트라이크": 0, "볼": 0, "안타": 0, "아웃": 0};
  for (let i=0; i<2; i++){
    teams[i].count = resultCount;
    teams[i].score = 0;
    for (let j=0; j<9; j++){
      prob = teams[i].members[j].prob;
      teams[i].members[j].weight = [];      
      teams[i].members[j].weight[0] = (1-prob)/2 - 0.05;
      teams[i].members[j].weight[1] = (1-prob)/2 - 0.05;
      teams[i].members[j].weight[2] = prob;
      teams[i].members[j].weight[3] = 0.1;
    }
  }
  console.log(`${teams[0].name} VS ${teams[1].name}의 시합을 시작합니다!\n`);
}

function getResult(weight){
  randNum = Math.random();
  if(randNum<weight[0]){
    return resultSort[0];
  } else if (randNum<weight[0]+weight[1]){
    return resultSort[1];
  } else if (randNum<1-weight[3]){
    return resultSort[2];
  } else {
    return resultSort[3];
  }  
}

function showCount(count){
  console.log(`${count["스트라이크"]}S ${count["볼"]}B ${count["아웃"]}O \n`) 
}

function judge(count, result){
  if (result === "스트라이크" || result === "볼"){
    console.log(`${result}!`);
    if(count["스트라이크"] === 3 || count["볼"] === 4){
      count["아웃"] = count["아웃"] + 1;
      judge(count, "아웃");
      return true;
    }
    return false;
  } else if (result === "안타" || result === "아웃"){
    console.log(`${result}!`);
    count["스트라이크"] = 0;
    count["볼"] = 0;
    return true;
  }
}

function counting(count, result){
  count[result] = count[result] + 1;
}

function hitTheBall(hittingTeam, hitterNum){
  hitter = hittingTeam.members[hitterNum];
  console.log(`${hitterNum+1}번 ${hitter.name}`);
  changeHitter = false;
  while(changeHitter === false){
    result = getResult(hitter.weight);
    counting(hittingTeam.count, result);
    changeHitter = judge(hittingTeam.count, result);
    showCount(hittingTeam.count);
  }
}

function gamePlaying(){
  setup();
  for (let round=0; round<12; round++){
    hittingTeam = determineTurn(round);
    for (let hitter=0; hittingTeam.count["아웃"]<3; hitter++){
      hitTheBall(hittingTeam, hitter%9);
    }
    hittingTeam.count["아웃"]=0;
    if(hittingTeam.count["안타"]>3){
      hittingTeam.score = hittingTeam.score + hittingTeam.count["안타"]-3;
    }
  }
}

function main(){
  gameStart();
  selectMenu();
/*  while (resultCount["아웃"]<3){
    gamePlaying();
  }
  gameOver();*/
}

main();