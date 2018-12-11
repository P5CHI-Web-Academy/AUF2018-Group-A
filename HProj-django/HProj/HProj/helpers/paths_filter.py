from HProj.helpers.jsonParser import get_data_from_url
from HProj.models.Path import Path, CarriageType
from HProj.models.Carriage import CostFunction, Carriage
from HProj.models.Edge import Edge

def get_edges_from_url(url):
    dataArray = get_data_from_url(url)
    paths = [Path(data) for data in dataArray]
    edges = Edge.edges_from_paths_by_filtering(paths, CarriageType.auto, CostFunction.time)
    return edges