import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import images from '../assets/imageAssets';
import {fonts, WIDTH} from '../theme';
import OptionsMenu from './OptionsMenu';

export interface ProductProps {
  id: number;
  isCheck?: boolean;
  image: string;
  name: string;
  price: number;
  quantity: number;
}
function formatCurrency(num: number) {
  if (!num) return '0 đ';
  const integerPart = Math.round(Math.abs(num)) * Math.sign(num);

  return (
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(integerPart) + ' đ'
  );
}

const options = [
  {
    label: 'Đánh dấu',
    value: 'option1',
    icon: images.ic_money_send,
  },
  {
    label: 'Lưu lại',
    value: 'option1',
    icon: images.ic_share,
  },
  {
    label: 'Xoá',
    value: 'option1',
    icon: images.ic_trash,
  },
];

const Product = ({
  product,
  handleAddition,
  handleSubtraction,
  handleCheck,
}: {
  product: ProductProps;
  handleAddition: (product: ProductProps) => void;
  handleSubtraction: (product: ProductProps) => void;
  handleCheck: (product: ProductProps) => void;
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => handleCheck(product)}
        style={[
          styles.btnCheck,
          !product.isCheck && {backgroundColor: '#fff'},
        ]}>
        <Image source={images.ic_check} style={styles.icon} />
      </TouchableOpacity>
      <Image source={{uri: product.image}} style={styles.image} />
      <View style={{flex: 1, gap: 4}}>
        <View style={styles.flexRow}>
          <Text numberOfLines={1} style={[styles.txtName]}>
            {product.name}
          </Text>
          <OptionsMenu options={options}>
            <Image source={images.ic_dot} style={styles.iconDot} />
          </OptionsMenu>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.txtPrice}>{formatCurrency(product.price)}</Text>
          <View style={styles.flexRow}>
            <Text style={styles.txtTitleCount}>Số lượng:</Text>
            <View style={[styles.flexRow, {gap: 4}]}>
              <TouchableOpacity
                onPress={() => handleSubtraction(product)}
                style={styles.btnOperation}>
                <Text style={styles.txtOperation}>-</Text>
              </TouchableOpacity>
              <Text style={styles.txtCount}>{product.quantity}</Text>
              <TouchableOpacity
                onPress={() => handleAddition(product)}
                style={styles.btnOperation}>
                <Text style={styles.txtOperation}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
          <TouchableOpacity style={styles.btnBuyNow}>
            <Text style={styles.txtBuyNow}>Mua ngay</Text>
          </TouchableOpacity>
          <Text style={styles.txtTotalPrice}>
            {formatCurrency(product.price * product.quantity)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(Product);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
    width: 16,
    height: 16,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtName: {
    ...fonts.medium14,
    fontWeight: '500',
    lineHeight: 22,
    flex: 1,
  },
  iconDot: {
    width: 16,
    height: 16,
  },
  txtPrice: {
    ...fonts.regular12,
    color: '#111928',
    flex: 1,
  },
  image: {
    width: WIDTH * 0.2,
    aspectRatio: 1,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  btnCheck: {
    borderWidth: 1,
    borderRadius: 1000,
    borderColor: '#DFE4EA',
    backgroundColor: '#3B82F6',
    padding: 3,
  },
  btnOperation: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#3B82F6',
    width: 22,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCount: {
    ...fonts.medium14,
    fontWeight: '400',
    color: '#000000',
  },
  txtOperation: {
    ...fonts.bold14,
    color: '#3B82F6',
  },
  txtTitleCount: {
    ...fonts.regular12,
    color: '#000000',
    marginRight: 6,
  },
  btnBuyNow: {
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  txtBuyNow: {
    ...fonts.regular14,
    color: '#3B82F6',
  },
  txtTotalPrice: {
    ...fonts.medium16,
    color: '#F23030',
    fontWeight: '500',
  },
});
