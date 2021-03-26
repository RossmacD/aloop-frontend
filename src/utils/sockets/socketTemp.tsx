import { TEXT_CHANNEL_MESSAGES_CACHE_KEY } from '../../api/messageQueries'
import { queryClient } from '../../components/app/App'
import { BASE_SOCKET_URL } from '../../config'
type ActionHandler = (json: any) => void
const HANDLE_CONNECTION_ACTION = 'HANDLE_COLLECTION'
const OFFER_ACTION = "OFFER"
const CANDIDATE_ACTION = "CANDIDATE"
const ANSWER_ACTION = "ANSWER"
type Actions = typeof CANDIDATE_ACTION | typeof OFFER_ACTION | typeof ANSWER_ACTION | typeof HANDLE_CONNECTION_ACTION
const MESSAGE_ACTION = "NEW_MESSAGE"

interface OneToOneData {
    protocol: '1:1',
    data: any,
    from: number,
    to: number,
    room: String,
    action: Actions
}

interface OneToAllData {
    protocol: '1:A',
    data: any,
    from: number,
    room: String,
    action: Actions
}


export class RTCSocket {
    ws: WebSocket;
    connections: Map<number, RTCPeerConnection>;
    client_id: number;
    actionHandlers: { [key: string]: ActionHandler }
    updateTracks = (id: number) => { }
    setCallMembers?: React.Dispatch<React.SetStateAction<number[]>>;

