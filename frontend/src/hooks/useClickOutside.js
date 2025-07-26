import { useEffect, useRef } from 'react';

export function useClickOutside(setState, initialState, dependencies = []) {
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (!initialState) return;

         
            if (ref.current &&
                !ref.current.contains(event.target) &&
                !event.target.closest('[data-modal]')) { 
                setState(false);
            }
        }
        if (initialState) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setState, initialState, ...dependencies]);

    return ref;
} 