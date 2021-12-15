import {useEffect, useState} from 'react';
import axios from 'axios';

function useFetch(url) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, seteError] = useState(null);

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setLoading(true);
                setData(response.data);
            })
            .catch((e) => {
                seteError(e);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [url]);

    return {data, loading, error};

}

export default useFetch;