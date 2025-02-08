import { useEffect, useState } from "react";
import { service, Service } from "wc-services";

type ConstructorFrom<T> = new () => T;

export const useService = <T extends Service, SelectedState>(
  serviceClass: ConstructorFrom<T>,
  selector: (s: T) => SelectedState,
) => {
  const owner = Symbol();

  const serviceInstance = service(owner, serviceClass);

  useEffect(() => {
    const unsub = serviceInstance.addSubscriber(owner,
      // @ts-expect-error not worried about different constructors
      (instance: T) => {
        setState(selector(instance));
      }
    );

    return unsub;
  }, [serviceInstance, owner, selector]);

  const [state, setState] = useState(selector(serviceInstance));

  return [state, serviceInstance] as const;
};
//   const serviceInstance = service(owner, serviceClass);
//
//   const snapshotRef = useRef<SelectedState | undefined>(undefined);
//
//   const getSnapshot = useCallback(() => {
//     const currentState = selector(serviceInstance);
//
//     // If not first run, compare to ref last run, and check for inequality
//     if (!serviceInstance.__stateChanges) {
//       if (!snapshotRef.current) {
//         snapshotRef.current = currentState;
//       }
//
//       return snapshotRef.current;
//     }
//
//     // State changes flagged.  Reassign ref and return
//     serviceInstance.__stateChanges = false;
//     snapshotRef.current = currentState;
//
//     return snapshotRef.current;
//   }, [serviceInstance, selector]);
//
//   const subFn = useCallback(
//     (reactCb: () => void) => {
//       return serviceInstance.addSubscriber(owner, reactCb);
//     },
//     [serviceInstance],
//   );
//
//   const state = useSyncExternalStore(subFn, getSnapshot);
//
//   return [state, serviceInstance] as const;
// };
