import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {fonts} from '../theme';
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  type?: 'primary' | 'outline';
  textColor?: string;
  containerStyle?: ViewStyle;
}

const ButtonCustom = ({
  title,
  type = 'primary',
  textColor,
  containerStyle,
  ...buttonProps
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...buttonProps}
      style={[
        styles.wrapper,
        type === 'outline' && styles.styleOutline,
        containerStyle,
      ]}>
      <Text
        style={[
          styles.txtTitle,
          {color: type === 'outline' ? '#111928' : '#fff'},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;

const styles = StyleSheet.create({
  txtTitle: {
    ...fonts.medium16,
    color: '#fff',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  styleOutline: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
});
