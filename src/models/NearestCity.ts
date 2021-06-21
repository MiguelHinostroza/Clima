export interface NearestCity {
    city: string;
    state: string;
    country: string;
    location: Location;
    current: Current;
}

export interface Current {
    weather: Weather;
    pollution: Pollution;
}

export interface Pollution {
    ts: Date;
    aqius: number;
    mainus: string;
    aqicn: number;
    maincn: string;
}

export interface Weather {
    ts: Date;
    tp: number;
    pr: number;
    hu: number;
    ws: number;
    wd: number;
    ic: string;
}

export interface Location {
    type: string;
    coordinates: number[];
}