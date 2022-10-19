import { React, useEffect, useState } from "react";
import { Alert, TextInput, StyleSheet, View, ScrollView, Text, LogBox, Pressable, Button } from 'react-native';

//서버 주소
let ws = new WebSocket(`ws://10.32.14.26:8080`);

function App() {

  LogBox.ignoreLogs(['Remote debugger']);

  const [serverState, setServerState] = useState('☁☁☁');
  const [messageText, setMessageText] = useState('');
  const [serverMessages, setServerMessages] = useState([]);
  const serverMessagesList = [];
  const [seatSelect, setSeatSelect] = useState([false, false, false, false, false, false, false, false, false]);
  const [tables, setTables] = useState([]);
  //const [btnText, setBtnText] = useState([''],[''],[''],[''],[''],[''],[''],[''],['']);

  const data = {};
  const sendData = [];

  const name = "마윤경";
  data['id'] = name;

  useEffect(() => {

    ws.onopen = () => { //서버가 연결 수락 시 
      setServerState('connected');

      data['req'] = 'con'; //연결
      sendData.push(data);
      var jsonData = JSON.stringify(sendData);
      ws.send(jsonData);
    };

    ws.onmessage = (e) => { //서버에서 보낸 메시지 수신
      if (e.data.length !== undefined) {
        serverMessagesList.push(e.data);
        setServerMessages([...serverMessagesList]);

        jsonRev = JSON.parse(e.data);
        for (var i = 0; i < jsonRev.length; i++) {
          if (jsonRev[i].req == 'res') { //예약일 때
            revSelect(jsonRev[i].tnum, true);
            tablesRes(jsonRev[i]);
            serverMessagesList.push(
              jsonRev[i].id +
              '님이 ' +
              jsonRev[i].tnum +
              '번째 테이블 ' +
              '예약',
            );
            setServerMessages([...serverMessagesList]);
          }
          else if (jsonRev[i].req == 'can') { //예약 취소일 때
            revSelect(jsonRev[i].tnum, false);
            tablesCan(jsonRev[i]);
            serverMessagesList.push(
              jsonRev[i].id +
              '님이 ' +
              jsonRev[i].tnum +
              '번째 테이블 ' +
              '예약 취소',
            );
          }
        }
      }
    };

    ws.onerror = (e) => { //오류 발생 시
      setServerState('error :', e.message);
    };

    ws.onclose = (e) => { //연결 종료 시 
      setServerState('disconnected', e);
    };

    return () => {
      setServerState('close');
      ws.close();
    };
  }, [])

  //좌석 T/F 변경
  const revSelect = (id, bool) => {
    seatSelect[id] = bool;

    setSeatSelect([
      seatSelect[0],
      seatSelect[1],
      seatSelect[2],
      seatSelect[3],
      seatSelect[4],
      seatSelect[5],
      seatSelect[6],
      seatSelect[7],
      seatSelect[8],
    ]);
  }

  //좌석 예약
  const tablesRes = (jsonRev) => {
    tableInfo = {};
    tableInfo['tnum'] = jsonRev.tnum;
    tableInfo['id'] = jsonRev.id;
    tableInfo['req'] = jsonRev.req;
    tables.push(tableInfo);
    console.log(tables.length);
  }

  //좌석 예약 취소
  const tablesCan = (jsonRev) => {
    for (var i = 0; i < tables.length; i++) {
      if (tables[i].tnum == jsonRev.tnum) {
        tables.splice(i, 1);
        break;
      }
    }
  }

  //서버에 메시지 전송
  const sendMessage = () => {
    ws.send(messageText);
    setMessageText('');
  };

  //좌석 클릭 시
  const getSeat = (id) => {
    return (
      <Pressable onPress={() => {
        if (ws !== null) {
          if (seatSelect[id] == false) { //미예약 좌석일 때
            ReservedAlert(id);
          }
          else { //예약한 좌석일 때
            UnreservedAlert(id);
          }
        }
      }}
        style={[styles.seat, { backgroundColor: seatSelect[id] ? '#F8CACA' : '#CBE08B' },]}>
        <Text style={styles.seatText}>🍪</Text>
      </Pressable>
    )
  }

  //예약 알림
  const ReservedAlert = (id) => {
    Alert.alert(
      '예약',
      '정말로 예약하시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            data['req'] = 'res';
            data['tnum'] = id;
            sendData.push(data);
            var jsonData = JSON.stringify(sendData);
            ws.send(jsonData);
          },
          style: 'destructive',
        },
        { text: '아니오', onPress: () => { }, style: 'cancel' },
      ],
      {
        cancelable: true,
        onDismiss: () => { },
      },
    );
  };

  //예약 취소 알림
  const UnreservedAlert = (id) => {
    Alert.alert(
      '예약 취소',
      '정말로 예약 취소하시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            for (var i = 0; i < tables.length; i++) {
              if (tables[i].tnum == id) {
                if (tables[i].id == name) { //테이블의 아이디와 이름이 같을 시
                  data['req'] = 'can';
                  data['tnum'] = id;
                  sendData.push(data);
                  var jsonData = JSON.stringify(sendData);
                  ws.send(jsonData);

                  break;
                }
                else { //테이블의 아이디와 이름이 다를 시
                  alert("본인이 예약한 좌석이 아닙니다🙏");
                  break;
                }
              }
            }
          },
          style: 'destructive',
        },
        { text: '아니오', onPress: () => { }, style: 'cancel' },
      ],
      {
        cancelable: true,
        onDismiss: () => { },
      },
    );
  };

  //뷰
  return (
    <View style={styles.all}>
      <View style={styles.appBar}>
        <Text style={styles.appTitle}>Cafe ☕</Text>
        <Text style={styles.serverState}>{serverState}</Text>
      </View>

      <View style={styles.sendForm}>
        <TextInput onChangeText={text => { setMessageText(text); }} value={messageText} style={styles.sendMessageArea} />
        <View style={styles.sendBtnForm}>
          <Button onPress={sendMessage} title="전송😘" disabled={messageText == ''} style={styles.sendBtn}></Button>
        </View>
      </View>

      <ScrollView style={styles.getMessageArea}>
        {
          serverMessages.map((item, id) => {
            return (
              <Text key={id}>{item}{"\n"}</Text>
            )
          })
        }
      </ScrollView>

      <View style={styles.seatForm}>
        <View style={styles.seatRow}>
          {getSeat(0)}
          {getSeat(1)}
          {getSeat(2)}
        </View>
        <View style={styles.seatRow}>
          {getSeat(3)}
          {getSeat(4)}
          {getSeat(5)}
        </View>
        <View style={styles.seatRow}>
          {getSeat(6)}
          {getSeat(7)}
          {getSeat(8)}
        </View>
      </View>

      <Text style={styles.info}>  😊💭  <Text style={styles.infoDetail}>분홍색 좌석</Text>은 예약된 좌석입니다 !</Text>
    </View>
  );

};

