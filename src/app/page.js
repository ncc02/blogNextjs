'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
   

    const router = useRouter();

    useEffect(() => {
        // Redirect '/' to '/blogs'
        router.replace('/blogs');
    }, []);

    return (
        <main>
            {/* Home page content */}
        </main>
    );
}