    constructor(client_id: number) {
        this.ws = new WebSocket(`${BASE_SOCKET_URL}/signalling/`);
        // this.localConnection = new RTCPeerConnection();
        this.connections = new Map<number, RTCPeerConnection>();
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
            console.log("Handling", (json.from !== this.client_id && (!json.to || json?.to === this.client_id)) || (!json.from && !json?.to))

            if ((json.from !== this.client_id && (!json.to || json?.to === this.client_id)) || (!json.from && !json?.to)) {
                switch (json.action) {
                    case HANDLE_CONNECTION_ACTION:
                        console.log('NEW PEER WANTS TO CONNECT');
                        // This means that a new peer is attempting to connect
                        // A peer must be set up
                        await this.addPeer(json.from, json.room);
                        break;
                    case OFFER_ACTION:
                        console.log('GOT OFFER FROM A NODE WE WANT TO CONNECT TO');
                        console.log('THE NODE IS', json.from);
                        await this.processOffer(json.from, json.room, json.data);
                        break;
                    case CANDIDATE_ACTION:
                        console.log('NEW Candidate');
                        const candidate_connection = this.connections.get(json.from);
                        if (candidate_connection) {
                            candidate_connection.addIceCandidate(new RTCIceCandidate(json.data));
                            this.connections.set(json.from, candidate_connection)
                        }
                        break;
                    case ANSWER_ACTION:
                        console.log('--- GOT ANSWER IN CONNECT ---');
                        const connection = this.connections.get(json.from);
                        // console.log('HJAHSDHASHDHASDHASDHASDHASDASDHASDasdasdasd', json.from);
                        if (connection) {
                            connection.setRemoteDescription(new RTCSessionDescription(json.data));
                            this.connections.set(json.from, connection)
                        }
                        break;
                    case MESSAGE_ACTION:
                        queryClient.invalidateQueries([TEXT_CHANNEL_MESSAGES_CACHE_KEY, json.message.text_channel_id])
                        break
                    default:
                        for (const handler in this.actionHandlers) {
                            console.log("Attempting handler", handler)
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

    makeConnection = (room: String, setCallMembers: React.Dispatch<React.SetStateAction<number[]>>): boolean => {
        if (this.ws.readyState === WebSocket.OPEN) {
            console.log('Connected -> sending negotiations',);
            this.setCallMembers = setCallMembers
            this.sendOneToAllNegotiation(HANDLE_CONNECTION_ACTION, room, this.client_id)
            return true;
        } else {
            return false;
        }
    };





    addPeer = async (requester_id: number, room: String,) => {
        console.log('CONNECTING PEERS');
        // Create the local connection and its event listeners
        let connection = new RTCPeerConnection();
        connection.onicecandidate = (iceEvent) => {
            // Send the ice candidate
            if (iceEvent.candidate) {
                this.sendOneToOneNegotiation(CANDIDATE_ACTION, room, requester_id, iceEvent.candidate);
            }
        };
        this.connections.set(requester_id, connection);
        this.updateTracks(requester_id)
        this.setCallMembers ? this.setCallMembers(members => [...Array.from(new Set([...members, requester_id]))]) : console.error("Didnt set call mebers")
        connection = this.connections.get(requester_id) || new RTCPeerConnection();

        // Send an offer to the peer
        await connection.createOffer({ offerToReceiveVideo: true })
            .then((offer) => {
                connection.setLocalDescription(offer);
                this.sendOneToOneNegotiation(OFFER_ACTION, room, requester_id, offer);
                console.log('------ SEND OFFER ------');
                this.connections.set(requester_id, connection);
                // this.updateTracks()
            })
            .catch((err) => {
                throw err;
            });
        // Add the peer to the conenctions map
    };


    processOffer = async (requester: number, room: String, remoteOffer: RTCSessionDescriptionInit) => {
        console.log('RUNNING PROCESS OFFER', requester, this.connections);
        // let localConnection = new RTCPeerConnection({});
        const connection = this.connections.get(requester)
        if (connection) {
            connection.onicecandidate = (event) => {
                if (event.candidate) {
                    this.sendOneToOneNegotiation(CANDIDATE_ACTION, room, requester, event.candidate);
                }
            };

            // SEND ANSWER
            //   setCallerId(json.from);
            connection.setRemoteDescription(new RTCSessionDescription(remoteOffer));
            await connection.createAnswer().then((localDescription) => {
                connection.setLocalDescription(localDescription);
                console.log('------ SEND ANSWER ------');
                this.sendOneToOneNegotiation(ANSWER_ACTION, room, requester, localDescription);
                this.connections.set(requester, connection);
            }).catch(err => console.error(err));
        } else {
            console.error("No connection>? Retrying")
            this.connections.set(requester, new RTCPeerConnection())
            this.updateTracks(requester)
            this.setCallMembers ? this.setCallMembers(members => [...Array.from(new Set([...members, requester]))]) : console.error("Didnt set call mebers")
            this.processOffer(requester, room, remoteOffer)
        }
    }

    // Send connection request to a specific endpoint-id
    sendOneToAllNegotiation = (
        action: Actions,
        room: String,
        // endpoint: any,
        data: any,
    ) => {
        console.log('Action:', action, !!this.ws);
        this.ws.send(
            JSON.stringify({
                protocol: '1:A',
                from: this.client_id,
                room: room,
                // endpoint: endpoint,
                action,
                data: data,
            })
        );
    };

    // // Send connection request to a specific endpoint-id
    sendOneToOneNegotiation = (
        action: Actions,
        room: String,
        to: number,
        data: any,
    ) => {
        console.log('Action:', action, !!this.ws);
        this.ws.send(
            JSON.stringify({
                protocol: '1:1',
                from: this.client_id,
                room,
                to,
                action,
                data: data,
            })
        );
    };






    setTracks = (gotRemoteStream: (e: any, id: number) => void, stream: MediaStream,) => {
        const extendedGotRemoteStream = (id: number) => (e: any) => {
            gotRemoteStream(e, id)
        }

        this.updateTracks = (id: number) => {
            const connection = this.connections.get(id)
            stream.getTracks().forEach(track => {
                // Add the Add the track and add a listenr
                if (connection) {
                    connection.addTrack(track, stream);
                    // Loop through all tracks and then set the stream handler
                    connection.ontrack = extendedGotRemoteStream(id)
                    this.connections.set(id, connection)
                }
            })
        }
    }

    emptyTracks = (/*requester: number*/) => {
        // this.localConnection.ontrack = () => { }
        // this.localConnection = new RTCPeerConnection()
        // this.localConnection = new RTCPeerConnection()
        // this.connections.delete(requester)
        // this.connections = new Map()
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