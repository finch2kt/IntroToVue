Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details"> {{detail}}</li>
        </ul>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image">
        </div>

        <div class="product-info">
            <!-- Old way {{ brand }} {{ product }} -->

            <h1>{{ title }}</h1>

            <!-- v-show (Toggles visibility)-->
            <!-- <p v-show="inStock">In Stock</p> -->
            <p v-if="inStock">In Stock</p>

            <!-- <p v-if="inventory > 10">In Stock </p>          FROM CONDITIONS LESSSON
            <p v-else-if="inventory <=10 && inventory > 0">Almost sold out</p> -->
            <p v-else>Out of Stock</p>
            <p>{{ sale }}</p>
            <p> Shipping: {{shipping}}</p>
            
            <product-details :details="details"> </product-details>

            <div v-for="(variant,index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
            </div>

            <!-- <button v-on:click="cart += 1"> Add to Cart</button> -->
            <button v-on:click="addToCart" 
                :disable="!inStock"
                :class="{ disabledButton: !inStock }">
                Add to Cart
            </button>
            
            <button @click="removeFromCart"> Remove from Cart </button>

            <div class="cart">
                <p>Cart({{cart}})</p>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
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
        }
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }

})




var app = new Vue({
    el: '#app',
    data: {
        premium: true,
    }
})