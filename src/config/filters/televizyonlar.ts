// televizyonlar.ts
export const filters = {
    brand: {
        label: "Marka",
        options: ['Tümü', 'Samsung', 'LG', 'Sony', 'Philips', 'TCL', 'Vestel']
    },
    price: {
        label: "Fiyat Aralığı",
        options: ['Tümü', '0-1000 TL', '1001-2000 TL', '2001-3000 TL', '3001+ TL']
    },
    screenSize: {
        label: "Ekran Boyutu",
        options: ['Tümü', '32"', '40"-43"', '48"-50"', '55"-58"', '65"+']
    },
    resolution: {
        label: "Çözünürlük",
        options: ['Tümü', 'HD', 'Full HD', '4K UHD', '8K UHD']
    },
    smartTv: {
        label: "Smart TV",
        options: ['Tümü', 'Evet', 'Hayır']
    },
    hdmiPorts: {
        label: "HDMI Port Sayısı",
        options: ['Tümü', '1', '2', '3', '4+']
    },
}
