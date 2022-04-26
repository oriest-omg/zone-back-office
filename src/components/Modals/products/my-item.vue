<template id="item-template">
    <!-- <div> -->
        <tr>
            <!-- <td>
                    <input type="file" v-on:change="getImage($event)" multiple>
                    <input type="text" class="form-control" v-model="image"  placeholder="Marque" id="marque">
            </td> -->
            <td >
                    <input type="text" class="form-control" v-model="productType.stock" placeholder="Stock" id="stock" :disabled="edit == false" >
            </td>
            <td>
                    <input type="text" class="form-control" v-model="productType.price.original" placeholder="Prix" id="prix" :disabled="edit == false">
            </td>
            <td>
                    <input type="text" class="form-control" v-model="productType.dimensions.unit" placeholder="Taille" id="taille" :disabled="edit == false">
            </td>
            <td>
                    <textarea  class="form-control" v-model="productType.description" id="description" placeholder="Description" cols="30" rows="5" :disabled="edit == false">
                    </textarea>
            </td>
            <template v-if="edit == true">
                <td v-if="productTypes.length > 1 && !productType.images ">
                    <!-- {{productType.images.length}} -->
                    <button class="btn btn-danger" v-on:click= "remove" :disabled="edit == false"> X </button>
                </td>
                <td v-if="productTypes.length > 1 && productType.images && !productType.images.length">
                    <!-- {{productType.images.length}} -->
                    <button class="btn btn-danger" v-on:click= "remove" :disabled="edit == false"> X </button>
                </td>
            </template>

        </tr>
        <!-- <select v-model="row.code">
            <option v-for="(item,index) in itemdata" :key="index" :value="item"> {{ item.code }} </option>
        </select>
        <input type="text" placeholder="Text" v-model="row.description">
        <input type="text" placeholder="value" v-model="row.unitprice"> -->
    <!-- </div> -->
</template>

<script>
import  axios from 'axios'
export default {
    // props: ['itemdata', 'row'],
    props: ['productType','productTypes','edit'],
    template: '#item-template',
    data: function () {
        return {
            result : ''
        // selected: this.itemdata[0]
        }
    },
    methods: {
        remove() {
            this.$emit('remove');
            if(this.productType._id != null){
            // this.DeleteProduct();
            }
        },
        // DeleteProduct(){
        //     console.log('del');
        //     const options = {
        //         url: 'http://localhost:3000/productType',
        //         method: 'DELETE',
        //         data :{
        //             id : this.productType._id
        //         },
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json;charset=UTF-8'
        //         }
        //     };
        //     axios(options).then(response=>{
        //         this.$notify({
        //             title: "Suppression",
        //             text: "detail supprimé avec succès",
        //             type : "success"
        //         })
        //         this.$emit("on-reload",true)
        //     })                
        //     .catch(error =>{
        //         this.$notify({
        //             title: "Erreur",
        //             text: error.message,
        //             type : "error"
        //         })
        //     })
        // }
    }
}
</script>
       
<style>

</style>