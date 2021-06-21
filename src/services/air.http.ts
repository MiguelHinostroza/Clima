import {States} from "../models/State";
import Http from "../utils/http.util";
import {NearestCity} from "../models/NearestCity";

export default class AirHttp {
    public static instance: AirHttp

    private constructor() {
    }

    public static getInstance(): AirHttp {
        if (!AirHttp.instance) {
            AirHttp.instance = new AirHttp();
        }
        return AirHttp.instance;

    }

    async getStates(country: string): Promise<States> {
        const res: States = await Http.get(`states?country=${country}`);
        console.log(res);
        return res;
    }

    async getNearestCity(): Promise<NearestCity> {
        const res: NearestCity = await Http.get('nearest_city');
        console.log(res);
        return res;
    }


}

