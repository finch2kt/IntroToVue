var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Masterful',
        product: 'Boots',
        onSale: true,
        // Replaces image,
        selectedVariant: 0,
        //image: './assets/vmSocks-green.jpg',
        //inStock: true,
        details: ['80% cotton', '20% polyester', 'Gener-neutral'],
        variants: [{
            variantId: 2234,
            variantColor: 'green',
            variantImage: './assets/vmSocks-green.jpg',
            // Replaces InSTock boolean // Uses this to create computed property,
            variantQuantity: 10
            },
            {   
            variantId: 2235,
            variantColor: 'blue',
            variantImage: './assets/vmSocks-blue.jpg',
            // Replaces InSTock boolean // Uses this to create computed property,
            variantQuantity: 0
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
       // *Note not all browser will support this
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        }
    },
    // Results are chached 
    // Will not change unless the dependencies change
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
              return this.brand + ' ' + this.product + ' are on sale!'
            } 
              return  this.brand + ' ' + this.product + ' are not on sale'
        }
    }
})