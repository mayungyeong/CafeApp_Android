var WebSocketServer = require('ws').Server, 
    wss = new WebSocketServer({port: 8080});
    CLIENTS=[];
    tables = [];
   
wss.on('connection', function(ws) {
   // CLIENTS.push(ws);
    ws.on('message', function(message) {
        console.log('received: %s', message); 
        var jsonData = JSON.parse(message);        
        console.log(jsonData[0].req);

        if(jsonData[0].req == 'con'){ //연결
            ws.id = jsonData[0].id; 
            CLIENTS.push(ws);
            ws.send(JSON.stringify(tables));
            sendAll(message);
        }
        else if(jsonData[0].req == 'res'){ //예약
            tableInfo= {};
            tableInfo['tnum'] = jsonData[0].tnum;
            tableInfo['id'] = jsonData[0].id;
            tableInfo['req'] = jsonData[0].req;
            tables.push(tableInfo);
            sendAll(message);
        }
        else if(jsonData[0].req == 'can'){ //취소
            for (var i=0; i<tables.length; i++) {
                if(tables[i].tnum == jsonData[0].tnum){
                        tables.splice(i,1);
                        break;
                }
            }
            sendAll(message);
        }
        else{
            sendAll(message);
        }
    });
    //ws.send("NEW USER JOINED");
});
function sendAll (message) {
    for (var i=0; i<CLIENTS.length; i++) {
        console.log(CLIENTS[i].id);
        CLIENTS[i].send("" + message);
    }
}
function send(message,id) {
    for (var i=0; i<CLIENTS.length; i++) {
         if(CLIENTS[i].id == id){
           CLIENTS[i].send("" + message);
          break;
         }
    }
}
