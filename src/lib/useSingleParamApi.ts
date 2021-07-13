import { useState, useEffect } from 'react';
import { Nullable } from 'interfaces';

type PromiseFunc = (p: any) => Promise<any>;

export default function useSingleParamApi<T>(apiAction: PromiseFunc) {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState<Nullable<Error>>(null);
  const [param, setParam] = useState<Nullable<T>>(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await apiAction(param);
        setResolved(resolved);
        setError(null);
      } catch (e) {
        setError(e);
        setResolved(null);
      }
      setLoading(false);
    };
    if (param) process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return [{ loading, resolved, error }, setParam] as const;
}
