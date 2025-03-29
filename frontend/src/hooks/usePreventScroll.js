import { useEffect } from 'react';

export function usePreventScroll(isOpen) {
    useEffect(() => {
        const handleScroll = (e) => {
            if (isOpen) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        if (isOpen) {
            // Add wheel event listener to prevent scroll
            document.addEventListener('wheel', handleScroll, { passive: false });
            document.addEventListener('touchmove', handleScroll, { passive: false });

            // Add class to prevent scroll but maintain position
            document.body.classList.add('overflow-hidden');
        }

        return () => {
            // Cleanup
            document.removeEventListener('wheel', handleScroll);
            document.removeEventListener('touchmove', handleScroll);
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);
} 