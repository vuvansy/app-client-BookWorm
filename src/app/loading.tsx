'use client';
import PacmanLoader from "react-spinners/PacmanLoader";


export default function Loading() {
    return <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <PacmanLoader size={30} color="#36d6b4" />
    </div>;
}