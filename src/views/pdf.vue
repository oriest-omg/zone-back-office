<template>
 
 <div class="App container mt-5" id="divToPrint">
    <div>  
        <!-- logo  -->
        <!-- <img style="height:55px;width:235px;margin-left:10px"> -->
        <!-- logo -->
        <h1 class="title" style="margin-top:">FACTURE N° <span class="text-red">{{ commande.code }}</span></h1>

        <div>
            <div class="left">
                <h4 style="color: #b1000c;">Informations commande</h4>
                <!-- <b>Date de commande:</b> {{ commande.date }} 
                <br>
                <b>Date de livraison:</b> {{ commande.dateLivraison }} 
                <br>
                <b>Lieu de livraison:</b> {{ commande.localite }}  -->
                <br>
                <!-- {# <b>Heure de livraison:</b>{{ commande.heureLivraison  }}  -->
                 <!-- <br>  -->
            </div>

            <div class="right">
                <h4 style="color: #b1000c;" >Informations client</h4>
                <b>Nom:</b> {{ commande.client.id }} 
                <br>
                <b>Prénoms:</b> {{ commande.client.email }} 
                <br>
                <b>Contact WhatsApp:</b> {{ commande.client.email }} 
                <br>
                <b>e-mail:</b> {{ commande.client.email }} 
                <br>
            </div>

            <table class="table">
                <tr>
                    <th style="width: 45%">Articles</th>
                    <th style="width: 15%">Prix uniraire</th>
                    <th style="width: 10%">Quantité</th>
                    <th style="width: 20%">Montant</th>
                </tr>
                    <tr v-for ="(ligneCommande,index) in commande.ligneCommandes" :key="index">
                        <td>{{ ligneCommande.voiture.marque.marque }}</td>
                        <td style="text-align: center">{{ ligneCommande.prixVente }}</td>
                        <td style="text-align: center">{{ ligneCommande.quantite }}</td>
                        <td style="text-align: center">{{ ligneCommande.prixVente * ligneCommande.quantite }}</td>
                    </tr>

                <tr>
                    <td style="text-align: right" colspan="3"><b>Total</b></td>
                    <td style="text-align: center"><b>{{ commande.montant }} FCFA</b></td>
                </tr>
            </table>
        </div>
    </div>
      <button class="btn btn-primary" @click="printDocument()">Export To PDF</button>
    </div>
    
</template>
<script>
//importing bootstrap 5 and pdf maker Modules
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { useRoute } from 'vue-router';

export default {
         data() {
        return {
                api : 'http://localhost:8000/api/commandes',
                commande : {},
        }
    },
    methods: {
      async getDatas (){
        
                const route = useRoute();
                const id = route.params.idCommande;
                await axios
                .get(this.api+'/'+id)
                .then(response=> {
                console.log(response);
                this.commande = response.data;
              });
              console.log(this.commande);
            },
       printDocument() {       
          //get table html
          const pdfTable = document.getElementById('divToPrint');
          //html to pdf format
          var html = htmlToPdfmake(pdfTable.innerHTML);
        
          const documentDefinition = { content: html };
          pdfMake.vfs = pdfFonts.pdfMake.vfs;
          pdfMake.createPdf(documentDefinition).open();       
    }
  },
  async created() {

        await this.getDatas();
        console.log('ok')
  }  
}
</script>

<style type="text/css" scoped>
    .text-red {
        color: #b1000c;
    }

    .title {
        margin-top: 100px;
        font-family: Helvetica, sans-serif;
        text-align: center;
    }

    .right {
        position: absolute;
        margin-left: 65%;
        margin-top: 220px;
    }

    .left {
        position: absolute;
        margin-left: 5%;
        margin-top: 220px;
    }

    .table {
        position: absolute;
        margin-left: 5%;
        margin-top: 400px;
        border-collapse: collapse;
        width: 100%;
    }

    .table td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    .table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        background-color: #b1000c;
        color: white;
    }
</style>