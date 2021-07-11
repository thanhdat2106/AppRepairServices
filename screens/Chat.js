//@refresh reset
import { Block, Button } from 'galio-framework';
import { Label } from 'native-base';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, Platform, KeyboardAvoidingView, View} from "react-native";
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { GiftedChat, MessageImage, Bubble, Message, GiftedAvatar } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fire from '../Services/Fire';
//import FilePickerManager from 'react-native-file-picker';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: [],

            KhachHang: props.route.params.khachhang,
            ThoSua: props.route.params.thosua,
            path: '',
        };
        console.log(this.state.KhachHang)
        console.log(this.state.ThoSua)
    }
    get user() {
        return {
            // user: [this.state.user.maKH,this.state.user.tenKH],
            // readUser: [this.state.tho.maTho,this.state.tho.tenTho]
            _id: 'TS' + this.state.ThoSua.maTho,
            name: this.state.ThoSua.tenTho,
            chatRoom: this.state.KhachHang.maKH + '-' + this.state.ThoSua.maTho
        }
    }
    useEffect = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            type: "*/*",
            allowsEditing: true,
            aspect: [6, 4],
            quality: 1,
            saveToPhotos: true,
        });
        if (!result.cancelled) {
            this.download(result.uri)
        }
    };
    download = async (img) => {
        const base64 = await FileSystem.readAsStringAsync(img, { encoding: 'base64' });
        this.setState({ path: 'data:image/png;base64,' + base64 })
        //  console.log(this.state.path)
        var mess = [{ text: '', user: this.user, image: this.state.path }]
        Fire.send(mess);
    };
    componentDidMount() {

        Fire.get(message => this.setState(previous => ({
            message: GiftedChat.append(previous.message, message)
        })), this.state.KhachHang.maKH + '-' + this.state.ThoSua.maTho)

    }

    componentWillUnmount() {
        Fire.off(this.state.KhachHang.maKH + '-' + this.state.ThoSua.maTho);
    }
    renderSend = () => {

        return (
            <TouchableOpacity style={{ marginLeft: 5, marginBottom: 5 }} onPress={() => this.pickImage()}>
                <Image style={{ width: 30, height: 30 }} source={require('../assets/imgs/image.jpg')} />
            </TouchableOpacity>
        );

    }
    render() {


        if (Platform.OS === 'android') {
            return (

                <GiftedChat
                    messages={this.state.message}
                    placeholder='Type a message'
                    alwaysShowSend
                   
                    showUserAvatar
                    scrollToBottom
                    onSend={Fire.send}
                    user={this.user}
                    renderActions={this.renderSend}
                />



            )
        }
        return
        (
            <SafeAreaView style={{ flex: 1 }}>
                <GiftedChat messages={this.state.message} onSend={Fire.send} user={this.state.user.tenKH} />
            </SafeAreaView>
        )
    }

}
export default Chat;