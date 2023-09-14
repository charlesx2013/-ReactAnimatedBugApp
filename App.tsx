import React from 'react';
import {DeviceEventEmitter, SafeAreaView, ScrollView, View} from 'react-native';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

function App() {
  const showPipViewValue = useSharedValue(false);
  const [showPipView, setShowPipView] = React.useState(false);

  const pipModeChangedCallback = React.useCallback(
    (pipMode: boolean) => {
      console.log('what is happening', 'pipModeChangedCallback');
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > 2000) {
          break;
        }
      }
      showPipViewValue.value = pipMode;
    },
    [showPipViewValue],
  );

  React.useEffect(() => {
    DeviceEventEmitter.addListener('onPipModeChange', ({isInPipMode}) => {
      console.log('what is happening', 'pip mode changed', isInPipMode);
      pipModeChangedCallback(isInPipMode);
    });
    return () => {
      DeviceEventEmitter.removeAllListeners('onPipModeChange');
    };
  }, [pipModeChangedCallback]);

  useAnimatedReaction(
    () => showPipViewValue.value,
    newIsInPipModeValue => {
      runOnJS(setShowPipView)(newIsInPipModeValue);
    },
  );

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {!showPipView && (
          <View
            style={{
              flex: 1,
              height: 100,
              backgroundColor: 'green',
            }}
          />
        )}
        {showPipView && (
          <View
            style={{
              flex: 1,
              height: 100,
              backgroundColor: 'blue',
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
