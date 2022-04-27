<template >
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
            <h1>listes articles</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item active">liste articles</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content" >
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <!-- /.card -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Liste des articles</h3>
                <div class="float-right">
                      <button type="button" class="btn bg-gradient-success" data-toggle="modal" data-target="#modal-ajouter">Ajouter</button>
                </div>
              </div>
              <!-- /.card-header -->
              <ProductTable 
              :key="maj" 
              v-on:up="up()"/>
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
        <AjouterProduct
         v-on:upp="upp()"/>

</div>
<!-- ./wrapper -->

</body>

</template>

<script>
import AjouterProduct from '../components/Modals/products/AddProduct.vue';
import Menu from '../components/menu.vue';
import ProductTable from '../components/Modals/products/ProductTable.vue';

export default {
    name : 'ListeVoitures',
        data() {
        return {
                maj : 0,
        }
    },
       methods : {
         up(){
           this.maj += 1;
         },
        upp(){
           this.maj += 1;
          console.log('upp');
         },
        },
  components :{
    AjouterProduct,
    Menu,
    ProductTable
}
}
</script>

<style>

</style>
