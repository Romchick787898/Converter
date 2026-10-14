import React, {useState, useEffect} from 'react';
import axios from 'axios';

export interface Currency_types_obj {
        time_update: object,
        valutes: Array<object>,
        update: boolean
    }

const FetchData = (): Currency_types_obj => {

    const url_api: string = process.env.REACT_APP_API_URL || "";
    
    const [data, setData] = useState<Currency_types_obj>({ time_update: {}, valutes: [{}], update: false});
    const [load, setLoad] = useState(true);
    const [error, setError] = useState<string | null>(null);

    

    useEffect(() => {

        if(!url_api){
            setError("URL API не задан. Проверьте переменную REACT_APP_API_URL в .env файле.");
            setLoad(false);
            return;
        }

        const currency: Currency_types_obj = {
            time_update: {},
            valutes: [{}],
            update: false
        }


        axios
            .get(url_api)
            .then(response => {

                const result_curr = response.data;

                currency.time_update = result_curr.Timestamp
                currency.valutes = Object.values(result_curr.Valute)
                currency.update = true

                setData(currency);
                setLoad(false);
                localStorage.setItem("last_currency", JSON.stringify(currency));
            })
            .catch(err => {
                setError(err);
                setData(currency);
                setLoad(false);
            });
    }, []);

    return data;
};


export default FetchData;