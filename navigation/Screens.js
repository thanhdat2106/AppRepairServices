import React from "react";
import { Easing, Animated, Dimensions, Alert } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";
import DangNhap from "../screens/DangNhap";
import DangKyDV from "../screens/DangKyDV";
import ChiTietGoiTho from "../screens/ChiTietGoiTho";
import DonHang from "../screens/DonHang";
import { State } from "react-native-gesture-handler";
import GioHang from "../screens/GioHang";
import ListDonHang from "../screens/ListDonHang";
import DanhGia from "../screens/DanhGia";
import Chat from "../screens/Chat";
import DSHoaDon from "../screens/DSHoaDon";
import ThongTinDonHang from "../screens/ThongTinDonHang";
import CallMap from "../screens/Map";
import API from "../Services/api"
import Geocoder from 'react-native-geocoder';
import * as Permissions from 'expo-permissions';
//import Location from 'react-native-geocoder';
import * as Location from 'expo-location';
import getDistance from 'geolib/es/getDistance';
import * as geolib from 'geolib';
const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const obj = { matho: 0, makh: 0, mahd: 0, latitude: 0, longitude: 0,   }
const thosua={maTho:0, tenTho:''}
const  khachhang={maKH:0,tenKH:''}
const toado ={latitude: 0, longitude: 0 }
const toado1 ={latitude: 0, longitude: 0 }
const donhang =[]
const data =[]
function ElementsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
 async function kt(param) {
  return await Location.geocodeAsync(param)
}

  function  ListDonHangStack (props) {
  // const donhang=[]
  // console.log(data)
  // for  (var i = 0; i < data.length; i++) {
  //   const diachi=data[i].soNha + ', ' + data[i].tenPX + ', ' + data[i].tenQH + ', ' + data[i].tenTinh
  //   console.log(diachi)
  //    const result = await Location.geocodeAsync(diachi);
  //   //this.attemptGeocodeAsync(diachi)// console.log(result[0])
  //   console.log(result)
  //   var kc =  geolib.getPreciseDistance(
  //     { latitude: result[0].latitude, longitude: result[0].longitude },
  //     { latitude: toado.latitude, longitude: toado.longitude }
  //   )
  //   console.log("canh")
  //   if (kc > 10000) {
  //     donhang.push(res.data[i])
  //   }
  // }
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Nhận Đơn Hàng"
        component={ListDonHang}
        initialParams={{ ma: obj.matho }}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Nhận Đơn Hàng" 
            back 
            navigation={navigation} 
            scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />

    </Stack.Navigator>
  );
}
function MapStack(props) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      obj.latitude = position.coords.latitude
      obj.longitude = position.coords.longitude
      console.log("Dat"+obj.latitude)
    },
    () => {
      alert('Position could not be determined.');
    }
  );
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Map"
        component={CallMap}
        initialParams={{ ma: obj.mahd, matho: obj.matho, latitude: obj.latitude, longitude: obj.longitude }}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Map" back navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />

    </Stack.Navigator>
  );
}
function ChatStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Chat"
        component={Chat}
        initialParams={{ thosua: thosua, khachhang: khachhang }}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Chat" back navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />

    </Stack.Navigator>
  );
}
function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Thông Tin Cá Nhân" mode="card" headerMode="screen">
      <Stack.Screen
        name="Thông Tin Cá Nhân"
        component={Profile}
        initialParams={{ ma: obj.matho }}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Thông Tin Cá Nhân"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />

    </Stack.Navigator>
  );
}
function GioHangStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Giỏ Hàng"
        component={GioHang}
        initialParams={{ ma: obj.matho }}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Giỏ Hàng"
              back={true}
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  )
}
function DonHangStack(props) {
  obj.mahd = props.route.params.ma
  obj.makh = props.route.params.makh
  API.get('ThoSua/' + obj.matho)
    .then(res => {
       thosua.maTho = res.data.maTho,
      thosua.tenTho = res.data.tenTho,

        console.log("dat"+res.data.maTho)
    })
    .catch(error => console.log(error))
  API.get('KhachHang/' + props.route.params.makh)
    .then(res => {
      khachhang.maKH = res.data.maKH,
      khachhang.tenKH = res.data.tenKH,

        console.log("canh"+khachhang.maKH)
     
    })
    .catch(error => console.log(error))
  console.log(props.route.params.makh
    )
  console.log(obj.mahd)
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Đơn Hàng"
        component={DonHang}
        initialParams={{ ma: obj.mahd }}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Đơn Hàng"
              back={true}
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  )
}

