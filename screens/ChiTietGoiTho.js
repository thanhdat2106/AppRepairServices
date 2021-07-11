import React, { useState } from "react";
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-check-box'
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView,
    Picker,
    FlatList,
    Alert,
    TouchableOpacity,
    View,
    BackHandler,
    TextInput,
    ActivityIndicator, 
    Text
} from "react-native";
import { Block, Checkbox, theme } from "galio-framework";
import Textarea from 'react-native-textarea';
import { Button, Icon, Input, Select, } from "../components";
import { Images, argonTheme } from "../constants";
import API from "../Services/api"
import { number } from "prop-types";
import { useRoute } from '@react-navigation/native';
import { color } from "react-native-reanimated";
import moment from 'moment'
///
import Geocoder from 'react-native-geocoder';
import * as Permissions from 'expo-permissions';
//import Location from 'react-native-geocoder';
import * as Location from 'expo-location';
import getDistance from 'geolib/es/getDistance';
import * as geolib from 'geolib';
import MapView from 'react-native-maps';
////
const { width, height } = Dimensions.get("screen");

class ChiTietGoiTho extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ma: props.route.params.ma,
            matho: props.route.params.matho,
            loading: false,
            dataSource: [],
            goitho: [],
            PhuongXa: [],
            hoadon: '',
            tenduong:'',
            diachi:'19/3D đường số 30, phường Linh Đông, quận Thủ Đức, tp. Hồ Chí Minh, Việt Nam',
            LatLng: {
                latitude: 10.7951612,
                longitude: 106.7195944,
              },
              LatLng1: {
                latitude: 10.7951612,
                longitude: 106.7195944,
              },
            phidichuyen: 0
        };
    }
    componentDidMount() {
        Permissions.askAsync(Permissions.LOCATION);
        try{
        API.get('GoiTho/' + this.state.ma)
            .then(res => {
                const dataSource = res.data;
                this.setState({ dataSource });
                this.setState({ goitho: res.data[0] });
                this.state.diachi = res.data[0].soNha
                this.state.tenduong = res.data[0].soNha.toString().split(" ")
                API.get('PhuongXa/GetAllByID/' + res.data[0].maPX)
                    .then(res1 => {
                        const PhuongXa = res1.data[0];
                        this.setState({ PhuongXa })
                        this.state.diachi = this.state.diachi+', '+ res1.data[0].tenPX+', '+ res1.data[0].tenQH+', '+ res1.data[0].tenTinh
                        this._attemptGeocodeAsync(this.state.diachi)
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error)) //to catch the errors if any
            
        }catch{
            
        }
       
console.log(this.state.goitho)
    }
    ///////
getlocation= async ()=>
{
this._maybeRenderResult();
  await navigator.geolocation.getCurrentPosition(
    (position) => {
      this.state.LatLng1.latitude = position.coords.latitude
      this.state.LatLng1.longitude = position.coords.longitude
    //   console.log(this.state.diachi)
    //   console.log("Dat1"+this.state.LatLng1.latitude)
    //   console.log("Dat2"+this.state.LatLng.latitude)
     this.setState({phidichuyen:Number( geolib.getPreciseDistance(
        { latitude:  this.state.LatLng1.latitude, longitude:  this.state.LatLng1.longitude },
        { latitude:  this.state.LatLng.latitude, longitude:  this.state.LatLng.longitude }
      )) })
      console.log(this.state.phidichuyen)
    },
    () => {
      alert('Position could not be determined.');
    }
  );
}
_attemptGeocodeAsync = async (item) => {

    this.setState({ inProgress: true, error: null });
    try {
      let result = await Location.geocodeAsync(item);
      this.setState({ result });
    } catch (e) {
      this.setState({ error: e.message });
    } finally {
      this.setState({ inProgress: false });
    }
  };
 
  _maybeRenderResult = () => {
    if (this.state.inProgress) {
      return <ActivityIndicator style={{ marginTop: 10 }} />;
    } else if (this.state.result) {
      this.state.LatLng.latitude = JSON.stringify(this.state.result[0].latitude)
      this.state.LatLng.longitude = JSON.stringify(this.state.result[0].longitude)
      // this.state.LatLng1.latitude = JSON.stringify(this.state.result1[0].latitude)
      // this.state.LatLng1.longitude = JSON.stringify(this.state.result1[0].longitude)

    } else if (this.state.error) {
      return (
        <Text style={styles.errorResultText}>
          cannot resolve: {JSON.stringify(this.state.error)}
        </Text>
      );
    }
  };
create= ()=> {
    this._maybeRenderResult();
   navigator.geolocation.getCurrentPosition(
    (position) => {
      this.state.LatLng1.latitude = position.coords.latitude
      this.state.LatLng1.longitude = position.coords.longitude
      console.log(this.state.diachi)
      console.log("Dat1"+this.state.LatLng1.latitude)
      console.log("Dat2"+this.state.LatLng.latitude)
     this.setState({phidichuyen:geolib.getPreciseDistance(
        { latitude:  this.state.LatLng1.latitude, longitude:  this.state.LatLng1.longitude },
        { latitude:  this.state.LatLng.latitude, longitude:  this.state.LatLng.longitude }
      ) })
      console.log( this.state.phidichuyen*3)
      API.post(`HoaDon`,
            {
                maKH: this.state.goitho.maKH,
                thueVAT: parseFloat(0.1),
                phidichuyen: Number(this.state.phidichuyen*3),
                ngayLap: new Date(),
                trangThai: 0
            })
            .then(res => {
                for(var i=0; i<this.state.dataSource.length; i++)
                {
                    API.post(`ChiTietHoaDon`,
                    {
                        maHD: Number(res.data.maHD),
                        maDV: Number(this.state.dataSource[i].maDV),
                        maTho: Number(this.state.matho),
                        hanBaoHanh: "2021-12-12"
                    })
                    .then(res=>{
                        console.log(res.data)
                        API.put(`GoiTho`,
                        {
                            maGT : Number(this.state.ma),
                            maKH:Number(1),
                            ngayGoi:'2021-01-21T01:13:31.197',
                            ghiChu:' ',
                            trangThai:Number(1)
                        })
                    })
                    .catch(error => console.log(error))
                    
                }
                API.post(`DanhGia`,
                {
                    maHD: Number(res.data.maHD),
                    diemDGKhachHang: 4,
                    diemDGTho: 4,
                    nhanXetKhachHang:"Không",
                    nhanXetTho: "Không"
                })
                .then(res => {
                    this.setState({ hoadon: res.data.maHD })
                    alert("Bạn đã nhận đơn hàng thành công!!!")
                    console.log(this.state.dataSource)
                   this.props.navigation.goBack();
                   this.props.navigation.goBack();
                })
                .catch(error => console.log(error));
               
            })
    },
    
  );
        
      
       
        console.log(this.state.LatLng)
        console.log(this.state.phidichuyen)

    }
    renderItem = (data) =>
        <TouchableOpacity style={styles.card}>
            <Text style={styles.text}>{data.item.tenDV}</Text>
        </TouchableOpacity>
    renderDichVu = () => {
        if (this.state.loading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.maDV.toString()}
                />

            </View>
        )
    }
    render() {
        //const { ma } = this.props.route.params;
        
        return (
            <ScrollView>
            <Block flex middle >
                
                
        
                <Block flex middle >


                    <Block >
                   
                        <Block flex >
                            <Block flex={0.07} middle style={{marginTop:70}}>
                                <Text style={{fontSize:25, color:'#8b0000'}}>
                                    Chi tiết đơn hàng
                  </Text>
                            </Block>
                            <Block flex >
                                <KeyboardAvoidingView
                                    style={{ flex: 1 }}
                                    behavior="padding"
                                    enabled
                                >
                                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                        <Text style={styles.text}>Tên khách hàng </Text>
                                        <TextInput
                            style={styles.inputs}
                            editable={false}
                            value ={"   " + this.state.goitho.tenKH}

                        />
                                    </Block>
                                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                    <Text style={styles.text}>Tên dịch vụ
                                    
                                    </Text>
                                        <FlatList
                                            data={this.state.dataSource}
                                            renderItem={({ item }) =>  <TextInput
                                            style={styles.inputs}
                                            editable={false}
                                            value ={"   " + item.tenDV}
                
                                        />}
                                        />
                                    </Block>
                                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                        <Text style={styles.text}>Ngày gọi </Text>
                                        <TextInput
                                                style={styles.inputs}
                                                editable={false}
                                                value ={"   " +  moment(this.state.goitho.ngayGoi).format('DD/MM/yyyy \n HH:mm')}

                                            />
                                    </Block>
                                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                        <Text style={styles.text}>Địa chỉ</Text>
                                        <Text
                                         //containerStyle={styles.textareaContainer}
                                         //style={styles.textarea}
                                         //maxLength={120}
                                                style={styles.inputs}
                                                editable={false}
                                                //value ={this.state.PhuongXa.tenPX + this.state.PhuongXa.tenQH+"-"+this.state.PhuongXa.tenTinh}

                                            >{this.state.PhuongXa.tenPX + "-"+this.state.PhuongXa.tenQH+"-"+this.state.PhuongXa.tenTinh}</Text>
                                    </Block>
                                    <Block width={width * 0.8} style={{ marginBottom: 15, }}>
                                        <Text style={styles.text}>Ghi chú  </Text>
                                        <Text
                                                style={styles.input}
                                                editable={false}
                                                value ={" " + this.state.goitho.ghiChu}
                                                // multiline={true}
                                                // numberOfLines={7}
                                            > {" " + this.state.goitho.ghiChu}</Text>
                                    </Block>
                                    <Block middle>
                                        <Button color="primary" style={styles.createButton} onPress={() => this.create(this)}>
                                            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                                Nhận  đơn hàng
                            </Text>
                                        </Button>
                                    </Block>
                                </KeyboardAvoidingView>
                            </Block>
                            
                        </Block>
                        
                    </Block>

                </Block>

               

            </Block>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 17,
      
    },
    inputs: {

        height: 45,
        marginLeft:5,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        color: '#000000',

    },
    input:{
        height: 150,
        marginLeft:5,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        color: '#000000',
    },
    registerContainer: {
        width: width * 0.9,
        height: height * 0.78,
        backgroundColor: '#F4F5F7',
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
          width: 0,
          height: 4
        },
        
        
   
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 6,
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
    },
});

export default ChiTietGoiTho;