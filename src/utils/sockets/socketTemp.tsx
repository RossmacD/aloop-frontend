import { BASE_SOCKET_URL } from '../../config'
type ActionHandler = (json: any) => void

export class RTCSocket {
    ws: WebSocket;
    localConnection: RTCPeerConnection;
    client_id: number;
    actionHandlers: { [key: string]: ActionHandler }

    constructor(client_id: number) {
        this.ws = new WebSocket(`${BASE_SOCKET_URL}/signalling/`);
        this.localConnection = new RTCPeerConnection();
        this.client_id = client_id
        this.actionHandlers = {}
    }


    setSocketHandlers = () => {
        // const ws = this.ws;
        this.ws.onopen = (e) => {
            console.log('Websocket Connection');
        };
        this.ws.onmessage = async (e) => {
            const json = JSON.parse(e.data);
            if (json.from !== this.client_id && (json.endpoint === this.client_id)) {
                switch (json.action) {
                    case 'HANDLE_CONNECTION':
                        console.log('NEW PEER WANTS TO CONNECT');
                        this.connectPeers(json.data, json.room,);
                        break;
                    case 'offer':
                        console.log('GOT OFFER FROM A NODE WE WANT TO CONNECT TO');
                        console.log('THE NODE IS', json.from);
                        this.processOffer(json.from, json.room, json.data);
                        break;
                    case 'candidate':
                        console.log('NEW Candidate');
                        break;
                    case 'answer':
                        console.log('--- GOT ANSWER IN CONNECT ---');
                        // console.log('HJAHSDHASHDHASDHASDHASDHASDASDHASDasdasdasd', json.from);
                        this.localConnection.setRemoteDescription(new RTCSessionDescription(json.data));
                        break;
                    default:
                        for (const handler in this.actionHandlers) {
                            this.actionHandlers[handler](json)
                        }
                }

                switch (json.protocol) {
                    case 'GET_ONLINE_USERS':
                        //DO SOMETHING
                        //! onGetOnlineUsers(json);
                        break;
                }
            };
        }
        return this;
    };

    connectPeers = (requester: any, room: String,) => {
        console.log('CONNECTING PEERS');
        // Create the local connection and its event listeners
        // const sendChannel = localConnection.createDataChannel("sendChannel");
        this.localConnection.onicecandidate = (iceEvent) => {
            // Send the ice candidate
            if (iceEvent.candidate) {
                this.sendOneToOneNegotiation('candidate', room, requester, iceEvent.candidate);
            }
        };
        this.localConnection
            .createOffer({ offerToReceiveVideo: true })
            .then((offer) => {
                this.localConnection.setLocalDescription(offer);
                this.sendOneToOneNegotiation('offer', room, requester, offer);
                console.log('------ SEND OFFER ------');
            })
            .catch((err) => {
                throw err;
            });
    };

    processOffer(requester: any, room: String, remoteOffer: any) {
        console.log('RUNNING PROCESS OFFER');
        // let localConnection = new RTCPeerConnection({});
        this.localConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.sendOneToOneNegotiation('candidate', room, requester, event.candidate);
            }
        };

        // SEND ANSWER
        //   setCallerId(json.from);
        this.localConnection.setRemoteDescription(new RTCSessionDescription(remoteOffer));
        this.localConnection.createAnswer().then((localDescription) => {
            this.localConnection.setLocalDescription(localDescription);
            console.log('------ SEND ANSWER ------');
            this.sendOneToOneNegotiation('answer', room, requester, localDescription);
        });
    }

    // Send connection request to a specific endpoint-id
    sendOneToOneNegotiation = (
        action: 'candidate' | 'offer' | 'answer',
        room: String,
        endpoint: any,
        data: any,
    ) => {
        console.log('Action:', action, !!this.ws);
        this.ws.send(
            JSON.stringify({
                protocol: 'one-to-all',
                from: this.client_id,
                room: room,
                endpoint: endpoint,
                action,
                data: data,
            })
        );
    };


    makeConnection = (room: String): boolean => {
        console.log('Connected -> sending negotiations',);
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(
                JSON.stringify({
                    protocol: 'one-to-all',
                    room,
                    from: this.client_id,
                    endpoint: 'any',
                    action: 'HANDLE_CONNECTION',
                    data: this.client_id,
                })
            );
            return true;
        } else {
            return false;
        }
    };


    setTracks = (gotRemoteStream: (e: any) => void, stream: MediaStream) => {
        this.localConnection.ontrack = gotRemoteStream
        stream.getTracks().forEach(track => this.localConnection.addTrack(track, stream))

    }

    emptyTracks = () => {
        // this.localConnection.ontrack = () => { }
        this.localConnection = new RTCPeerConnection()
    }


    joinVidChan = (room: String, action: (json: any) => void) => {
        this.ws.send(JSON.stringify({
            room,
            from: this.client_id,
            protocol: 'JOIN_VIDCHAN',
        }))
        this.actionHandlers["ROOM_JOIN"] = (json) => {
            console.log()
            if (json.action === "ROOM_JOIN" && json.user_id === this.client_id) {
                action(json)
            }
        }
    }

    clearHandler = (action: string) => {
        delete this.actionHandlers[action]
    }
}