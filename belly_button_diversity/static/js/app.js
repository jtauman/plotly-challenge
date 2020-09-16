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
        dropdown.options[dropdown.options.length] = new Option(data.names[index], data.names[index]);
    };

    //Call updatePlotly when a change takes place to the DOM
    
     //d3.selectAll("#selDataset").on("change", getData);

    // // This function is called when a dropdown menu item is selected
    // function getData() {
    //     // Use D3 to select the dropdown menu
    //     var dropdownMenu = d3.select("#selDataset");
    //     // Assign the value of the dropdown menu option to a variable
    //     var subject = dropdownMenu.property("value");

    //     // Call function to update the chart
    //     updatePlotly(data);
    // };

    // // Update the restyled plot's values
    // function updatePlotly(newdata) {
    // Plotly.restyle("bar", "values", [newdata]);

    //populate demographic data
    var demoData = data.metadata[0];    
    console.log(demoData);

    Object.entries(demoData).forEach(([key, value]) => {
        console.log(`${key}: ${value}`)
        d3.select("#sample-metadata").append("h6").text(`${key}: ${value}`)
    });
    // var indvDemoData = d3.select("#sample-metadata").text(Object.entries(demoData));
    
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


function optionChanged (value){
    d3.json("../../data/samples.json").then((importedData) => {
        console.log(importedData)
        var targetData = importedData.samples.filter(e => {
            return e.id === value
        })
        console.log(targetData)
    })
};

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


