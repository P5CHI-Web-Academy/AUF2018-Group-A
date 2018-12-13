from HProj.helpers.jsonParser import get_data_from_url
from HProj.models.Path import Path, CarriageType
from HProj.models.Carriage import CostFunction, Carriage
from HProj.models.Edge import Edge

def get_edges_from_url(url, carriage_type, cost_function):
    dataArray = get_data_from_url(url)
    paths = [Path(data) for data in dataArray]
    carriage_type = carriage_type if carriage_type is not None else CarriageType.auto
    cost_function = cost_function if cost_function is not None else CostFunction.price
    edges = Edge.edges_from_paths_by_filtering(paths, int(carriage_type), int(cost_function))

    return edges