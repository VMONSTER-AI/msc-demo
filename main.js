import RoomManager from "ejel-speaking-js";
import axios from "axios";
const API_KEY = "";
const API_URL = "";

document.querySelector("#app").innerHTML = `
  <button id="request-room-btn">Request Room</button>
  <span id="request-room-result"></span>
  <hr />
    <button id="join-btn">Join</button>
  <button id="leave-btn">Leave</button>
  <br />
  <button id="add-agent-video-tile-btn">Add Agent Video Tile</button>
  <button id="clear-agent-video-tile-btn">Clear Agent Video Tile</button>
  <button id="get-is-agent-speaking-btn">get isAgentSpeaking</button>
  <hr />
  <h3>메세지 전송</h3>
  배경 이미지
    <br />
  <input type="file" id="imageInput" accept="image/*">
  <br />
  <br />
  텍스트 입력   
  <br />
    <textarea type="text"id="userInput" cols="50" rows="10"></textarea>
  <hr />
  <div id="video-agent"></div>
  <span id="agent-speaking-status"></span>
`;

let roomManager;

const requestRoomConfig = async (apiKey) => {
  return axios
    .post(
      `${API_URL}/rooms`,
      {},
      {
        headers: {
          "X-api-key": apiKey,
        },
      }
    )
    .then((response) => {
      return {
        url: response.data.url,
        token: response.data.token,
        name: response.data.name,
      };
    })
    .catch((error) => {
      throw error;
    });
};

document
  .getElementById("request-room-btn")
  .addEventListener("click", async () => {
    // request room config
    const { url, token, name } = await requestRoomConfig(API_KEY);

    const config = {
      url: url,
      token: token,
      name: name,
      apiKey: API_KEY,
    };

    // Create RoomManager object with config and properties
    roomManager = new RoomManager(config);

    document.getElementById("request-room-result").innerHTML = "Room Created";
  });

// clear ui
const clear = () => {
  document.getElementById("agent-speaking-status").innerHTML = "";
  document.getElementById("request-room-result").innerHTML = "Room Closed";
};

document.getElementById("join-btn").addEventListener("click", async () => {
  await roomManager.start();

  // add message handler
  roomManager.setOnMessage((msg) => {
    console.log(msg);
  });
  roomManager.setOnAgentEnter(() => {
    roomManager.addAgentVideoTile(); // add Agent Video Tile when Agent enters
    document.getElementById("agent-speaking-status").innerHTML = "NOT SPEAKING";
  });
  roomManager.setOnAgentSpeakingStart(() => {
    document.getElementById("agent-speaking-status").innerHTML = "SPEAKING";
  });
  roomManager.setOnAgentSpeakingEnd(() => {
    document.getElementById("agent-speaking-status").innerHTML = "NOT SPEAKING";
  });
  roomManager.setOnClose(() => {
    roomManager.leave(); // leave room when closed
    clear();
  });
  // add error handler
  roomManager.setOnError((error) => {
    console.log(error);
  });
});

document.getElementById("leave-btn").addEventListener("click", async () => {
  roomManager.leave();
  clear();
});

document
  .getElementById("add-agent-video-tile-btn")
  .addEventListener("click", () => {
    roomManager.addAgentVideoTile();
  });
document
  .getElementById("clear-agent-video-tile-btn")
  .addEventListener("click", () => {
    roomManager.clearAgentVideoTile();
  });
document
  .getElementById("get-is-agent-speaking-btn")
  .addEventListener("click", () => {
    console.log(`isAgentSpeaking: ${roomManager.isAgentSpeaking()}`);
  });

// send message when press enter
document.getElementById("userInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    if (!roomManager) {
      console.log("roomManager is not exist.");
      return;
    }
    const text = document.getElementById("userInput").value;

    if (!(roomManager.isAgentSpeaking() === true) && text.length !== 0) {
      const imageInput = document.getElementById("imageInput");

      if (imageInput.files.length > 0) {
        roomManager.sendMessage(text, imageInput.files[0]);
      } else {
        roomManager.sendMessage(text);
      }
      document.getElementById("userInput").value = "";
    }
  }
});
