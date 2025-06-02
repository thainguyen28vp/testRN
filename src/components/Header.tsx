import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import images from '../assets/imageAssets';
import {fonts} from '../theme';
interface HeaderProps {
  title: string;
  onBack?: () => void;
}

const Header = ({title, onBack}: HeaderProps) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onBack}>
        <Image source={images.ic_back} style={styles.iconBack} />
      </TouchableOpacity>
      <Text style={styles.txtTitle}>{title}</Text>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  iconBack: {
    width: 24,
    height: 24,
  },
  txtTitle: {
    ...fonts.bold18,
    lineHeight: 26,
    fontWeight: '500',
  },
});
