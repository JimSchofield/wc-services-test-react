import { useRef, useSyncExternalStore } from "react";
import { service, Service } from "wc-services";

type ConstructorFrom<T> = new () => T;

const owner = Symbol();

export const useService = <T extends Service, SelectedState>(
  serviceClass: ConstructorFrom<T>,
  selector: (s: T) => SelectedState,
) => {
  const serviceInstance = service(owner, serviceClass);

  const snapshotRef = useRef<SelectedState | undefined>(undefined);

  const getSnapshot = () => {
    const currentState = selector(serviceInstance);

    console.log("compared");

    // If not first run, compare to ref last run, and check for inequality
    if (!serviceInstance.__stateChanges) {

      if (!snapshotRef.current) {
        snapshotRef.current = currentState;
      }

      return snapshotRef.current;
    }

    // State changes flagged.  Reassign ref and return
    serviceInstance.__stateChanges = false;
    snapshotRef.current = currentState;

    return snapshotRef.current;
  };

  const state = useSyncExternalStore((reactCb: () => void) => {
    serviceInstance.addSubscriber(owner, reactCb);

    return () => serviceInstance.removeSubscriber(owner);
  }, getSnapshot);

  return [state, serviceInstance] as const;
};
