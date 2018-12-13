import React, {Component} from "react";
import {View, TouchableOpacity, Text, StyleSheet, Modal, FlatList} from "react-native";

export default class SelectorModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false
        };
    }

    showModal = () => {
        this.setState({isModalVisible: true});
    };

    hideModal = () => {
        this.setState({isModalVisible: false});
    };

    onSelect = (item, index) => {
        this.props.onSelect && this.props.onSelect(item, index);
        this.hideModal();
    };

    keyExtractor = (item, index) => `${index}-ListItem`;

    renderItem = ({item, index}) => {
        let isSelected = (index === this.props.selectedIndex);

        return (
            <TouchableOpacity
                style={isSelected ? Style.itemContainerSelected : Style.itemContainer}
                removeClippedSubviews={true}
                onPress={() => this.onSelect(item, index)}
            >
                <Text style={isSelected ? Style.itemTextSelected : Style.itemText}>{item}</Text>
            </TouchableOpacity>
        )
    };

    renderSeparator = () => {
        return (
            <View style={Style.separatorView}/>

        )
    };

    renderModal = () => {
        return (
            <Modal
                transparent={true}
                visible={this.state.isModalVisible}
                onRequestClose={this.hideModal}
            >
                <View style={[Style.modalContentView]}>
                    <FlatList
                        data={this.props.data}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        ItemSeparatorComponent={this.renderSeparator}
                        removeClippedSubviews={true}
                        style={[Style.list]}
                    />
                    <TouchableOpacity
                        style={[Style.modalButton]}
                        onPress={this.hideModal}>
                        <Text style={[Style.text]}>{"Cancel"}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    };

    renderSelectionInfo = () => {
        return this.props.selectedIndex !== null && this.props.selectedIndex !== undefined ? (
            <Text style={[Style.selectionText]}>{this.props.data[this.props.selectedIndex]}</Text>
        ) : null;
    };

    render = () => {
        return (
            <View style={[Style.rootView, this.props.style]}>
                <TouchableOpacity
                    style={[Style.button]}
                    onPress={this.showModal}
                >
                    <Text style={[Style.text]}>{this.props.title}</Text>
                    {this.renderSelectionInfo()}
                </TouchableOpacity>
                {this.renderModal()}
            </View>
        );
    };
}



const Style = StyleSheet.create({
    rootView: {
        backgroundColor: "#b0c4de",
        width: 100,
        height: 50,
        borderRadius:46
    },
    button: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'
    },
    text: {
        color: "#f5f5f5"
    },
    selectionText: {
        color: "#f5f5f5",
        fontWeight: "bold"
    },

    modalContentView: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#0000001E",
        justifyContent: "center",
        alignItems: "stretch",
        padding: 20
    },
    list: {
        marginBottom: 20,
        backgroundColor: "white",
        height: 100,
        borderRadius:10,
        overflow: "hidden"
    },
    modalButton: {
        flexDirection: "column",
        padding: 12,
        alignItems: 'center',
        backgroundColor: "#696969",
        height: 50,
        borderRadius:10
    },
    separatorView: {
        height: 1,
        backgroundColor: "#696969"
    },
    itemContainer: {
        padding: 15,
        borderRadius:10
    },
    itemText: {
        fontSize: 16
    },
    itemContainerSelected: {
        padding: 15,
        backgroundColor: "#696969"
    },
    itemTextSelected: {
        fontSize: 16,
        color: "white"
    }
});
