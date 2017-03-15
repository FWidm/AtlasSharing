/**
 * Created by Fabian-Desktop on 15.03.2017.
 */
var selectedMaps = [];
const urlParamName="maps";
const noOfMaps=126;

function checkExistence(arrayToCheck, name) {
    var found = arrayToCheck.some(function (map) {
        //console.log(map.name+" | "+name);
        return map.name === name;
    });
    return found;
}

function addSelectedMap(mapButton) {
    var jsonMap = {};
    jsonMap.name=mapButton.name;
    jsonMap.tier=mapButton.tier;
    selectedMaps.push(jsonMap);
    selectedMaps.sort(function(a, b) {
        return (a.tier) - (b.tier);
    });
    console.log(selectedMaps);
}

function removeFromSelectedMap(mapButton){
    //todo: implement removal
}

function encodeMapsToUrl(){
    var encoded="";
    for(id in buttons){
        if(checkExistence(selectedMaps,buttons[id].name)){
            encoded+=1;
        }
        else{
            encoded+=0;
        }
    }
    return encoded;
}

function decodeMapsFromUri(encoded){
    console.log(encoded.length);
    if(encoded.length==noOfMaps){
        for(id in encoded){
            if(encoded[id]=='1'){
                addSelectedMap(buttons[id]);
                buttons[id].completed=true;
                addInstance(id, selectedButtons);
            }
        }
    }
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
    changeUrlParam(urlParamName,encodeMapsToUrl());
    console.log(JSON.stringify(selectedMaps));
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function changeUrlParam (param, value) {
    var currentURL = window.location.href+'&';
    var change = new RegExp('('+param+')=(.*)&', 'g');
    var newURL = currentURL.replace(change, '$1='+value+'&');

    if (getURLParameter(param) !== null){
        try {
            window.history.replaceState('', '', newURL.slice(0, - 1) );
        } catch (e) {
            console.log(e);
        }
    } else {
        var currURL = window.location.href;
        if (currURL.indexOf("?") !== -1){
            window.history.replaceState('', '', currentURL.slice(0, - 1) + '&' + param + '=' + value);
        } else {
            window.history.replaceState('', '', currentURL.slice(0, - 1) + '?' + param + '=' + value);
        }
    }
}