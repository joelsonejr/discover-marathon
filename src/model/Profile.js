//O model é um arquivo que serve para fornecer dados.

let data = {
  name: "Joe",
  avatar: "https://github.com/joelsonejr.png",
  "monthly-budget": 1537,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "value-hour": 75,
};

module.exports = {
    get(){
        return data
    },
    
    update(newData){
      data = newData
    }
}