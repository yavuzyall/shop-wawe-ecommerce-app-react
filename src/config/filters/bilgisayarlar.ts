// bilgisayarlar.ts
export const filters = {
    brand: {
        label: "Marka",
        options: ['Tümü', 'Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer']
    },
    price: {
        label: "Fiyat Aralığı",
        options: ['Tümü', '0-1000 TL', '1001-2000 TL', '2001-3000 TL', '3001+ TL']
    },
    processorType: {
        label: "İşlemci Tipi",
        options: ['Tümü', 'Intel i3', 'Intel i5', 'Intel i7', 'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7']
    },
    memorySize: {
        label: "Bellek Boyutu",
        options: ['Tümü', '4 GB', '8 GB', '16 GB', '32 GB+']
    },
    storageType: {
        label: "Depolama Tipi",
        options: ['Tümü', 'HDD', 'SSD']
    },
    storageSize: {
        label: "Depolama Boyutu",
        options: ['Tümü', '128 GB', '256 GB', '512 GB', '1 TB+']
    },
    operatingSystem: {
        label: "İşletim Sistemi",
        options: ['Tümü', 'Windows', 'MacOS', 'Linux']
    }
}
