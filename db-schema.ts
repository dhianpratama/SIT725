interface User {
    id: string;
    mobileNumber: string;
    firstName: string;
    fullName: string;
    password: string;
    email: string;
    isMerchant: boolean;
}

interface MerchantCategories {
    id: string;
    categoryName: string; // restaurant | massage | etc
}

interface Merchant {
    id: string;
    merchantCategoryId: string;
    merchantName: string;
    address: string;
    lat: number;
    long: number;
    menus: [
        {
            name: string;
            description: string;
            price: string;
        }
    ],
    availability: [
        {
            day: string; // Sunday | Monday | Tuesday | etc
            time: string; // 09.00 | 10.00
            maxBookingAllowed: number;
        }
    ];
}

interface Booking {
    id: string;
    userId: string;
    merchantId: string;
    bookingDate: Date;
    bookingTime: string; // think later if we should combine booking date & time into 1 field.
    status: string; // submitted | confirmed | cancelled
}

