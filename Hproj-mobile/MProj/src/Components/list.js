import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList,} from 'react-native';


export default class FlatList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hits: ["From:", "To:", "Price:"],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch(API + DEFAULT_QUERY)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ hits: data.hits, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }



    renderItem = ({item}) => {
        return (
            <View style={[styles.rowView]}>
                <Text style = {[styles.rowTextItem] }>
                    {`From:  ${item.From}`}
                </Text>
                <Text style = {[styles.rowTextItemPrice]}>
                    {`Price:  ${item.Price}`}
                </Text>
                <Text style = {[styles.rowTextItem]}>
                    {`To:  ${item.To}`}
                </Text>
            </View>

        );

    };

    renderItemSeparator = () => {
        return <View style={{backgroundColor: "black", height: 1, flexDirection: 'row', flex: 1,}}/>
    };

    keyextractor = (item, index) => `${index} - ListItem`;

    render() {
        const {listData} = this.state;
        return (
        <FlatList
            data={listData}
            keyExtractor={this.keyextractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderItemSeparator}
         />
    );
    };
}


const listData = [
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},
    {From: " 1", To: " 2", Price: " 12"},

];

const styles = StyleSheet.create({

    rowView: {
        flexDirection: "row",
        padding: 0,
        backgroundColor: '#d0d7e2',
    },
    rowTextItem: {
        flex: 1,
        padding: 0,
        fontSize: 22,
        fontFamily: 'Bold',
        color: 'black',
        margin: 5,
        backgroundColor: '#a6abb5',
        borderRadius: 12,
        aspectRatio: 3.7,
        textAlign: 'center',
    },
    rowTextItemPrice: {
        flex: 1,
        padding: 0,
        fontSize: 22,
        fontFamily: 'Bold',
        color: 'black',
        margin: 5,
        borderRadius: 12,
        aspectRatio: 3.7,
        textAlign: 'center',
    }


});
