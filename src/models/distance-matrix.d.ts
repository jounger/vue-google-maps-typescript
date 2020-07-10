export interface DistanceMatrix {
  originAddress: string;
  destinationAddress: string;
  distance?: {
    text: string;
    value: number;
  };
  duration?: {
    text: string;
    value: number;
  };
}
