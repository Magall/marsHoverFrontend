import http from "@/repository/config/http";
// I have created functions just for get and post methods because I will use just them for this app. If i need any other verb this class can easily be extended
export default class Client {
    constructor() { };

    public async get(url: string, params: Object): Promise<any> {
        const p = new Promise(async (resolve, reject) => {
            try {
                const suc = await http.get(url, { params: params })
                resolve(suc.data)
            }
            catch (err) {
                reject(err.response)
            }

        });
        return p;
    }
    public async post(url: string, params: Object): Promise<any> {
        const p = new Promise(async (resolve, reject) => {
            try {
                const suc = await http.post(url, params)
                resolve(suc.data)
            }
            catch (err) {
                reject(err.response)
            }

        });
        return p;
    }

}