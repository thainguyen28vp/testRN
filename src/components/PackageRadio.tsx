import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fonts} from '../theme';
interface RadioProps {
  id: number;
  title: string;
}

const PackageRadio = ({
  handleCheckRadio,
  item,
  isCheck,
}: {
  item: RadioProps;
  isCheck: boolean;
  handleCheckRadio: (item: RadioProps) => void;
}) => (
  <TouchableOpacity
    onPress={() => handleCheckRadio(item)}
    style={styles.wrapper}>
    <View style={[styles.btnRadio, isCheck && styles.styleIsCheck]} />
    <Text style={styles.txtTitle}>{item.title}</Text>
  </TouchableOpacity>
);

export default PackageRadio;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  btnRadio: {
    width: 24,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#DFE4EA',
  },
  styleIsCheck: {
    borderWidth: 5,
    borderColor: '#3B82F6',
  },
  txtTitle: {
    ...fonts.regular14,
    color: '#111928',
  },
});
