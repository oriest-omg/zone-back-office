<template>
      <div class="modal fade" id="modal-delete">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Supprimer porduit</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    Etes vous sûr de vouloir supprimer ce produit ?
                </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-success" @click="DeleteProduct()" >Supprimer</button>
        </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
</template>

<script>
import  axios from 'axios'
export default {
    data(){
        return{
        }
    },
    // emits:['on-reload'],
    methods : {
            DeleteProduct(){
                const options = {
                    url: 'http://localhost:3000/product/'+this.idProduct,
                    method: 'DELETE',
                    data :{
                        id : this.idProduct
                    },
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                };
                axios(options).then(response=>{
                    this.$notify({
                        title: "Suppression",
                        text: "article supprimé avec succès",
                        type : "success"
                    })
                    this.$emit("on-reload",true)
                })                
                .catch(error =>{
                    this.$notify({
                        title: "Erreur",
                        text: error.message,
                        type : "error"
                    })
                })
            }
        },
        props : ['idProduct'],
}
</script>

<style>

</style>