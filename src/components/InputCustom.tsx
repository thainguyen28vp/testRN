import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo} from 'react';
import {fonts} from '../theme';

interface InputCustomProps extends TextInputProps {
  title?: string;
  subTitle?: string;
  isRequired?: boolean;
  textError?: string;
  leftIcon?: ImageSourcePropType;
  mode?: 'light' | 'dark';
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

const InputCustom = ({
  title,
  subTitle,
  isRequired,
  leftIcon,
  textError,
  disabled,
  containerStyle,
  mode = 'light',
  ...inputProps
}: InputCustomProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.wrapperTitle}>
        {title && (
          <Text style={styles.title}>
            {title}
            {isRequired && <Text style={styles.textRequired}> *</Text>}
          </Text>
        )}
        {subTitle && <Text style={styles.txtSubTitle}>{subTitle}</Text>}
      </View>
      <View
        style={[
          styles.inputContainer,
          mode === 'dark' && styles.darkBackground,
          !!textError && {borderColor: '#FF0000'},
        ]}>
        {leftIcon && <Image source={leftIcon} style={styles.icon} />}
        <TextInput
          editable={!disabled}
          pointerEvents={!!disabled ? 'none' : 'auto'}
          style={styles.input}
          {...inputProps}
        />
      </View>
      {textError && <Text style={styles.txtError}>{textError}</Text>}
    </View>
  );
};

export default memo(InputCustom);

const styles = StyleSheet.create({
  container: {
    // width: '100%',
  },
  input: {
    ...fonts.regular14,
    fontWeight: '400',
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    padding: 7,
  },
  title: {
    ...fonts.regular14,
    fontWeight: '500',
    color: '#111928',
    flex: 1,
  },
  textRequired: {
    color: '#F23030',
    ...fonts.regular14,
    fontWeight: '500',
  },
  txtSubTitle: {
    color: '#8899A8',
    ...fonts.regular14,
    fontWeight: '400',
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  darkBackground: {
    backgroundColor: '#7878801F',
    borderWidth: 0,
  },
  txtError: {
    ...fonts.regular14,
    color: '#FF0000',
    marginTop: 2,
  },
});
