<template>
      <div class="modal fade" id="modal-ajouter">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Ajouter Modele</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="col-form-label mt-4"  for="marque">Marque</label>
                    <input type="text" class="form-control" v-model="marque" placeholder="marque" id="marque">
                    <!-- <input type="text" class="form-control" v-model="marque"  placeholder="Marque" id="marque"> -->
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-4"  for="deno">Dénomination</label>
                    <input type="text" class="form-control" v-model="denomination" placeholder="Dénomination" id="deno">
                </div>
            <!-- <div class="form-group">
                <label class="col-form-label mt-4"  for="Station">Station</label>
                <input type="text" class="form-control" v-model="station" placeholder="Nom de la Station" id="Station">
            </div> -->
        </div>
        <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button> -->
            <button type="button" class="btn btn-success" @click="AjouterModele()" >Enregistrer</button>
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
            denomination:'',
            marque:''
        }
    },
    // emits:['on-reload'],
    methods : {
        AjouterModele(){
                const options = {
                    url: 'http://localhost:8000/api/modeles',
                    method: 'POST',
                    data: {
                        marque : this.marque,
                        denomination: this.denomination
                    },
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                };
                axios(options)
                .then( response =>{
                    console.log(response.data); 
                    if(response != null){
                        this.$notify({
                            title: "Ajouter",
                            text: "Fournisseur Ajouter",
                            type : "success"
                        })
                    }
                    this.marque ='';
                    this.denomination = '';
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
        },
}
</script>

<style>

</style>