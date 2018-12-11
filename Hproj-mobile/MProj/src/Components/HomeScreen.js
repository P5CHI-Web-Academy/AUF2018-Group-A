import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';


export class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: " "
        };
    }

    render() {
        return (
            <View style={[Style.rootVIew]}>
                <Image
                    source={require("Images/logo.jpg")}
                    style={[Style.logoImage]}
                />
                <TextInput
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    style={[Style.textInput]}
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => alert(this.state.text)}
                    style={[Style.button]}
                >
                    <Text style={[Style.buttonLabel]}>GO</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const Style = StyleSheet.create({
    rootVIew: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white"

    },
    logoImage: {
        width: 150,
        height: 150
    },
    textInput: {
        alignSelf: "stretch",
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 8,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 75,
        backgroundColor: "skyblue",
        padding: 15,
        marginTop: 20
    },
    buttonLabel: {
        color: "black"
    }
});