<template>
      <div class="modal fade" v-bind:id="'modal-edit'+product._id">
        <div class="modal-dialog">
          <div class="modal-content" style="width : 150%">
            <div class="modal-header">
              <h4 class="modal-title">Ajouter Produit</h4>
              <button @click="changeEdit()" :class="[edit==false ?'btn btn-primary' :'btn btn-danger']"> {{edit==false ? 'Activer la modification' : 'Annuler la modification' }} </button>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <table width="100%">
                    <tr>
                        <td rowspan="3" style="width:40%;">
                            <!-- <div class="form-group" v-if="image == ''">
                                <input type="file" v-on:change="getImage(item,$event)" multiple>
                            </div> -->
                                <img :src="'http://localhost:3000/image/src/'+product.product_types[0].images[0]._id" alt="">
                                <button v-if="image != ''" class="btn btn-danger" @click="removeImage(item)">Retirer l'image</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group">
                                <label class="col-form-label mt-1"  for="titre">Titre</label>
                                <input type="text" class="form-control" v-model="product.title" placeholder="Titre" id="titre" :disabled="edit == false">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group">
                                <label class="col-form-label mt-1"  for="category">Categorie</label>
                                <input type="text" class="form-control" v-model="product.category" placeholder="Categorie" id="categorie" :disabled="edit == false">
                            </div>
                        </td>
                    </tr>
                </table>
                <table class="table">
                    <thead>
                        <!-- <th>Image</th> -->
                        <th>Stock</th>
                        <th>Prix</th>
                        <th>Taille</th>
                        <th>Description</th>
                    </thead>
                    <tbody>
                        <myItem v-for="(productType, index) in productTypes"
                            :key="index"
                            :edit="edit"
                            :productType="productType"
                            :productTypes="productTypes"                     
                            v-on:remove="removeRow(index)"/>
                        <!-- {{productTypes}} -->

                    </tbody>
                </table>
                <div>
                    <button class="btn btn-primary" @click="addRow" v-if="edit == true"> Ajouter</button>
                </div>
        </div>
        <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button> -->
            <button type="button" class="btn btn-success" @click="updateProduct()" v-if="edit == true">Modifier</button>
        </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
</template>

<script>
import  axios from 'axios'
import moment from 'moment'
import myItem from './my-item.vue'
export default {
  components: { myItem },
    data(){
        return{
            item  : {img:false},
            productTypes : this.product.product_types,
            channels : [],
            image : '',
            edit : false
        }
    },
    // emits:['on-reload'],
    methods : {
            async updateProduct(){
                // await this.submitFile();
                const options = {
                    url: 'http://localhost:3000/product',
                    method: 'PUT',
                    data: {
                            id : this.product._id,
                            title:this.product.title,
                            category:this.product.category,
                            channels : [],
                            productTypes : this.productTypes,
                    },
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                };
                axios(options)
                .then( response =>{
                    console.log(response);
                    if(response != null){
                        this.$notify({
                            title: "Modification",
                            text: "Modification effectuée",
                            type : "success"
                        })
                    }
                    this.edit = false;
                    this.$emit("on-reload",true)
                })
                .catch(error =>{
                    this.$notify({
                        title: "Erreur",
                        text: error.message,
                        type : "error"
                    })
                })
            },
            getImage(item,event){
                    console.log(event.target.files);
                    this.image = event.target.files[0];
                    console.log(this.image);
                    var files = event.target.files || event.dataTransfer.files;
                    if (!files.length)
                        return;
                    this.createImage(item, files[0]);
                },
            createImage(item, file) {
                    var img = new Image();
                    var reader = new FileReader();

                    reader.onload = (e) => {
                        item.img = e.target.result;
                    };
                    reader.readAsDataURL(file);
                },
            removeImage(item) {
                item.img = false;
                this.image = '';
                },
            async submitFile() {
                    const formData = new FormData();
                    formData.append('files', this.image)
                    const headers = { 'Content-Type': 'multipart/form-data' };
                    await axios.post('http://localhost:3000/image', formData, { headers }).then((res) => {
                    this.productTypes[0].images = res.data._id;
                    });
                },
            addRow(){
                this.productTypes.push({
                    available : true,
                    stock : '',
                    price :{
                        original :'',
                        discount : '',
                        bulk_discount : '',
                        discount_quantity : '',
                        currency : ''
                    },
                    description : '',
                    dimensions :{
                        width :'',
                        height :'',
                        length :'',
                        unit :''
                    }
                });
            },
            removeRow(index){
                this.productTypes.splice(index,1); // why is this removing only the last row?
            },
            changeEdit(){
                this.edit = !this.edit;
            }
        },
        props : ['product']
}
</script>

<style scoped>

img {
  width: 100%;
  height:200px;
  margin-bottom: 10px;
}
</style>