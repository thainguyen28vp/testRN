import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import Header from '../components/Header';
import InputCustom from '../components/InputCustom';
import images from '../assets/imageAssets';
import Product, {ProductProps} from '../components/Product';
import products from './data';
import ButtonCustom from '../components/ButtonCustom';
import ModalProduct from '../components/ModalProduct';

const OrderScreen = () => {
  const [txtSearch, setTxtSearch] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [data, setData] = useState<ProductProps[]>(products);
  const [dataSelected, setDataSelected] = useState<ProductProps[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (text: string) => {
    setTxtSearch(text);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      const dataFilter = products.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      setData(dataFilter);
    }, 500);
  };

  const handleSubtraction = useCallback(
    (product: ProductProps) => {
      let dataClone = [...data];
      const index = dataClone.findIndex(item => item.id === product.id);
      dataClone[index] = {
        ...dataClone[index],
        quantity: dataClone[index].quantity - 1,
      };
      setData(dataClone);
    },
    [data],
  );

  const handleCheck = useCallback(
    (product: ProductProps) => {
      let dataClone = [...data];
      const index = dataClone.findIndex(item => item.id === product.id);
      dataClone[index] = {
        ...dataClone[index],
        isCheck: !dataClone[index].isCheck,
      };
      setData(dataClone);
    },
    [data],
  );
  const handleAddition = useCallback(
    (product: ProductProps) => {
      let dataClone = [...data];
      const index = dataClone.findIndex(item => item.id === product.id);
      dataClone[index] = {
        ...dataClone[index],
        quantity: dataClone[index].quantity + 1,
      };
      setData(dataClone);
    },
    [data],
  );

  const renderItem = useCallback(
    ({item}: {item: ProductProps}) => {
      return (
        <Product
          product={item}
          handleAddition={handleAddition}
          handleSubtraction={handleSubtraction}
          handleCheck={handleCheck}
        />
      );
    },
    [data],
  );

  const handleConfirm = () => {
    const dataCheck = [...data].filter(item => item.isCheck);
    setDataSelected(dataCheck);
    setIsVisibleModal(true);
  };

  const onCloseModal = useCallback(() => {
    setIsVisibleModal(false);
  }, []);
  const handleConfirmModal = useCallback(() => {
    setIsVisibleModal(false);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Chọn sản phẩm có sẵn" />
      <View style={styles.viewContent}>
        <View style={styles.wrapperInput}>
          <InputCustom
            value={txtSearch}
            onChangeText={handleSearch}
            mode="dark"
            leftIcon={images.ic_search}
            containerStyle={{flex: 1}}
            placeholder="Tìm theo tên, mã sản phẩm, ..."
          />
          <TouchableOpacity style={styles.btnSort}>
            <Image source={images.ic_sort} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatlist}
          ListEmptyComponent={<Text>Không có kết quả phu hợp</Text>}
        />
      </View>
      <View style={styles.viewButton}>
        <ButtonCustom
          type="outline"
          title="Huỷ"
          containerStyle={styles.btnConfirm}
        />
        <ButtonCustom
          title="Xác nhận"
          containerStyle={styles.btnConfirm}
          onPress={handleConfirm}
        />
      </View>
      <ModalProduct
        visible={isVisibleModal}
        onClose={onCloseModal}
        onConfirm={handleConfirmModal}
        products={dataSelected}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewContent: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  btnSort: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DFE4EA',
    padding: 2,
  },
  flatlist: {
    gap: 12,
    padding: 16,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    // backgroundColor: '#fff',
  },

  btnConfirm: {
    width: '48%',
  },
});
