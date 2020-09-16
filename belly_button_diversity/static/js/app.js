//initalize webpage with data
function init() {
    // Use D3 fetch to read the JSON file
    var data
    d3.json("../../data/samples.json").then((importedData) => {
        console.log(importedData);
        data = importedData;
        // var sampleData = importedData.samples[0];
        // console.log(sampleData);

        //populate dataset options to button
        var dropdown = document.getElementById("selDataset");
        for (index in data.names) {
            console.log(data.names[index])
            dropdown.options[dropdown.options.length] = new Option(data.names[index], index[index]);
        };

        //populate demographic data
        var demoData = data.metadata[0];    
        console.log("demoData:" , demoData);

        return Object.entries(demoData).forEach(([key, value]) => {
            console.log(`${key}: ${value}`)
            d3.select("#sample-metadata").append("h6").text(`${key}: ${value}`)
        });

    });
};
init()

function optionChanged (value){
    d3.json("../../data/samples.json").then((importedData) => {
        console.log(importedData)
        var targetData = importedData.metadata.filter(e => {
            return e.id === parseInt(value)
        })
        console.log(targetData)

        //populate demographic data
        var newMetaData = Object.values(targetData);    
        console.log("newMetaData:" , newMetaData);
        d3.select("#sample-metadata").text("");
        return Object.entries(newMetaData[0]).forEach(([key, value]) => {
            console.log(`${key}: ${value}`)
            d3.select("#sample-metadata").append("h6").text(`${key}: ${value}`)
        });
    })
};
