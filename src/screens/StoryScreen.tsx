import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../components/Header';
import images from '../assets/imageAssets';
import {fonts, WIDTH} from '../theme';
import InputCustom from '../components/InputCustom';
import OptionsMenu from '../components/OptionsMenu';
import {PACKAGE_LABLE, PACKAGE_TYPE} from '../constants';
import PackageRadio from '../components/PackageRadio';
import ButtonCustom from '../components/ButtonCustom';

const options = [
  {
    label: 'Riêng tư',
    value: 'option1',
    icon: images.ic_money_send,
  },
  {
    label: 'Nội bộ',
    value: 'option1',
    icon: images.ic_share,
  },
  {
    label: 'Công khai',
    value: 'option1',
    icon: images.ic_trash,
  },
];

const pakageData = [
  {
    id: PACKAGE_TYPE.OFTEN,
    title: PACKAGE_LABLE[PACKAGE_TYPE.OFTEN],
  },
  {
    id: PACKAGE_TYPE.VIP,
    title: PACKAGE_LABLE[PACKAGE_TYPE.VIP],
  },
  {
    id: PACKAGE_TYPE.ADVERTISEMENT,
    title: PACKAGE_LABLE[PACKAGE_TYPE.ADVERTISEMENT],
  },
];
const StoryScreen = () => {
  const [packageId, setPackageId] = useState(0);
  const [scope, setScope] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const [errors, setErrors] = useState({
    title: '',
    price: '',
    scope: '',
  });

  const handleCheckRadio = (item: any) => {
    setPackageId(item.id);
    if (item.id === PACKAGE_TYPE.ADVERTISEMENT) setScope(options[2]);
  };

  const onSelectMenu = useCallback((item: any) => {
    setScope(item);
  }, []);

  const validate = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      price: '',
      scope: '',
    };

    if (!title.trim()) {
      newErrors.title = 'Vui lòng điền tiêu đề';
      isValid = false;
    }

    if (!price) {
      newErrors.price = 'Vui lòng điền giá';
      isValid = false;
    }
    if (!scope) {
      newErrors.scope = 'Vui lòng chọn phạm vị';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleConfirm = () => {
    if (validate()) {
      // Xử lý
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Tạo tin" />

      <ScrollView contentContainerStyle={styles.viewContent}>
        <TouchableOpacity style={styles.btnSearch}>
          <Image
            source={images.ic_search}
            tintColor="#fff"
            style={styles.icon}
          />
          <Text style={styles.txtSearch}>Chọn sản phẩm có sẵn</Text>
        </TouchableOpacity>
        <Text>Hãy chọn sản phẩm có sẵn</Text>
        <InputCustom
          title="Tiêu đề"
          isRequired
          subTitle="0/150"
          placeholder="Tiêu đề"
          value={title}
          onChangeText={setTitle}
          textError={errors.title}
        />
        <View style={styles.flexRow}>
          <InputCustom
            title="Giá hiển thị (VNĐ)"
            isRequired
            placeholder="Tiêu đề"
            containerStyle={{width: '48%'}}
            value={price}
            onChangeText={setPrice}
            textError={errors.price}
          />
          <OptionsMenu
            onSelect={onSelectMenu}
            options={options}
            containerStyle={styles.optionMenuStyle}>
            <InputCustom
              title="Phạm vi hiển thị"
              isRequired
              placeholder="Tiêu đề"
              disabled
              value={scope?.label || ''}
              textError={errors.scope}
            />
          </OptionsMenu>
        </View>
        <InputCustom title="Mô tả" placeholder="Mô tả" />
        <View>
          <Text style={styles.txtTitleInput}>Hình ảnh / Video</Text>
          <TouchableOpacity style={styles.btnChooseImage}>
            <Text style={styles.txtPlus}>+</Text>
            <Text style={styles.txtNumberImage}>0/24</Text>
          </TouchableOpacity>
          <Text style={styles.txtDesImage}>
            Hỗ trợ JPG/PNG/MP4, tối đa 15 ảnh, dung lượng ≤ 5MB
          </Text>
        </View>
        <InputCustom
          title="Thời hạn hiển thị (Ngày)"
          placeholder="Mô tả"
          value="15"
        />
        <View>
          <Text style={styles.txtTitleInput}>Gói hiển thị</Text>
          <View style={styles.viewRadio}>
            {pakageData.map(item => (
              <PackageRadio
                item={item}
                handleCheckRadio={handleCheckRadio}
                isCheck={item.id === packageId}
              />
            ))}
          </View>
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
};

export default StoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 16,
    height: 16,
  },
  txtSearch: {
    ...fonts.regular14,
    color: '#fff',
  },
  btnSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    gap: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  viewContent: {
    padding: 16,
    gap: 12,
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
  },
  optionMenuStyle: {
    flex: 1,
  },
  txtTitleInput: {
    ...fonts.medium14,
    color: '#111928',
  },
  btnChooseImage: {
    width: WIDTH * 0.2,
    aspectRatio: 1,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtDesImage: {
    ...fonts.regular14,
    color: '#637381',
  },
  txtNumberImage: {
    ...fonts.regular14,
    color: '#3B82F6',
  },
  txtPlus: {
    ...fonts.regular18,
    color: '#3B82F6',
  },
  viewRadio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnConfirm: {
    width: '48%',
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,

    paddingVertical: 12,
    // backgroundColor: '#fff',
  },
});
