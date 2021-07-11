import {
  Platform,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Alert
} from 'react-native';
import API from "../Services/api"
import { Block, Checkbox, Text, theme } from "galio-framework";
import React from 'react';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph'
import {  argonTheme } from "../constants";
import { Button, Icon, Input, Select, } from "../components";
const { width } = Dimensions.get('screen');
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ma: props.route.params.ma,
      dataSource: [],
      ngay: [],
      ThoSua: []
    };

  }
  componentDidMount() {
    API.get('HoaDon/chartmobile/' + this.state.ma)
      .then(res => {

        const dataSource = res.data;
        this.setState({ dataSource });
        //console.log(this.state.dataSource[0].ngay)
        for (var i = this.state.dataSource.length; i >= 0; i--) {
          this.setState(state => {
            state.ngay = [...state.ngay, this.state.dataSource[i]]
          })
        }
        //console.log(this.state.ngay)
      })
      .catch(error => console.log(error)) //to catch the errors if any
    API.get('ThoSua/' + this.state.ma)
      .then(res => {
        this.setState({ ThoSua: res.data });
        if(res.data.loaiTho==1 && res.data.soDu<1500000)
        {
          Alert.alert("Thông báo","Bạn cần nạp thêm tiền để có thể nhận được đơn hàng")
        }
        else if(res.data.loaiTho==0 && res.data.soDu<1000000)
        {
          Alert.alert("Thông báo","Bạn cần nạp thêm tiền để có thể nhận được đơn hàng")
        }
        //console.log(this.state.ngay)
      })
      .catch(error => console.log(error))
  }
  render() {
    let data = this.state.sl
    return (
      <Block flex style={styles.home}>
        <Block row style={styles.sotk}>
          <Icon
            size={16}
            color={argonTheme.COLORS.ICON}
            name="credit-card"
            family="fontawesome"
            style={{ marginLeft: 20,marginTop:5 }}
          />
          <Text style={styles.textHD}
          > {"Số tài khoản: "}</Text>
          <Text style={{ marginLeft: 70, fontSize: 20, marginBottom:10,color:'#ffffff'  }}>{this.state.ThoSua.soTaiKhoan }</Text>
        </Block >
        <Block row style={styles.soDu}>
          <Icon
            size={16}
            color={argonTheme.COLORS.ICON}
            name="diamond"
            family="ArgonExtra"
            style={{ marginLeft: 20,marginTop:5 }}
          />
          <Text style={styles.textHD}

          > {"Số dư tài khoản: "}</Text>
          <Text style={{ marginLeft: 20, fontSize: 20, marginBottom:10,color:'#ffffff' }}>{this.state.ThoSua.soDu + " VNĐ"}</Text>
        </Block >
       
        <Block center>
          <Text style={styles.title}>BIỂU ĐỒ SỐ HÓA ĐƠN THEO TỪNG THÁNG</Text>
        </Block>
        <Block center>
          <VerticalBarGraph

            data={this.state.dataSource.map(e => e.slHoaDon)}
            labels={this.state.dataSource.map(e => e.ngay)}
            width={Dimensions.get('window').width - 90}
            height={250}
            barRadius={5}
            barWidthPercentage={0.5}
            barColor='#d2691e'
            baseConfig={{
              hasXAxisBackgroundLines: false,
              xAxisLabelStyle: {
                position: 'left',
                prefix: '',
              }
            }}
            style={{
              marginBottom: 30,
              padding: 10,
              paddingTop: 20,
              borderRadius: 20,
              backgroundColor: `#20b2aa`,
              width: Dimensions.get('window').width - 70
            }}
          />
        </Block>
       
      </Block>


    )

  }

}
const styles = StyleSheet.create({
  home: {
    width: width,
    marginTop: 30
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#800000',
    marginBottom: 20
  },
  textHD: {
    marginLeft: 10,
    fontSize: 20,
    color:'#ffffff'

  },
  soDu:{
    width:Dimensions.get('window').width - 30,
    backgroundColor:'#20b2aa',
    borderRadius:10,
    marginLeft:20,
    marginBottom:10
    
  },
  sotk:{
    width:Dimensions.get('window').width - 30,
    backgroundColor:'#20b2aa',
    borderRadius:10,
    marginLeft:20,
    marginBottom:10
  }
});

export default Home;
