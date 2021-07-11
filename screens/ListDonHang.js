import React from 'react';
import {
  StyleSheet, Dimensions,
  ScrollView,
  View, Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler,

} from 'react-native';
import DangNhap from '../screens/DangNhap'
import { Block, theme } from 'galio-framework';
import API from "../Services/api"
import { Button, Icon, Input, Select, } from "../components";
import { NavigationEvents } from 'react-navigation';
import { Alert } from 'react-native';
import moment from 'moment'
import { Images, argonTheme } from "../constants";
///
import Geocoder from 'react-native-geocoder';
import * as Permissions from 'expo-permissions';
//import Location from 'react-native-geocoder';
import * as Location from 'expo-location';
import getDistance from 'geolib/es/getDistance';
import * as geolib from 'geolib';
import MapView from 'react-native-maps';
////
const { width } = Dimensions.get('screen');


class ListDonHang extends React.Component {
  constructor(props) {
    super(props);
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      loading: false,
      dataSource: [],
      DonHang: [],
      khachHang: '',
      DichVu: '',
      maGT: '',
      apiKey: '',
      matho: props.route.params.ma,
      // latitude:props.route.params.latitude,
      // longitude:props.route.params.longitude,
      //toado: props.route.params.toado,
      //donhang:props.route.params.donhang,
      dichvuInfotho: [],
      dichvuInfotho1: [],
      diachi: '19/3D đường số 30, phường Linh Đông, quận Thủ Đức, tp. Hồ Chí Minh, Việt Nam',
      LatLng: {
        latitude: 10.7951612,
        longitude: 106.7195944,
      },
      LatLng1: {
        latitude: 10.7951612,
        longitude: 106.7195944,
      },
      kc: 0,
    };

   
  }
  componentDidMount()
  {
    // console.log("dat")
    // console.log(this.state.donhang)
    API.get('HoaDon/GETALLBYMATHO/' + this.state.matho)
    .then(res => {
        const dataSource = res.data;
        this.setState({ dataSource });
    })
    API.get('GoiTho/GetAll/' + this.state.matho)
    .then( async res => {
      const DonHang = res.data;
      this.setState({ DonHang });
    }) 
    .catch(error => console.log(error))

  }

  renderItem = (data) =>
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>Đơn hàng mới</Text>
      <Text style={{ marginLeft: 20 }}>Tên khách hàng:  {data.item.tenKH}</Text>
      <Text style={{ marginLeft: 20 }}>Ngày gọi:   {moment(data.item.ngayGoi).format('DD/MM/yyyy \n HH:mm')}</Text>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => {
        const { navigate } = this.props.navigation;
        navigate('Chi Tiết Gọi Thợ', { ma: data.item.maGT })
      }}>
        <Text style={styles.loginText}>Xem chi tiết</Text>
      </TouchableHighlight>
    </TouchableOpacity>

  renderLoaiDV = () => {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
          <Text>Dat</Text>
        </View>
      )
    }
    
    return (
      
      <View style={styles.container}>
        <FlatList
          data={this.state.DonHang}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.maGT.toString()}
        />

      </View>
    )
  }

  render() {
    if(this.state.dataSource.length>=3)
    {
      return (
        <Block flex center style={styles.home}>
          <Icon
            size={100}
            color={argonTheme.COLORS.ICON}
            name="spaceship"
            family="ArgonExtra"
            style={{ marginTop: 150 }}
          />
          <Block style={{ backgroundColor: '#ffd700', height: 40, borderRadius: 10, width: 320, marginTop: 20 }}>
            <Text style={{ fontSize: 20, color: '#000000', marginTop: 5, marginLeft: 5 }}>Bạn đã nhận nhiều hơn 3 đơn hàng</Text>

          </Block>
        </Block>
      )
    
    }else if (this.state.DonHang.length>0) {
      //console.log(this.state.DonHang)
      return (
        <Block flex center style={styles.home}>
          {this.renderLoaiDV()}
        </Block>
      );
    }
     else {
      return (
        <Block flex center style={styles.home}>

          <Icon
            size={100}
            color={argonTheme.COLORS.ICON}
            name="spaceship"
            family="ArgonExtra"
            style={{ marginTop: 150 }}
          />
          <Block style={{ backgroundColor: '#ffd700', height: 40, borderRadius: 10, width: 320, marginTop: 20 }}>
            <Text style={{ fontSize: 20, color: '#000000', marginTop: 5, marginLeft: 5 }}>Hiện tại bạn chưa có đơn hàng nào</Text>

          </Block>
        </Block>
      )
    }
   }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  button: {

    width: width - theme.SIZES.BASE * 2
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 1,
    minHeight: 114,
    marginBottom: 16,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 20,
    borderColor: '#000000'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 250,
    borderRadius: 30,
    marginBottom: 10
  },
  loginButton: {
    backgroundColor: "#f08080",
    marginHorizontal: 40,
  },
  title: {
    color: '#dc143c',
    fontSize: 20,
    fontWeight: "300",
    justifyContent: 'center',
    marginLeft: 100
  }
});

export default ListDonHang;
