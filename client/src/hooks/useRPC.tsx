import { PostgrestError, useClient } from 'react-supabase';
import { useEffect, useState } from 'react';
import { convertDataToGeoJson } from '../utils/misc';

interface RpcProps {
  rpcName: string;
  params?: any;
  convertToJson?: boolean;
  properties?: string[];
}

export const useRPC = ({
  rpcName,
  params,
  convertToJson = true,
  properties = ['id', 'name', 'measurementCount', 'color'],
}: RpcProps) => {
  const supabase = useClient();
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    runRpc(rpcName, params)
      .then((result) => {
        setData(
          convertToJson
            ? convertDataToGeoJson(result.data, properties)
            : result.data
        );
        if (result.error) setError(result.error);
      })
      .then(() => setIsLoading(false))
      .catch((error) => setError(error));
  }, [rpcName, JSON.stringify(params)]);

  const runRpc = async (rpcName: string, params: any) => {
    return await supabase.rpc(rpcName, params);
  };

  return { data, error, isLoading };
};
