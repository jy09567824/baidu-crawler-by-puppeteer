const fs = require('fs')
const axios = require('axios')
const cralwer = require('./utils/baidu.js')
const saveErrorData = require('./saveErrorData.js')

axios.defaults.headers.common['Authorization'] = `3W4o#Ib3%HUGpoQGjXm8Lh`

async function main() {
    // 1. get keywords list from API server
    // const { data } = await axios.get('https://api.pbn-content.inboundmarketing.com.tw/api/keywords')

    // 1. get keywords list form keywords.json
    const data = JSON.parse(fs.readFileSync('./keywords.json'))
    const keywords = data.data
    console.log(keywords)

    // 2. ask robot to crawl keyword results
    for ( const keyword of keywords) {
        console.log(keyword.title)
        // crawl each keyword
        const result = await cralwer(keyword.title)

        // prepare API data format
        const data_to_send = {
            keyword_id: keyword.id,
            content: result
        }
        // prepare error data format
        const error_data = {
            id: '',
            keyword_id: keyword.keyword_id,
            title: keyword.title,
            sub_category_id: keyword.sub_category_id
        }
        console.log(data_to_send)
        // 3. save to API server
        try {
            await axios.post('https://api.pbn-content.inboundmarketing.com.tw/api/contents', data_to_send)
        } catch (e) {
            console.log(error_data)
            saveErrorData(error_data)
        }
    }
}
    
main()
