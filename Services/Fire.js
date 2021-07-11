import React from "react";
import { TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

class Fire {
    constructor() {
        this.init();
        this.checkAuth();

    }
    init = () => {
        if (firebase.app.length) {
            var firebaseConfig = {
                apiKey: "AIzaSyBAyGa1i5shx4musHWX9WY4DIOKYokJ39E",
                authDomain: "chatservices-6912c.firebaseapp.com",
                databaseURL: "https://chatservices-6912c.firebaseio.com",
                projectId: "chatservices-6912c",
                storageBucket: "chatservices-6912c.appspot.com",
                messagingSenderId: "265997060240",
                appId: "1:265997060240:web:c12a780305ed44474d3015",
                measurementId: "G-TCCYVNW960"
            };
            firebase.initializeApp(firebaseConfig);
      
        }
    };
  
    checkAuth = () => {
        firebase.auth().onAuthStateChanged(
            user => {
                if (!user) {
                    firebase.auth().signInAnonymously();
                }
            }
        );
    };


    send = (messages) => {
        // const text = messages[0];
        messages.forEach(item => {
            var message=[];
            if(item.text!='')
            {
                message = {
                    _id: Math.round(Math.random() * 100000000),
                    text: item.text,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    user: item.user,
                    image: ''
                }
                this.db(message.user.chatRoom).push(message)
               
            }
            else
            {
                message = {
                    _id: Math.round(Math.random() * 100000000),
                    text: '',
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    user: item.user,
                    image: item.image
                }
                this.db(message.user.chatRoom).push(message)
            }
            
            //console.log(message.user.chatRoom)
          
        });
    }


    parse = message => {
        const { user, text, timestamp,image } = message.val()
        const { key: _id } = message
        const createdAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
            user,
            image
        };
    };

    get = (callback, room) => {
        this.db(room).on('child_added', snapshot => callback(this.parse(snapshot)));
    }
    off(room) {
        this.db(room).off()
    }
    db = (room) => {
        return firebase.database().ref(room);

        // return firestore().collection('messages').get();
    }
    getuid() {

        return (firebase.auth.currentUser || {}).uid
    }
}
export default new Fire();