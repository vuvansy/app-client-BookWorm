export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript
declare global {

    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        data: T[]
    }


    interface IResponseImport {
        countSuccess: number;
        countError: number;
        detail: any;
    }

    interface IBook {
        _id: string;
        id_genre?: IGenre;
        name: string;
        image: string;
        slider?: string[];
        price_old: number;
        price_new?: number;
        quantity?: number;
        description?: string;
        status?: number;
        weight?: number;
        size?: string;
        publishers?: string;
        authors?: IAuthor[];
        year?: number;
        page_count?: number;
        book_cover?: string;
        rating?: number
        createdAt?: Date;
        updatedAt?: Date;
    }

    interface IBookTable {
        _id: string;
        id_genre: IGenre;
        name: string;
        image: string;
        slider?: string[];
        price_old: number;
        price_new: number;
        quantity: number;
        description?: string;
        status?: number;
        weight?: number;
        size?: string;
        publishers?: string;
        authors?: IAuthor[];
        year?: number;
        page_count?: number;
        book_cover?: string;
        rating?: number
        createdAt: Date;
        updatedAt: Date;
    }


    interface ICart {
        _id: string;
        quantity: number;
        detail: IBook;
    }


    interface ICoupon {
        _id: string;
        code: string;
        value: number;
        max_value: number;
        min_total: number;
        description?: string;
        quantity: number;
        status: "active" | "inactive";
        start_date: string;
        end_date: string;
        deleted: boolean;
        createdAt: string;
        updatedAt: string;
    }

    interface IOrder {
        fullName: string;
        phone: string;
        email?: string;
        address: Address;
        note?: string;
        products: ICart[];
        shippingPrice: number;
        discountAmount: number;
        isPaid: boolean;
        id_user?: string;
        id_delivery?: string;
        id_payment?: string;
        id_coupons?: string | null;
    }

    interface IHistory {
        _id: string;
        fullname: string;
        phone: string;
        email: string;
        address: string;
        note?: string;
        quantity: number;
        status: number;
        shippingPrice: number;
        discountAmount: number;
        order_total: number;
        isPaid: boolean;
        paidAt?: string;
        id_user: string;
        id_payment: string;
        id_delivery: string;
        id_coupons?: string;
        deleted: boolean;
        createdAt: string;
        updatedAt: string;
    }


    export interface IOrderDetail {
        _id?: string;
        quantity: number;
        price: string;
        id_book: string;
        id_order: string;
    }


}