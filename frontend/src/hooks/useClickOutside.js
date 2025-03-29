import { useEffect, useRef } from 'react';

export function useClickOutside(setState, initialState, dependencies = []) {
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            // Only run if the state is true (component is visible/active)
            if (!initialState) return;

            // Check if click is outside the component and is not from a modal
            if (ref.current &&
                !ref.current.contains(event.target) &&
                !event.target.closest('[data-modal]')) { // Check for modal attribute
                setState(false);
            }
        }

        // Add event listener only if the state is true
        if (initialState) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setState, initialState, ...dependencies]);

    return ref;
} 