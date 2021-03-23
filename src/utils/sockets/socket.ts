// import { BASE_SOCKET_URL, BASE_URL } from '../../config';

// export const wsAddr = BASE_URL;
// export const client = 'user' + Math.random();
// export const client = 1;
// export const room = 'this_room';
// const options = {
//   rejectUnauthorized: false,
// };
// export const ws = new WebSocket(`${BASE_SOCKET_URL}/signalling/?user=${client}`);
export const localConnection = new RTCPeerConnection();
// export const [callerId, setCallerId] = useState('');
// localConnection.ontrack = ;

interface RoomUsers {
  room: string;
  user_ids: number[];
}

interface getOnlineUsersResult {
  online_users: RoomUsers[];
  protocol: string;
}

type GetOnlineUsersEvent = (json: getOnlineUsersResult) => void;
let onGetOnlineUsers: GetOnlineUsersEvent = (json) => {
  console.log('Online Users:', json.online_users);
};

export const setGetOnlineUsers = (onGetOnlineUsersFunc: GetOnlineUsersEvent) => {
  onGetOnlineUsers = onGetOnlineUsersFunc;
};

export const triggerGetOnlineUsers = (ws: WebSocket) => {
  const payload = {
    protocol: 'GET_ONLINE_USERS',
    room: '#!Main',
  };
  ws.send(JSON.stringify(payload));
};

export const setSocketHandlers = (ws: WebSocket,room:String, clientId: number) => {
  ws.onopen = (e) => {
    console.log('Websocket Connection');
  };

  ws.onmessage = async (e) => {
    const json = JSON.parse(e.data);
    // if (json.from !== client_id && (json.endpoint === client_id || json.room === room)) {
    switch (json.action) {
      case 'HANDLE_CONNECTION':
        console.log('NEW PEER WANTS TO CONNECT');
        connectPeers(json.data,room,clientId,ws);
        break;
      case 'offer':
        console.log('GOT OFFER FROM A NODE WE WANT TO CONNECT TO');
        console.log('THE NODE IS', json.from);
        processOffer(json.from,room,clientId, json.data,ws);
        break;
      case 'candidate':
        console.log('NEW Candidate');
        break;
      case 'answer':
        console.log('--- GOT ANSWER IN CONNECT ---');

        // console.log('HJAHSDHASHDHASDHASDHASDHASDASDHASDasdasdasd', json.from);
        localConnection.setRemoteDescription(new RTCSessionDescription(json.data));
        break;
    }

    switch (json.protocol) {
      case 'GET_ONLINE_USERS':
        //DO SOMETHING
        onGetOnlineUsers(json);
        break;
    }
  };

  return ws;
};

const connectPeers = (requester: any,room:String,clientId:number,ws:WebSocket) => {
  console.log('CONNECTING PEERS');
  // Create the local connection and its event listeners
  // const sendChannel = localConnection.createDataChannel("sendChannel");
  localConnection.onicecandidate = (iceEvent) => {
    // Send the ice candidate
    if (iceEvent.candidate) {
      sendOneToOneNegotiation('candidate',room,clientId, requester, iceEvent.candidate,ws);
    }
  };
  localConnection
    .createOffer({ offerToReceiveVideo: true })
    .then((offer) => {
      localConnection.setLocalDescription(offer);
      sendOneToOneNegotiation('offer',room,clientId, requester, offer,ws);
      console.log('------ SEND OFFER ------');
    })
    .catch((err) => {
      throw err;
    });
};

function processOffer(requester: any,room:String,clientId:number, remoteOffer: any,ws:WebSocket) {
  console.log('RUNNING PROCESS OFFER');
  // let localConnection = new RTCPeerConnection({});

  localConnection.onicecandidate = (event) => {
    if (event.candidate) {
      sendOneToOneNegotiation('candidate',room,clientId, requester, event.candidate,ws);
    }
  };

  // SEND ANSWER
  //   setCallerId(json.from);
  localConnection.setRemoteDescription(new RTCSessionDescription(remoteOffer));
  localConnection.createAnswer().then((localDescription) => {
    localConnection.setLocalDescription(localDescription);
    console.log('------ SEND ANSWER ------');
    sendOneToOneNegotiation('answer',room,clientId, requester, localDescription,ws);
  });
}

// Send connection request to a specific endpoint-id
const sendOneToOneNegotiation = (
  action: 'candidate' | 'offer' | 'answer',
  room:String,clientId:number,
  endpoint: any,
  data: any,
  ws: WebSocket
) => {
  console.log('Action:', action, !!ws);
  if (ws) {
    ws.send(
      JSON.stringify({
        protocol: 'one-to-all',
        from: clientId,
        room: room,
        endpoint: endpoint,
        action,
        data: data,
      })
    );
  }
};

export const makeConnection = (room:String,clientId:number,ws:WebSocket):boolean => {
  console.log('Connected -> sending negotiations', ws);
  if (!!ws && ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        protocol: 'one-to-all',
        room,
        from: clientId,
        endpoint: 'any',
        action: 'HANDLE_CONNECTION',
        data: clientId,
      })
    );
    return true;
  } else {
    return false;
  }
};
