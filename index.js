let teams = [];

function startingMessage(){
  console.log("신나는 야구시합\n1.데이터 입력\n2.데이터 출력\n3.시합 시작");
}

function getTeamName(i){
  const teamName = prompt(`${i+1}팀의 이름을 입력하세요`); 
  return teamName;
}

function getMember(j){
  member = {};
  const memberData= prompt(`${j+1}번 타자 정보 입력`);
  if (!memberData.includes(",")){
    console.log("\n타자 정보는 \n'타자 이름, 타율'\n형식으로 입력해주세요.");
    getMember(j);
  } 
  name = memberData.split(',')[0];
  prob = Number(memberData.split(',')[1]);
  if (!(prob > 0.1 && prob < 0.5)) {
    console.log("\n타율은 0.1 초과 0.5 미만의 값으로 소수 셋째자리까지 입력해주세요.\n");
    getMember(j);
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
    console.log("\n타자 정보는 \n'타자 이름, 타율'\n형식으로 입력해주세요.\n타율은 0.1 초과 0.5 미만의 값으로 소수 셋째자리까지 입력해주세요.\n");
    for (let j=0; j<9; j++){
      members.push(getMember(j));
    }
    team = {};
    team.name = teamName;
    team.members = members;
    teams.push(team);
  }
  console.log("\n팀 데이터 입력이 완료되었습니다.\n");
  main();
}

function showTeamData(){
  for (let i=0; i<2; i++){
    team = teams[i];
    console.log(`${team.name} 팀 정보`)
    for (let j=0; j<9; j++){
      member = team.members[j]
      console.log(`${j+1}번 ${member.name}, ${member.prob}`)
    }
  }
  console.log("\n팀 데이터 출력이 완료되었습니다.\n");
  main();
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

function setup(){
  const resultCount = {"스트라이크": 0, "볼": 0, "안타": 0, "아웃": 0};
  for (let i=0; i<2; i++){
    team = teams[i]
    team.count = resultCount;
    team.score = 0;
    for (let j=0; j<9; j++){
      member = team.members[j];
      prob = member.prob;
      member.weight = [];      
      member.weight[0] = (1-prob)/2 - 0.05;
      member.weight[1] = (1-prob)/2 - 0.05;
      member.weight[2] = prob;
      member.weight[3] = 0.1;
    }
  }
  console.log(`${teams[0].name} VS ${teams[1].name}의 시합을 시작합니다!\n`);
}

function determineTurn(round){
  halfList = ["초", "말"];
  console.log(`${Math.floor(round/2)+1}회${halfList[round%2]} ${teams[round%2].name}의 공격\n`);
  return teams[round%2];
}

function hitTheBall(hittingTeam, hitterNum){
  hitter = hittingTeam.members[hitterNum];
  console.log(`${hitterNum+1}번 ${hitter.name}`);
  count = hittingTeam.count;
  changeHitter = false;
  while(changeHitter === false){
    result = getResult(hitter.weight);
    counting(count, result);
    changeHitter = judge(count, result);
    showCount(count);
  }
}

function getResult(weight){
  randNum = Math.random();
  if(randNum<weight[0]){
    return "스트라이크";
  } else if (randNum<weight[0]+weight[1]){
    return "볼";
  } else if (randNum<weight[0]+weight[1]+weight[2]){
    return "안타";
  } else {
    return "아웃";
  }  
}

function counting(count, result){
  count[result] = count[result] + 1;
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

function showCount(count){
  console.log(`${count["스트라이크"]}S ${count["볼"]}B ${count["아웃"]}O \n`);
}

function wrapUpGame(){
  console.log("경기 종료\n");
  console.log(`${teams[0].name} VS ${teams[1].name}`)
  console.log(`${teams[0].score} : ${teams[1].score}`);
  console.log("Thank You!");
};

function gamePlaying(){
  setup();
  for (let round=0; round<12; round++){
    hittingTeam = determineTurn(round);
    for (let hitter=0; hittingTeam.count["아웃"]<3; hitter++){
      hitTheBall(hittingTeam, hitter%9);
    }
    if(hittingTeam.count["안타"]>3){
      hittingTeam.score = hittingTeam.score + hittingTeam.count["안타"]-3;
    }
    hittingTeam.count["아웃"]=0;
    hittingTeam.count["안타"]=0;
  }
  wrapUpGame();
}

function main(){
  startingMessage();
  selectMenu();
}

main();