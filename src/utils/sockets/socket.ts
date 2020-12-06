export const wsAddr = '172.20.80.193:8000';
export const client = 'user' + Math.random();
export const room = 'this_room';
// const options = {
//   rejectUnauthorized: false,
// };
export const ws = new WebSocket(`wss://${wsAddr}/signalling/?user=${client}`);
export const localConnection = new RTCPeerConnection();
// export const [callerId, setCallerId] = useState('');
// localConnection.ontrack = ;

ws.onopen = (e) => {
  console.log('Websocket Connection');
};

ws.onmessage = async (e) => {
  const json = JSON.parse(e.data);
  if (json.from !== client && (json.endpoint === client || json.room === room)) {
    switch (json.action) {
      case 'HANDLE_CONNECTION':
        console.log('NEW PEER WANTS TO CONNECT');
        connectPeers(json.data);
        break;
      case 'offer':
        console.log('GOT OFFER FROM A NODE WE WANT TO CONNECT TO');
        console.log('THE NODE IS', json.from);
        processOffer(json.from, json.data);
        break;
      case 'candidate':
        console.log('NEW Candidate');
        break;
      case 'answer':
        console.log('--- GOT ANSWER IN CONNECT ---');
        // callerId=
        // setCallerId(json.from);
        // console.log('HJAHSDHASHDHASDHASDHASDHASDASDHASDasdasdasd', json.from);
        localConnection.setRemoteDescription(new RTCSessionDescription(json.data));
        break;
    }
  }
};

const connectPeers = (requester: any) => {
  console.log('CONNECTING PEERS');
  // Create the local connection and its event listeners
  // const sendChannel = localConnection.createDataChannel("sendChannel");
  localConnection.onicecandidate = (iceEvent) => {
    // Send the ice candidate
    if (iceEvent.candidate) {
      sendOneToOneNegotiation('candidate', requester, iceEvent.candidate);
    }
  };
  localConnection
    .createOffer({ offerToReceiveVideo: true })
    .then((offer) => {
      localConnection.setLocalDescription(offer);
      sendOneToOneNegotiation('offer', requester, offer);
      console.log('------ SEND OFFER ------');
    })
    .catch((err) => {
      throw err;
    });
};

function processOffer(requester: any, remoteOffer: any) {
  console.log('RUNNING PROCESS OFFER');
  // let localConnection = new RTCPeerConnection({});

  localConnection.onicecandidate = (event) => {
    if (event.candidate) {
      sendOneToOneNegotiation('candidate', requester, event.candidate);
    }
  };

  // SEND ANSWER
  //   setCallerId(json.from);
  localConnection.setRemoteDescription(new RTCSessionDescription(remoteOffer));
  localConnection.createAnswer().then((localDescription) => {
    localConnection.setLocalDescription(localDescription);
    console.log('------ SEND ANSWER ------');
    sendOneToOneNegotiation('answer', requester, localDescription);
  });
}

// Send connection request to a specific endpoint-id
const sendOneToOneNegotiation = (
  action: 'candidate' | 'offer' | 'answer',
  endpoint: any,
  data: any
) => {
  console.log('Action:', action, !!ws);
  if (ws) {
    ws.send(
      JSON.stringify({
        protocol: 'one-to-all',
        from: client,
        room: room,
        endpoint: endpoint,
        action,
        data: data,
      })
    );
  }
};

export const makeConnection = () => {
  console.log('Connected -> sending negotiations');
  ws.send(
    JSON.stringify({
      protocol: 'one-to-all',
      room,
      from: client,
      endpoint: 'any',
      action: 'HANDLE_CONNECTION',
      data: client,
    })
  );
};
