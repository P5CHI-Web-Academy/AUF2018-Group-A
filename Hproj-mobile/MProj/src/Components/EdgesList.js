import React, { Component } from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {ApiManager} from "../ApiManager/ApiManager";


export class EdgesList extends Component {

    constructor(props) {
        super(props);

        const totalCost = props.navigation.state.params.response[`total_cost`];
        const encodedUrl = props.navigation.state.params.response[`path`];
        const edgesList =  [...this.props.navigation.state.params.response[`covered_edges`], {type: "Total", value: totalCost}];
        const getParams = props.navigation.state.params.getParams;
        this.state = {
            isLoading: false,
            error: null,
            edgesList: edgesList,
            encodedUrl: encodedUrl,
            getParams: getParams
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        console.log(this.state)
    }

    onSendCSV = () => {
        ApiManager.send_csv_mail(
            this.state.getParams,
            response => {
                alert("Success!")
            },
            error => {
                alert(error);
            }
        );
    }

    renderItem = ({item}) => {
        if (item.type === "Total") {
            return (
                <Text style = {[styles.totalView] }>
                    {`Total Cost:  ${item.value}`}
                </Text>
            );
        }
        return (
            <View style={[styles.rowView]}>
                <View style={[styles.rowTextItem]}>
                    <Text style = {[styles.rowTextItem] }>
                        {`From ${item[`start`]}`}
                    </Text>
                </View>

                <Text style = {[styles.rowTextItemPrice]}>
                    {`--- ${item[`cost`]} --->`}
                </Text>

                <View style={[styles.rowTextItem]}>
                    <Text style = {[styles.rowTextItem]}>
                        {`To ${item[`end`]}`}
                    </Text>
                </View>
            </View>

        );

    };

    renderItemSeparator = () => {
        return <View style={{backgroundColor: "gray", height: 1, flexDirection: 'row', flex: 1,}}/>
    };

    keyextractor = (item, index) => `${index} - ListItem`;

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList style={{flex: 1}}
                          data={this.state.edgesList}
                          keyExtractor={this.keyextractor}
                          renderItem={this.renderItem}
                          ItemSeparatorComponent={this.renderItemSeparator}
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={this.onSendCSV}
                    style={[styles.buttonAlert]}
                >
                    <Text style={{color: 'white', fontSize: 18}}>Send as CSV</Text>
                </TouchableOpacity>
            </View>

        );
    };
}

const styles = StyleSheet.create({

    rowView: {
        flexDirection: "row",
        paddingLeft: 5,
    },

    rowTextItem: {
        flex: 0.5,
        paddingLeft: 0,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
        color: 'black',
        margin: 5,
        backgroundColor: '#a6abb5',
        borderRadius: 20,
        textAlign: 'center',
    },
    rowTextItemPrice: {
        flex: 1,
        paddingLeft: 0,
        marginTop: 20,
        marginBottom: 10,
        fontSize: 14,
        color: 'black',
        margin: 5,
        borderRadius: 12,
        textAlign: 'center',
    },

    totalView: {
        textAlign: 'right',
        fontSize: 17,
        fontWeight: 'bold',
        paddingRight: 15
    },

    buttonAlert: {
        padding: 15,
        alignSelf: "center",
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
        backgroundColor: "#00e676",
        height: 55,
        width: 150,
        borderRadius:20
    },
});
