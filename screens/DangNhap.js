import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { ListView } from "react-native";
import { Alert } from "react-native";
import API from "../Services/api"
const { width, height } = Dimensions.get("screen");

class DangNhap extends React.Component {
  constructor(props) {
    super(props);
    this.ma = 1;
    this.state = {
      ThoSua:[],
      data:'',
      matho:'',
     };
   }
   
   componentDidMount(){
    API.get('ThoSua')
    .then(res => {
      const ThoSua = res.data;
      this.setState({ ThoSua });
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    }
  // kt(){
  //   const { email, password } = this.state;
  //   console.log("ffff")
  //   for(var i=0; i<this.state.ThoSua.length;i++)
  //   {
  //     if(this.state.ThoSua[i].email==email && this.state.ThoSua[i].password==password && this.state.ThoSua[i].active ==1 )
  //     {
  //      return this.state.ThoSua[i].matho
  //     }
  //   }
    
  // }
  login()
  {

    const { email, password } = this.state;
    var kt = false
    //Alert.alert('Credentials', `${email} + ${password}+${this.state.dataSource[1].email}`);
    for(var i=0; i<this.state.ThoSua.length;i++)
    {
      if(this.state.ThoSua[i].email==email && this.state.ThoSua[i].password==password && this.state.ThoSua[i].active ==1 )
      {
        kt= true
        this.setState({matho:this.state.ThoSua[i].maTho})
        this.props.navigation.navigate('App',{matho: this.state.ThoSua[i].maTho})
      }
    }
  if(kt==false)
  {
    Alert.alert('Gmail hoặc password đăng nhập của bạn không đúng!!!');
  }
  
 // this.props.navigation.navigate('App',{matho:"1"})
  

       
 

  }
  render() {
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
          {/* <ImageBackground
              source={Images.Onboarding}
              style={{ height, width, zIndex: 1 }}
            /> */}
        
        </Block>
        <Block center>
          <Image source={Images.Logo1} style={styles.logo} />
        </Block>
        <Block flex space="between"  style={styles.padded}>
          <Block flex space="around" >
           
            <Block style={styles.title}>
              <Block style={styles.inputContainer}>
              
                <TextInput style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({ email })} />
              </Block>
              <Block style={styles.inputContainer}>
                
                <TextInput style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  onChangeText={(password) => this.setState({ password })} />
              </Block>
              <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={(event)=>{this.login(this)}}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableHighlight>
              {/* <Button
                onPress={this.login()}
                title='Login'
              /> */}

              <TouchableHighlight style={styles.buttonForgot} onPress={() => this.props.navigation.navigate('DangKyDV', {
              data: "dat"})}>
                <Text >Forgot your password?</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.buttonRegister} onPress={() =>  this.props.navigation.navigate("Register")}>
                <Text>Register</Text>
              </TouchableHighlight>
            </Block>
            {/* <Block center>
              <Button
                style={styles.button}
                color={argonTheme.COLORS.SECONDARY}
                onPress={() => this.props.navigation.navigate("App")}
                textStyle={{ color: argonTheme.COLORS.BLACK }}
              >
                Get Started
                  </Button>
            </Block> */}
          </Block>
        </Block>
      </Block>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: { 
      backgroundColor: '#FFFFFF',
      borderRadius:20,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      marginHorizontal:40,
      flexDirection: 'row',
      alignItems:'center',
      borderColor: '#000000',
      borderWidth:1
  },
  padded: {
    paddingHorizontal: 100,
    position: "relative",
    bottom: theme.SIZES.BASE,
    justifyContent: 'center',
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 300,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-40%'
  },
  inputs:{
    height:45,
    marginLeft:15,
    flex:1,
    borderColor: '#000000' ,
 
},
buttonContainer: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:250,
  borderRadius:30,
},
loginButton: {
  backgroundColor: "#5f9ea0",
  marginHorizontal:40,
},
loginText: {
  color: 'white',
},
buttonRegister:{
  marginLeft:140,
  marginTop:30
},
buttonForgot:{
  marginLeft:100,
  marginTop:30
}
});

export default DangNhap 
{
  console.disableYellowBox = true;
};
