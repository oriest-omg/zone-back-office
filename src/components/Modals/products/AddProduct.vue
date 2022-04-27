<template>
      <div class="modal fade" id="modal-ajouter">
        <div class="modal-dialog">
          <div class="modal-content" style="width : 150%">
            <div class="modal-header">
              <h4 class="modal-title">Ajouter Produit</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <table width="100%">
                    <tr>
                        <td rowspan="3" style="width:40%;">
                            <div class="form-group" v-if="image == ''">
                                <input type="file" v-on:change="getImage(item,$event)" multiple>
                            </div>
                                <img v-if="image != ''" :src="item.img" alt="">
                                <button v-if="image != ''" class="btn btn-danger" @click="removeImage(item)">Retirer l'image</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group">
                                <label class="col-form-label mt-1"  for="titre">Titre</label>
                                <input type="text" class="form-control" v-model="title" placeholder="Titre" id="titre">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group">
                                <label class="col-form-label mt-1"  for="category">Categorie</label>
                                <input type="text" class="form-control" v-model="category" placeholder="Categorie" id="categorie">
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
                            :productType="productType"
                            :productTypes="productTypes"                     
                            v-on:remove="removeRow(index)"/>
                        <!-- {{productTypes}} -->

                    </tbody>
                </table>
                <div>
                    <button class="btn btn-primary" @click="addRow" > Ajouter</button>
                </div>
        </div>
        <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button> -->
            <button type="button" class="btn btn-success" @click="AjouterProduct()" data-dismiss="modal" aria-label="Close">Enregistrer</button>
        </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
</template>

<script>
import  axios from 'axios'
import myItem from './my-item.vue'
export default {
  components: { myItem },
    data(){
        return{
            item  : {img:false},
            productTypes : [
                {
                    available : true,
                    stock : '',
                    price :{
                        original :0,
                        discount : 0,
                        bulk_discount : 0,
                        discount_quantity : 0,
                        currency : 0
                    },
                    description : '',
                    images :'',
                    dimensions :{
                        width :'',
                        height :'',
                        length :'',
                        unit :''
                    }
                }
            ],
            title:'',
            category:'chaussure',
            channels : [],
            image : ''
        }
    },
    // emits:['on-reload'],
    methods : {
             up(){
                this.$emit('upp');
                console.log('upp');
            },
            async AjouterProduct(){
                await this.submitFile();
                const options = {
                    url: 'http://localhost:3000/product',
                    method: 'POST',
                    data: {
                            title:this.title,
                            category:this.category,
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
                    if(response != null){
                        this.$notify({
                            title: "Ajouter",
                            text: "Article ajouté Ajouter",
                            type : "success"
                        })
                        this.title = '';
                        this.category = 'chaussure';
                        this.channels = [];
                        this.image = '';
                        this.productTypes = [
                            {
                                available : true,
                                stock : '',
                                price :{
                                    original :0,
                                    discount : 0,
                                    bulk_discount : 0,
                                    discount_quantity : 0,
                                    currency : 0
                                },
                                description : '',
                                images :'',
                                dimensions :{
                                    width :'',
                                    height :'',
                                    length :'',
                                    unit :''
                                }
                            }
                        ];
                        this.item.img =false;
                        this.up();
                    }
                    // this.$emit("on-reload",true)
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
            }
        },
}
</script>

<style scoped>

img {
  width: 100%;
  height:200px;
  margin-bottom: 10px;
}
</style>