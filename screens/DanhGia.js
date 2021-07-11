import { Block } from "galio-framework";
import React, { useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import Textarea from 'react-native-textarea';
import { Rating, AirbnbRating } from 'react-native-ratings';
class DanhGia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            danhgia: '',
            diemdanhgia: 0,
        };

        // console.log(this.state.maHD)
    }
    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }
    render() {
        return (
            <Block style={styles.container}>
                 <AirbnbRating 
                 style={styles.rate}
                onFinishRating={this.ratingCompleted}
                />
                <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    onChangeText={(danhgia) => this.setState({ danhgia })}
                    //defaultValue={this.state.text}
                    maxLength={120}
                    placeholder={'Nhận xét khách hàng'}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                />
               
                
               
            </Block>
        );
    }
}
const styles = StyleSheet.create({
    textareaContainer: {
        height: 180,
        marginLeft: 20,
        borderRadius: 5,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        width: 350,
        marginTop:50
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
    },
    Title: {
        fontSize: 25,
        marginLeft: 20,
        marginTop:200
    },
    container: {
        marginTop: 150,
        
    },
    rate:{
        marginBottom:100
    }
})
export default DanhGia 