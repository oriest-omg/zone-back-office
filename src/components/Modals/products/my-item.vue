<template id="item-template">
    <!-- <div> -->
        <tr>
            <!-- <td>
                    <input type="file" v-on:change="getImage($event)" multiple>
                    <input type="text" class="form-control" v-model="image"  placeholder="Marque" id="marque">
            </td> -->
            <td>
                    <input type="text" class="form-control" v-model="row.stock" placeholder="Stock" id="stock">
            </td>
            <td>
                    <input type="text" class="form-control" v-model="row.price" placeholder="Prix" id="prix">
            </td>
            <td>
                    <input type="text" class="form-control" v-model="row.taille" placeholder="Taille" id="taille">
            </td>
            <td>
                    <input type="text" class="form-control" v-model="row.description" placeholder="Description" id="description">
            </td>
            <td>
                <button v-on:click= "remove"> X </button>
            </td>
        </tr>
        <!-- <select v-model="row.code">
            <option v-for="(item,index) in itemdata" :key="index" :value="item"> {{ item.code }} </option>
        </select>
        <input type="text" placeholder="Text" v-model="row.description">
        <input type="text" placeholder="value" v-model="row.unitprice"> -->
    <!-- </div> -->
</template>

<script>
export default {
    props: ['itemdata', 'row'],
    template: '#item-template',
    data: function () {
        return {
        selected: this.itemdata[0]
        }
    },
    methods: {
        remove() {
            this.$emit('remove');
        }
    }
}
</script>

<style>

</style>