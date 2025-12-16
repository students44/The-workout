"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                },
                success: {
                    style: {
                        border: '1px solid #10B981',
                    },
                },
                error: {
                    style: {
                        border: '1px solid #EF4444',
                    },
                },
            }}
        />
    );
}
