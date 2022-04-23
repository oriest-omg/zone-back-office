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
                <div class="form-group">
                    <label class="col-form-label mt-1"  for="titre">Titre</label>
                    <input type="text" class="form-control" v-model="title" placeholder="Titre" id="titre">
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-1"  for="category">Categorie</label>
                    <input type="text" class="form-control" v-model="category" placeholder="Categorie" id="categorie">
                </div>
                <table class="table">
                    <thead>
                        <!-- <th>Image</th> -->
                        <th>Stock</th>
                        <th>Prix</th>
                        <th>Taille</th>
                        <th>Description</th>
                    </thead>
                    <tbody>
                        <tr>
                            <!-- <td>
                                    <input type="file" v-on:change="getImage($event)" multiple>
                                    <input type="text" class="form-control" v-model="image"  placeholder="Marque" id="marque">
                            </td> -->
                            <td>
                                    <input type="text" class="form-control" v-model="stock" placeholder="Stock" id="stock">
                            </td>
                            <td>
                                    <input type="text" class="form-control" v-model="price" placeholder="Prix" id="prix">
                            </td>
                            <td>
                                    <input type="text" class="form-control" v-model="taille" placeholder="Taille" id="taille">
                            </td>
                            <td>
                                    <input type="text" class="form-control" v-model="description" placeholder="Description" id="description">
                            </td>
                        </tr>
                        <myItem v-for="(row, index) in rows"
                            :key="index"
                            :itemdata="itemList"
                            :row="row"                     
                            v-on:remove="removeRow(index)"/>
                        {{rows}}
                        <div>
                            <button @click="addRow"> Add sdfds Row </button>
                        </div>
                    </tbody>
                </table>
        </div>
        <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button> -->
            <button type="button" class="btn btn-success" @click="AjouterProduct()" >Enregistrer</button>
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
            rows: [],
            itemList: [
                { code: 'Select an Item', description: '', unitprice: ''},
                { code: 'One', description: 'Item A', unitprice: '10'},
                { code: 'Two', description: 'Item B', unitprice: '22'},
                { code: 'Three', description: 'Item C', unitprice: '56'}
            ],
            title:'',
            category:'',
            channels : [],
            product_types : [{
                available : true,
                stock : 0,
                price :{
                    original :0,
                    discount : 0,
                    bulk_discount : 0,
                    discount_quantity : 0,
                    currency : 0
                },
                description : '',
                dimensions :{
                    width :0,
                    height :0,
                    length :0,
                    unit :0
                },
            }],
        }
    },
    // emits:['on-reload'],
    methods : {
            AjouterProduct(){
                const options = {
                    url: 'http://localhost:3000/product',
                    method: 'POST',
                    data: {
                            title:this.title,
                            category:this.category,
                            channels : [],
                            ProductType : [{
                                available : false,
                                stock : this.stock,
                                price :{
                                    original :this.price,
                                    discount : 0,
                                    bulk_discount : 0,
                                    discount_quantity : 0,
                                    currency : 0
                                },
                                description : this.description,
                                dimensions :{
                                    width :0,
                                    height :0,
                                    length :0,
                                    unit :0
                                },
                            }],
                    },
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                };
                axios(options)
                .then( response =>{
                    console.log(response.data); 
                    console.log(response.data.id); 
                    if(response != null){
                        this.$notify({
                            title: "Ajouter",
                            text: "Article ajouté Ajouter",
                            type : "success"
                        })
                    }
                    this.marque ='';
                    this.prix = '';
                    // this.station = '';

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
            getImage(event){
                    console.log(event.target.files);
                    this.image = event.target.files[0];
                    console.log(this.marque);
                },
            submitFile() {
                    const formData = new FormData();
                    formData.append('file', this.image)
                    const headers = { 'Content-Type': 'multipart/form-data' };
                    axios.post('http://localhost:8000/api/voitures', formData, { headers }).then((res) => {
                        this.AjouterVoiture(res.data.id);
                    });
                },
            addRow(){
                this.rows.push({description: '', unitprice: '' , code: ''}); // what to push unto the rows array?
            },
            removeRow(index){
                this.rows.splice(index,1); // why is this removing only the last row?
            }
        },
          components :{
                myItem,
            }
}
</script>

<style>

</style>