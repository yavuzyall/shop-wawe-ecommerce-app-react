// telefonlar.ts
export const filters = {
    brand: {
        label: "Marka",
        options: ['Tümü', 'Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Oppo']
    },
    price: {
        label: "Fiyat Aralığı",
        options: ['Tümü', '0-1000 TL', '1001-2000 TL', '2001-3000 TL', '3001+ TL']
    },
    screenSize: {
        label: "Ekran Boyutu",
        options: ['Tümü', '5.0"-5.9"', '6.0"-6.9"', '7.0"+']
    },
    storageSize: {
        label: "Depolama Boyutu",
        options: ['Tümü', '32 GB', '64 GB', '128 GB', '256 GB+']
    },
    cameraResolution: {
        label: "Kamera Çözünürlüğü",
        options: ['Tümü', '12 MP', '24 MP', '48 MP', '64 MP+']
    },
    batteryCapacity: {
        label: "Batarya Kapasitesi",
        options: ['Tümü', '0-3000 mAh', '3001-4000 mAh', '4001-5000 mAh', '5001 mAh+']
    }
}
