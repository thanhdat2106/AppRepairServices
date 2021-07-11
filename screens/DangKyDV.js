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
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Button, Icon, Input, Select, } from "../components";
import { Images, argonTheme } from "../constants";
import API from "../Services/api"
import { number } from "prop-types";
const { width, height } = Dimensions.get("screen");

class DangKyDV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matho: props.route.params.ma,
            maldv: '',
            isChecked: true,
            listDV: [],
            LoaiDV: [],
            DichVu: [],
        };
    }

    componentDidMount() {
        // const data = this.props.navigation.getParam("data");

        API.get('LoaiDV')
            .then(res => {
                const LoaiDV = res.data;
                this.setState({ LoaiDV });
                this.valuechange(res.data[0].maLoaiDV)
            })
            .catch(error => console.log(error))
        console.log("Ma tho " + this.state.matho)
    }
    valuechange(ma) {
        API.get('DichVu/GetByIDDV/' + ma)
            .then(res => {
                const DichVu = res.data;
                this.setState({ DichVu });
               
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }
    ktma(ma) {
        for (var i = 0; i < this.state.listDV.length; i++) {
            if (this.state.listDV[i] == ma)
                return true
        }
        return false
    }
    setListDV(ma, maldv) {
        if (this.ktma(ma) == false) {
            this.setState(state => {
                state.listDV = [...state.listDV, ma]
            })
        } else {
            var array = this.state.listDV;
            var index = array.indexOf(ma); // Let's say it's Bob.
            if (index > -1) {
                array.splice(index, 1);
            }
            this.state.listDV = array
            //console.log(this.state.listDV)
        }
        this.valuechange(maldv);
    }
    renderCheckBox = (data) =>

        <CheckBox
            leftText=" {data.tenDV}"
            style={{ flex: 1, padding: 10 }}
            onClick={() => {
                this.setState({
                    isChecked: !this.state.isChecked
                })
            }}
            isChecked={this.state.isChecked}
        />;
    kt(ma) {
        for (var i = 0; i < this.state.listDV.length; i++) {
            if (this.state.listDV[i] == ma) {

                return true;
            }

        }

    }
    renderItem = (data) =>
        <TouchableOpacity style={styles.list}>
            {/* <Text style={styles.lightText}>{data.item.tenDV}</Text> */}
            <CheckBox
                style={{ flex: 1, padding: 10 }}
                onClick={() => { this.setListDV(data.item.maDV, data.item.maLoaiDV) }}
                isChecked={this.kt(data.item.maDV)}
                leftText={data.item.tenDV}
            />
        </TouchableOpacity>
    renderLoaiDV = () => {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.DichVu}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.maDV.toString()}
                />
            </View>)
    }
    create() {
       
        for (var i = 0; i < this.state.listDV.length; i++) {
            API.post(`Tho_DichVu`,
                {
                    maTho: this.state.matho,
                    maDV: this.state.listDV[i],
                })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
        }
        Alert.alert("Thông báo","Thành công. Liên hệ với chúng tôi để ký hợp đồng và sử dựng app!!!");
        this.props.navigation.navigate("DangNhap")
    }
    render() {
        return (
            <Block flex middle>
                <StatusBar hidden />
                <ImageBackground
                    source={Images.RegisterBackground}
                    style={{ width, height, zIndex: 1 }}
                >
                    <Block flex middle>

                        <Block style={styles.registerContainer}>

                            <Block flex>
                                <Block flex={0.17} middle>
                                    <Text color="#8b0000" size={25}>
                                        Đăng ký dịch vụ sửa chữa
                      </Text>
                                </Block>
                                <Block flex center>
                                    <KeyboardAvoidingView
                                        style={{ flex: 1 }}
                                        behavior="padding"
                                        enabled
                                    >
                                        <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                            <Picker
                                                style={styles.picker}
                                                onValueChange={(itemValue) => { this.setState({ maldv: itemValue }), this.valuechange(itemValue), this.setState({listDV:[]}) }}
                                                selectedValue={this.state.maldv}
                                            >
                                                {
                                                    this.state.LoaiDV.map((item, index) => (
                                                        <Picker.Item
                                                            key={item.maLoaiDV}
                                                            style={styles.container}
                                                            label={item.tenLoaiDV} value={item.maLoaiDV} />
                                                    ))
                                                }
                                            </Picker>
                                        </Block>
                                        <Block width={width * 0.8} style={{ marginBottom: 15, height: 400 }}>
                                            {this.renderLoaiDV()}
                                        </Block>


                                        <Block middle>
                                            <Button color="primary" style={styles.createButton} onPress={() => this.create(this)}>
                                                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                                    CREATE ACCOUNT
                            </Text>
                                            </Button>
                                        </Block>
                                    </KeyboardAvoidingView>
                                </Block>
                            </Block>

                        </Block>

                    </Block>

                </ImageBackground>

            </Block>

        )
    }
}
const styles = StyleSheet.create({
    registerContainer: {
        width: width * 0.9,
        height: height * 0.78,
        backgroundColor: "#F4F5F7",
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden"
    },
    socialConnect: {
        backgroundColor: argonTheme.COLORS.WHITE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#8898AA"
    },
    socialButtons: {
        width: 120,
        height: 40,
        backgroundColor: "#fff",
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1
    },
    socialTextButtons: {
        color: argonTheme.COLORS.PRIMARY,
        fontWeight: "800",
        fontSize: 14
    },
    inputIcons: {
        marginRight: 12
    },
    passwordCheck: {
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 30
    },
    createButton: {
        width: width * 0.5,
        marginTop: 25,
        marginBottom: 20
    },
    picker: {
        borderColor: argonTheme.COLORS.BORDER,
        height: 45,
        backgroundColor: '#FFFFFF',
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.05,
        elevation: 2,
        borderColor: argonTheme.COLORS.INPUT_ERROR,
        borderColor: argonTheme.COLORS.INPUT_SUCCESS,

    },
    
});

export default DangKyDV;