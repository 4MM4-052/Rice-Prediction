export interface HyperparametersType {
    metric:      string;
    n_neighbors: number;
    weights:     string;
}

export interface NeighborType {
    distance: number;
    label:    string;
}
