<template>
  <!-- Preloader -->
  <!-- affiche le logo après chargement de page -->
  <!-- <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="../../dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60">
  </div> -->
  <!-- /.navbar -->
  <aside class="main-sidebar sidebar-dark   levation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link" style="background-color: #07996d">
      <img src="../../dist/img/logo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">AGITEL </span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar" style="background-color: #07996d">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../../dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block" style="color:white">Admin</a>
        </div>
      </div>


      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <router-link to="/ListeArticles" class="nav-link" style="color:white">
              <p>
                Liste des articles
                <!-- <span class="right badge badge-danger">{{nbEtudiantEnCours}}</span> -->
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/ListeCommandes" class="nav-link" style="color:white">
              <p>
                Liste des commandes
                <!-- <span class="right badge badge-danger">{{nbEtudiantEnCours}}</span> -->
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/ListeModeles" class="nav-link" style="color:white">
              <p>
                Liste des Modeles
                <span class="right badge badge-danger"></span>
              </p>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>  
</template>

<script>
export default {

}
</script>

<style>

</style>