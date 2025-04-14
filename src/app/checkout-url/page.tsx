import { Suspense } from "react";
import ReturnURL from "./return-url";

const CheckoutUrlPage = () => {

    return (
        <div className='pt-[30px] bg-bg-main'>
            <Suspense fallback={<div>Đang tải...</div>}>
                <ReturnURL />
            </Suspense>
        </div>
    );
};

export default CheckoutUrlPage;
