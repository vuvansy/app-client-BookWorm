import { Spin } from 'antd';

export default function Loading() {
    return (
        <div className="absolute h-screen w-full inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
            <Spin size="large" />
        </div>
    );
}