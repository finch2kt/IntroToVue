var app = new Vue({
    el: '#app',
    data: {
        product: "socks",
        image: "./assets/vmSocks-green.jpg",
        inStock: true,
        details: ["80% cotton", "20% polyester", "Gener-neutral"],
        variants: [
        {
            variantId: 2234,
            variantColor: "green"
        },
        {   
            variantId: 2235,
            variantColor: "blue"
        }],
        sizes: ["Large", "Medium", "small"]
    }
})