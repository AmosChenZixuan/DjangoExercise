<template>
    <div class="page-invoice">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/dashboard">Dashboard</router-link></li>
                <li><router-link to="/dashboard/invoices">Invoices</router-link></li>
                <li class="is-active"><router-link :to="{ name: 'Invoice', params: { id: invoice.id }}" aria-current="true">{{ invoice.invoice_number }}</router-link></li>
            </ul>
        </nav>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name:'Invoice',
    data(){
        return {
            invoice:{ id: 0 }
        }
    },
    async mounted(){
        await this.getInvoice()
    },
    methods:{
        getInvoice(){
            const invoiceID = this.$route.params.id
            axios
                .get(`/api/v1/invoices/${invoiceID}/`)
                .then( response => {
                    this.invoice = response.data
                    this.invoice.id = invoiceID
                })
                .catch( error => {
                    console.log(JSON.stringify(error))
                })
        }
    }

}
</script>