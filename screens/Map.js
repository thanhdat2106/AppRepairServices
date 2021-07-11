
import MapView ,{ Polyline }from 'react-native-maps';
import { Marker, pinColor } from 'react-native-maps';
import React from 'react';
import { ActivityIndicator, Text, Button, Platform, StyleSheet, View, Dimensions, Alert } from 'react-native';
import Geocoder from 'react-native-geocoder';
import * as Permissions from 'expo-permissions';
//import Location from 'react-native-geocoder';
import * as Location from 'expo-location';
import getDistance from 'geolib/es/getDistance';
import * as geolib from 'geolib';
 import  MapViewDirections from 'react-native-maps-directions';
import API from "../Services/api"
import PolylineDirection from '@react-native-maps/polyline-direction';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8';
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const origin = { latitude: 10.795023279011964, longitude: 106.72105128105505 };
const destination = { latitude: 10.766777504410218, longitude: 106.69246966179159 };
class CallMap extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      maHD: props.route.params.ma,
      maTho:props.route.params.matho,
      latitude:props.route.params.latitude,
      longitude:props.route.params.longitude,
      LatLng: {
        latitude: 10.7951612,
        longitude: 106.7195944,
      },
      LatLng1: {
        latitude: 10.7951612,
        longitude: 106.7195944,
      },
      
      khoangcach: '',
      PhuongXa:[],
      diachi:'19/3D đường số 30, phường Linh Đông, quận Thủ Đức, tp. Hồ Chí Minh, Việt Nam',
      diachi1:'19/3D đường số 30, phường Linh Đông, quận Thủ Đức, tp. Hồ Chí Minh, Việt Nam'
    };
   console.log(this.state.maTho)
  }
  static navigationOptions = {
    title: 'Geocoding',
  };



  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION);
   
    
    API.get('HoaDon/GETALLBYID/' + this.state.maHD)
      .then(res => {
        this.state.diachi = res.data[0].soNha
        API.get('PhuongXa/GetAllByID/' + res.data[0].maPX)
          .then(res1 => {
            this.state.diachi = this.state.diachi+', '+ res1.data[0].tenPX+', '+ res1.data[0].tenQH+', '+ res1.data[0].tenTinh
            console.log( this.state.diachi)
            
            this._attemptGeocodeAsync(this.state.diachi);
           
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
      // API.get('ThoSua/' + this.state.maTho)
      // .then(res => {
      //   this.state.diachi1 = res.data.soNha
      //   API.get('PhuongXa/GetAllByID/' + res.data.maPX)
      //     .then(res1 => {
      //       this.state.diachi1 = this.state.diachi1+', '+ res1.data[0].tenPX+', '+ res1.data[0].tenQH+', '+ res1.data[0].tenTinh
      //       console.log( this.state.diachi1)
            
      //        this._attemptGeocodeAsync(this.state.diachi1);
           
      //     })
      //     .catch(error => console.log(error))
      // })
      // .catch(error => console.log(error))
    console.log("Dat" + geolib.getPreciseDistance(
      { latitude: 10.795023279011964, longitude: 106.72105128105505 },
      { latitude: 10.766777504410218, longitude: 106.69246966179159 }
    ))
   
  }


getlocation()
{
  navigator.geolocation.getCurrentPosition(
    (position) => {
      this.state.LatLng1.latitude = position.coords.latitude
      this.state.LatLng1.longitude = position.coords.longitude
      console.log("Dat"+this.state.LatLng1.latitude)
    },
    () => {
      alert('Position could not be determined.');
    }
  );
}
  render() {
    if (Platform.OS === 'android') {
    return (
      <View style={styles.container}>
      
        {this._maybeRenderResult()}
        
        <View style={styles.container1}>
          <MapView style={styles.map}
            initialRegion={{
              latitude: Number(this.state.LatLng1.latitude),
              longitude: Number(this.state.LatLng1.longitude),
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
          >
            <MapView.Marker
              coordinate={
                {
                  latitude: Number(this.state.LatLng.latitude),
                  longitude:Number(this.state.LatLng.longitude)
                }
              }
              title={"marker.title"}
              description={"desss"}
            />
            <MapView.Marker
              coordinate={
                {
                  latitude: Number(this.state.latitude),
                  longitude: Number(this.state.longitude)
                }
               
              }
              pinColor={'blue'}
              title={"marker.title"}
              description={"desss1"}
            />
            <MapViewDirections 
  					coordinates={[
              { latitude: Number(this.state.LatLng.latitude), longitude: Number(this.state.LatLng.longitude) },
              { latitude: Number(this.state.latitude), longitude: Number(this.state.longitude) }
            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            ]}
            strokeWidth={2}
            
  					/>
            {/* <Polyline
          strokeWidth={2}
          strokeColor="red"
          coordinates={[
            { latitude: Number(this.state.LatLng.latitude), longitude: Number(this.state.LatLng.longitude) },
            { latitude: Number(this.state.latitude), longitude: Number(this.state.longitude) },
          ]}
        /> */}
          </MapView>
        </View>
      </View>
    );
    }
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




}

const styles = StyleSheet.create({
  container: { flex: 1, },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginTop: 10,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 20,
    marginBottom: 0,
    marginTop: 90,
  },
  exampleText: {
    fontSize: 15,
    color: '#ccc',
    marginVertical: 10,
  },
  examplesContainer: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 20,
  },
  selectedExampleText: {
    color: 'black',
  },
  resultText: {
    padding: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  errorResultText: {
    padding: 20,
    color: 'red',
  },
  button: {
    ...Platform.select({
      android: {
        marginBottom: 10,
      },
    }),
  },
});
export default CallMap;