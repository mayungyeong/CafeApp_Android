// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import * as React from 'react';
import {useRef, useEffect} from 'react';
import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Alert,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {Ionicons, AntDesign} from '@expo/vector-icons';

export default function App() {
  const [serverState, setServerState] = React.useState('Loading...'); // 서버 상태 메시지
  const [messageText, setMessageText] = React.useState(''); // 초기 TextInput 문자 상태
  const [disableButton, setDisableButton] = React.useState(true); // 초기 버튼 비활성화
  const [inputFieldEmpty, setInputFieldEmpty] = React.useState(true); // TextInput 비었는지 상태
  const [serverMessages, setServerMessages] = React.useState([]); // 서버 메시지 리스트
  const inputRef = React.useRef(null);
  //var ws = React.useRef(new WebSocket('ws://10.32.15.49:8887')).current;
  // useRef() Hook : current 속성을 가지고 있는 객체 반환 -> ??

  //const websocketUrl = 'ws://10.32.15.49:8800';
  const websocketUrl = 'ws://10.32.1.108:8001';
  let ws = React.useRef(null);
  const [isSelect, setSelect] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isSelect2, setSelect2] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isTableSelect, setTableSelect] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [btn1Text, setBtn1Text] = React.useState(
    ['번 테이블 예약', '번 테이블 예약 취소'],
    ['번 테이블 예약', '번 테이블 예약 취소'],
    ['번 테이블 예약', '번 테이블 예약 취소'],
    ['번 테이블 예약', '번 테이블 예약 취소'],
    ['번 테이블 예약', '번 테이블 예약 취소'],
    ['번 테이블 예약', '번 테이블 예약 취소'],
    ['번 테이블 예약', '번 테이블 예약 취소'],
    ['번 테이블 예약', '번 테이블 예약 취소'],
    ['번 테이블 예약', '번 테이블 예약 취소'],
    ['번 테이블 예약', '번 테이블 예약 취소'],
  );
  var name = '이선호';
  var a = 0;
  var b = 0;
  const getButton = id => {
    //console.log(ws.current);

    return (
      <Pressable
        style={[
          styles.buttonContainer,
          {backgroundColor: isSelect[id] ? '#F7819F' : '#86EA95'},
        ]}
        onPress={() => {
          if (ws.current !== null) {
            var data = {};
            var sendData = [];
            data['id'] = name;
            if (getButton2(id).props.style[1].backgroundColor === '#FA5882') {
              return;
            } else {
              if (isSelect[id] == false) {
                data['req'] = 'res';
              } else if (isSelect[id] == true) {
                data['req'] = 'resCan';
              }
            }

            data['tnum'] = id;
            sendData.push(data);
            var jsonData = JSON.stringify(sendData);
            ws.current.send(jsonData);
          }
        }}>
        <Text>
          {id}
          {btn1Text[(2, a)]}
        </Text>
      </Pressable>
    );
  };
  const getButton2 = id => {
    //console.log(ws.current);

    return (
      <Pressable
        style={[
          styles.button2Container,
          {backgroundColor: isSelect2[id] ? '#FA5882' : '#01DF74'},
        ]}
        onPress={() => {
          if (ws.current !== null) {
            var data = {};
            var sendData = [];
            data['id'] = name;
            if (getButton(id).props.style[1].backgroundColor === '#F7819F') {
              return;
            } else {
              if (isSelect2[id] == false) {
                data['req'] = 'use';
              } else if (isSelect2[id] == true) {
                data['req'] = 'useCan';
              }
            }

            data['tnum'] = id;
            sendData.push(data);
            var jsonData = JSON.stringify(sendData);
            ws.current.send(jsonData);
          }
        }}>
        <Text>{id} 번 테이블 사용</Text>
      </Pressable>
    );
  };

  const getTable = id => {
    return (
      <Pressable
        //style={styles.tableContainer}
        style={[
          styles.tableContainer,
          {backgroundColor: isTableSelect[id] ? 'lightcoral' : 'powderblue'},
        ]}>
        <Text>{id}번 테이블</Text>
      </Pressable>
    );
  };

  const revSelect = (id, flag) => {
    isSelect[id] = flag;
    setSelect([
      isSelect[0],
      isSelect[1],
      isSelect[2],
      isSelect[3],
      isSelect[4],
      isSelect[5],
      isSelect[6],
      isSelect[7],
      isSelect[8],
      isSelect[9],
    ]);
  };
  const revSelect2 = (id, flag) => {
    isSelect2[id] = flag;
    setSelect2([
      isSelect2[0],
      isSelect2[1],
      isSelect2[2],
      isSelect2[3],
      isSelect2[4],
      isSelect2[5],
      isSelect2[6],
      isSelect2[7],
      isSelect2[8],
      isSelect2[9],
    ]);
  };
  const changeTable = id => {
    isTableSelect[id] = !isTableSelect[id];

    setTableSelect([
      isTableSelect[0],
      isTableSelect[1],
      isTableSelect[2],
      isTableSelect[3],
      isTableSelect[4],
      isTableSelect[5],
      isTableSelect[6],
      isTableSelect[7],
      isTableSelect[8],
      isTableSelect[9],
    ]);
  };
  // 컴포넌트가 렌더링 될 때마다 작업을 실행할 수 있도록 하는 Hook
  // useEffect Hook 최초 1회 웹소켓 정의 -> 다른 함수에서 웹소켓 인스턴스 사용x -> useRef 사용
  React.useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(websocketUrl);
      const serverMessagesList = [];
      // 웹소켓 열리면 서버와 연결되고 비활성화 버튼 false 처리
      ws.current.onopen = () => {
        setServerState('서버와 연결 되었습니다.');
        setDisableButton(false);
        var data = {};
        var sendData = [];
        data['id'] = name;
        data['req'] = 'con';
        sendData.push(data);
        var jsonData = JSON.stringify(sendData);
        ws.current.send(jsonData);
      };
      // 웹소켓 닫히면 버튼 비활성화 true 처리
      ws.current.onclose = e => {
        setServerState('연결이 끊어졌습니다.');
        setDisableButton(true);
      };
      // 에러 발생 시 에러 메시지
      ws.current.nerror = e => {
        setServerState(e.message);
      };
      // 서버 메시지
      ws.current.onmessage = e => {
        // 서버 메시지 리스트에 텍스트 값(스크롤뷰에 작성된)을 넣음

        //console.log('e.data ::: ' + e.data);
        // var jsonData = JSON.stringify(getData);
        jsonRev = JSON.parse(e.data);

        for (var i = 0; i < jsonRev.length; i++) {
          //console.log(jsonRev);

          if (jsonRev[i].req == 'res') {
            revSelect(jsonRev[i].tnum, true);
            changeTable(jsonRev[i].tnum, true);
            serverMessagesList.push(
              jsonRev[i].id +
                '님이 ' +
                jsonRev[i].tnum +
                '번째 테이블 ' +
                '예약.',
            );
            setServerMessages([...serverMessagesList]);
          } else if (jsonRev[i].req == 'use') {
            revSelect2(jsonRev[i].tnum, true);
            changeTable(jsonRev[i].tnum, true);
            serverMessagesList.push(
              jsonRev[i].id +
                '님이 ' +
                jsonRev[i].tnum +
                '번째 테이블 ' +
                '사용 중.',
            );
            setServerMessages([...serverMessagesList]);
          } else if (jsonRev[i].req == 'resCan') {
            revSelect(jsonRev[i].tnum, false);
            changeTable(jsonRev[i].tnum, false);
            serverMessagesList.push(
              jsonRev[i].id +
                '님이 ' +
                jsonRev[i].tnum +
                '번째 테이블 ' +
                '예약 취소.',
            );
            setServerMessages([...serverMessagesList]);
          } else if (jsonRev[i].req == 'useCan') {
            revSelect2(jsonRev[i].tnum, false);
            changeTable(jsonRev[i].tnum, false);
            serverMessagesList.push(
              jsonRev[i].id +
                '님이 ' +
                jsonRev[i].tnum +
                '번째 테이블 ' +
                '사용 완료.',
            );
            setServerMessages([...serverMessagesList]);
          } else if (jsonRev[i].req == 'sendmsg') {
            serverMessagesList.push(jsonRev[i].id + ': ' + jsonRev[i].msg);
            setServerMessages([...serverMessagesList]);
          }
        }
        //serverMessagesList.push(e.data);
        //setServerMessages([...serverMessagesList]);

        /* var testString =e.data;   // 원래 문자열
        var regex = /[^0-9]/g;            // 숫자가 아닌 문자열을 선택하는 정규식
        var result = testString.replace(regex, "");   */
      };
    }
  }, []);
  // 버튼 클릭 시 호출되는 함수

  const submitMessage = e => {
    var data = [];
    var sendData = {};
    sendData.id = name;
    sendData.req = 'sendmsg';
    sendData.msg = messageText;
    data.push(sendData);
    var jsonData = JSON.stringify(data);
    ws.current.send(jsonData);


    console.log(messageText);
    // document.getElementById("b").color="red";
    /* ws.current.send(messageText); // TextInput에 입력된 값(messageText)을 웹소켓에 전송 */
    setMessageText(''); // TextInput '' 로 변경
    //setInputFieldEmpty(true); // TextInput 비어도 된다
    //  Alert.alert('좌석 예약이 완료되었습니다!');
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 70,
          backgroundColor: '#eeceff',
          padding: 5,
          justifyContent: 'center',
        }}>
        <Text style={{marginTop: 40}}>{serverState}</Text>
      </View>
      <View
        style={{
          backgroundColor: '#ffeece',
          padding: 5,
          height: 200,
        }}>
        <Text>서버메시지</Text>
        <ScrollView>
          {serverMessages.map((item, ind) => {
            return <Text key={ind}>{item}</Text>;
          })}
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flexGrow: 1,
            padding: 5,
            height: 50,
            backgroundColor: 'white',
          }}
          placeholder={'메시지를 작성하세요'}
          onChangeText={text => {
            setMessageText(text);
            setInputFieldEmpty(text.length > 0 ? false : true);
          }}
          value={messageText}
        />
        <Button
          id="b"
          ref={inputRef}
          color="blue"
          onPress={submitMessage}
          title="mit"
        />
      </View>
      <ScrollView>
        <View>
          <View
            style={{
              marginLeft: 40,
              height: 70,
              flexDirection: 'row',
              top: 10,
            }}>
            {getButton(1)}
            {getButton2(1)}
          </View>
          <View
            style={{
              marginLeft: 40,
              height: 70,
              flexDirection: 'row',
              top: 10,
            }}>
            {getButton(2)}
            {getButton2(2)}
          </View>
          <View
            style={{
              marginLeft: 40,
              height: 70,
              flexDirection: 'row',
              top: 10,
            }}>
            {getButton(3)}
            {getButton2(3)}
          </View>
          <View
            style={{
              marginLeft: 40,
              height: 70,
              flexDirection: 'row',
              top: 10,
            }}>
            {getButton(4)}
            {getButton2(4)}
          </View>
          <View
            style={{
              marginLeft: 40,
              height: 70,
              flexDirection: 'row',
              top: 10,
            }}>
            {getButton(5)}
            {getButton2(5)}
          </View>
          <View
            style={{
              marginLeft: 40,
              height: 70,
              flexDirection: 'row',
              top: 10,
            }}>
            {getButton(6)}
            {getButton2(6)}
          </View>
          <View
            style={{
              marginLeft: 40,
              height: 70,
              flexDirection: 'row',
              top: 10,
            }}>
            {getButton(7)}
            {getButton2(7)}
          </View>
          <View
            style={{
              marginLeft: 40,
              height: 70,
              flexDirection: 'row',
              top: 10,
            }}>
            {getButton(8)}
            {getButton2(8)}
          </View>
          <View
            style={{
              marginLeft: 40,
              height: 70,
              flexDirection: 'row',
              top: 10,
            }}>
            {getButton(9)}
            {getButton2(9)}
          </View>
        </View>
      </ScrollView>

      <View style={{height: 235, borderTopWidth: 1}}>
        <View
          style={{marginLeft: 19, height: 70, flexDirection: 'row', top: 10}}>
          {getTable(1)}
          {getTable(2)}
          {getTable(3)}
        </View>

        <View
          style={{marginLeft: 19, height: 70, flexDirection: 'row', top: 20}}>
          {getTable(4)}
          {getTable(5)}
          {getTable(6)}
        </View>

        <View
          style={{marginLeft: 19, height: 70, flexDirection: 'row', top: 30}}>
          {getTable(7)}
          {getTable(8)}
          {getTable(9)}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 10,
    padding: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
  },
  button2Container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    marginLeft: 45,
  },
  tableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 60,
    backgroundColor: 'powderblue',
    marginRight: 30,
  },
});