/**
 * Created by Fabian-Desktop on 15.03.2017.
 */
var seletedMaps = [];


function addSelectedMap(mapButton) {
    var jsonMap = {};
    jsonMap.name=mapButton.name;
    jsonMap.tier=mapButton.tier;
    seletedMaps.push(jsonMap);
    seletedMaps.sort(function(a, b) {
        return (a.tier) - (b.tier);
    });
    console.log(seletedMaps);
}

function removeFromSelectedMap(mapButton){

}

function mapObjToString(mapObj) {
    return mapObj.tier+" | "+mapObj.name;
}

function compare(a,b) {
    console.log("compare a="+mapObjToString(a)+" with b="+mapObjToString(b));
    if (a.tier < b.tier)
        return -1;
    if (a.trier > b.tier)
        return 1;
    return 0;
}

function displayJson() {
    console.log(JSON.stringify(seletedMaps));
}