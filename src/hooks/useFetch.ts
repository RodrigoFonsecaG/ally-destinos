import { useEffect, useState } from 'react';
import api from '../api';

export function useFetch<T = unknown>(url: string) {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        api.get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setIsFetching(false);
            });
    }, []);

    return { data, error, isFetching };
}
