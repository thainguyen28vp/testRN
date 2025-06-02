import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {memo} from 'react';
import {fonts} from '../theme';
import ButtonCustom from './ButtonCustom';
import {ProductProps} from './Product';

interface ModalProductProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  products: ProductProps[];
}

const ModalProduct = ({
  visible,
  onClose,
  onConfirm,
  products,
}: ModalProductProps) => {
  console.log(products);

  const totalAmount = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const renderItem = ({item}: {item: ProductProps}) => {
    return (
      <View key={item.id} style={styles.productItem}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text numberOfLines={1} style={styles.productName}>
            {item.name}
          </Text>
          <View style={styles.priceRow}>
            <Text>Đơn giá: {item.price.toLocaleString()}đ</Text>
            <Text>Số lượng: {item.quantity}</Text>
          </View>
          <Text style={styles.totalPrice}>
            {(item.price * item.quantity).toLocaleString()}đ
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.txtClose}>✕</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.titleHeader}>Xác nhận đơn hàng</Text>
          </View>

          <View style={styles.productList}>
            <FlatList
              data={products}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={<Text>Không có kết quả phu hợp</Text>}
            />
          </View>

          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Tổng số tiền:</Text>
            <Text style={styles.totalAmount}>
              {totalAmount.toLocaleString()}đ
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <ButtonCustom
              type="outline"
              title="Huỷ"
              onPress={onClose}
              containerStyle={styles.btnModalConfirm}
            />
            <ButtonCustom
              onPress={onConfirm}
              title="Xác nhận"
              containerStyle={styles.btnModalConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ModalProduct);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    minHeight: '30%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  header: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleHeader: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
    right: 0,
  },
  productList: {
    maxHeight: '60%',
  },
  productItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    marginBottom: 8,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalPrice: {
    color: 'red',
    fontWeight: '600',
    textAlign: 'right',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  txtClose: {
    ...fonts.medium18,
    textAlign: 'right',
  },
  btnModalConfirm: {
    width: '48%',
  },
});
