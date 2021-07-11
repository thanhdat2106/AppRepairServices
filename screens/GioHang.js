import React, { useState } from "react";
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-check-box'
import Moment from 'moment';
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
  TouchableHighlight,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { Button, Icon, Input, Select, } from "../components";
import API from "../Services/api"
const { width } = Dimensions.get('screen');
import moment from 'moment'
class GioHang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ma: props.route.params.ma,
      loading: false,
      dataSource: [],
      PhuongXa: [],
    
    };

  }
  componentDidMount() {
    API.get('HoaDon/GETALLBYMATHO/' + this.state.ma)
      .then(res => {
        const dataSource = res.data;
        this.setState({ dataSource });
        console.log(this.state.dataSource)
      })
      .catch(error => console.log(error)) //to catch the errors if any
  }
  renderItem = (data) =>

    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>Đơn hàng</Text>
      <Text style={{ marginLeft: 50, fontSize: 20 }}>Mã đơn hàng:  {data.item.maHD}</Text>
      <Text style={{ marginLeft: 50, fontSize: 20 }}>Ngày gọi:  {moment(data.item.ngayLap).format('DD/MM/yyyy')}</Text>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => {
        const { navigate } = this.props.navigation;
        navigate('Đơn Hàng', { ma: data.item.maHD , makh:data.item.maKH,})
      }}>
        <Text style={styles.loginText}>Xem chi tiết</Text>
      </TouchableHighlight>
    </TouchableOpacity>

  renderGioHang = () => {
  
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.maHD.toString()}
        />

      </View>
    )
  }
  load=()=>{
    if(this.state.dataSource.length==0){
      return (
        <Block flex center style={styles.home}>    
          <Icon
              size={100}
              color={argonTheme.COLORS.ICON}
              name="spaceship"
              family="ArgonExtra"
              style={{  marginTop: 150 }}
            />
            <Block style={{ backgroundColor: '#ffd700', height: 40, borderRadius: 10, width: 320, marginTop:20 }}>
            <Text style={{ fontSize: 20, color: '#000000', marginTop: 5, marginLeft: 5 }}>Hiện tại bạn chưa có đơn hàng nào</Text>
            
          </Block>
        </Block>
      )
    }
  }
  render() {
    //Moment.locale('vn'); 
    //const { ma } = this.props.route.params;
    if(this.state.dataSource.length>0)
    {
      return (
        <Block flex center style={styles.home}>
          {this.renderGioHang()}
        
        </Block>
      )
    }else
    {
      return (
        <Block flex center style={styles.home}>    
          <Icon
              size={100}
              color={argonTheme.COLORS.ICON}
              name="spaceship"
              family="ArgonExtra"
              style={{  marginTop: 150 }}
            />
            <Block style={{ backgroundColor: '#ffd700', height: 40, borderRadius: 10, width: 320, marginTop:20 }}>
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
    marginTop: 100
  },
  text: {
    fontSize: 17
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
    justifyContent: 'center',
    borderColor:'#000000'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#5f9ea0",
    marginHorizontal: 40,
    marginBottom: 10
  },
  title: {
    color: '#dc143c',
    fontSize: 25,
    fontWeight: "300",
    justifyContent: 'center',
    marginLeft: 100
  }

});

export default GioHang;