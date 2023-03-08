import { useCallback, useState } from 'react';

const useApi = <T>(request: (args?: any) => Promise<T>, defaultData: T) => {
  const [ loading, setLoading ] = useState(false);
  const [ data, setData ] = useState<T>(() => defaultData);

  const execute = useCallback(async (args?: any) => {
    setLoading(true);

    return request(args)
      .then((response) => {
        setData(response);

        return response;
      })
      .finally(() => setLoading(false));
  }, [ request ]);

  return [
    execute,
    data,
    loading,
  ] as [ typeof execute, T, boolean];
};

export default useApi;
