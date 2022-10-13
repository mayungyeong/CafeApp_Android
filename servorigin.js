var WebSocketServer = require('ws').Server,  // 소켓 서버 생성
    wss = new WebSocketServer({ port: 8080 });  // 데몬으로 항상 기다리고 있음

CLIENTS = []; // 접속자 씰? 명단 배열

wss.on('connection', function (ws) {
    
    CLIENTS.push(ws); // 배열에 ws 값 넣어줌 - 웹소켓 생성 (실 연결)

    ws.on('message', function (message) {
        console.log('received: %s', message);
        sendAll(message);
    });
    ws.send("NEW USER JOINED");
});

function sendAll(message) {
    for (var i = 0; i < CLIENTS.length; i++) {  // 자기 자신한테도 감 / 자신은 빼려면 ws .... ? 같으면 안 보내기
        CLIENTS[i].send('' + message); //앞에가 문자열이면 뒤에도 문자열 됨
    }
}