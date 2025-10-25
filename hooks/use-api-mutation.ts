import { useMutation } from "convex/react";
import { FunctionReference } from "convex/server";
import { useState } from "react";

const useApiMutation = (mutationFn: FunctionReference<"mutation">) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFn);

  const mutate = async (payload: any) => {
    setPending(true);
    try {
          let result;
          try {
              result = await apiMutation(payload);
          } finally {
              setPending(false);
          }
          return result;
      } catch (error) {
          throw error;
      }
  };

  return { mutate, pending };
};

export default useApiMutation