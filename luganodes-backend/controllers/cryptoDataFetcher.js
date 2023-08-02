const axios = require("axios")
const config = require("../config");


exports.fetchLiveRates = (req, res) => {
    let result = {}
    let status = 200;
    const api_url = config.API_URL
    const api_key = config.API_KEY
    const currency = req.query.coin


    axios.get(api_url + "live", {
        params: {
            access_key: api_key,
            symbols: currency
        }
    }).then((response) => {
        result = response.data;
        console.log(response)
        res.status(status).send(result)
    })
}

function formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    date = yyyy + '-' + mm + '-' + dd;
    return date
}

exports.fetchWeekRates = async (req, res) => {
    let result = {}
    let status = 200;
    const api_url = config.API_URL
    const api_key = config.API_KEY
    const currency = req.query.coin
    let dates = []

    for (let i = 0; i < 7; i++) {
        var date = new Date()
        date.setDate(date.getDate() - i);
        dates.push(formatDate(date))
    }
    let rateData = []
    let count = 0
    while (count < 7) {
        let datePrice = await axios.get(api_url + dates[count], {
            params: {
                access_key: api_key,
                symbols: currency
            }
        })
        const dateData = {date:dates[count],price:datePrice.data.rates[currency]}
        rateData.push(dateData)
        count++
    }

    result.rates = rateData
    res.status(status).send(result)

}

exports.fetchMonthRates = (req, res) => {
    let result = {}
    let status = 200;
    const api_url = config.API_URL
    const api_key = config.API_KEY
    const currency = req.query.coin
    const date = req.query.date


    axios.get(api_url + date, {
        params: {
            access_key: api_key,
            symbols: currency
        }
    }).then((response) => {
        result = response.data;
        console.log(response)
        res.status(status).send(result)
    })
}

