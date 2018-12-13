import utf8 from 'utf8'
import base64 from 'base-64'

const BASE_URL="http://127.0.0.1:8000/api/"

export class ApiManager {
    // Usage:
    // ApiManager.getVerticesFromLink(
    //     {url: <URLString>},
    //     response => {
    //         console.log("The response in the controller is: ", response);
    //     },
    //     error => {
    //         alert(error);
    //     }
    // )
     static getVerticesFromLink(parameters, onSuccess, onFailure) {
        let url = parameters.url;

        let utf8 = require('utf8');
        let bytes = utf8.encode(url);
        let encoded = base64.encode(bytes);
        console.log(encoded)
        return fetch(BASE_URL + `vertices?json_path=${encoded}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                onSuccess && onSuccess(responseJson);
            })
            .catch((error) => {
                console.error(error);
                onFailure && onFailure(error);
            });
    }

    // Usage:
    // ApiManager.get_covered_edges(
    //     {
    //         encodedUrl: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1A1Q0hJLVdlYi1BY2FkZW15L0FVRjIwMTgtR3JvdXAtQS9tYXN0ZXIvc3RhbmQtYWxvbmUtcHJvamVjdC9wYXJzaW5nX2ZpbHRlcnMvZmlsZS5qc29uCg==',
    //         from: '#1',
    //         to: '#4',
    //         carriageType: 1,
    //         costFunction: 2
    //     },
    //     response => {
    //         console.log("The response in the controller is: ", response);
    //     },
    //     error => {
    //         alert(error);
    //     }
    // )
    static get_covered_edges(parameters, onSuccess, onFailure) {
        let encodedUrl = parameters.encodedUrl;
        let from = parameters.from;
        let to = parameters.to;
        let mainParams = `dijkstra?json_path=${encodedUrl}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
        let optionalParams =``
        if (parameters.carriageType) {
            optionalParams += `&carriage_type=${encodeURIComponent(parameters.carriageType)}`
        }
        if (parameters.costFunction) {
            optionalParams += `&cost_function=${encodeURIComponent(parameters.costFunction)}`
        }
        return fetch(BASE_URL + mainParams + optionalParams)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                onSuccess && onSuccess(responseJson);
            })
            .catch((error) => {
                console.error(error);
                onFailure && onFailure(error);
            });
    }

    static send_csv_mail(parameters, onSuccess, onFailure) {
        let encodedUrl = parameters.encodedUrl;
        let from = parameters.from;
        let to = parameters.to;
        let mainParams = `csv?json_path=${encodedUrl}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
        let optionalParams =``
        if (parameters.carriageType) {
            optionalParams += `&carriage_type=${encodeURIComponent(parameters.carriageType)}`
        }
        if (parameters.costFunction) {
            optionalParams += `&cost_function=${encodeURIComponent(parameters.costFunction)}`
        }
        return fetch(BASE_URL + mainParams + optionalParams)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                onSuccess && onSuccess(responseJson);
            })
            .catch((error) => {
                console.error(error);
                onFailure && onFailure(error);
            });

    }
    
}

