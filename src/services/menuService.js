import axios from 'axios';
import util from '../utilities/util';
import {API_ROOT, CONTEXT} from '../config';

class menuService{

    getContent(domain){
        // const token = util.getToken();
        // return axios({
        //     method: `GET`,
        //     url: API_ROOT + `mainMenu/${domain}`,
        //     headers: { Authorization: `Bearer ${token}`, "Access-Control-Allow-Origin": "*", }
        // })
        
        return axios({
            method: `GET`,
            url:  + `/contentmenu.json`,
            headers: { "Access-Control-Allow-Origin": "*", }
        })
       
    }

   

}

export default new menuService();