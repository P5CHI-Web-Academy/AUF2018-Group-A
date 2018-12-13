import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import SelectorModal from "./SelectorModal";


const Nodes = {
    Node1: "Node 1",
    Node2: "Node 2",
    Node3: "Node 3",
    Node4: "Node 4",
    Node5: "Node 5",
    Node6: "Node 6",
    Node7: "Node 7",
    Node8: "Node 8",
    Node9: "Node 9",
    Node10: "Node 10",
    Node11: "Node 11",
    Node12: "Node 12"
};


const CarriageType = {
    Auto: "Auto",
    Train: "Train",
    Plane: "Plane"
};

const CostType = {
    Price: "Price",
    Distance: "Distance",
    Time: "Time"
};


export default class FilterScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedInitialNodeIndex: null,
            selectedFinalNodeIndex: null,
            selectedCarriageIndex: null,
            selectedCostIndex: null
        };
    }

    onSelectInitialNode = (item, index) => {
        this.setState({
            selectedInitialNodeIndex: index
        });
    };
    onSelectFinalNode = (item, index) => {
        this.setState({
            selectedFinalNodeIndex: index
        });
    };
    onSelectCarriage = (item, index) => {
        this.setState({
            selectedCarriageIndex: index
        });
    };
    onSelectCost = (item, index) => {
        this.setState({
            selectedCostIndex: index
        });
    };
    onValidate = () => {
        alert("Will be validated!")
    };
    render() {
        return (
            <View style={[Style.rootVIew, this.props.style]}>
                <SelectorModal
                    title={"FROM"}
                    onSelect={this.onSelectInitialNode}
                    selectedIndex={this.state.selectedInitialNodeIndex}
                    data={Object.keys(Nodes).map(key => Nodes[key])}
                    style={Style.marginTop}
                />
                <SelectorModal
                    title={"TO"}
                    onSelect={this.onSelectFinalNode}
                    selectedIndex={this.state.selectedFinalNodeIndex}
                    data={Object.keys(Nodes).map(key => Nodes[key])}
                    style={Style.marginTop}
                />
                <SelectorModal
                    title={"CARRIAGE"}
                    onSelect={this.onSelectCarriage}
                    selectedIndex={this.state.selectedCarriageIndex}
                    data={Object.keys(CarriageType).map(key => CarriageType[key])}
                    style={Style.marginTop}
                />
                <SelectorModal
                    title={"COST"}
                    onSelect={this.onSelectCost}
                    selectedIndex={this.state.selectedCostIndex}
                    data={Object.keys(CostType).map(key => CostType[key])}
                    style={Style.marginTop}
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={this.onValidate}
                    style={[Style.buttonAlert]}
                >
                    <Text style={[Style.buttonAlertLabel]}>NEXT</Text>
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
        padding: 20 ,
        backgroundColor: "#e8f5e9"
    },
    marginTop: {
        marginTop: 15,
        height: 55,
        width: 150,
        borderRadius:20
    },

    buttonAlert: {
        padding: 15,
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: "#00e676",
        height: 55,
        width: 150,
        borderRadius:20
    },
    buttonAlertLabel: {
        color: "white"

    }

});