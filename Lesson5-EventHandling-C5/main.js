var app = new Vue({
    el: '#app',
    data: {
        product: 'socks',
        image: './assets/vmSocks-green.jpg',
        inStock: true,
        details: ['80% cotton', '20% polyester', 'Gener-neutral'],
        variants: [{
            variantId: 2234,
            variantColor: 'green',
            variantImage: './assets/vmSocks-green.jpg'
            },
            {   
            variantId: 2235,
            variantColor: 'blue',
            variantImage: './assets/vmSocks-blue.jpg'
            }
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeFromCart() {
            this.cart -= 1
        },
       // Older way of instatiating function
       // functionName: function () {}

       // New way
       // *Note not all browsers will support this feature
        updateProduct(variantImage) {
            this.image = variantImage
        }
    }
})