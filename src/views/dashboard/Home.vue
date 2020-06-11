<template>
  <dashboardlayout>
    <div id="main_home">
      <h1>Dashboard</h1>
      <router-link to="/dashboard/new_proposal" tag="button">+ new message proposal</router-link>

      <table>
        <tr>
          <th>Subject</th>
          <th>Date</th>
        </tr>

        <tr v-for="data of db_data" v-bind:key="data.subject">
          <td>{{data.subject}}</td>
          <td>{{convertDate(data.date)}}</td>
        </tr>
      </table>
    </div>
  </dashboardlayout>
</template>

<script>
import dashboardlayout from '../../layouts/dashboard'
import axios from 'axios';

export default {
  name: 'main_activate',
  data: function () {
    return {
        // db_data: {{subject:''},}
        db_data: [{ subject: "" }]
    }
  },
  async created(){
      var post_options = {
        method: 'POST',
        url: 'https://prod-47.westeurope.logic.azure.com:443/workflows/40c039c923cb4daa8899e8c4275b3e69/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_VGpYb-UlchrQxhaDwbDcAmJfJtQATuej5YtsLG1wio',
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
  components: {
    dashboardlayout
  },
  methods:{
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

<style>
#main_activate {

}
</style>
