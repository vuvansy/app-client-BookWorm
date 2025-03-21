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
        result: T[]
    }

    interface ILogin {
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            phone: string;
            fullName: string;
            role: string;
            image: string;
            address: Address;
        }
    }

    interface IRegister {
        _id: string;
        fullName: string;
        email: string;
        password: string;
    }

    interface Address {
        city: { key: string; name: string };
        district: { key: string; name: string };
        ward: { key: string; name: string };
        street?: string;
    }

    interface IUser {
        id: string;
        email: string;
        phone: string;
        fullName: string;
        role: string;
        image: string;
        address?: Address;
    }

    interface IUserTable {
        _id: string;
        fullName: string;
        phone: string;
        email?: string;
        image?: string;
        address?: Address;
        role: "USER" | "ADMIN";
        isBlocked?: boolean;
        password: string;
        isActive?: boolean;
        reset_token?: string | null;
        createdAt?: Date;
        updatedAt?: Date;
    }


    interface IFetchAccount {
        user: IUser
    }

    interface IGenre {
        _id: string;
        name: string;
        image: string;
    }

    interface IAuthor {
        _id: string;
        name: string;
        deleted: boolean;
        createdAt: string;
        updatedAt: string;
    }


    interface IUserTable {
        _id: string;
        fullName: string;
        email: string;
        phone: string;
        role: string;
        avatar: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        detail: IBookTable;
    }

    interface Ward {
        Id: string;
        Name: string;
    }

    interface District {
        Id: string;
        Name: string;
        Wards: Ward[];
    }

    interface City {
        Id: string;
        Name: string;
        Districts: District[];
    }

    interface IDelivery {
        _id: string;
        name: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | null;
    }
    interface IPayment {
        _id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | null;
    }

    interface IReview {
        comment: string;
        rating: number;
        id_user: IUser;
        id_order_detail: IOrderDetail;
        createdAt?: Date;
        updatedAt?: Date;
    }

    interface ICoupon {
        _id: string,
        code: string,
        value: number,
        max_value: number,
        min_total: number,
        description: string,
        quantity: number,
        status: boolean | string;
        start_date: Date,
        end_date: Date,
        createdAt?: Date;
        updatedAt?: Date;
    }

    interface IBookLike {
        id_user: string;
        id_book: string;
        createdAt?: Date;
        updatedAt?: Date;
    }
    
    interface IBookLike{
        _id:string;
        id_user:string;
        id_book:IBook;
    }

}