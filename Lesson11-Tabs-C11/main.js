var eventBus = new Vue()

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

            <detail-tab :shipping="shipping" :details="details"> </detail-tab>

            <div v-for="(variant,index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
            </div>

            <!-- <button v-on:click="cart += 1"> Add to Cart</button> -->
            <button v-on:click="increaseCart" 
                :disable="!inStock"
                :class="{ disabledButton: !inStock }">
                Add to Cart
            </button>
            
            <button @click="reduceCart"> Remove from Cart </button>

            <product-tabs :reviews="reviews"> </product-tabs>
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
            reviews: [],
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
        }
    },
    methods: {
        increaseCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        reduceCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
       // Older way of instatiating function
       // functionName: function () {}

       // New way
       // *Note not all browser will support this
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },
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
        },
        mounted() {
            eventBus.$on('review-submitted', productReview => {
                this.reviews.push(productReview)
            })
        }
    }
})

// Vue.component('product-details', {
//     props: {
//         details: {
//             type: Array,
//             required: true
//         }
//     },
//     template: `
//         <ul>
//             <li v-for="detail in details"> {{detail}}</li>
//         </ul>
//     `
// })

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>
    
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label> 
      <!-- Can use 'required' from HTML5, Instead we customize our error callback service-->     
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
    <p>Would you recommend this product?</p>
    <label>
        Yes
        <input id="radioYes" type="radio" value="Yes" v-model="recommend">
    </label>
    <label>
        No
        <input  type="radio" value="No" v-model="recommend">
    </label>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                  }
                  eventBus.$emit('review-submitted', productReview),
                  this.name = null,
                  this.review = null,
                  this.rating = null,
                  this.recommend = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommendation required.")
            }
        }
    }
})

    Vue.component('detail-tab',{
    props: {
        details: {
            type: Array,
            required: true
        },
        shipping: {
            required: true
        }
    },
    template: `
    <div>

        <span class="tab":class="{ activeTab: selectedTab === tab}" v-for="(tab, index) in tabs" :key="index"
        @click="selectedTab = tab">
            {{ tab }}
        </span>

        <div v-show="selectedTab === 'Shipping'">
            <p>{{ shipping }}</p>
        </div>

        <div v-show="selectedTab === 'Details'">
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>
    </div>
    `,
    data() {
        return {
            tabs: [ 'Details', 'Shipping'],
            selectedTab: 'Details'
        }
    }
})


Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        },
    },
    template: `
    <div>

        <span class="tab":class="{ activeTab: selectedTab === tab}" v-for="(tab, index) in tabs" :key="index"
        @click="selectedTab = tab">
            {{ tab }}
        </span>

        <div v-show="selectedTab === 'Reviews'">
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>
            
        <product-review v-show="selectedTab === 'Make a Review'"></product-review>
    </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        addToCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id) {
            this.cart.pop(id)
        }
    }
})