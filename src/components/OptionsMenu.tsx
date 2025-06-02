import React, {useState, useRef, Children} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  ImageSourcePropType,
  Image,
  ViewStyle,
} from 'react-native';
import {fonts} from '../theme';

interface ItemOptionProps {
  label: string;
  value: string;
  icon: ImageSourcePropType;
}
interface OptionProps {
  options: ItemOptionProps[];
  onSelect?: (option: ItemOptionProps) => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
}

const OptionsMenu = ({
  options = [],
  onSelect,
  containerStyle,
  children,
}: OptionProps) => {
  const [visible, setVisible] = useState(false);

  const [position, setPosition] = useState({top: 0, left: 0, width: 0});
  const triggerRef = useRef<any>(null);

  const measureTrigger = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          const screenHeight = Dimensions.get('window').height;
          const screenWidth = Dimensions.get('window').width;
          const spaceBelow = screenHeight - y - height;
          const menuHeight = options.length * 50;
          const minMenuWidth = width;
          const maxContentWidth = Math.max(
            ...options.map(option => option.label.length * 10),
          );
          const menuWidth = Math.max(minMenuWidth, maxContentWidth + 60);

          let finalLeft = x;
          let finalTop = y + height + 5;

          if (x + menuWidth > screenWidth) {
            finalLeft = screenWidth - menuWidth - 10;
          }

          if (spaceBelow < menuHeight) {
            finalTop = y - menuHeight - 5;
          }

          setPosition({
            top: finalTop,
            left: finalLeft,
            width: menuWidth,
          });
        },
      );
    }
  };

  const handleSelect = (option: ItemOptionProps) => {
    onSelect?.(option);
    setVisible(false);
  };

  // const renderTrigger = () => {
  //   if (trigger === 'dotsa') {
  //     return (
  //       <TouchableOpacity
  //         ref={triggerRef}
  //         onPress={() => {
  //           measureTrigger();
  //           setVisible(!visible);
  //         }}
  //         style={styles.dotsButton}>
  //         <View style={styles.dot} />
  //         <View style={styles.dot} />
  //         <View style={styles.dot} />
  //       </TouchableOpacity>
  //     );
  //   } else {
  //     return (
  //       <TouchableOpacity
  //         ref={triggerRef}
  //         onPress={() => {
  //           measureTrigger();
  //           setVisible(!visible);
  //         }}>
  //         <InputCustom disabled />
  //       </TouchableOpacity>
  //     );
  //   }
  // };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        ref={triggerRef}
        onPress={() => {
          measureTrigger();
          setVisible(!visible);
        }}>
        {children}
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.optionsContainer,
                  {
                    top: position.top,
                    left: position.left,
                    width: position.width,
                  },
                ]}>
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.option,
                      index === options.length - 1 && styles.lastOption,
                    ]}
                    onPress={() => handleSelect(option)}>
                    {option.icon && (
                      <Image source={option.icon} style={styles.icon} />
                    )}
                    <Text style={styles.optionText} numberOfLines={1}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  optionsContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dotsButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 5,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#333',
    marginVertical: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 6,
    borderBottomColor: '#eee',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionText: {
    ...fonts.regular14,
    color: '#111928',
    flex: 1,
  },
  icon: {
    marginRight: 10,
    width: 16,
    height: 16,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    minHeight: 45,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 12,
    color: '#333',
    marginLeft: 5,
  },
});

export default OptionsMenu;
