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
            <h1>listes voitures</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item active">liste voitures</li>
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
                <h3 class="card-title">Liste des voitures</h3>
                <div class="float-right">
                      <button type="button" class="btn bg-gradient-success" data-toggle="modal" data-target="#modal-ajouter">Ajouter</button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
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
                    <!-- <template v-for="(productType,index) in product.product_types" :key="index"> -->
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
                      <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default" @click="Modifier(etudiant.id)">
                        Modifier
                      </button>                    
                      <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-delete" @click="Delete(product._id)">
                        Supprimer
                      </button>
                    </td>
                      <!-- /.control-sidebar -->
                    <DeleteProduct
                    :idProduct="idProduct"/>
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
    <strong>Copyright &copy; 2021-2022 <a href="#">Djelloh Foundation</a>.</strong>
    Tous les droits sont réservés.
    <div class="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.2.0-rc
    </div>
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
        <AjouterProduct/>
        <!-- <ModifierEtudiants
        :idd="idEtudiant"
        :etudiant="etudiant"/> -->
<!-- 
        <AfficherCni
        :idd="idEtudiant"
        :etudiant="etudiant"/> -->

</div>
<!-- ./wrapper -->

</body>

</template>

<script>
import axios from 'axios';
import moment from 'moment'
import ModifierEtudiants from '../components/Modals/ModifierEtudiants.vue';
import AfficherCni from '../components/Modals/AfficherCni.vue';
import AjouterProduct from '../components/Modals/products/AddProduct.vue';
import DeleteProduct from '../components/Modals/products/DeleteProduct.vue'
import Menu from '../components/menu.vue';
import ReadProduct from '../components/Modals/products/ReadProduct.vue';

export default {
    name : 'ListeVoitures',
        data() {
        return {
                products : [],
                modeles : [],
                idProduct : '',
                idEtudiant:'',
                product:{},
                nbEtudiantEnCours:0
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
            Delete(val){
                this.idProduct = val;
            },
            Afficher(val){
                // this.maj =true;
                this.idEtudiant = val;
                console.log(val);
                axios
                .get('http://localhost:8000/api/etudiants/'+val)
                .then(response =>{
                    this.etudiant  = response.data;
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
        async getModels(){
        await axios
        .get("http://localhost:8000/api/modeles")
        .then(response=> {
            console.log(response);
            for (const modele of response.data){
                this.modeles.push(modele)
            }
        console.log(this.modeles);
              });
          },
          formatDate(dateString) {
            if (dateString) {
            return moment(String(dateString)).format('DD/MM/YYYY')
            }
        }
        },

    async mounted() {
        await this.getDatas();
        // await this.getModels();
        console.log('ok')
    },
  components :{
    ModifierEtudiants,
    AfficherCni,
    AjouterProduct,
    DeleteProduct,
    Menu,
    ReadProduct
}
}
</script>

<style>

</style>
