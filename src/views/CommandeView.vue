<template>
<body class="hold-transition sidebar-mini layout-fixed">
      <!-- Google Font: Source Sans Pro -->
  <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"> -->
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../../plugins/fontawesome-free/css/all.min.css">
  <!-- Ionicons -->
  <!-- <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"> -->
  <!-- Tempusdominus Bootstrap 4 -->
  <link rel="stylesheet" href="../../plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="../../plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- JQVMap -->
  <link rel="stylesheet" href="../../plugins/jqvmap/jqvmap.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../../dist/css/adminlte.min.css">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="../../plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="../../plugins/daterangepicker/daterangepicker.css">
  <!-- summernote -->
  <link rel="stylesheet" href="../../plugins/summernote/summernote-bs4.min.css">
<div class="wrapper">

  <!-- Main Sidebar Container -->
  <Menu/>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>listes commandes</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item active">liste commandes</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <!-- /.card -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Liste des commandes</h3>
                <!-- Ajouter -->
                <!-- <div class="float-right">
                      <button type="button" class="btn bg-gradient-success" data-toggle="modal" data-target="#modal-ajouter">Ajouter</button>
                </div> -->
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>code</th>
                        <th style="max-width: 15px">Date commande</th>
                        <th style="max-width: 30px">Date livraison</th>
                        <th style="max-width: 15px">Heure livraison</th>
                        <th>Lieu Livraison</th>
                    <th>montant</th>
                    <th style="max-width: 30px">action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for ="(commande,index) in commandes" :key="index">
                    <td> 
                         {{ commande.code}}
                    </td>
                    <td>{{ commande.marque}}</td>
                    <td></td>
                    <td></td>
                    <td>{{ commande.statut}}</td>
                    <!-- <td>{{ voiture.matricule}}</td> -->
                    <!-- <td>
                     <button type="button" class="btn btn-default" data-toggle="modal" data-target="#bmodal-default" @click="Afficher(etudiant.id)"> 
                      <img :src="'http://localhost:8000'+etudiant.cni" width="100" height="100" alt="">
                      </button>   
                    </td>
                    <td>
                     <button type="button" class="btn btn-default" data-toggle="modal" data-target="#amodal-default" @click="Afficher(etudiant.id)"> 
                       <img :src="'http://localhost:8000'+etudiant.bacBenef" width="100" height="100" alt="">
                      </button>   
                    </td> -->
                    <td>
                      {{ commande.montant}}
                                      <!-- <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#Modifier" >Modifier</button> -->
                    </td>
                    <td>
                      <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-afficher" @click="Afficher(commande.id)">
                        Details
                      </button>
                      <router-link class="btn btn-default" :to="{ name: 'genPDF', params: { idCommande: commande.id } }">
                        Facture
                      </router-link>                    
                      <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default" @click="Modifier(etudiant.id)">
                        Supprimer
                      </button>
                    </td>
                      <!-- /.control-sidebar -->

                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <th>Image</th>
                    <th>marque</th>
                    <th>prix</th>
                    <!-- <th>matricule</th>
                    <th>cni</th>
                    <th>bac</th> -->
                    <th>statut</th>
                    <th>action</th>
                  </tr>
                  </tfoot>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <strong>Copyright &copy; 2021-2022 <a href="https://adminlte.io">AGITEL FORMATION</a>.</strong>
    Tous les droits sont réservés.
    <div class="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.2.0-rc
    </div>
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
        <!-- <AjouterVoiture/> -->
        <!-- <ModifierEtudiants
        :idd="idEtudiant"
        :etudiant="etudiant"/>
        <AfficherBac
        :idd="idEtudiant"
        :etudiant="etudiant"/>
        <AfficherCni
        :idd="idEtudiant"
        :etudiant="etudiant"/> -->
        <DetailCommande
        :commande="commande"/>


</div>
<!-- ./wrapper -->

</body>

</template>

<script>
import axios from 'axios';
import ModifierEtudiants from '../components/Modals/ModifierEtudiants.vue';
import AfficherBac from '../components/Modals/AfficherBac.vue';
import AfficherCni from '../components/Modals/AfficherCni.vue';
import DetailCommande from '../components/Modals/Commandes/detailCommande.vue';
import Menu from '../components/menu.vue';

export default {
    name : 'DashBoard',
        data() {
        return {
                api : 'http://localhost:8000/api/commandes',
                commandes : [],
                idCommande:'',
                commande:{},
                nbCommadesEnCours:0
        }
    },
       methods : {
            async getDatas (){
                await axios
                .get(this.api)
                .then(response=> {
                    console.log(response);
                    for (const commande of response.data){
                        this.commandes.push(commande)
                    }
                    for(const nb of this.commandes)
                    {
                      if(nb.statutBenef =="en cours") 
                      this.nbCommadesEnCours = this.nbCommadesEnCours + 1;
                    }
                    console.log(this.nbCommadesEnCours);
                // console.log(this.admins);
            });
            },
            Modifier(val){
                // this.maj =true;
                this.idEtudiant = val;
                // console.log(val);
                axios
                .get(this.api+val)
                .then(response =>{
                    this.etudiant  = response.data;
                });
            },
            Afficher(val){
                // this.maj =true;
                this.idCommande = val;
                // console.log(val);
                axios
                .get(this.api+'/'+val)
                .then(response =>{
                    this.commande  = response.data;
                    console.log(this.commande)
                    console.log(this.commande.ligneCommandes)
                });
            },
            // goToDash() {
            //     console.log('appuyer');
            //     this.admins.forEach(etudiant => {
            //         if(etudiant.email == this.username && etudiant.password == this.password)
            //         {
            //             console.log('succ');
            //             this.$router.push('/DashBoard');
            //         }else
            //         {
            //             console.log("error");
            //         }
            //     });
            // }
        },
    async mounted() {
        await this.getDatas();
        console.log('ok')
    },
  components :{
    ModifierEtudiants,
    AfficherBac,
    AfficherCni,
    DetailCommande,
    Menu
}
}
</script>

<style>

</style>
