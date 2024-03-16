import React, {useEffect, useRef} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import BpIncommingMessagesListener from './BpIncommingMessageListener';
import BpWidget from './BpWidget';

const testingConfig = {
  composerPlaceholder: 'Chat with bot',
  botConversationDescription: 'Find any product or recipe you want',
  botId: '30acf549-5a9b-407f-84e8-68a1130c7454',
  hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
  messagingUrl: 'https://messaging.botpress.cloud',
  clientId: '30acf549-5a9b-407f-84e8-68a1130c7454',
  webhookId: 'bd9b8610-2469-4e3a-a5dd-1807d041d491',
  lazySocket: true,
  themeName: 'prism',
  frontendVersion: 'v1',
  showPoweredBy: false,
  theme: 'prism',
  themeColor: '#2563eb',
};

const Chat = () => {
  const botpressWebChatRef = useRef();

  useEffect(() => {
    sendExampleEvent();
  }, []);
  const sendExampleEvent = () => {
    botpressWebChatRef.current?.sendEvent({type: 'toggle'});
  };

  const sendExamplePayload = () => {
    botpressWebChatRef.current?.sendPayload({type: 'text', text: 'hello'});
  };

  const changeExampleConfig = () => {
    botpressWebChatRef.current?.mergeConfig({botName: Math.random()});
  };

  return (
    <>
      <BpWidget
        ref={botpressWebChatRef}
        botConfig={testingConfig}
        onMessage={event => {
          console.log('event from widget', event);
        }}
      />

      <BpIncommingMessagesListener
        botConfig={testingConfig}
        onBotMessage={event => {
          console.log('bot message', event);
        }}
      />
    </>
  );
};

export default Chat;
