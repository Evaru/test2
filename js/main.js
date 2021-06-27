const table = document.getElementsByClassName('table-body')[0]
const todayTotal = document.getElementById('todayTotal')
const lastTotal = document.getElementById('lastTotal')
const statistics = document.getElementsByClassName('statistics')[0]
const update = document.getElementsByClassName('statistics__update')[0]
const settings = document.getElementsByClassName('statistics__settings')[0]
const Close = document.getElementsByClassName('statistics__close')[0]
const main = document.getElementsByTagName('main')[0]
const color = document.getElementsByClassName('color')[0]
const dataId = document.querySelectorAll('td[data-id]')
const td = document.getElementsByTagName('td')

const jsonTable = new Request('table.json')

async function getTable() {
    let arrayTodayValue=[]
    let arrayLastValue=[]
    let json=jsonTable
    let percent=[]
   
    settingTable=()=>{
        settings.classList.toggle('actived')
    }
 
    changeColor =()=>{
        statistics.classList.toggle('colorChange')
    }
   
    closeTable=()=>{
        json=[]
        main.classList.add('closed')
        table.innerHTML=`<p class="inf-closed">Инормация закрыта. Хотите <a onclick="openTable()">открыть</a>?</p>`
    }
 
    openTable=()=>{
        json=jsonTable
        main.classList.remove('closed')

        getTable()
    }
    if(json.length!=0){
    await fetch(json)
        .then(function(response){return response.json()})
        .then(function(data) {
        
            let tableData=[]
            let cash=cashless=credit=averageСheck=averageGuest=
            removeCheckAfter=removeCheckBefore=countCheck=countGuest=[]
        
            if(data[0]){
                let dataLocal = data[0]
                arrayKey = dataLocal

                for (var key in dataLocal) {
                    let item=dataLocal[key].replace(/-|\s/g,"")
                    arrayTodayValue.push(item)
                    todayTotal.innerHTML=Number(arrayTodayValue[0])+Number(arrayTodayValue[1])+Number(arrayTodayValue[2])
            
            }

        }
        
        if(data[1]){
                let dataLocal = data[1]
                for (var key in dataLocal) {
                    let item=dataLocal[key].replace(/-|\s/g,"")
                    arrayLastValue.push(item)
                    lastTotal.innerHTML=Number(arrayLastValue[0])+Number(arrayLastValue[1])+Number(arrayLastValue[2])
                }
            }
            arrayTodayValue=arrayTodayValue.map(Number)
            arrayLastValue=arrayLastValue.map(Number)
    
            function deepEqual (){
                for (let i = 0; i < arrayTodayValue.length; i++) {
                    let result = ( 100.0 * (arrayTodayValue[i] - arrayLastValue[i]) / arrayLastValue[i])
                    result=Math.floor(result)
                    // if(result>0){
                    //     result=`+${result}`

                    // }
                    percent.push({result})
                    
                }
               
                return percent
             }

             deepEqual()

            
            for (let j = 0; j < percent.length; j++) {
                percent[j].class=''
               
                if(percent[j].result>0){
                    percent[j].result=`+${percent[j].result}`
                    percent[j].class="plus"
                  
                   
                }
                if(0>percent[j].result){
                    percent[j].class="minus"
                }
                if(percent[j].result<=-10){
                    percent[j].class="overMinus"
                 
                }
                percent[j].result=`${percent[j].result}%`
            }

            for(let i = 0; i < data.length;i++){
                let item = data[i]
                
                if(i==1){

                    cash += `<td data-id="${i}" class="${percent[0].class}">${item.cash} <strong class="percent">${percent[0].result}</strong></td>`
                    cashless += `<td data-id="${i}" class="${percent[1].class}">${item.cashless} <strong class="percent">${percent[1].result}</strong></td>`
                    credit += `<td data-id="${i}" class="${percent[2].class}">${item.credit} <strong class="percent">${percent[2].result}</strong></td>`
                    averageСheck += `<td data-id="${i}" class="${percent[3].class}">${item.averageСheck} <strong class="percent">${percent[3].result}</strong></td>`
                    averageGuest += `<td data-id="${i}" class="${percent[4].class}">${item.averageGuest} <strong class="percent">${percent[4].result}</strong></td>`
                    removeCheckAfter += `<td data-id="${i}" class="${percent[5].class}">${item.removeCheckAfter} <strong class="percent">${percent[5].result}</strong></td>`
                    removeCheckBefore += `<td data-id="${i}" class="${percent[6].class}">${item.removeCheckBefore} <strong class="percent">${percent[6].result}</strong></td>`
                    countCheck += `<td data-id="${i}" class="${percent[7].class}">${item.countCheck} <strong class="percent">${percent[7].result}</strong></td>`
                    countGuest += `<td data-id="${i}" class="${percent[8].class}">${item.countGuest} <strong class="percent">${percent[8].result}</strong></td>`
                    
                }
                else{
                    cash += `<td data-id="${i}">${item.cash}</td>`
                    cashless += `<td data-id="${i}">${item.cashless}</td>`
                    credit += `<td data-id="${i}">${item.credit}</td>`
                    averageСheck += `<td data-id="${i}">${item.averageСheck}</td>`
                    averageGuest += `<td data-id="${i}">${item.averageGuest}</td>`
                    removeCheckAfter += `<td data-id="${i}">${item.removeCheckAfter}</td>`
                    removeCheckBefore += `<td data-id="${i}">${item.removeCheckBefore}</td>`
                    countCheck += `<td data-id="${i}">${item.countCheck}</td>`
                    countGuest += `<td data-id="${i}">${item.countGuest}</td>`
                }
                tableData = `
                                <tr>
                                    <td>Наличные</td>
                                    ${cash}
                                </tr>
                                <tr>
                                    <td>Безналичный расчет</td>
                                    ${cashless}
                                </tr>
                                <tr>
                                    <td>Кредитные карты</td>
                                ${credit}
                                </tr>
                                <tr>
                                    <td>Средний чек,руб</td>
                                    ${averageСheck}
                                </tr>
                                <tr>
                                    <td>Средний гость,руб</td>
                                    ${averageGuest}
                                </tr>
                                <tr>
                                    <td>Удаление из чека
                                    (после оплаты),руб</td>
                                    ${removeCheckAfter}
                                </tr>
                                <tr>
                                    <td>Удаление из счета
                                    (до оплаты),руб</td>
                                ${removeCheckBefore}
                                </tr>
                                <tr>
                                    <td>Количество чеков</td>
                                    ${countCheck}
                                </tr>
                                <tr>
                                    <td>Количество гостей</td>
                                ${countGuest}
                                </tr>
                                `
            
            table.innerHTML=tableData
            }

        })
        .catch(e => {
        console.log(`Error ${e}`)
        })

    arrayTodayValue=arrayTodayValue.map(Number)
    arrayLastValue=arrayLastValue.map(Number)   

        Highcharts.chart('container', {
            series: [{
                data: arrayTodayValue
            }]
        });

        dataId[0].addEventListener('click', () => {
           dataId[0].classList.add('activedThead')
           dataId[1].classList.remove('activedThead')
            Highcharts.chart('container', {
                series: [{
                    data: arrayTodayValue,
                
                }]
            });
        })

        dataId[1].addEventListener('click', () => {
            dataId[0].classList.remove('activedThead')
            dataId[1].classList.add('activedThead')
            Highcharts.chart('container', {
                series: [{
                    color: 'green',
                    data: arrayLastValue
                }]
            });
        })
       
    }
    else{
        table.innerHTML=`<p class="inf-closed">Инормация закрыта. Хотите <a onclick="openTable()">открыть</a>?</p>`
    }

    Close.onclick =closeTable
    update.onclick=openTable
    settings.onclick=settingTable
    color.onclick=changeColor
}

getTable()
