var WebSocketServer = require('ws').Server; 
    wss = new WebSocketServer({port: 8080});
    var CLIENTS = [];
    var tables = [];
    var userTables = [];
   
wss.on('connection', function(ws) {

    ws.on('message', function(message) {
        console.log('received: %s', message); 
        var jsonData = JSON.parse(message);        
        console.log(jsonData[0].req);
        if(jsonData[0].req == 'con'){

            //유저 이름 테이블
            userName = {};
            userName['name'] = jsonData[0].id;
            userName['req'] = jsonData[0].req;
            userTables.push(userName);
            sendAllExceptMe(message, ws);

            ws.id = jsonData[0].id; 
            CLIENTS.push(ws);
            console.log(tables);
            ws.send(JSON.stringify(userTables));
            ws.send(JSON.stringify(tables));
            sendAllExceptMe(message, ws);

        }else if(jsonData[0].req == 'res'){
            tableInfo= {};
            tableInfo['tnum'] = jsonData[0].tnum;
            tableInfo['id'] = jsonData[0].id;
            tableInfo['req'] = jsonData[0].req;
            tables.push(tableInfo);
            console.log("res" + tables);
            sendAll(message);
        }else if(jsonData[0].req == 'can'){
            for (var i=0; i<tables.length; i++) {
                if(tables[i].tnum == jsonData[0].tnum){
                        tables.splice(i,1);
                        break;
                }
            }
            sendAll(message);
        }else{
            sendAll(message);
        }
    });

    ws.on('close', function(message) {
        for (var i=0; i<CLIENTS.length; i++) {
            if(CLIENTS[i].id == ws.id){
              CLIENTS.splice(i,1);
             break;
            }
        
       } 

       for (var i=0; i<userTables.length; i++) {
        if(userTables[i].id == ws.id){
            userTables.splice(i,1);
           break;
          }
       }
    });

    //ws.send("NEW USER JOINED");
});

function sendAll (message) {
    for (var i=0; i<CLIENTS.length; i++) {
            console.log("클라이언트 " + CLIENTS[i].id); // userName
            CLIENTS[i].send("" + message);

    }
}
function sendAllExceptMe (message, ws) {
    for (var i=0; i<CLIENTS.length; i++) {
        if(CLIENTS[i] != ws){
            console.log("클라이언트 " + CLIENTS[i].id); // userName
            CLIENTS[i].send("" + message);

        }
    }
}

// function send(message,id) {
//     for (var i=0; i<CLIENTS.length; i++) {
//          if(CLIENTS[i].id == id){
//            CLIENTS[i].send("" + message);
//           break;
//          }
//     }
// }