import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import WebView from 'react-native-webview';
const App = () => {
  let myWebView;
  const [color, setColor] = useState('skyblue');
  const changeBgWebviewhtml = () => {
    myWebView.postMessage(color);
  };
  const renderLoading = () => (
    <ActivityIndicator
      style={{flex: 1}}
      animating
      color="#6667AB"
      size="large"></ActivityIndicator>
  );
  // const runFirst = `
  //   document.body.style.backgroundColor = '#6667ab';
  //   setTimeout(function() {window.alert('hi?')}, 2000);
  //   true; // note: this is required, or you'll sometimes get silent failures
  // `;
  return (
    <View style={{flex: 1}}>
      <View style={{borderColor: 'red', borderStyle: 'solid', borderWidth: 3}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
            color: '#2598eb',
          }}>
          App Area
        </Text>
        <TextInput
          placeholder="Insert Color for setting body webview"
          onChangeText={setColor}></TextInput>
        <Button
          onPress={changeBgWebviewhtml}
          title={'SET BACKGROUND BODY WEBVIEW'}></Button>
      </View>
      <WebView
        ref={el => (myWebView = el)}
        startInLoadingState={true}
        renderLoading={renderLoading}
        // injectedJavaScript={runFirst}
        onLoadEnd={() => {
          myWebView.postMessage('#6667AB');
        }}
        onMessage={event => {
          let data = JSON.parse(event.nativeEvent.data);
          let msg = data['msg'] + ' = ' + data['time'];
          ToastAndroid.show(msg, ToastAndroid.SHORT);
        }}
        z
        source={{uri: 'https://rnmsw.minver.kr/'}}></WebView>
    </View>
  );
};

export default App;
