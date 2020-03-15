import axios from "axios";

const headers = {
  'Accept': 'application/json',
  'Authorization':  'Bearer 6879-lEKYN1uJ5X_gTVo5u6avX4-jAbUcY0EMFoKsakPIfug',
}

export function availableCities() {
   return axios.get('https://api.hypothes.is/api/profile/groups',{ headers: headers }).then(function (response) {
      return response.data;
   })
}

