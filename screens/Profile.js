import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Picker,
  FlatList,
  Alert,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import DatePicker from 'react-native-datepicker'
import { Button, Icon, Input, Select, } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import API from "../Services/api"
const { width, height } = Dimensions.get("screen");



class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ThoSua: [],
      matho: props.route.params.ma,
      TinhThanh: [],
      QuanHuyen: [],
      PhuongXa: [],
      tinh: '',
      quan: '',
      phuong: '',
      date: "1990-05-15",
      DiaChi: [],
      password: '',
      repassword: ''
    };

    //console.log(props.route.params.ma);
  }
  componentDidMount() {
    API.get('ThoSua/' + this.state.matho)
      .then(res => {
        console.log(res.data)
        this.setState({ date: res.data.ngaySinh })
        this.setState({ ThoSua: res.data });
        API.get('PhuongXa/GetAllByID/' + this.state.ThoSua.maPX)
          .then(res => {

            this.setState({ DiaChi: res.data[0] });
            this.setState({ tinh: res.data[0].maTinh });
            this.setState({ quan: res.data[0].maQH });
            this.setState({ phuong: res.data[0].maPX });
            this.valuechangeTinh()
            API.get('QuanHuyen/' + this.state.tinh)
            .then(res => {
              const QuanHuyen = res.data;
              this.setState({ QuanHuyen });
            })
            .catch(error => console.log(error))
          API.get('PhuongXa/' + this.state.quan)
            .then(res => {
              const PhuongXa = res.data;
              this.setState({ PhuongXa });
            })
            .catch(error => console.log(error))
          })
        console.log(this.state.DiaChi)
      })
      .catch(error => console.log(error))


      .catch(error => console.log(error))
      console.log("dat"+ this.state.tinh)
    
  
  }
  valuechangeTinh()
  {
    API.get('TinhThanh')
      .then(res => {
        const TinhThanh = res.data;
        this.setState({ TinhThanh });
      })
      .catch(error => console.log(error))
  }
  valuechangeQH(item) {
    console.log("123")
    API.get('QuanHuyen/' + item)
      .then(res => {
        const QuanHuyen = res.data;
        this.setState({ QuanHuyen });
        this.valuechangePX(res.data[0].maQH);
      })
      .catch(error => console.log(error))//to catch the errors if any
    
   

  }
  valuechangePX(quan) {
    API.get('PhuongXa/' + quan)
      .then(res => {
        const PhuongXa = res.data;
        this.setState({ PhuongXa });
      })
      .catch(error => console.log(error))//to catch the errors if any
  }
  updateTenTho(item) {
    this.state.ThoSua.tenTho = item
  }
  updateEmail(item) {
    this.state.ThoSua.email = item
  }
  updateNgaySinh(item) {
    this.state.ThoSua.ngaySinh = item
  }
  updateSoNha(item) {
    this.state.ThoSua.soNha = item
  }
  updatesdt(item) {
    this.state.ThoSua.sdt = item
  }
  // updatePassword(item) {
  //   if (item == this.state.password) {
  //     this.state.ThoSua.password = item
  //   }
  //   else {
  //     Alert.alert("Thông báo", "Mật khẩu bạn nhập lại chưa đúng")
  //   }
  // }
  create() {
    if (this.state.password === this.state.repassword && this.state.password!='' && this.state.repassword!='' ) {
      this.state.ThoSua.password = this.state.password
      API.put(`ThoSua`,
        {
          maTho: Number(this.state.ThoSua.maTho),
          tenTho: this.state.ThoSua.tenTho,
          maPX: Number(this.state.phuong),
          soNha: this.state.ThoSua.soNha,
          sdt: this.state.ThoSua.sdt,
          ngaySinh: this.state.ThoSua.ngaySinh,
          email: this.state.ThoSua.email,
          password: this.state.ThoSua.password,
          anh: this.state.ThoSua.anh,
          diemDanhGia: this.state.ThoSua.diemDanhGia,
          soTaiKhoan:this.state.ThoSua.soTaiKhoan,
          soDu: this.state.ThoSua.soDu,
          loaiTho: Number(this.state.ThoSua.loaiTho),
          active: Number(this.state.ThoSua.active)
        })
        .then(res => {
          Alert.alert('Thông báo', 'Bạn đã cập nhật thông tin cá nhân thành công hãy khởi động lại chương trình!!!');
        })
        .catch(error => console.log(error));
    }
    else if(this.state.password== '' || this.state.repassword=='')
    {
      API.put(`ThoSua`,
      {
        maTho: Number(this.state.ThoSua.maTho),
        tenTho: this.state.ThoSua.tenTho,
        maPX: Number(this.state.phuong),
        soNha: this.state.ThoSua.soNha,
        sdt: this.state.ThoSua.sdt,
        ngaySinh: this.state.ThoSua.ngaySinh,
        email: this.state.ThoSua.email,
        password: this.state.ThoSua.password,
        anh: this.state.ThoSua.anh,
        diemDanhGia: this.state.ThoSua.diemDanhGia,
        soTaiKhoan:this.state.ThoSua.soTaiKhoan,
        soDu: this.state.ThoSua.soDu,
        loaiTho: Number(this.state.ThoSua.loaiTho),
        active: Number(this.state.ThoSua.active)
      })
      .then(res => {
        Alert.alert('Thông báo', 'Bạn đã cập nhật thông tin cá nhân thành công');
        console.log(res)
      })
      .catch(error => console.log(error));
    }
    else {
      Alert.alert("Thông báo", "Mật khẩu bạn nhập lại chưa đúng")
    }

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
              <ScrollView
                showsVerticalScrollIndicator={false}>
                <Block flex>
                  <Block flex={0.17} middle>
                    <Text color="#8b0000" size={25} style={{marginTop:10}}>
                      Chỉnh sửa thông tin cá nhân
                  </Text>
                  </Block>
                  <Block flex center>
                    <KeyboardAvoidingView
                      style={{ flex: 1 }}
                      behavior="padding"
                      enabled
                    >
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Input
                          borderless

                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="hat-3"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                          placeholder={this.state.ThoSua.tenTho}
                          onChangeText={(tenTho) => this.updateTenTho(tenTho)}
                        />
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Input
                          borderless
                          //placeholder="Email"
                          keyboardType="email-address"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="ic_mail_24px"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                          placeholder={this.state.ThoSua.email}
                          onChangeText={(email) => this.updateEmail(email)}
                        />
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }} row>
                        <Text style={{marginTop:10, fontSize:17, marginRight:90}}>Ngày sinh:</Text>
                        <DatePicker
                          minDate="1970-01-01"
                          maxDate="2000-01-01"
                          date={this.state.date}
                          onDateChange={(date) => { this.setState({ date }), this.updateNgaySinh(date) }}
                        />
                      </Block>

                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Input
                          borderless
                          placeholder={this.state.ThoSua.sdt}
                          keyboardType='numeric'
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="phone"
                              family="fontawesome"
                              style={styles.inputIcons}
                            />
                          }
                          onChangeText={(sdt) => {this.updatesdt(sdt)}}
                        />
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>

                        <Input
                          borderless
                          placeholder={this.state.ThoSua.soNha}
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="address-card"
                              family="font-awesome"
                              style={styles.inputIcons}
                            />
                          }
                          onChangeText={(soNha) => {this.updateSoNha(soNha)}}
                        />
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Picker
                          style={styles.picker}
                         // onTouchEnd={(itemValue) => {this.valuechangeQH(itemValue)}}
                          onValueChange={(itemValue) => {this.setState({ tinh: itemValue }),this.valuechangeQH(itemValue) }}
                          selectedValue={this.state.tinh}
                        >
                          {
                            this.state.TinhThanh.map((item, index) => (
                              <Picker.Item
                                key={item.maTinh}
                                style={styles.container}
                                label={item.tenTinh} value={item.maTinh} 
                               />
                            ))
                              
                          }
                        </Picker>
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Picker
                          style={styles.picker}
                          onValueChange={(itemValue) => { this.setState({ quan: itemValue }), this.valuechangePX(itemValue) }}
                          selectedValue={this.state.quan}>
                          {
                            this.state.QuanHuyen.map((item, index) => (
                              <Picker.Item
                                key={item.maQH}
                                style={styles.container}
                                label={item.tenQH} value={item.maQH} />
                            ))

                          }
                        </Picker>
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Picker
                          style={styles.picker}
                          onValueChange={(itemValue) => { this.setState({ phuong: itemValue }) }}
                          selectedValue={this.state.phuong}
                        >
                          {
                            this.state.PhuongXa.map((item, index) => (
                              <Picker.Item
                                key={item.maPX}
                                style={styles.container}
                                label={item.tenPX} value={item.maPX} />
                            ))

                          }
                        </Picker>
                      </Block>
                      <Block width={width * 0.8}>
                        <Input
                          password
                          borderless
                          placeholder="Password"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="key"
                              family="font-awesome"
                              style={styles.inputIcons}
                            />
                          }

                          onChangeText={(password) => this.setState({ password })}
                        />
                      </Block>
                      <Block width={width * 0.8}>
                        <Input
                          password
                          borderless
                          placeholder="Nhập lại password"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="key"
                              family="font-awesome"
                              style={styles.inputIcons}
                            />
                          }
                          onChangeText={(repassword) => this.setState({ repassword })}
                        //onChangeText={(password) => this.updatePassword(password)}
                        />
                        <Block row style={styles.passwordCheck}>
                          <Text size={12} color={argonTheme.COLORS.MUTED}>
                            password strength:
                        </Text>
                          <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                            {" "}
                          strong
                        </Text>
                        </Block>


                      </Block>

                      
                      <Block middle>
                        <Button color="primary" style={styles.createButton} onPress={() => this.create(this)}>
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            Cập Nhật
                        </Text>

                        </Button>
                      </Block>
                    </KeyboardAvoidingView>
                  </Block>
                </Block>
              </ScrollView>
            </Block>

          </Block>

        </ImageBackground>

      </Block>

    );
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

  }

});

export default Profile;
