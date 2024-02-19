// tabletler.ts
export const filters = {
    brand: {
        label: "Marka",
        options: ['Tümü', 'Apple', 'Samsung', 'Huawei', 'Lenovo', 'Microsoft']
    },
    price: {
        label: "Fiyat Aralığı",
        options: ['Tümü', '0-1000 TL', '1001-2000 TL', '2001-3000 TL', '3001+ TL']
    },
    screenSize: {
        label: "Ekran Boyutu",
        options: ['Tümü', '7.0"-8.9"', '9.0"-10.9"', '11.0"+']
    },
    storageSize: {
        label: "Depolama Boyutu",
        options: ['Tümü', '32 GB', '64 GB', '128 GB', '256 GB+']
    },
    operatingSystem: {
        label: "İşletim Sistemi",
        options: ['Tümü', 'iOS', 'Android', 'Windows']
    }
}
