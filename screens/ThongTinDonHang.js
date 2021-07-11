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
    TextInput,
    TouchableHighlight,
    BackHandler,
    handleCancel,
    handleDelete,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input, Select, } from "../components";
import { Images, argonTheme } from "../constants";
import API from "../Services/api"
import moment from 'moment'
const { width, height } = Dimensions.get("screen");
const options = { month: "long", day: "numeric", year: "numeric" };
class ThongTinDonHang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maHD: props.route.params.ma,
            datasource: [],
            PhuongXa: [],
            DonHang: [],
            HoaDon: []
        }
    }
    componentDidMount() {
        try {
            API.get('HoaDon/GETALLBYID/' + this.state.maHD)
                .then(res => {
                    const dataSource = res.data;
                    this.setState({ dataSource });
                    this.setState({ DonHang: res.data[0] });
                    console.log(this.state.DonHang)
                    API.get('PhuongXa/GetAllByID/' + res.data[0].maPX)
                        .then(res1 => {
                            const PhuongXa = res1.data[0];
                            this.setState({ PhuongXa })

                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
                 //to catch the errors if any
                 API.get('HoaDon/' + this.state.maHD)
                 .then(res => {
                     this.setState({HoaDon: res.data})
                 })
        } catch {
           
        }
    }

    render() {
        return (
            <ScrollView>

                <Block style={{ marginTop: 100 }} flex>

                    <Text style={{
                        fontWeight: "bold",
                        marginTop: 10,
                        fontSize: 18,
                        color: "#FF0000",
                        textAlign: "center"
                    }}>
                        <Icon
                            style={styles.icon}
                            size={18}
                            color="#FF0000"
                            name="spaceship"
                            family="ArgonExtra"
                        />
                        {" Mã hóa đơn"}: {this.state.DonHang.maHD}{"\n"}</Text>
                    <Text style={styles.textDV}>{"Tên khách hàng: "}{this.state.DonHang.tenKH}</Text>
                    <Text style={styles.textDV}>{"Thời gian: "}{moment(this.state.DonHang.ngayLap).format('DD/MM/YYYY - HH:mm')}</Text>
                    <Text style={styles.textDV}>{"Địa chỉ: "}{this.state.DonHang.soNha + ', ' + this.state.PhuongXa.tenPX + ', ' + this.state.PhuongXa.tenQH + ',' + this.state.PhuongXa.tenTinh}</Text>
                    <Text style={{ marginLeft: 20 }}>--------------------Phí khách hàng phải trả cho thợ --------------------</Text>
                    <Text style={styles.textDV}>Dịch vụ:</Text>
                    <FlatList style={styles.flat}
                        data={this.state.dataSource}
                        renderItem={({ item }) => (
                            <Block>
                                <Block flex row justifyContent='space-between'>
                                    <Text flex style={styles.text}>
                                        <Icon
                                            style={styles.icon}
                                            size={11}
                                            color={argonTheme.COLORS.ICON}
                                            name="g-check"
                                            family="ArgonExtra"
                                        />
                                        {' ' + item.tenDV}</Text>
                                    {/* <Text flex={2} style={{alignItems:'center'}}></Text> */}
                                    <Text flex style={styles.giaTien}>{(item.thanhTien).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                </Block>
                                <Text style={{ fontSize: 10, marginLeft: 35, color: '#6F7678' }}>Hạn bảo hành: {moment(item.hanBaoHanh).format('DD/MM/YYYY')}</Text>
                            </Block>

                        )}
                    />
                    <Text style={{ marginLeft: 20 }}>---------------------------------------------------------------------------------------------</Text>
                    <Block flex row>
                        <Text style={styles.textHD}> {"Thuế VAT: "}</Text>
                        <Text style={{ marginLeft: 220, fontSize: 15 }}>{this.state.DonHang.thueVAT}</Text>
                    </Block>
                    <Text style={{ marginLeft: 20 }}>---------------------------------------------------------------------------------------------</Text>
                    <Block flex row>
                        <Text style={styles.textHD}> {"Phí di chuyển: "}</Text>
                        <Text style={{ marginLeft: 200, fontSize: 15 }}>{(this.state.DonHang.phiDiChuyen)}</Text>
                    </Block>
                    <Text style={{ marginLeft: 20 }}>---------------------------------------------------------------------------------------------</Text>
                    <Block flex row>
                        <Text style={styles.textHD}> {"Chiết Khấu: "}</Text>
                        <Text style={{ marginLeft: 220, fontSize: 15 }}>{(this.state.DonHang.chietKhau)}</Text>
                    </Block>
                    <Text style={{ marginLeft: 20 }}>---------------------------------------------------------------------------------------------</Text>
                    <Block flex row>
                        <Text style={styles.textTT}> {"Tổng tiền: "}</Text>
                        <Text style={{ marginLeft: 200, fontSize: 17, color: '#FF0000' }}>{(this.state.DonHang.tongTien)}</Text>
                    </Block>
                    <Text style={{ marginLeft: 20 }}>--------------------Phí thợ phải trả cho NCC dịch vụ--------------------</Text>
                    <Block flex row>
                        <Text style={styles.textTT}> {"Phí Dịch Vụ: "}</Text>
                        <Text style={{ marginLeft: 180, fontSize: 17,color: '#FF0000' }}>{(this.state.HoaDon.phiDichVu)}</Text>
                    </Block>
                    <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.submitChat}>
                <Text style={{ color: "white" }}>Back</Text>
            </TouchableOpacity>
                </Block>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        marginBottom: theme.SIZES.BASE,
        width: width - theme.SIZES.BASE * 2
    },
    title: {
        paddingBottom: theme.SIZES.BASE,
        paddingHorizontal: theme.SIZES.BASE * 2,
        marginTop: 30,
        marginBottom: 0,
        color: argonTheme.COLORS.HEADER,
        textAlign: "center"
    },
    avatar: {
        width: "auto",
        height: 100,
        alignItems: "center",
        resizeMode: "contain",

    },
    giaTien: {
        textAlign: 'right',
        fontSize: 12,
        // marginLeft: 80,
        alignItems: 'flex-end',
        marginRight: 30
    },
    infoTho: {
        alignItems: "flex-end",
        textAlign: "center",
        fontSize: 12,
        marginTop: 5,

    },
    comment: {
        paddingBottom: theme.SIZES.BASE,
        paddingHorizontal: theme.SIZES.BASE * 2,
        marginTop: 44,
        color: '#8D8D8D',
        // textDecorationColor: '#555555',
        // textAlign: "left",
        marginLeft: 10,

    },
    Button: {
        marginTop: 20,
        width: 140,
    },
    Button1: {
        marginTop: 20,
        width: 140,
        marginLeft: 10
    },
    flat: {
        margin: 10
    },
    icon: {
        marginRight: 10
    },
    itemView: {
        width: "100%",
        height: "auto",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        flexDirection: "row",
    },
    checkBoxTxt: {
        marginLeft: 20
    },
    submitHuy: {
        width: "40%",
        height: "auto",
        backgroundColor: "#AA0000",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        marginTop: 10,
        alignSelf: "center",
        marginBottom: 10,
        marginLeft: 30

    },
    submitChat: {
        width: "40%",
        height: "auto",
        backgroundColor: "#4091A7",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        marginTop: 10,
        alignSelf: "center",
        marginBottom: 10,
        marginLeft: 30

    },

    cardTho: {
        borderRadius: 20,
        borderWidth: 2,
        width: "70%",
        height: "auto",
        marginLeft: 20,
        marginTop: 5
    },
    textDV: {
        fontSize: 17,
        textAlign: "left",
        marginLeft: 15,
        marginTop: 15

    },
    textHD: {
        fontSize: 17,
        textAlign: "left",
        marginLeft: 15

    },
    text: {
        fontSize: 17,
        textAlign: "left",
        marginLeft: 15,
        alignItems: 'flex-start'

    },
    textTT: {
        fontSize: 17,
        textAlign: "left",
        marginLeft: 15,
        color: '#FF0000'
    },
    textArea: {
        color: "#000000",
        borderRadius: 20,
        borderBottomWidth: 1,
        width: width - 50,
        height: 100,
        alignItems: 'center',
        borderColor: '#555555',
        borderWidth: 0.5,
        margin: 10,

    }
})

export default ThongTinDonHang