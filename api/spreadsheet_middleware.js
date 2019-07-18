const Axios = require("axios"); // Axios library for promisified fetch
BASE_URL = "https://script.google.com/macros/s/AKfycbwT1gIaoEmtv6wWfmoLf6BqCNvhuT3-fIITek5dEC9m17YV9hY/exec?action=insert";

module.exports = {

    postProvisioningData(submittedData){
       // query = `${source}_${destination}`;
       // return Axios.post('https://script.google.com/macros/s/AKfycbwT1gIaoEmtv6wWfmoLf6BqCNvhuT3-fIITek5dEC9m17YV9hY/exec?action=insert&tableName=PT1&venue=Kedai kopi')

       var tableName 		= submittedData.provisioning;
       var created_on 		= submittedData.created_on;
       var nik_teknisi	 	= submittedData.nik_teknisi;
       var venue 			= submittedData.venue;
       var scid 			= submittedData.scid;
       var soid 			= submittedData.nik_teknisi;
       var ssid 			= submittedData.ssid;
       var ndem 			= submittedData.ndem;
       var pic 				= submittedData.pic;
       var pic_number 		= submittedData.pic_number;
       var alamat 			= submittedData.alamat;
       var odp 				= submittedData.odp;
       var status 			= submittedData.status;
       var location 		= submittedData.location;
       var provisioning 	= submittedData.provisioning;

       // var url = `${BASE_URL}&tableName=${tableName}&created_on=${created_on}&nik_teknisi=${nik_teknisi}&venue=${venue}&scid=${scid}&soid=${soid}&scid=${scid}&ssid=${ssid}&ndem=${ndem}&pic=${pic}&pic_number=${pic_number}&alamat=${alamat}&odp=${odp}&status=${status}&location=${location}&provisioning=${provisioning}`;

       // var url = `https://script.google.com/macros/s/AKfycbwT1gIaoEmtv6wWfmoLf6BqCNvhuT3-fIITek5dEC9m17YV9hY/exec?action=insert&tableName=PT1&created_on=17-07-2019&nik_teknisi=950346&venue=my venue&scid=SCOO3&soid=SOID3&ssid=SSID3&ndem=54654654&pic=t4454 &pic_number=0856246&alamat=bara&odp=tes odp&status=tes status&location=disini&provisioning=PT17`;
       
       if(provisioning != 'PT3'){
       	var url = `https://script.google.com/macros/s/AKfycbwT1gIaoEmtv6wWfmoLf6BqCNvhuT3-fIITek5dEC9m17YV9hY/exec?action=insert&tableName=${provisioning}&created_on=${created_on}&nik_teknisi=${nik_teknisi}&venue=${venue}&scid=${scid}&soid=${soid}&ssid=${ssid}&ndem=${ndem}&pic=${pic}&pic_number=${pic_number}&alamat=${alamat}&odp=${odp}&status=${status}&location=${location}&provisioning=${provisioning}`;
       }else{
       	var url = `https://script.google.com/macros/s/AKfycbwT1gIaoEmtv6wWfmoLf6BqCNvhuT3-fIITek5dEC9m17YV9hY/exec?action=insert&tableName=${provisioning}&created_on=${created_on}&nik_teknisi=${nik_teknisi}&venue=${venue}&scid=${scid}&soid=${soid}&ssid=${ssid}&ndem=${ndem}&pic=${pic}&pic_number=${pic_number}&alamat=${alamat}&status=${status}&location=${location}&provisioning=${provisioning}`;
       }
       
       return Axios.post(url);
    }
};