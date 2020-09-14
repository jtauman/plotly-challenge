// Use D3 fetch to read the JSON file
d3.json("../../data/samples.json").then((importedData) => {
    console.log(importedData);
    var data = importedData;
    console.log("Names:" , data.names);
    console.log("Metadata:", data.metadata);
    console.log("Samples:", data.samples);
    
    var sampleID = data.samples[0].id;
    var sampleResults = data.samples[0].sample_values;
    var otuIDs = data.samples[0].otu_ids;
    var otuLabels = data.samples[0].otu_labels;

    console.log("Sample ID:", sampleID);
    console.log("Sample Results:", sampleResults);
    console.log("OTU IDs:", otuIDs);
    console.log("OTU Lables:", otuLabels);

    var trace1 = {
        x: sampleResults,
        y: otuIDs,
        type: 'bar',
        orientation: 'h'
    }

    var data = [trace1];

    Plotly.newPlot("bar", data);
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


