
export class Edge {
    start
    end
    cost

    constructor(edgeData) {

        this.start = edgeData.start;
        this.end = edgeData.end;
        this.cost = edgeData.cost;

        }
    }