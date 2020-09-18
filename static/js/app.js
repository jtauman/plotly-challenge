//initalize webpage with data
function init() {
    // Use D3 fetch to read the JSON file
    var data
    d3.json("../../samples.json").then((importedData) => {
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

        //bubble plot trace
        var sampleResults = data.samples[0].sample_values;
        var otuIDs = data.samples[0].otu_ids;
        var otuLabels = data.samples[0].otu_labels;
        var traceBubble = {
            x: data.samples[0].otu_ids,
            y: sampleResults,
            mode: 'markers',
            marker: {color: otuIDs, size: sampleResults, sizeref: 1.2},
            text: otuLabels
        };

        var layoutBubble = {
            title: "Belly Button Bacteria Counts",
            xaxis: {title: "OTU IDs"},
            yaxis: {title: "Bacteria Counts"}
        }

        var data2 = [traceBubble];

        Plotly.newPlot("bubble", data2, layoutBubble)

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

        //update horizontal bargraph trace
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
        //plot the updated bar graph
        Plotly.newPlot("bar", dataBar, layoutBar);

        //update bubbleplot
        var newSampleResults = targetSampleData[0].sample_values;
        var newOtuIDs = targetSampleData[0].otu_ids;
        var newOtuLabels = targetSampleData[0].otu_labels;
        var traceBubble = {
            x: newOtuIDs,
            y: newSampleResults,
            mode: 'markers',
            marker: {color: newOtuIDs, size: newSampleResults, sizeref: 1.2},
            text: newOtuLabels
        };

        var layoutBubble = {
            title: "Belly Button Bacteria Counts",
            xaxis: {title: "OTU IDs"},
            yaxis: {title: "Bacteria Counts"}
        }

        var data2 = [traceBubble];

        Plotly.newPlot("bubble", data2, layoutBubble)

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
