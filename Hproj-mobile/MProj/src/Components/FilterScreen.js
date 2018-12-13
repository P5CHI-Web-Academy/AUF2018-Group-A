import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import SelectorModal from "./SelectorModal";
import {ApiManager} from "../ApiManager/ApiManager";
import {NavigationActions} from "react-navigation";

const CarriageType = {
    Auto: "Auto",
    Train: "Train",
    Plane: "Plane"
};

const CostType = {
    Price: "Price",
    Time: "Time",
    Distance: "Distance"
};

export default class FilterScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedInitialNodeIndex: null,
            selectedFinalNodeIndex: null,
            selectedInitialNodeItem: null,
            selectedFinalNodeItem: null,
            selectedCarriageIndex: 0,
            selectedCostIndex: 0,
            nodes: this.props.navigation.state.params.response[`vertices`].sort(),
            encodedUrl: this.props.navigation.state.params.response[`path`]
        };
    }

    componentDidMount() {
        console.log("Nodes: ", this.state.nodes);
        console.log("path: ", this.state.encodedUrl)
    }

    onSelectInitialNode = (item, index) => {
        this.setState({
            selectedInitialNodeIndex: index,
            selectedInitialNodeItem: item,
            selectedFinalNodeItem: null,
            selectedFinalNodeIndex: null
        });
    };

    onSelectFinalNode = (item, index) => {
        this.setState({
            selectedFinalNodeIndex: index,
            selectedFinalNodeItem: item,
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
        if (!this.state.selectedInitialNodeItem || !this.state.selectedFinalNodeItem) {
            alert("Please select Initial and final Nodes")
            return
        }

        const getParams =  {
            encodedUrl: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1A1Q0hJLVdlYi1BY2FkZW15L0FVRjIwMTgtR3JvdXAtQS9tYXN0ZXIvc3RhbmQtYWxvbmUtcHJvamVjdC9wYXJzaW5nX2ZpbHRlcnMvZmlsZS5qc29uCg==',
            from: this.state.selectedInitialNodeItem,
            to: this.state.selectedFinalNodeItem,
            carriageType: this.state.selectedCarriageIndex + 1,
            costFunction: this.state.selectedCostIndex + 1
        };

        ApiManager.get_covered_edges(
            getParams,
            response => {
                console.log("The response in the controller is: ", response);
                const navigateAction = NavigationActions.navigate({
                    routeName: 'Edges',
                    params: {response: response,
                            getParams: getParams },
                    action: NavigationActions.navigate({ routeName: 'Edges' }),
                });

                this.props.navigation.dispatch(navigateAction);
            },
            error => {
                alert(error);
            }
        )

    }

    render() {
        return (
            <View style={[Style.rootView, this.props.style]}>
                <SelectorModal
                    title={"FROM"}
                    onSelect={this.onSelectInitialNode}
                    selectedIndex={this.state.selectedInitialNodeIndex}
                    data={this.state.nodes}
                    style={Style.marginTop}
                />
                <SelectorModal
                    title={"TO"}
                    onSelect={this.onSelectFinalNode}
                    selectedIndex={this.state.selectedFinalNodeIndex}
                    data={this.state.nodes.filter((el, index) => index !==  this.state.selectedInitialNodeIndex)}
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
    rootView: {
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