//스타일
const styles = StyleSheet.create({
  all: {

  },
  appBar: {
    height: 100, justifyContent: 'center', backgroundColor: "#BFDB6D"
  },
  appTitle: {
    marginTop: 20, textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 20
  },
  serverState: {
    top: 10, left: 10, color: 'white'
  },
  sendForm: {
    flex: 1, flexDirection: 'row'
  },
  sendMessageArea: {
    height: 55, width: 250, marginLeft: 17, marginTop: 30, padding: 15, borderWidth: 1, borderRadius: 5, borderColor: 'gray'
  },
  sendBtnForm: {
    height: 55, width: 80, marginLeft: 10, marginTop: 37, borderRadius: 5
  },
  sendBtn: {
    justifyContent: 'center', backgroundColor: "#DCECD2", color: "black"
  },
  getMessageArea: {
    height: 150, width: 340, marginLeft: 17, marginTop: 100, padding: 15, borderRadius: 5, backgroundColor: "#DCECD2"
  },
  seatForm: {
    marginTop: 20
  },
  seatRow: {
    flexDirection: 'row', marginTop: 30
  },
  seat: {
    height: 70, width: 70, marginLeft: 41, borderRadius: 5, backgroundColor: "#CBE08B"
  },
  seatText: {
    top: 35, left: 36, fontSize: 36
  },
  info: {
    marginLeft: 55, marginTop: 40, color: 'gray', fontSize: 15
  },
  infoDetail: {
    color: '#DE9494'
  },

});

export default App;