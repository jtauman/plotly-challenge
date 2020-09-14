// Use D3 fetch to read the JSON file
d3.json("../../data/samples.json").then((importedData) => {
    //console.log(importedData);
    var data = importedData;
    var sampleData = importedData.samples[0];
    console.log(sampleData);

    // sampleData.sort(function(a, b) {
    //     return b.sample_values - a.sample_values;
    // });
    // sampleData = sampleData.sample_values.slice(0,10);

    // sampleData= sampleData.reverse();

    // var traceBar = {
    //     x: data.map(row => row.sample_values),
    //     y: data.map(row => row.otu_ids),
    //     text: data.map(row => row.otu_labels),
    //     type: "bar",
    //     orientation: "h"
    // };

    // console.log("Names:" , data.names);
    // console.log("Metadata:", data.metadata);
    // console.log("Samples:", data.samples);

    // var initSampleResult = data.samples[0];
    // console.log("Initial Data:", initSampleResult);
    
    var sampleID = data.samples[0].id;
    var sampleResults = data.samples[0].sample_values;
    var otuIDs = data.samples[0].otu_ids;
    var stringOtuIDs = otuIDs.map(i => "OTU " + i);
    //var otuIDsArray = stringOtuIDs.split(",");
    var otuLabels = data.samples[0].otu_labels;

    // console.log("Sample ID:", sampleID);
    // console.log("Sample Results:", sampleResults);
    console.log("OTU IDs:", otuIDs);
    console.log("OTU IDs string:" , stringOtuIDs);
    //console.log("OTU IDs string array: ", otuIDsArray);
    // console.log("OTU Lables:", otuLabels);

    // //bar graph
    // //sort the result data
    // var sortedResults = data.sort((a,b) => {
    //     return (b.samples[0].sample_values - a.samples[0].sample_values);
    // });
    // //slice the data based to get the top 10 values
    var topResults = data.samples[0].sample_values.slice(0,10);
    console.log(topResults);
    //reverse array for horizontal bar plots
    //var reversedTopResults = topResults.reverse();

    //console.log(reversedTopResults);
    //horizontal bargraph trace
    var trace1 = {
        x: topResults,
        y: stringOtuIDs,
        text: otuLabels,
        type: 'bar',
        orientation: 'h'
    }

    var data = [trace1];

    Plotly.newPlot("bar", data);

    //bubble plot trace
    var traceBubble = {
        x: otuIDs,
        y: sampleResults,
        mode: 'markers',
        marker: {color: otuIDs, size: sampleResults, sizeref: 1.2},
        text: otuLabels
    };

    var data2 = [traceBubble];

    Plotly.newPlot("bubble", data2)
});




    //initialize graphs
    // function init() {
    //     var id = data.samples.
    // }

    //add options to button
    // d3.select("#selDataset")
    //     .selectAll("option")
    //     .data(data)
    //     .enter()
    //     .append("option")
    //     .attr("value", function(option) {return option.names; })
    //     .text(function(option) {return option.names;})

    // Submit Button handler
    // function handleSubmit() {
    //     // Prevent the page from refreshing
    //     d3.event.preventDefault();
    //     // Select the input value from the form
    //     var name = d3.select("selDataset").property("value");
    //     console.log(name);
    //     //build plot
    //     buildplot(name);
    // };


