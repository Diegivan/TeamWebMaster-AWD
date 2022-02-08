import axios from 'axios'

export default axios.create({
    baseURL: 'http://ec2-44-202-44-135.compute-1.amazonaws.com:3027/'
})