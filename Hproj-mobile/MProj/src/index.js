import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {HomeScreen} from "./Components/HomeScreen";
import {EdgesList} from "./Components/EdgesList";
import FilterScreen from  "./Components/FilterScreen"

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    Edges: {
        screen: EdgesList,
        navigationOptions: {
            title: "Covered Edges"
        }
    },

    Filter: {
        screen: FilterScreen,
        navigationOptions: {
            title: "Select path"
        }
    }

});

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;