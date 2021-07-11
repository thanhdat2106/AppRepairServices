import React from "react";
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
import API from "../Services/api"
import moment from 'moment'
const { width } = Dimensions.get('screen');
const options = {  day: "numeric",month: "numeric", year: "numeric" };
class DSHoaDon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ma: props.route.params.ma,
            DataSource: []
        };

    }
    componentDidMount() {
        API.get('HoaDon/GETALLBYMATHO1/'+this.state.ma)
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
      <Text style={{ marginLeft: 50, fontSize:20 }}>Mã đơn hàng:  {data.item.maHD}</Text>
      <Text style={{ marginLeft: 50, fontSize:20 }}>Ngày gọi:  {moment(data.item.ngayLap).format('DD/MM/yyyy')}</Text>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => {
        const { navigate } = this.props.navigation;
        navigate('Thông Tin Đơn Hàng', { ma: data.item.maHD })
      }}>
        <Text style={styles.loginText}>Xem chi tiết</Text>
      </TouchableHighlight>
    </TouchableOpacity>
    renderDSDonHang = () => {
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
                keyExtractor={item => item.maHD.toString()}
              />
            
            </View>
          )
        }
    render()
    {
        return (
            <Block flex center style={styles.home}>
            {this.renderDSDonHang()}
    
          </Block>
        )
    }
}



const styles = StyleSheet.create({

    home: {
        width: width,
        marginTop:100
      },
    text: {
        fontSize:17
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
        marginBottom:10
      },
      title: {
        color: '#dc143c',
        fontSize: 25,
        fontWeight: "300",
        justifyContent: 'center',
        marginLeft: 100 
      }
})

export default DSHoaDon;