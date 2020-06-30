<template>
  <dashboardlayout>
    <div id="main_home">
      <h1>Dashboard</h1>
      <router-link to="/dashboard/new_proposal" tag="button" class="btn">New proposal</router-link>

      <a v-on:click="loadData" class="refresh">Refresh</a>

      <table class="dashboard_table">
        <tr>
          <th>Subject</th>
          <th>Date</th>
          <th></th>
        </tr>

        <tr v-for="data of db_data" v-bind:key="data.subject">
          <td>{{data.subject}}</td>
          <td>{{convertDate(data.date)}}</td>
          <td>
            <a target="_blank" :href="'/post/' + data.id">Link</a>
          </td>
        </tr>
      </table>
    </div>
  </dashboardlayout>
</template>

<script>
import dashboardlayout from '../../layouts/dashboard'
import axios from 'axios';
import setup from '../../../setup';

export default {
  name: 'main_activate',
  data: function () {
    return {
        db_data: [{ subject: "" }],
        setup: setup
    }
  },
  created(){
      this.loadData();
  },
  components: {
    dashboardlayout
  },
  methods:{
    async loadData(){
      var post_options = {
        method: 'POST',
        url: this.setup['azure']['logic']['get_all_proposals'],
        data: {
              "token": localStorage.getItem('token')
            },
        json: true
      };

      try {
        const response = await axios(post_options);
        this.db_data = response.data;
      } catch(e) { console.error(e); }
    },
    convertDate(date) {
      if (isNaN(Date.parse(date)) == false) {
        var dateobj = new Date(date);
        var y = dateobj.getFullYear();
        var m = dateobj.getMonth() + 1;
        var d = dateobj.getDate();
        var h = dateobj.getHours();
        var min = dateobj.getMinutes();
        var display_date = h+":"+min+" "+d+"-"+m+"-"+y;
        return display_date;
      } else { return "-"; }
    }//END function
  }
}
</script>

<style lang="postcss">
.dashboard_table {
  border-collapse: collapse;

  & td,
  th {
    padding: 20px 40px;
    border: 2px solid #f3f6f9;
    background: white;
  }

  & th {
    text-align: left;
    background: black;
    color: white;
    padding: 10px 40px;
  }
}

.refresh {
  text-decoration: underline;
  display: block;
  margin-top: 50px;
  cursor: pointer;
  color: black;

  &:hover {
    color: #00c8ff;
  }
}
</style>
