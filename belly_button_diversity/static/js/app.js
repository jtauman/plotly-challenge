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
            //console.log(data.names[index])
            dropdown.options[dropdown.options.length] = new Option(data.names[index], index[index]);
        };

        //bar graph
        var topResults = data.samples[0].sample_values.slice(0,10);
        var topOTUs = data.samples[0].otu_ids.slice(0,10);
        var stringOtuIDs = topOTUs.map(i => "OTU " + i);
        var topOTULabels = data.samples[0].otu_labels.slice(0,10);
        console.log(topResults);
        console.log(topOTUs);
        console.log(stringOtuIDs);
        console.log(topOTULabels);

        //horizontal bargraph trace
        var traceBar = {
            x: topResults.reverse(),
            y: stringOtuIDs.reverse(),
            text: topOTULabels.reverse(),
            type: 'bar',
            orientation: 'h'
        }

        var layoutBar = {
            title: "Top 10 Belly Button Bacteria Counts",
            width: 450
        }

        var dataBar = [traceBar];

        Plotly.newPlot("bar", dataBar, layoutBar);

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
        //filter metadata
        var targetData = importedData.metadata.filter(e => {
            return e.id === parseInt(value)
        });
        console.log(targetData)
        //filter sample data
        var targetSampleData = importedData.samples.filter(e => {
            return e.id === (value)
        });
        console.log(targetSampleData);

        //update bar graph
        var newSampleData = Object.values(targetSampleData);
        var newTopResults = newSampleData[0].sample_values.slice(0,10);
        var newTopOTUs = newSampleData[0].otu_ids.slice(0,10);
        var newStringOtuIDs = newTopOTUs.map(i => "OTU " + i);
        var newTopOTULabels = newSampleData[0].otu_labels.slice(0,10);

        //horizontal bargraph trace
        var traceBar = {
            x: newTopResults.reverse(),
            y: newStringOtuIDs.reverse(),
            text: newTopOTULabels.reverse(),
            type: 'bar',
            orientation: 'h'
        }

        var layoutBar = {
            title: "Top 10 Belly Button Bacteria Counts",
            width: 450
        }

        var dataBar = [traceBar];

        Plotly.newPlot("bar", dataBar, layoutBar);

        //populate demographic data
        var newMetaData = Object.values(targetData);    
        console.log("newMetaData:" , newMetaData);
        d3.select("#sample-metadata").text("");
        return Object.entries(newMetaData[0]).forEach(([key, value]) => {
            console.log(`${key}: ${value}`)
            d3.select("#sample-metadata").append("h6").text(`${key}: ${value}`)
        });
    });
};
