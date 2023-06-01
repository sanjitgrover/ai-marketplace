import axios from 'axios';
import util from '../utilities/util';
import {API_ROOT, CONTEXT} from '../config';

class themeService{



    getTheme(){
        // const token = util.getToken();
        // return axios({
        //     method: `GET`,
        //     url: API_ROOT + `userProfile/`,
        //     headers: { Authorization: `Bearer ${token}`, "Access-Control-Allow-Origin": "*", }
        // })
        return axios({
            method: `GET`,
            url: `${CONTEXT}/userProfile.json`,
            headers: { "Access-Control-Allow-Origin": "*", }
        })


    }

  

 

}

export default new themeService();