export const calculateCartItemCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.length; // Sepetteki ürün sayısını döndürür
};