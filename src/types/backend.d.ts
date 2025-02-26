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
        user: {
            email: string;
            phone: string;
            fullName: string;
            role: string;
            avatar: string;
            id: string;
        }
    }

    interface IRegister {
        _id: string;
        email: string;
        fullName: string;
    }

    interface IUser {
        email: string;
        phone: string;
        fullName: string;
        role: string;
        avatar: string;
        id: string;
    }

    interface IFetchAccount {
        user: IUser
    }

    interface IGenre {
        _id: string;
        name: string;
        image: string;
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

    interface IBookTable {
        id_genre: string;
        name: string;
        image?: string;
        slider?: string[];
        price_old: number;
        price_new: number;
        quantity: number;
        description?: string;
        status?: number;
        weight?: number;
        size?: string;
        publishers?: string;
        authors?: string[];
        year?: number;
        page_count?: number;
        book_cover?: string;
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

}