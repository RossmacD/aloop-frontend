import { useRef, useCallback } from "react";

export function useRefArrayCallback<T>(onMount: (node: React.MutableRefObject<T[]>) => void, onUnmount: (node: T[]) => void, init: T[] = []) {
    const nodeRef = useRef<T[]>(init);

    const setRef = useCallback((id: number) => (node: T | null) => {
        console.log("Calling back", node)
        if (node) {
            if (nodeRef.current) {
                onUnmount(nodeRef.current);
            }

            nodeRef.current[id] = node;

            if (nodeRef.current) {
                onMount(nodeRef);
            }
        }
        // return nodeRef.current[id]
        return node
    }, [onMount, onUnmount]);

    return [nodeRef, setRef] as const;
}