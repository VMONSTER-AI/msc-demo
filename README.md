# msc-demo

예제를 확인하려면 다음을 실행해 주세요.

```
npm install
npm run dev
```

main.js의 API_KEY와 API_URL에 알맞은 api key와 api url을 입력해 주세요.

<hr />
첫째 섹션의 Request Room 버튼을 누르면 API_KEY를 이용해 room이 생성됩니다.
생성 완료되면 버튼의 오른편에 "Room Created" 가 표시됩니다.
<br /><br />
room이 생성된 이후, 나머지 기능을 사용할 수 있습니다.
<br /><br />
둘째 섹션의 Join, Leave을 누르면 각각 room에 입장, 퇴장할 수 있습니다.
둘째 섹션의 각 버튼에는 RoomManager 클래스의 method가 연결되어 있습니다.
입퇴장 외에도
<br />
 - addAgentVideoTile()은 id가 "video-agent" 인 요소의 자식으로 agent의 video를 삽입합니다.<br />
 - clearAgentVideoTile()은 추가되어 있는 agent의 video를 제거합니다.<br />
 - isAgentSpeaking()은 현재 agent가 말하고 있는지 여부를 리턴합니다.
<br /><br />
셋째 영역에서 Agent에게 메세지를 전송할 수 있습니다.
텍스트(required)와 배경 이미지(optional)를 입력한 뒤 엔터 버튼을 누르면, agent가 해당 내용을 말하기 시작합니다.
<br /><br />
RoomManager 객체에는 다양한 이벤트 핸들러를 연결할 수 있습니다. 예제의 80째줄 - 105째줄에서 해당 내용을 확인할 수 있습니다.
