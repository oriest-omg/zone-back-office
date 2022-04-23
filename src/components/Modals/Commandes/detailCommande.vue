<template>
<div class="modal fade" id="modal-afficher">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title">Details Commande code : {{commande.code}}</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
            <ul class="to_do" style="overflow-y: auto;">
                <!-- {% for ligneCommande in commande.ligneCommandes %} -->
                <li v-for ="(ligneCommande,index) in commande.ligneCommandes" :key="index">
                    <p>
                        {{ ligneCommande.voiture.marque +'  - Prix achat:  '+ ligneCommande.voiture.prix +'  FCFA - Prix vente: '+ ligneCommande.prixVente +' FCFA' }} X {{ ligneCommande.quantite }}
                        <img  :src="'http://localhost:8000/images/'+ligneCommande.voiture.imagePath" alt="" style="width:50px;height:50px">
                    </p>
                </li>
                <!-- {% endfor %} -->
            </ul>

            <div class="ln_solid"></div>

            <div class="form-group">
                <div class="col-md-6 col-md-offset-3 pull-right">
                    <!-- <button data-dismiss="modal" class="btn btn-white pull-right">Fermer</button> -->
                    <button data-dismiss="modal" class="btn btn-red pull-right">Total = {{ commande.montant }} FCFA</button>
                </div>
            </div>
        </div>
        <div class="modal-footer justify-content-between">
        <button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>
        </div>
    </div>
    <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
</template>

<script>
export default {
    props : ['commande'],
    methods :{
    }
}
</script>

<style>

</style>