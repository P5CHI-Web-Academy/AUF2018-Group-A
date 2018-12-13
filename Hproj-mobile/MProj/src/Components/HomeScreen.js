import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {ApiManager} from "../ApiManager/ApiManager";


export class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "https://raw.githubusercontent.com/P5CHI-Web-Academy/AUF2018-Group-A/master/stand-alone-project/parsing_filters/file.json"
        };
    }

    onButtonPress() {

       ApiManager.getVerticesFromLink(
           {url: this.state.text},
           response => {
               console.log("The response in the controller is: ", response[`vertices`]);
               const navigateAction = NavigationActions.navigate({
                   routeName: 'Filter',
                   params: {response: response},
                   action: NavigationActions.navigate({ routeName: 'Filter' }),
               });

               this.props.navigation.dispatch(navigateAction);
           },
           error => {
               alert("an unexpected error occurred, please check link");
           }
       )
    }

    render() {
        return (
            <View style={[Style.rootView]}>
                <Image
                    source={require("Images/logo.jpg")}
                    style={[Style.logoImage]}
                />
                <TextInput
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    paddingLeft={15}
                    placeholder={"insert edges json address here"}
                    style={[Style.textInput]}

                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.onButtonPress()}
                    style={[Style.button]}
                >
                    <Text style={[Style.buttonLabel]}>GO</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const Style = StyleSheet.create({
    rootView: {
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