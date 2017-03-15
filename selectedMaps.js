/**
 * Created by Fabian-Desktop on 15.03.2017.
 */
var selectedMaps = [];
const urlParamName = "maps";
const noOfMaps = 126;

function checkExistence(arrayToCheck, name) {
    var found = arrayToCheck.some(function (map) {
        //console.log(map.name+" | "+name);
        return map.name === name;
    });
    return found;
}

/**
 * Adds the map to the selectedMaps array.
 * @param mapButton
 */
function addSelectedMap(mapButton) {
    var jsonMap = {};
    jsonMap.name = mapButton.name;
    jsonMap.tier = mapButton.tier;
    selectedMaps.push(jsonMap);
    selectedMaps.sort(function (a, b) {
        return (a.tier) - (b.tier);
    });
    encodeMapsToUrl();
    console.log(selectedMaps);
}

/**
 * Removes map from the selectedMaps array
 * @param mapButton
 */
function removeFromSelectedMap(mapButton) {
    selectedMaps = selectedMaps.filter(function (map) {
        return map.name !== mapButton.name;
    });
    encodeMapsToUrl();
    console.log(selectedMaps);
}

/**
 * Encode maps to URI in binary form (string)
 * @returns {string} binary representation
 */
function encodeMapsToUrl() {
    var encoded = "";
    for (id in buttons) {
        if (checkExistence(selectedMaps, buttons[id].name)) {
            encoded += 1;
        }
        else {
            encoded += 0;
        }
    }
    changeUrlParam(urlParamName, encoded);
}

/**
 * Decodes the selected maps from the url parameter.
 * @param encoded
 */
function decodeMapsFromUri(encoded) {
    console.log(encoded.length);
    if (encoded.length == noOfMaps) {
        for (id in encoded) {
            if (encoded[id] == '1') {
                addSelectedMap(buttons[id]);
                buttons[id].completed = true;
                addInstance(id, selectedButtons);
            }
        }
    }
}

/**
 * Returns the string representation of the js object of a map.
 * @param mapObj
 * @returns {string}
 */
function mapObjToString(mapObj) {
    return mapObj.tier + " | " + mapObj.name;
}

/**
 * Print the current active maps in json format
 */
function displayJson() {
    console.log(JSON.stringify(selectedMaps));
}


function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

function changeUrlParam(param, value) {
    var currentURL = window.location.href + '&';
    var change = new RegExp('(' + param + ')=(.*)&', 'g');
    var newURL = currentURL.replace(change, '$1=' + value + '&');

    if (getURLParameter(param) !== null) {
        try {
            window.history.replaceState('', '', newURL.slice(0, -1));
        } catch (e) {
            console.log(e);
        }
    } else {
        var currURL = window.location.href;
        if (currURL.indexOf("?") !== -1) {
            window.history.replaceState('', '', currentURL.slice(0, -1) + '&' + param + '=' + value);
        } else {
            window.history.replaceState('', '', currentURL.slice(0, -1) + '?' + param + '=' + value);
        }
    }
}