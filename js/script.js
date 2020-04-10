console.log("in another file!")
window.addEventListener("click", (e) => {
    // console.log(e.target.id, e.target.className.baseVal)
})




//@@@Helper functions
//To show province wise
const showProvinceWise = () => {
    const allDistricts = $('.district')

    // console.log(allDistricts)
    Object.keys(allDistricts).forEach((item, index) => {
        try {
            const province = allDistricts[item].className.baseVal.split(' ')[2]
            allDistricts[item].style.fill = stateColors[province]
            allDistricts[item].style['stroke-width'] = 0
        } catch (err) {
            // console.log(err)
        }
    })
}

//To show district wise
const showDistrictWise = () => {
    const allDistricts = $('.district')

    // console.log(allDistricts)
    Object.keys(allDistricts).forEach((item, index) => {
        try {
            const province = allDistricts[item].className.baseVal.split(' ')[2]
            allDistricts[item].style.fill = stateColors[province]
            allDistricts[item].style['stroke-width'] = 1
        } catch (err) {
            // console.log(err)
        }
    })
}

//Show hovered area separately
const showHovered = (hoveredClass) => {
    let hoveredEl = $(`.${hoveredClass}`)
    let tempEl = $('.temp-element')[0]
    console.log(tempEl);
    if (isProvinceWise) {
        //show whole province
        
        tempEl.prepend(hoveredEl[7])
    } else if (isDistricWise) {
        //show only district
        tempEl.prepend(hoveredEl[7])

    }
}

var isDistricWise = false;
var isProvinceWise = false;

const stateColors = {
    ekk: '#de98eb',
    dui: '#f2a55a',
    bagmati: '#6ac45b',
    gandaki: '#f2a55a',
    lumbini: '#de98eb',
    karnali: '#6ac45b',
    sudurpashchim: '#28a6f5'
}

const hoverStateColors = {
    ekk: '#a668b7',
    dui: '#a3b925',
    bagmati: '#f1e900',
    gandaki: '#ffac26',
    lumbini: '#a668b7',
    karnali: '#f1e900',
    sudurpashchim: '#a3b925'
}


$('.district').hover((e) => {
    //Hovering over the state when the zoom is low
    console.log('is province wise', isProvinceWise);
    if (isProvinceWise) {
        const province = e.target.className.baseVal.split(' ')[2]
        $(`.${province}`).css('fill-opacity', '0.7')
        showHovered(province)
    } else {
        const districtName = e.target.className.baseVal.split(' ')[1]
        $(`.${districtName}`).css('fill-opacity', '0.7')
        showHovered(districtName)

    }
}, (e) => {
    if (isProvinceWise) {
        const province = e.target.className.baseVal.split(' ')[2]
        $(`.${province}`).css('fill-opacity', '1')
        // showHovered(province)
    } else {
        const districtName = e.target.className.baseVal.split(' ')[1]
        $(`.${districtName}`).css('fill-opacity', '1')
        // showHovered(districtName)


    }
})

// //management of margin
// $(window).bind('resize', (e) => {
//     //change the margin
//     const mapWidth = $('.nepal-svg').width()
//     const windowWidth = $(window).width()
//     const marginValue = (windowWidth - mapWidth) / 2
//     console.log(mapWidth, windowWidth, marginValue);
//     $('.nepal-svg').css({
//         'left': `${marginValue}px`,
//     })
// })

//State wise or district wise?
const mapWidth = $('.nepal-svg').width()
if (mapWidth > 500) {
    //show districts with their respective colors
    isDistricWise = true
    isProvinceWise = false
    showDistrictWise();
    $('#map-button-text').text('Show Province Wise')

} else {
    //show only states with respective colors\
    isDistricWise = false
    isProvinceWise = true
    showProvinceWise();
    $('#map-button-text').text('Show District Wise')
    // const province = e.target.className.baseVal.split(' ')[2] 
}




//Handle button press

$('.button-district').bind('click', (e) => {
    isDistricWise = !isDistricWise;
    isProvinceWise = !isProvinceWise;
    if (isProvinceWise) {
        $('#map-button-text').text('Show District Wise')
        showProvinceWise()
    } else {
        $('#map-button-text').text('Show Province Wise')
        showDistrictWise()
    }
})