function HomeStack(props) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      toado.latitude = position.coords.latitude
      toado.longitude = position.coords.longitude
      console.log("Dat"+toado.latitude)
    },
    () => {
      alert('Position could not be determined.');
    }
  );
 
  // API.get('GoiTho/GetAll/' + obj.matho)
  //   .then( async res => {
  //     console.log(res.data[1])
  //     // for(var i=0; res.data[0].length;i++)
  //     // {
  //     //   //console.log(res.data[i])
  //     //   // data.push(res.data[i])
  //     // }
  //      data.push( res.data[0])
  //     console.log(data)
  //   })
  
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Trang Chủ"
        component={Home}
        initialParams={{ ma: obj.matho }}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Trang Chủ"
              matho={{ ma: obj.matho }}
              search
              options
              navigation={navigation}
              scene={scene}

            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },

        }}
      />

      <Stack.Screen name="Đơn Hàng" component={DonHangStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Đơn Hàng"
              transparent
              navigation={navigation}
              scene={scene}
              back={true}
            />
          ),
          headerTransparent: true
        }} />
      {/* <Stack.Screen name="DonHang" component={DonHang}
      
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="DonHang"
              
              back
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      /> */}
      <Stack.Screen name="Giỏ Hàng" component={GioHang} initialParams={{ ma: obj.matho }}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Giỏ Hàng"
              back={true}
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }} />
      <Stack.Screen name="Thông Tin Đơn Hàng" component={ThongTinDonHang}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Thông Tin Đơn Hàng"
              back
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen name="Lịch Sử Đơn Hàng" component={DSHoaDon} initialParams={{ ma: obj.matho }}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Lịch Sử Đơn Hàng"
              back={true}
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }} />
      <Stack.Screen name="Chat" component={ChatStack}
        // initialParams={{ matho:obj.matho, makh:obj.makh }}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Chat"
              transparent
              navigation={navigation}
              scene={scene}
              back
            />
          ),
          headerTransparent: true
        }}
      />
         <Stack.Screen name="Map" component={MapStack} 
         options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Map"
              transparent
              navigation={navigation}
              scene={scene}
              back={true}
            />
          ),
          headerTransparent: true
        }}/>
      <Stack.Screen name="Chi Tiết Gọi Thợ"
        component={ChiTietGoiTho}
        initialParams={{ matho: obj.matho }}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Chi Tiết Gọi Thợ"
              back={true}
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />

      <Stack.Screen name="App" component={AppStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Trang Chủ"
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen name="DanhGia" component={DanhGia} />
      <Stack.Screen name="Nhận Đơn Hàng" component={ListDonHangStack} 
      //initialParams={{ ma: obj.matho,toado: toado,donhang: donhang }}
     
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Nhận Đơn Hàng"
              transparent
              navigation={navigation}
              scene={scene}
              back={true}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
      
    </Stack.Navigator>
  )
}
function ChiTietGoiThoStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Chi Tiết Gọi Thợ"
        component={ChiTietGoiTho}

      />
    </Stack.Navigator>
  );
}
export default function DangNhapStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="DangNhap"
        component={DangNhap}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="Trang Chủ" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="DangKyDV" component={DangKyDV} />

    </Stack.Navigator>
  );
}

// export default function OnboardingStack(props) {
//   return (
//     <Stack.Navigator mode="card" headerMode="none">
//       <Stack.Screen
//         name="Onboarding"
//         component={Onboarding}
//         option={{
//           headerTransparent: true
//         }}
//       />
//       <Stack.Screen name="DangNhap" component={DangNhapStack} />
//       <Stack.Screen name="App" component={AppStack} />
//     </Stack.Navigator>
//   );
// }

function AppStack(props) {
  obj.matho = props.route.params.matho
  return (

    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}

    //initialParams = {props.route.params.matho}
    >
      <Drawer.Screen name="Trang Chủ" component={HomeStack} />
      <Drawer.Screen name="Thông Tin Cá Nhân" component={ProfileStack} />
      <Drawer.Screen name="Account" component={Register} />
      <Drawer.Screen name="DangKyDV" component={DangKyDV} />

      {/* <Drawer.Screen name="Elements" component={ElementsStack} /> */}
      {/* <Drawer.Screen name="Articles" component={ArticlesStack} /> */}
     
   

    </Drawer.Navigator>
  );
}

