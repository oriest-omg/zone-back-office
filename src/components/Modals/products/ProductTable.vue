<template>
    <div class="card-body" >
        <table id="example1" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>image</th>
                    <th>titre</th>
                    <th>catégorie</th>
                    <th>date d'ajout</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for ="(product,index) in products" :key="index">
                <td> 
                    <img v-if="product.product_types[0].images != ''" :src="'http://localhost:3000/image/src/'+product.product_types[0].images[0]._id" width="100" height="100" alt="">
                </td>
                <td>{{ product.title }}</td>
                <td>{{ product.category}}</td>
                <td>{{ formatDate(product.created) }}</td>
                <td>
                    <button type="button" class="btn btn-default" data-toggle="modal" :data-target="'#modal-edit'+product._id">
                        Details
                    </button>            
                    <button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#modal-delete'+product._id" >
                        Supprimer
                    </button>
                </td>
                    <DeleteProduct
                    :idProduct="product._id"
                    v-on:up="up()"/>
                    <ReadProduct
                    :product="product"/>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th>image</th>
                    <th>titre</th>
                    <th>catégorie</th>
                    <th>date d'ajout</th>
                    <th>action</th>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment'
import DeleteProduct from './DeleteProduct.vue'
import ReadProduct from './ReadProduct.vue';

export default {
    name: 'ProductTable',
        data() {
        return {
                products : [],
                product:{},
        }
    },
       methods : {
            async getDatas (){
                await axios
                .get("http://localhost:3000/products")
                .then(response=> {
                    console.log('products',response);
                    for (const product of response.data){
                        this.products.push(product)
                    }
                console.log(this.products);
              });
            },
            formatDate(dateString) {
                if (dateString) {
                return moment(String(dateString)).format('DD/MM/YYYY')
                }
            },
            up(){
                this.$emit('up');
            }
        },

    async mounted() {
        await this.getDatas();
    },
  components :{
    DeleteProduct,
    ReadProduct,
}
}
</script>

<style>

</style>